import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import { View } from "react-native-animatable";
import { SafeAreaView } from "react-native-safe-area-context";
import extStyles from "../global/styles/extStyles";
import LottieView from "lottie-react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import ImagePopUp from "../components/imagePopUp";
import Feather from 'react-native-vector-icons/Feather';
import { getStorage, ref, uploadBytes, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { firebaseApp } from "../service/firebase";
import ErrorPopup from "../components/errorPopUp";
import { setErrorMsg, setErrorTitle } from "../global/variable";
import createSeeker from "../interfaces/createSeeker";
import AppLoader from "../components/AppLoader";
import axios, { HttpStatusCode } from "axios";
import { server } from "../service/constant";
import moment from "moment";
import * as Progress from 'react-native-progress';


const NicUpload = (props: any) => {
    const [isBtnLoading, setIsBtnLoading] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [progress, setProgress] = useState<number>(0);

    //Handle image capturing option selecting modal
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    //Store image selected state
    const [isFrontSelected, setIsFrontSelected] = useState<boolean>(false);
    const [isBackSelected, setIsBackSelected] = useState<boolean>(false);

    //Store selected side
    const [side, setSide] = useState<string>();

    //Store seeker data
    const [seeker, setSeeker] = useState<createSeeker>({
        firstName: "",
        lastName: "",
        email: "",
        mobNo: "",
        addFLine: "",
        addSLine: "",
        street: "",
        city: "",
        dob: new Date(),
        nic: "",
        gender: "",
        password: "",
        proofdoc_front: "",
        proofdoc_back: ""
    });

    //Store images URIs
    const [frontImageUri, setFrontmageUri] = useState<string>();
    const [backImageUri, setBackImageUri] = useState<string>();

    //Store error data
    const [isFrontImgError, setIsFrontImgError] = useState<boolean>(false);
    const [isBackImgError, setIsBackImgError] = useState<boolean>(false);
    const [errMessage, setErrMessage] = useState<string>("");
    const [isError, setIsError] = useState<boolean>(false);

    useEffect(() => {
        setIsFrontImgError(false);
        setIsBackImgError(false);
        setIsLoading(false);
        setIsBtnLoading(false);
        getData();
    }, []);

    //Get seeker's Email from local storage
    async function getData() {
        const dob: any = await AsyncStorage.getItem('dob');
        setSeeker({
            firstName: await AsyncStorage.getItem('firstName'),
            lastName: await AsyncStorage.getItem('lastName'),
            email: await AsyncStorage.getItem('email'),
            mobNo: await AsyncStorage.getItem('mobNo'),
            addFLine: await AsyncStorage.getItem('addFLine'),
            addSLine: await AsyncStorage.getItem('addSLine'),
            street: await AsyncStorage.getItem('street'),
            city: await AsyncStorage.getItem('city'),
            dob: moment(new Date(dob)).format("YYYY-MM-DD"),
            nic: await AsyncStorage.getItem('nic'),
            gender: await AsyncStorage.getItem('gender'),
            password: await AsyncStorage.getItem('password'),
            proofdoc_front: '',
            proofdoc_back: '',
        });
    }

    //Handle camera capture
    const captureDoc = async () => {
        setIsModalOpen(false);
        const result = await launchCamera({ mediaType: 'photo', quality: 1, includeBase64: true })
        if (result.assets) {
            if (side === 'front') {
                setIsFrontImgError(false);
                setFrontmageUri(result.assets[0].uri);
                setIsFrontSelected(true);
            } else if (side === 'back') {
                setIsBackImgError(false);
                setBackImageUri(result.assets[0].uri);
                setIsBackSelected(true);
            }
        }
    }

    //Handle file selection
    const selectDoc = async () => {
        setIsModalOpen(false);
        const result = await launchImageLibrary({ mediaType: 'photo', quality: 1, includeBase64: true });
        if (result.assets) {
            if (side === 'front') {
                setIsFrontImgError(false);
                setFrontmageUri(result.assets[0].uri);
                setIsFrontSelected(true);
            } else if (side === 'back') {
                setIsBackImgError(false);
                setBackImageUri(result.assets[0].uri);
                setIsBackSelected(true);
            }
        }
    }

    //Validate image selection
    const isValid = () => {
        if (!isFrontSelected && !isBackSelected) {
            setIsFrontImgError(true);
            setIsBackImgError(true);
            setErrMessage("Please upload the images");
            return false;
        }
        if (!isFrontSelected) {
            setIsFrontImgError(true);
            setErrMessage("Please upload the image");
            return false;
        }
        if (!isBackSelected) {
            setIsBackImgError(true);
            setErrMessage("Please upload the image");
            return false;
        }
        return true;
    }

    //Handle image uploading to the Firebase
    const uploadImage = async () => {
        setIsBtnLoading(true);
        try {
            if (isValid()) {
                firebaseApp;//Initialze firbase configuration 

                const storage = getStorage();

                //Files naming format
                const frontImageName = `${seeker.email}_proofdoc_front`;
                const backImageName = `${seeker.email}_proofdoc_back`;

                const storageRefFront = ref(storage, frontImageName);
                const storageRefBack = ref(storage, backImageName);

                if (!frontImageUri || !backImageUri) return;

                const frontImage = await fetch(frontImageUri);
                const frontImageBlob = await frontImage.blob(); //Convert front image to the blob

                const backImage = await fetch(backImageUri);
                const backImageBlob = await backImage.blob(); //Convert front image to the blob

                const images = [[storageRefFront, frontImageBlob], [storageRefBack, backImageBlob]];

                let index = 0;
                let progress = 0;
                for (const image of images) {
                    const storageRef: any = image[0];
                    const imageBlob: any = image[1];
                    await uploadBytesResumable(storageRef, imageBlob).then((snapshot) => {
                        progress += (snapshot.bytesTransferred / snapshot.totalBytes) * .5;
                        console.log(progress);
                        setProgress(progress);
                    });
                    const url = await getDownloadURL(storageRef);
                    if (index == 0) {
                        seeker.proofdoc_front = url;
                    } else if (index == 1) {
                        seeker.proofdoc_back = url;
                    }
                    index += 1;
                }
                setIsBtnLoading(false);
                setIsLoading(true);
                createSeeker();
            } else {
                setIsBtnLoading(false);
            }
        } catch (error) {
            console.log(error);
            setErrorTitle("Oops...!!");
            setErrorMsg("Something went wrong");
            setIsBtnLoading(false);
            setIsError(true);
        }
    }

    //Create seeker
    const createSeeker = async () => {
        try {
            const resp = await axios.post(server + 'createSeeker', seeker);
            if (resp.data === HttpStatusCode.Ok) {
                props.navigation.reset({
                    index: 0,
                    routes: [{ name: 'SignupSuccess' }]
                });
            } else {
                setErrorTitle("Oops...!!");
                setErrorMsg("Something went wrong");
                setIsError(true);
                setIsLoading(false);
            }
        } catch (error) {
            console.log(error);
            setErrorTitle("Oops...!!");
            setErrorMsg("Something went wrong");
            setIsError(true);
            setIsLoading(false);
        }
    }

    return (
        <SafeAreaView style={extStyles.body}>
            <View style={styles.mainContainer}>
                <View style={styles.topContainer}>
                    <View style={styles.animaContainer}>
                        <LottieView source={require('../assets/jsons/face_scan.json')} loop autoPlay style={styles.anima} />
                    </View>
                </View>
                <View style={styles.bottomContainer}>
                    <View style={styles.headingContainer}>
                        <Text style={styles.subHeadingTxt}>Your mobile number and  Email{'\n'}verfication is successful</Text>
                        <Text style={styles.headingTxt}>Identity verification</Text>
                    </View>
                    <View style={styles.greetingContainer}>
                        <Text style={styles.greetingTxt}>As the final step please upload your{'\n'}NIC/Driving License</Text>
                    </View>
                    <View style={styles.elementContainer}>
                        <TouchableOpacity style={{ ...styles.element, ...{ borderColor: isFrontImgError ? "#FF4122" : "#FE8235" } }} onPress={() => { setIsModalOpen(true), setSide('front') }}>
                            {!isFrontSelected ?
                                <View style={{ height: '100%' }}>
                                    <View style={styles.elementHeaderContainer}>
                                        <Text style={styles.elementHeaderTxt}>FRONT</Text>
                                    </View>
                                    <View style={styles.elementIconContainer}>
                                        <AntDesign name="upload" size={40} color={"#BAB9B9"} />
                                    </View>
                                </View>
                                : frontImageUri ?
                                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                        <Image source={{ uri: frontImageUri }} style={styles.proofDoc} />
                                        <View style={styles.proofDocContainer}>
                                            <Feather name="check-circle" size={50} color={"#FFF"} />
                                            <Text style={styles.successTxt}>Press{'\n'}to upload again</Text>
                                        </View>
                                    </View>
                                    :
                                    <View style={styles.successContainer}>
                                        <Feather name="check-circle" size={50} color={"#FFF"} />
                                        <Text style={styles.successTxt}>Press{'\n'}to upload again</Text>
                                    </View>
                            }
                        </TouchableOpacity>
                        <TouchableOpacity style={{ ...styles.element, ...{ borderColor: isBackImgError ? "#FF4122" : "#FE8235" } }} onPress={() => { setIsModalOpen(true), setSide('back') }}>
                            {!isBackSelected ?
                                <View style={{ height: '100%' }}>
                                    <View style={styles.elementHeaderContainer}>
                                        <Text style={styles.elementHeaderTxt}>BACK</Text>
                                    </View>
                                    <View style={styles.elementIconContainer}>
                                        <AntDesign name="upload" size={40} color={"#BAB9B9"} />
                                    </View>
                                </View>
                                : backImageUri ?
                                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                        <Image source={{ uri: backImageUri }} style={styles.proofDoc} />
                                        <View style={styles.proofDocContainer}>
                                            <Feather name="check-circle" size={50} color={"#FFF"} />
                                            <Text style={styles.successTxt}>Press{'\n'}for upload again</Text>
                                        </View>
                                    </View>
                                    :
                                    <View style={styles.successContainer}>
                                        <Feather name="check-circle" size={50} color={"#FFF"} />
                                        <Text style={styles.successTxt}>Press{'\n'}for upload again</Text>
                                    </View>
                            }
                        </TouchableOpacity>
                    </View>
                    {isBackImgError || isFrontImgError ?
                        <View style={styles.errContainer}>
                            <Text style={styles.errTxt}>{errMessage}</Text>
                        </View>
                        : isBtnLoading ?
                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <Progress.Bar progress={progress} width={200} height={1} color="#FE8235" />
                                <Text style={{ fontSize: 10, fontWeight: '600', color: '#FE8235' }}>{progress * 100}%</Text>
                            </View>
                            :
                            null
                    }

                    <View style={styles.btnContainer}>
                        <TouchableOpacity style={styles.btn} onPress={uploadImage} disabled={isBtnLoading}>
                            {isBtnLoading ?
                                <View style={styles.btnLoaderContainer}>
                                    <LottieView source={require('../assets/jsons/btn_loader.json')} loop autoPlay style={styles.btnLoader} />
                                </View>
                                :
                                <Text style={styles.btnTxt}>Finish</Text>
                            }
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            {isModalOpen ? <ImagePopUp closeModal={() => setIsModalOpen(false)} openCamera={captureDoc} openFiles={selectDoc} /> : null}
            {isError ? <ErrorPopup closeModal={() => setIsError(false)} /> : null}
            {isLoading ? <AppLoader /> : null}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    errTxt: {
        fontSize: 12,
        color: "#FF4122",
        fontWeight: '600',
        textAlign: 'center'
    },

    errContainer: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },

    proofDoc: {
        resizeMode: 'contain',
        width: '100%',
        height: '100%',
        borderRadius: 15,
        zIndex: 3
    },

    proofDocContainer: {
        position: 'absolute',
        zIndex: 4,
        justifyContent: 'center',
        alignItems: 'center'
    },

    successTxt: {
        textAlign: 'center',
        fontSize: 12,
        fontWeight: '500',
        color: '#FFF',
        marginTop: 10
    },

    successContainer: {
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#56BF2D',
        borderRadius: 15,
    },

    btnLoader: {
        width: '80%',
        height: '80%'
    },

    btnLoaderContainer: {
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(255, 255, 255, .5)',
        alignItems: 'center',
        justifyContent: 'center'
    },

    btnTxt: {
        fontSize: 18,
        fontWeight: '700',
        color: '#FFF'
    },

    btn: {
        width: 250,
        height: 50,
        backgroundColor: '#F2994A',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnContainer: {
        width: '100%',
        height: '15%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    elementIconContainer: {
        height: '80%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },

    elementHeaderTxt: {
        fontSize: 18,
        color: "#373737",
        fontWeight: '600'
    },

    elementHeaderContainer: {
        height: '20%',
        width: '100%',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },

    element: {
        height: 200,
        width: 150,
        backgroundColor: '#ECECEC',
        borderRadius: 15,
        borderWidth: 3,
        borderColor: '#FE8235',
        marginTop: 10
    },

    elementContainer: {
        width: '100%',
        height: '45%',
        flexDirection: 'row',
        paddingHorizontal: 40,
        justifyContent: 'space-between'
    },

    greetingTxt: {
        fontSize: 15,
        fontWeight: '300',
        color: '#373737',
        textAlign: 'center'
    },

    greetingContainer: {
        height: '10%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },

    subHeadingTxt: {
        fontSize: 20,
        fontWeight: '400',
        color: '#373737',
        textAlign: 'center'
    },

    headingTxt: {
        fontSize: 30,
        fontWeight: '500',
        color: '#F2994A',
    },

    headingContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 20
    },

    bottomContainer: {
        flex: 4,
        backgroundColor: '#FFF',
        zIndex: 1
    },

    anima: {
        width: '90%',
        height: '90%'
    },

    animaContainer: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20
    },

    topContainer: {
        flex: 2,
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
        backgroundColor: '#F2994A',
        elevation: 5,
        padding: 20,
        zIndex: 2
    },

    mainContainer: {
        flex: 1
    },
})

export default NicUpload;