import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import extStyles from "../global/styles/extStyles";
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import LottieView from "lottie-react-native";
import Feather from "react-native-vector-icons/Feather";
import ErrorPopup from "../components/ErrorPopUp";
import AppLoader from "../components/AppLoader";
import { setErrorMsg, setErrorTitle } from "../global/variable";
import axios, { HttpStatusCode } from "axios";
import { server } from "../service/constant";
import EncryptedStorage from "react-native-encrypted-storage";
import { Image } from "react-native-animatable";
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import ImagePopUp from "../components/ImagePopUp";
import { getStorage, ref, uploadBytes, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { firebaseApp } from "../service/firebase";
import SeekerVali from "../validations/seekerVali";


const MyProfile = (props: any) => {
    const [isError, setIsError] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isBtnLoading, setIsBtnLoading] = useState<boolean>(false);
    const [isUpdated, setIsUpdated] = useState<boolean>(false);

    //Seeker Data
    const [userName, setUserName] = useState<string>();
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [mobileNumber, setMobileNumber] = useState<string>("");
    const [birthDay, setBirthDay] = useState<string>("");
    const [nic, setNic] = useState<string>("");
    const [fLine, setFLine] = useState<string>("");
    const [sLine, setSLine] = useState<string>("");
    const [street, setStreet] = useState<string>("");
    const [city, setCity] = useState<string>("");
    const [profilePic, setProfilePic] = useState<string>();

    let formattedMobNo: string;
    let previousMobNo: string;

    //Fetch seeker profile data
    const getData = async () => {
        try {
            const session = await EncryptedStorage.getItem('session');
            let uName: string = '';
            if (session) uName = JSON.parse(session).userName;
            setUserName(uName);
            const resp = await axios.get(server + `profile/${uName}`);
            if (resp.data != HttpStatusCode.InternalServerError && resp.data != HttpStatusCode.NotFound) {
                setFirstName(resp.data.fName);
                setLastName(resp.data.lNAme);
                setMobileNumber(resp.data.mobNum);
                formattedMobNo = resp.data.mobNum;
                previousMobNo = resp.data.mobNum;
                setBirthDay(resp.data.dob);
                setNic(resp.data.nic);
                setFLine(resp.data.addFline);
                setSLine(resp.data.addSline);
                setStreet(resp.data.street);
                setCity(resp.data.city);
                setProfilePic(resp.data.profilePic);
                setIsLoading(false);
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
    };

    useEffect(() => {
        setIsUpdated(false);
        setIsLoading(true);
        getData();
    }, []);

    //Handle image capturing option selecting modal
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isPicSelected, setIsPicSelected] = useState<boolean>(false);
    const [selectedImage, setSelectedImage] = useState<any>();

    //Handle camera capture
    const captureDoc = async () => {
        setIsModalOpen(false);
        const result = await launchCamera({ mediaType: 'photo', quality: 1, includeBase64: true, cameraType: 'front' })
        if (result.assets) {
            setSelectedImage(result.assets[0].uri);
            setIsPicSelected(true);
            setIsUpdated(true);
        }
    }

    //Handle file selection
    const selectDoc = async () => {
        setIsModalOpen(false);
        const result = await launchImageLibrary({ mediaType: 'photo', quality: 1, includeBase64: true });
        if (result.assets) {
            setSelectedImage(result.assets[0].uri);
            setIsPicSelected(true);
            setIsUpdated(true);
        }
    }

    let firebaseUrl: any;

    //Handle image uploading to the Firebase
    const uploadImage = async () => {
        setIsBtnLoading(true);
        try {
            if (!isPicSelected) {
                updateSeeker();
                return;
            }

            firebaseApp;//Initialze firbase configuration 
            const storage = getStorage();

            //Files naming format
            const frontImageName = `${userName}_profile_pic`;

            const storageRef = ref(storage, frontImageName);

            if (!selectedImage) return;

            const image = await fetch(selectedImage);
            const imageBlob = await image.blob(); //Convert front image to the blob
            await uploadBytesResumable(storageRef, imageBlob);
            const url = await getDownloadURL(storageRef);
            firebaseUrl = url;
            updateSeeker();
        } catch (error) {
            console.log(error);
            setErrorTitle("Oops...!!");
            setErrorMsg("Something went wrong");
            setIsBtnLoading(false);
            setIsError(true);
        }
    }

    const [validation, setValidation] = useState({
        mobNumError: "",
        mobNum: true,

        addressError: "",
        fLine: true,
        sLine: true,

        cityError: "",
        city: true
    });

    const [isMobNoEditable, setIsMobNoEditable] = useState<boolean>(false);
    const [isFLineEditable, setIsFLineEditable] = useState<boolean>(false);
    const [isSLineEditable, setIsSLineEditable] = useState<boolean>(false);
    const [isStreetEditable, setIsStreetEditable] = useState<boolean>(false);
    const [isCityEditable, setIsCityEditable] = useState<boolean>(false);

    const handleInput = (element: string, value: string) => {
        setIsUpdated(true);
        switch (element) {
            case 'mobNUm':
                setMobileNumber(value);
                break;
            case 'fLine':
                setFLine(value);
                break;
            case 'sLine':
                setSLine(value);
                break;
            case 'street':
                setStreet(value);
                break;
            case 'city':
                setCity(value);
                break;
        }
    }

    const checkValidation = async () => {
        const seekerVali = new SeekerVali();
        let resp: SignupErr;
        let isValid: boolean = true;

        //Acceptable mobile number formats --> (0771234567, 94771234567, +94771234567)
        resp = await seekerVali.mobileNo(mobileNumber);
        setValidation((prev) => ({ ...prev, mobNumError: resp.error, mobNum: resp.isValid }));
        formattedMobNo = resp.content;
        if (isValid) isValid = resp.isValid;

        resp = await seekerVali.checkAddFLineValidity(fLine);
        setValidation((prev) => ({ ...prev, addressError: resp.error, fLine: resp.isValid }));
        if (isValid) isValid = resp.isValid;

        if (fLine != "") {
            resp = await seekerVali.checkAddSLineValidity(sLine);
            setValidation((prev) => ({ ...prev, addressError: resp.error, sLine: resp.isValid }));
            if (isValid) isValid = resp.isValid;
        }

        resp = await seekerVali.checkCityValidty(city);
        setValidation((prev) => ({ ...prev, cityError: resp.error, city: resp.isValid }));
        if (isValid) isValid = resp.isValid;

        return isValid;
    }

    const updateSeeker = async () => {
        try {
            const isValid = await checkValidation();
            if (isValid) {
                setIsLoading(true);
                if (formattedMobNo !== previousMobNo) {
                    await sendOtp();
                } else {
                    executeUpdate();
                }

            }
            setIsBtnLoading(false);
        } catch (error) {
            console.log(error);
            setErrorTitle("Oops...!!");
            setErrorMsg("Something went wrong");
            setIsBtnLoading(false);
            setIsError(true);
        }
    };

    //Send mobile OTP
    async function sendOtp(): Promise<void> {
        try {
            const resp = await axios.post(server + 'sendMobOtp', { "fName": firstName, "lName": lastName, "mobNo": formattedMobNo });
            if (resp.data !== HttpStatusCode.Ok) {
                setErrorTitle("Oops...!!");
                setErrorMsg("Something went wrong");
                setIsError(true);
                setIsLoading(false);
                setIsBtnLoading(false);
            } else {
                setIsLoading(false);
                props.navigation.reset({
                    index: 0,
                    routes: [{
                        name: 'MobOtp', params: {
                            userName: userName,
                            from: 'profile',
                            fName: firstName,
                            lName: lastName,
                            mobNum: formattedMobNo,
                            addFLine: fLine,
                            addSline: sLine,
                            street: street,
                            city: city,
                            profilePic: firebaseUrl
                        }
                    }]
                });
            }
        } catch (error) {
            console.log(error);
            setErrorTitle("Oops...!!");
            setErrorMsg("Something went wrong");
            setIsError(true);
            setIsLoading(false);
            setIsBtnLoading(false);
        }
    }

    const executeUpdate = async () => {
        try {
            const resp = await axios.put(server + `updateProfile/${userName}`, {
                "userName": userName,
                "mobNum": mobileNumber,
                "addFLine": fLine,
                "addSline": sLine,
                "street": street,
                "city": city,
                "profilePic": firebaseUrl
            });

            if (resp.data == HttpStatusCode.Ok) {
                props.navigation.navigate("MyProfile");
            } else {
                setErrorTitle("Oops...!!");
                setErrorMsg("Something went wrong");
                setIsError(true);
                setIsLoading(false);
                setIsBtnLoading(false);
            }

        } catch (error) {
            console.log(error);
            setErrorTitle("Oops...!!");
            setErrorMsg("Something went wrong");
            setIsError(true);
            setIsLoading(false);
            setIsBtnLoading(false);
        }
    };


    return (
        <SafeAreaView style={extStyles.body}>
            <View style={styles.body}>
                <View style={styles.proPicFrame}>
                    {profilePic || selectedImage ?
                        <Image source={{ uri: profilePic || selectedImage }} style={styles.profilePic} />
                        :
                        <LottieView source={require('../assets/jsons/avatar.json')} loop autoPlay style={styles.proLottie} />
                    }
                </View>
                <Feather name={'edit'} size={25} color={'#373737'} style={styles.picEditIcon} onPress={() => setIsModalOpen(true)} />
                <View style={styles.container}>
                    <View style={styles.scrollContainer}>
                        <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll}>
                            <View style={styles.inputContainer}>
                                <Text style={styles.label}>First Name</Text>
                                <View style={styles.inputFrame}>
                                    <Text style={styles.value}>{firstName}</Text>
                                </View>
                            </View>

                            <View style={styles.inputContainer}>
                                <Text style={styles.label}>Last Name</Text>
                                <View style={styles.inputFrame}>
                                    <Text style={styles.value}>{lastName}</Text>
                                </View>
                            </View>

                            <View style={styles.inputContainer}>
                                <Text style={styles.label}>Mobile Number
                                    {!validation.mobNum ?
                                        <Text style={styles.errorMsgTxt}>{' '}{validation.mobNumError}</Text>
                                        :
                                        null
                                    }
                                </Text>
                                <View style={styles.inputFrame}>
                                    <TextInput value={mobileNumber} style={styles.textInput} editable={isMobNoEditable} keyboardType={'phone-pad'} onChangeText={(value) => handleInput('mobNUm', value)} />
                                    <Feather name={'edit'} size={20} color={'#C3C3C3'} style={styles.editIcon} onPress={() => setIsMobNoEditable(true)} />
                                </View>
                            </View>

                            <View style={styles.inputContainer}>
                                <Text style={styles.label}>Birthday</Text>
                                <View style={styles.inputFrame}>
                                    <Text style={styles.value}>{birthDay}</Text>
                                </View>
                            </View>

                            <View style={styles.inputContainer}>
                                <Text style={styles.label}>NIC Number</Text>
                                <View style={styles.inputFrame}>
                                    <Text style={styles.value}>{nic}</Text>
                                </View>
                            </View>

                            <View style={styles.inputContainer}>
                                <Text style={styles.label}>Address (First Line)
                                    {!validation.fLine ?
                                        <Text style={styles.errorMsgTxt}>{' '}{validation.addressError}</Text>
                                        :
                                        null
                                    }
                                </Text>
                                <View style={styles.inputFrame}>
                                    <TextInput value={fLine} style={styles.textInput} editable={isFLineEditable} onChangeText={(value) => handleInput('fLine', value)} />
                                    <Feather name={'edit'} size={20} color={'#C3C3C3'} style={styles.editIcon} onPress={() => setIsFLineEditable(true)} />
                                </View>
                            </View>

                            <View style={styles.inputContainer}>
                                <Text style={styles.label}>Address (Second Line)
                                    {!validation.sLine ?
                                        <Text style={styles.errorMsgTxt}>{' '}{validation.addressError}</Text>
                                        :
                                        null
                                    }
                                </Text>
                                <View style={styles.inputFrame}>
                                    <TextInput value={sLine} style={styles.textInput} editable={isSLineEditable} onChangeText={(value) => handleInput('sLine', value)} />
                                    <Feather name={'edit'} size={20} color={'#C3C3C3'} style={styles.editIcon} onPress={() => setIsSLineEditable(true)} />
                                </View>
                            </View>

                            <View style={styles.inputContainer}>
                                <Text style={styles.label}>Street</Text>
                                <View style={styles.inputFrame}>
                                    <TextInput value={street} style={styles.textInput} editable={isStreetEditable} onChangeText={(value) => handleInput('street', value)} />
                                    <Feather name={'edit'} size={20} color={'#C3C3C3'} style={styles.editIcon} onPress={() => setIsStreetEditable(true)} />
                                </View>
                            </View>

                            <View style={styles.inputContainer}>
                                <Text style={styles.label}>City
                                    {!validation.city ?
                                        <Text style={styles.errorMsgTxt}>{' '}{validation.cityError}</Text>
                                        :
                                        null
                                    }
                                </Text>
                                <View style={styles.inputFrame}>
                                    <TextInput value={city} style={styles.textInput} editable={isCityEditable} onChangeText={(value) => handleInput('city', value)} />
                                    <Feather name={'edit'} size={20} color={'#C3C3C3'} style={styles.editIcon} onPress={() => setIsCityEditable(true)} />
                                </View>
                            </View>

                            <TouchableOpacity style={{ ...styles.button, ...{ backgroundColor: '#62C837', opacity: isUpdated ? 1 : .6 } }} disabled={!isUpdated} onPress={() => uploadImage()}>
                                {isBtnLoading ?
                                    <View style={styles.btnLoaderContainer}>
                                        <LottieView source={require('../assets/jsons/btn_loader.json')} loop autoPlay style={styles.btnLoader} />
                                    </View>
                                    :
                                    <Text style={{ ...styles.btnTxt, ...{ color: '#FFF' } }}>Update Profile</Text>
                                }
                            </TouchableOpacity>

                            <TouchableOpacity style={{ ...styles.button, ...{ backgroundColor: '#FE8235' } }}>
                                <Text style={{ ...styles.btnTxt, ...{ color: '#FFF' } }}>Change Password</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={{ ...styles.button, ...{ backgroundColor: '#FF4747' } }}>
                                <Text style={{ ...styles.btnTxt, ...{ color: '#FFF' } }}>Delete Account</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={{ ...styles.button, ...{ backgroundColor: '#373737' } }}>
                                <Text style={{ ...styles.btnTxt, ...{ color: '#FFF' } }}>Logout</Text>
                            </TouchableOpacity>

                        </ScrollView>
                    </View>
                </View>
            </View>
            {isError ? <ErrorPopup closeModal={() => setIsError(false)} /> : null}
            {isLoading ? <AppLoader /> : null}
            {isModalOpen ? <ImagePopUp closeModal={() => setIsModalOpen(false)} openCamera={captureDoc} openFiles={selectDoc} /> : null}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    btnLoader: {
        width: '80%',
        height: '80%',
    },

    btnLoaderContainer: {
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(255, 255, 255, .5)',
        alignItems: 'center',
        justifyContent: 'center'
    },

    errorMsgTxt: {
        fontSize: 10,
        color: "#FF4122",
        fontWeight: '600',
    },

    profilePic: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain'
    },

    btnTxt: {
        fontSize: 16,
        fontWeight: '700'
    },

    button: {
        width: '90%',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginVertical: 10,
        borderRadius: 15,
        elevation: 2
    },

    textInput: {
        fontSize: 16,
        fontWeight: '500',
        color: '#373737',
        paddingVertical: 0
    },

    editIcon: {
        position: 'absolute',
        right: 10
    },

    value: {
        fontSize: 16,
        fontWeight: '500',
        color: '#373737'
    },

    inputFrame: {
        width: '100%',
        borderBottomColor: '#FE8235',
        borderBottomWidth: 1,
        paddingVertical: 5,
    },

    label: {
        fontSize: 12,
        color: "#C3C3C3"
    },

    inputContainer: {
        paddingVertical: 5
    },

    scroll: {
        width: '100%',
        paddingHorizontal: 10
    },

    scrollContainer: {
        width: '100%',
        height: '100%',
        paddingVertical: 10
    },

    picEditIcon: {
        position: 'absolute',
        zIndex: 3,
        top: 185,
        right: 130
    },

    proLottie: {
        width: '120%',
        height: '120%',
    },

    proPicFrame: {
        overflow: 'hidden',
        width: 200,
        height: 200,
        position: 'absolute',
        backgroundColor: '#FFF',
        zIndex: 2,
        borderWidth: 5,
        top: 20,
        borderColor: '#FE8235',
        borderRadius: 100,
        elevation: 10,
        alignItems: 'center'
    },

    container: {
        width: '90%',
        backgroundColor: '#FFF',
        borderRadius: 20,
        elevation: 5,
        position: 'absolute',
        zIndex: 1,
        bottom: 20,
        top: 110,
        paddingTop: 120
    },

    body: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F2994A'
    },

});

export default MyProfile;