import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import extStyles from "../global/styles/extStyles";
import { Alert, Image, Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Entypo from 'react-native-vector-icons/Entypo';
import ErrorPopup from "../components/ErrorPopUp";
import { setErrorMsg, setErrorTitle } from "../global/variable";
import LottieView from "lottie-react-native";
import axios, { HttpStatusCode } from "axios";
import { server } from "../service/constant";
import EncryptedStorage from "react-native-encrypted-storage";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = (props: any) => {
    const [isError, setIsError] = useState<boolean>(false);
    const [isBtnLoading, setIsBtnLoading] = useState<boolean>(false);
    const [isValid, setIsValid] = useState<boolean>(true);
    const [error, setError] = useState<string>();

    const [isPWVisible, setIsPWVisible] = useState<boolean>(false);
    const [userName, setUserName] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    //Check username and password validation (check only empty or not)
    function validation(): boolean {
        setIsValid(true);
        if (userName === "" || password === "") {
            setError("Please enter Username and Password");
            setIsValid(false);
            return false;
        }
        return true;
    }

    //Handle login process
    async function handleLogin() {
        try {
            Keyboard.dismiss();
            setIsBtnLoading(true);
            if (validation()) {
                const resp = await axios.get(server + `signin/${userName}/${encodeURIComponent(password)}`);
                if (resp.data === HttpStatusCode.Unauthorized) {
                    //Account on PENDING
                    setErrorTitle("Oops...!!");
                    setErrorMsg("This user account is not yet activated");
                    setIsBtnLoading(false);
                    setIsError(true);
                } else if (resp.data === HttpStatusCode.Forbidden) {
                    //Account on DECLINED
                    setErrorTitle("Oops...!!");
                    setErrorMsg("Your account has been declined");
                    setIsBtnLoading(false);
                    setIsError(true);
                } else if (resp.data === HttpStatusCode.NotFound) {
                    //Seeker not registered
                    setErrorTitle("Oops...!!");
                    setErrorMsg("This user name is not registered");
                    setIsBtnLoading(false);
                    setIsError(true);
                } else if (resp.data === HttpStatusCode.NotAcceptable) {
                    //Password mismatched
                    setErrorTitle("Oops...!!");
                    setErrorMsg("Incorrect user name or password");
                    setIsBtnLoading(false);
                    setIsError(true);
                } else if (resp.data.token) {
                    //User name password matched and store retrieved token in the encrypted local storage
                    const token = resp.data.token;
                    await EncryptedStorage.setItem("session", JSON.stringify({ userName: userName, token: token }));
                    getSeekerData(userName);
                } else {
                    setErrorTitle("Oops...!!");
                    setErrorMsg("Something went wrong");
                    setIsBtnLoading(false);
                    setIsError(true);
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
    }
    
    //Get seeker name and earning coins
    async function getSeekerData(userName: string) {
        try {
            const resp = await axios.get(server + `getGender/${userName}`);
            if (resp.data !== HttpStatusCode.InternalServerError && resp.data !== HttpStatusCode.NotFound) {
                await EncryptedStorage.setItem('gender', resp.data.gender);
                //Navigate to the dashboard
                props.navigation.reset({
                    index: 0,
                    routes: [{ name: "Dashboard" }]
                })
            } else {
                setErrorTitle("Oops...!!");
                setErrorMsg("Something went wrong");
                setIsBtnLoading(false);
                setIsError(true);
            }
        } catch (error) {
            console.log(error);
            setErrorTitle("Oops...!!");
            setErrorMsg("Something went wrong");
            setIsBtnLoading(false);
            setIsError(true);
        }
    }

    return (
        <SafeAreaView style={extStyles.body}>
            <View style={styles.mainContainer}>
                <View style={styles.topContainer}>
                    <Image source={require('./../assets/images/worker.png')} style={styles.workerImage} />
                </View>
                <View style={styles.imageCover}>
                    <Image source={require('./../assets/images/logo_white_3-01.png')} style={styles.logo} />
                </View>
                <View style={styles.bottomContainer}>
                    <View style={styles.headerContainer}>
                        <Text style={styles.headerTxt}>
                            Login
                        </Text>
                        <Text style={styles.greetingTxt}>
                            Hello, Welcome to the Jobs
                        </Text>
                    </View>
                    <View style={styles.elementContainer}>
                        <Text style={styles.labelTxt}>User name</Text>
                        <View style={styles.element}>
                            <View style={styles.iconContainer}>
                                <Entypo name="user" size={25} color={"#F2994A"} />
                            </View>
                            <View style={styles.inputContainer}>
                                <TextInput value={userName} onChangeText={setUserName} style={styles.input} keyboardType={"email-address"} />
                            </View>
                        </View>
                    </View>
                    <View style={styles.elementContainer}>
                        <Text style={styles.labelTxt}>Password</Text>
                        <View style={styles.element}>
                            <View style={styles.iconContainer}>
                                <Entypo name="key" size={25} color={"#F2994A"} />
                            </View>
                            <View style={{ ...styles.inputContainer, ...{ width: '80%' } }}>
                                <TextInput value={password} onChangeText={setPassword} style={styles.input} keyboardType={"default"} secureTextEntry={!isPWVisible} />
                            </View>
                            <View style={styles.iconContainer}>
                                <Entypo name={isPWVisible ? "eye" : "eye-with-line"} size={20} color={"rgba(242, 153, 74, 0.6)"} onPress={() => setIsPWVisible(!isPWVisible)} />
                            </View>
                        </View>
                    </View>
                    <View style={styles.fogPWContainer}>
                        <Text style={styles.fogPWTxt} onPress={() => Alert.alert("To be implement")}>Forgot password?</Text>
                    </View>
                    <View style={styles.btnContainer}>
                        {!isValid ?
                            <View style={styles.errContainer}>
                                <Text style={styles.errTxt}>{error}</Text>
                            </View>
                            :
                            null
                        }
                        <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={isBtnLoading}>
                            {isBtnLoading ?
                                <View style={styles.btnLoaderContainer}>
                                    <LottieView source={require('../assets/jsons/btn_loader.json')} loop autoPlay style={styles.btnLoader} />
                                </View>
                                :
                                <Text style={styles.btnTxt}>Login</Text>
                            }

                        </TouchableOpacity>
                    </View>
                    <View style={styles.signupConatiner}>
                        <Text style={styles.signUpTxt}>Don't have an account?<Text style={{ fontWeight: '600', color: '#F2994A' }} onPress={() => props.navigation.navigate("Tnc")}> Sign Up</Text></Text>
                    </View>
                </View>
            </View>
            {isError ? <ErrorPopup closeModal={() => setIsError(false)} /> : false}
        </SafeAreaView>
    )
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
        justifyContent: 'center',
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

    signUpTxt: {
        color: '#373737',
        fontWeight: '300',
        fontSize: 15
    },

    signupConatiner: {
        width: '100%',
        height: '25%',
        justifyContent: 'center',
        alignItems: 'center',
    },

    btnTxt: {
        fontSize: 25,
        color: '#FFF',
        fontWeight: '600'
    },

    button: {
        width: '70%',
        backgroundColor: '#F2994A',
        height: 55,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        marginTop: 5
    },

    btnContainer: {
        width: '100%',
        alignItems: 'center',
        marginTop: 30
    },

    fogPWTxt: {
        fontSize: 12,
        color: '#373737',
        fontWeight: '400'
    },

    fogPWContainer: {
        width: '100%',
        alignItems: 'flex-end',
        marginTop: 15
    },

    input: {
        fontSize: 18
    },

    inputContainer: {
        width: '90%',
        height: '100%',
    },

    iconContainer: {
        width: '10%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },

    element: {
        width: '100%',
        height: 50,
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

    greetingTxt: {
        fontSize: 18,
        color: '#373737',
        fontWeight: '300'
    },

    headerTxt: {
        fontSize: 35,
        fontWeight: '900',
        color: '#F2994A'
    },

    headerContainer: {
        width: '100%',
        marginTop: 10
    },

    logo: {
        width: '40%',
        height: '40%',
        resizeMode: 'center',
        marginTop: 60
    },

    imageCover: {
        backgroundColor: 'rgba(242, 153, 74, 0.8)',
        height: '50%',
        width: '100%',
        position: 'absolute',
        top: 0,
        zIndex: 3,
        alignItems: 'center'
    },

    workerImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover'
    },

    topContainer: {
        height: '50%',
        width: '100%',
        position: 'absolute',
        top: 0,
        zIndex: 1,
        backgroundColor: '#F00'
    },

    bottomContainer: {
        backgroundColor: '#FFF',
        width: '100%',
        height: '65%',
        position: 'absolute',
        bottom: 0,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        elevation: 20,
        zIndex: 3,
        padding: 15
    },

    mainContainer: {
        flex: 1,
        backgroundColor: '#F2994A'
    }
})

export default Login;