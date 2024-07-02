import React, { useEffect, useState } from "react";
import { BackHandler, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import extStyles from "../global/styles/extStyles";
import LottieView from "lottie-react-native";
import Entypo from "react-native-vector-icons/Entypo";
import { passwordStrength } from "check-password-strength";
import SeekerVali from "../validations/seekerVali";
import { setErrorMsg, setErrorTitle } from "../global/variable";
import ErrorPopup from "../components/ErrorPopUp";
import AppLoader from "../components/AppLoader";
import EncryptedStorage from "react-native-encrypted-storage";
import axios, { HttpStatusCode } from "axios";
import { server } from "../service/constant";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ChangePassword = (props: any) => {
    //Handle back event
    useEffect(() => {
        const backAction = () => {
            props.navigation.reset({
                index: 0,
                routes: [{
                    name: 'MyProfile',
                }]
            })
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction
        );

        return () => backHandler.remove();
    }, []);

    const [isError, setIsError] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [password, setPassword] = useState<string>("");
    const [newPassword, setNewPassword] = useState<string>("");
    const [conPassword, setConPassword] = useState<string>("");

    const [validation, setValidation] = useState<any>({
        passwordError: "",
        password: true,

        newPasswordError: "",
        newPassword: true,

        conPasswordError: "",
        conPassword: true,
    });

    const [isCurPwVisible, setIsCurPwVisible] = useState<boolean>(false);
    const [isNewPwVisible, setIsNewPwVisible] = useState<boolean>(false);
    const [isConPwVisible, setIsConPwVisible] = useState<boolean>(false);

    //Handle password strength
    const [pwStrength, setPwStrength] = useState<number>(0);
    const checkPasswordStrength = (password: any) => {
        setPwStrength(passwordStrength(password).id);
        // Too Week -> 0, Weak -> 1, Medium -> 2, Strong -> 3
    }

    const checkValidation = async (): Promise<boolean> => {
        const seekerVali = new SeekerVali();
        let resp: SignupErr;
        let isValid: boolean = true;

        if (password === "") {
            setValidation((prev: any) => ({ ...prev, passwordError: "Current password cannot be empty", password: false }));
            if (isValid) isValid = false;
        }

        resp = await seekerVali.checkPasswordValidity(newPassword, pwStrength);
        setValidation((prev: any) => ({ ...prev, newPasswordError: resp.error, newPassword: resp.isValid }));
        if (isValid) isValid = resp.isValid;

        resp = await seekerVali.checkConPassword(conPassword);
        setValidation((prev: any) => ({ ...prev, conPasswordError: resp.error, conPassword: resp.isValid }));
        if (isValid) isValid = resp.isValid;

        if (newPassword != "" && conPassword != "") {
            resp = await seekerVali.isPasswordMatch(newPassword, conPassword);
            setValidation((prev: any) => ({ ...prev, passwordError: resp.error, password: resp.isValid, conPassword: resp.isValid }));
            if (isValid) isValid = resp.isValid;
        }

        return isValid;
    }

    const handleChange = async () => {
        try {
            const isValid = await checkValidation();
            if (!isValid) return;

            const session = await EncryptedStorage.getItem('session');
            let uName: string = '';
            if (session) uName = JSON.parse(session).userName;

            const resp = await axios.put(server + `changePassword/${uName}`, {
                currentPassword: password,
                newPassword: newPassword
            });

            if (resp.data === HttpStatusCode.Ok) {
                //Navigate to login screen
                await EncryptedStorage.clear();
                await AsyncStorage.clear();
                props.navigation.reset({
                    index: 0,
                    routes: [{ name: 'Login' }]
                });
            } else if (resp.data === HttpStatusCode.NotAcceptable) {
                setErrorTitle("Oops...!!");
                setErrorMsg("Current password is invalid");
                setIsError(true);
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
    }


    return (
        <SafeAreaView style={extStyles.body}>
            <View style={styles.body}>
                <View style={styles.container}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>Change Password</Text>
                    </View>
                    <View style={styles.lottieContainer}>
                        <LottieView source={require('../assets/jsons/password.json')} autoPlay loop style={styles.lottie} />
                    </View>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        {/* Current password component */}
                        <View style={styles.elementContainer}>
                            <Text style={styles.labelTxt}>Current Password{' '}
                                <Text style={styles.requiredMark}>*{' '}</Text>
                                <Text style={styles.errorMsgTxt}>{validation.passwordError}</Text>
                            </Text>
                            <View style={{ ...styles.element, ...{ flexDirection: 'row', height: 50, borderBottomColor: validation.password ? "#F2994A" : "#FF4122" } }}>
                                <View style={{ width: '90%', height: '100%', justifyContent: 'center' }}>
                                    <TextInput style={styles.input} keyboardType={"default"} onChangeText={(value: any) => { setPassword(value) }} secureTextEntry={!isCurPwVisible} />
                                </View>
                                <View style={{ width: '10%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                                    <Entypo name={isCurPwVisible ? "eye" : "eye-with-line"} size={20} color={"rgba(242, 153, 74, 0.6)"} onPress={() => setIsCurPwVisible(!isCurPwVisible)} />
                                </View>
                            </View>
                        </View>

                        {/* New password component */}
                        <View style={styles.elementContainer}>
                            <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center' }}>
                                <View style={{}}>
                                    <Text style={styles.labelTxt}>New Password{' '}
                                        <Text style={styles.requiredMark}>*{' '}</Text>
                                        {!validation.newPassword ? <Text style={styles.errorMsgTxt}>{validation.newPasswordError}</Text> : null}
                                    </Text>

                                </View>
                                {newPassword !== "" && validation.password ?
                                    <View style={{ marginLeft: 20, alignItems: 'flex-end' }}>
                                        <View style={{ width: 160, height: 5 }}>
                                            {pwStrength == 0 ?
                                                <View style={{ width: 30, height: 5, backgroundColor: '#FF4122' }} /> //Too weak
                                                : pwStrength == 1 ?
                                                    <View style={{ width: 60, height: 5, backgroundColor: '#E88504' }} /> //Weak
                                                    : pwStrength == 2 ?
                                                        < View style={{ width: 90, height: 5, backgroundColor: '#E5DE00' }} /> //Medium
                                                        : pwStrength == 3 ?
                                                            <View style={{ width: 120, height: 5, backgroundColor: '#00C04B' }} /> //Strong
                                                            : null
                                            }
                                        </View>
                                    </View>
                                    : null}
                            </View>
                            <View style={{ ...styles.element, ...{ flexDirection: 'row', height: 50, borderBottomColor: validation.newPassword ? "#F2994A" : "#FF4122" } }}>
                                <View style={{ width: '90%', height: '100%', justifyContent: 'center' }}>
                                    <TextInput style={styles.input} keyboardType={"default"} onChangeText={(value: any) => { setNewPassword(value), checkPasswordStrength(value) }} secureTextEntry={!isNewPwVisible} />
                                </View>
                                <View style={{ width: '10%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                                    <Entypo name={isNewPwVisible ? "eye" : "eye-with-line"} size={20} color={"rgba(242, 153, 74, 0.6)"} onPress={() => setIsNewPwVisible(!isNewPwVisible)} />
                                </View>
                            </View>
                        </View>

                        {/* New confirm password component */}
                        <View style={styles.elementContainer}>
                            <Text style={styles.labelTxt}>Confirm New Password{' '}
                                <Text style={styles.requiredMark}>*{' '}</Text>
                                <Text style={styles.errorMsgTxt}>{validation.conPasswordError}</Text>
                            </Text>
                            <View style={{ ...styles.element, ...{ flexDirection: 'row', height: 50, borderBottomColor: validation.conPassword ? "#F2994A" : "#FF4122" } }}>
                                <View style={{ width: '90%', height: '100%', justifyContent: 'center' }}>
                                    <TextInput style={styles.input} keyboardType={"default"} onChangeText={(value: any) => setConPassword(value)} secureTextEntry={!isConPwVisible} />
                                </View>
                                <View style={{ width: '10%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                                    <Entypo name={isConPwVisible ? "eye" : "eye-with-line"} size={20} color={"rgba(242, 153, 74, 0.6)"} onPress={() => setIsConPwVisible(!isConPwVisible)} />
                                </View>
                            </View>
                        </View>

                        <View style={styles.btnContainer}>
                            <TouchableOpacity style={styles.btn} onPress={() => handleChange()}>
                                <Text style={styles.btnTxt}>Change</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>
            </View>
            {isError ? <ErrorPopup closeModal={() => setIsError(false)} /> : null}
            {isLoading ? <AppLoader /> : null}
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    btnTxt: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: '600'
    },

    btn: {
        width: '60%',
        height: 50,
        backgroundColor: '#FE8235',
        borderRadius: 15,
        elevation: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },

    btnContainer: {
        width: '100%',
        height: 150,
        justifyContent: 'center',
        alignItems: 'center'
    },

    errorMsgTxt: {
        fontSize: 10,
        color: "#FF4122",
        fontWeight: '600'
    },

    requiredMark: {
        color: "#FF4122",
        fontWeight: '800'
    },

    input: {
        fontSize: 14,
        color: '#373737'
    },

    inputContainer: {
        width: '100%',
        height: '100%',
    },

    element: {
        width: '100%',
        borderBottomWidth: 1,
        borderBottomColor: '#F2994A',
        flexDirection: 'row'
    },

    labelTxt: {
        fontSize: 14,
        color: '#373737',
        fontWeight: '300'
    },

    elementContainer: {
        marginTop: 30,
        width: '100%'
    },

    lottie: {
        width: '100%',
        height: '100%'
    },

    lottieContainer: {
        width: '100%',
        height: 150,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    },

    title: {
        fontSize: 25,
        color: '#FE8235',
        fontWeight: '600'
    },

    titleContainer: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },

    container: {
        width: '90%',
        backgroundColor: '#FFF',
        borderRadius: 20,
        elevation: 5,
        position: 'absolute',
        zIndex: 1,
        bottom: 50,
        top: 50,
        padding: 10
    },

    body: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F2994A'
    },
});

export default ChangePassword;