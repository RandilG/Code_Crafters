import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import extStyles from "../global/styles/extStyles";
import { View } from "react-native-animatable";
import { Alert, Keyboard, Platform, StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";
import LottieView from "lottie-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CodeField, Cursor, useClearByFocusCell } from "react-native-confirmation-code-field";
import AppLoader from "../components/AppLoader";
import { setErrorMsg, setErrorTitle } from "../global/variable";
import ErrorPopup from "../components/errorPopUp";
import axios, { HttpStatusCode } from "axios";
import { server } from "../service/constant";
import Modal from 'react-native-modal';

const EmailOtp = (props: any) => {

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isBtnLoading, setIsBtnLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);

    const [email, setEmail] = useState<any>();
    const [seekerFName, setSeekerFName] = useState<any>();
    const [seekerLName, setSeekerLName] = useState<any>();


    useEffect(() => {
        setIsError(false);
        setIsLoading(true);
        setIsBtnLoading(false);

        async function getData() {
            
            setEmail(await AsyncStorage.getItem('email'));
            setIsLoading(false);
        }

        getData();
    }, [])

    const [value, setValue] = useState<string>('');
    const [Props, getCellOnLayoutHandler] = useClearByFocusCell({ value, setValue });

    useEffect(() => {
        if (value.length === 4) {
            setIsBtnLoading(true);
            verifyOtp();
        }
    }, [value])

    async function verifyOtp() {
        try {
            Keyboard.dismiss();
            const resp = await axios.get(server + `verifyOtp/${email}/${value}`);
            if (resp.data === HttpStatusCode.Accepted) {
                props.navigation.reset({
                    index: 0,
                    routes: [{ name: 'NicUpload' }]
                });
            } else if (resp.data === HttpStatusCode.NotAcceptable) {
                setErrorTitle("Oops...!!");
                setErrorMsg("Invalid OTP");
                setIsFirstAttemptFail(true);
                setIsError(true);
                setIsBtnLoading(false);
            } else if (resp.data === HttpStatusCode.NotFound) {
                setErrorTitle("Oops...!!");
                setErrorMsg("OTP expired. Please resend");
                setIsFirstAttemptFail(true);
                setIsError(true);
                setIsBtnLoading(false);
            } else {
                setErrorTitle("Oops...!!");
                setErrorMsg("Something went wrong");
                setIsError(true);
                setIsBtnLoading(false);
            }
        } catch (error) {
            console.log(error);
            setErrorTitle("Oops...!!");
            setErrorMsg("Something went wrong");
            setIsError(true);
            setIsBtnLoading(false);
        }
    }

    async function sendMailOtp() {
        try {
            setIsLoading(true);
            const resp = await axios.post(server + 'sendMailOtp', { "fName": seekerFName, "lName": seekerLName, "email": email });
            if (resp.data !== HttpStatusCode.Ok) {
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

    const [isFirstAttemptFail, setIsFirstAttemptFail] = useState<boolean>(false);
    const [newEmail, setNewEmail] = useState<string>();
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isNewMobErr, setIsNewMobErr] = useState<boolean>(false);
    const [newMobErr, setNewMobErr] = useState<string>();
    const [isModalBtnLoading, setIsModalBtnLoading] = useState<boolean>(false);

    return (
        <SafeAreaView style={extStyles.body}>
            <View style={styles.mainContainer}>
                <View style={styles.topContainer}>
                    <LottieView source={require('../assets/jsons/otp2.json')} loop autoPlay style={styles.animation} />
                </View>
                <View style={styles.bottomContainer}>
                    <View style={styles.headingContainer}>
                        <Text style={styles.headingTxt}>OTP Verification</Text>
                        <Text style={styles.subHeadingTxt}>Email</Text>
                    </View>
                    <View style={styles.greetingContainer}>
                        <Text style={styles.greetingTxt}>You are almost done,</Text>
                    </View>
                    <View style={styles.messageContainer}>
                        <Text style={styles.messageTxt}>
                            Please enter the verification code{'\n'}sent to your email address,
                        </Text>
                        <Text style={styles.mobileNoTxt}>
                            {email}
                        </Text>
                    </View>
                    <View style={styles.elementContainer}>
                        <CodeField
                            {...props}
                            value={value}
                            onChangeText={setValue}
                            cellCount={4}
                            rootStyle={styles.codeFieldRoot}
                            keyboardType="number-pad"
                            textContentType="oneTimeCode"
                            autoComplete={Platform.select({ android: 'sms-otp', default: 'one-time-code' })}
                            renderCell={({ index, symbol, isFocused }) => (
                                <Text
                                    key={index}
                                    style={[styles.cell, isFocused && styles.focusCell]}
                                    onLayout={getCellOnLayoutHandler(index)}>
                                    {symbol || (isFocused ? <Cursor /> : null)}
                                </Text>
                            )}
                        />
                    </View>
                    <View style={styles.resendMsgContainer}>
                        <Text style={styles.resendMsgTxt}>OTP not received? <Text style={styles.resendTxt} onPress={() => sendMailOtp}>RESEND</Text></Text>
                        {isFirstAttemptFail ? <Text style={styles.resendMsgTxt}>OR{'\n'}<Text style={styles.resendTxt} onPress={() => setIsModalOpen(true)}>CHANGE</Text> Mobile Number</Text> : null }
                    </View>
                    <View style={styles.btnContainer}>
                        <TouchableOpacity style={styles.btn} onPress={() => verifyOtp()} disabled={isBtnLoading}>
                            {isBtnLoading ?
                                <View style={styles.btnLoaderContainer}>
                                    <LottieView source={require('../assets/jsons/btn_loader.json')} loop autoPlay style={styles.btnLoader} />
                                </View>
                                :
                                <Text style={styles.btnTxt}>Next</Text>
                            }
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            {isLoading ? <AppLoader /> : null}
            {isError ? <ErrorPopup closeModal={() => setIsError(false)} /> : null}
            <Modal style={styles.modal} isVisible={isModalOpen} backdropOpacity={0.4} animationIn={"zoomIn"} onBackdropPress={isModalBtnLoading ? undefined : () => setIsModalOpen(false)}>
                <View style={styles.changeMobContainer}>
                    <View style={styles.changeMobTitleContainer}>
                        <Text style={styles.changeMobTitle}>Change Your Entered Email Address</Text>
                    </View>
                    <View style={styles.mobElementContainer}>
                        <View style={{ ...styles.element, ...{ borderBottomColor: isNewMobErr ? "#F2994A" : "#FF4122" } }}>
                            <TextInput value={newEmail ? newEmail : email} keyboardType={"email-address"} style={styles.mobTxtInput} maxLength={100} onChangeText={setNewEmail}/>
                        </View>
                        {!isNewMobErr ? <Text style={styles.errorMsgTxt}>{newMobErr}</Text> : null}
                    </View>
                    <View style={{ ...styles.btnContainer, ...{ height: '50%' } }}>
                        <TouchableOpacity style={{ ...styles.btn, ...{ width: 200, height: 45 } }} onPress={() => Alert.alert("TODO")} disabled={isModalBtnLoading}>
                            {isModalBtnLoading ?
                                <View style={styles.btnLoaderContainer}>
                                    <LottieView source={require('../assets/jsons/btn_loader.json')} loop autoPlay style={styles.btnLoader} />
                                </View>
                                :
                                <Text style={styles.btnTxt}>Send Again</Text>
                            }
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    errorMsgTxt: {
        fontSize: 10,
        color: "#FF4122",
        fontWeight: '600'
    },

    mobTxtInput: {
        fontSize: 15,
        color: '#373737',
        width: '100%',
        textAlign: 'center'
    },

    element: {
        width: '90%',
        height: 50,
        borderColor: '#F2994A',
        borderBottomWidth: 2,
        alignItems: 'center'
    },

    mobElementContainer: {
        paddingVertical: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },

    changeMobTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#FE8235',
        textAlign: 'center'
    },

    changeMobTitleContainer: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },

    changeMobContainer: {
        width: 300,
        height: 300,
        backgroundColor: '#FFF',
        alignSelf: 'center',
        borderRadius: 15,
        padding: 10
    },

    modal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
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
        height: '20%',
        justifyContent: 'center',
        alignItems: 'center'
    },

    resendTxt: {
        fontWeight: '700',
        color: '#F2994A'
    },

    resendMsgTxt: {
        fontWeight: '400',
        color: '#908883',
        textAlign: 'center'
    },

    resendMsgContainer: {
        width: '100%',
        height: '10%',
        justifyContent: 'center',
        alignItems: 'center'
    },

    codeFieldRoot: {
        width: '100%',
        paddingHorizontal: 30
    },

    cell: {
        width: 40,
        height: 40,
        lineHeight: 38,
        fontSize: 35,
        borderBottomWidth: 2,
        borderColor: '#373737',
        textAlign: 'center',
        color: "#FE8235",
        fontWeight: '700'
    },
    focusCell: {
        borderColor: '#FE8235',
        borderBottomWidth: 2

    },

    elementContainer: {
        width: '100%',
        height: '20%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 30
    },

    mobileNoTxt: {
        fontWeight: '700',
        color: '#908883',
        textAlign: 'center',
        marginTop: 10,
        fontSize: 15
    },

    messageTxt: {
        fontWeight: '400',
        color: '#908883',
        textAlign: 'center',
        marginHorizontal: 30,
        fontSize: 15
    },

    messageContainer: {
        width: '100%',
        height: '15%',
        alignItems: 'center',
        justifyContent: 'center',
    },

    greetingTxt: {
        fontSize: 20,
        fontWeight: '300',
        color: '#373737'
    },

    greetingContainer: {
        height: '10%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },

    subHeadingTxt: {
        fontSize: 25,
        fontWeight: '400',
        color: '#373737'
    },

    headingTxt: {
        fontSize: 30,
        fontWeight: '500',
        color: '#F2994A'
    },

    headingContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 20
    },

    animation: {
        width: '90%',
        height: '90%'
    },

    bottomContainer: {
        flex: 4,
        paddingHorizontal: 10
    },

    topContainer: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F2994A',
        elevation: 5,
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50
    },

    mainContainer: {
        flex: 1
    }
});

export default EmailOtp;