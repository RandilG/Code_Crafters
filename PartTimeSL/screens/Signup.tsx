import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import extStyles from "../global/styles/extStyles";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import DatePicker from "react-native-date-picker";
import Entypo from "react-native-vector-icons/Entypo";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import Fontisto from "react-native-vector-icons/Fontisto";
import moment from "moment";
import seekerData from "../interfaces/seekerData";
import { passwordStrength } from "check-password-strength";
import SeekerVali from "../validations/seekerVali";
import seekerValidation from "../interfaces/seekerValidation";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LottieView from "lottie-react-native";
import AppLoader from "../components/AppLoader";
import ErrorPopup from "../components/ErrorPopUp";
import axios, { HttpStatusCode } from "axios";
import { server } from "../service/constant";
import { setErrorMsg, setErrorTitle } from "../global/variable";

const Signup = (props: any) => {
    //Handle loading lottie on button
    const [isBtnLoading, setIsBtnLoading] = useState<boolean>(false);

    //Handle error popup
    const [isError, setIsError] = useState<boolean>(false);

    //Handle loading component
    const [isLoading, setIsLoading] = useState<boolean>(false);

    //Handle date picker visibility
    const [dateOpen, setDateOpen] = useState<boolean>(false);

    //Handle placeholder of DOB field
    const [isDobSelected, setIsDobSeleted] = useState<boolean>(false);

    //Store form inputs(Seeker data)
    const [seekerData, setSeekerData] = useState<seekerData>({
        firstName: "",
        lastName: "",
        email: "",
        mobNo: "",
        addFLine: "",
        addSLine: "",
        street: "",
        city: "",
        dob: new Date(moment().subtract(16, 'years').format('YYYY-MM-DD')),
        nic: "",
        gender: "",
        password: "",
        conPassword: ""
    });


    //Handle passwords' visibility
    const [isPwVisible, setIsPwVisible] = useState<boolean>(false);
    const [isConPwVisible, setIsConPwVisible] = useState<boolean>(false);

    //Handle password strength
    const [pwStrength, setPwStrength] = useState<number>(0);
    const checkPasswordStrength = (password: any) => {
        setPwStrength(passwordStrength(password).id);
        // Too Week -> 0, Weak -> 1, Medium -> 2, Strong -> 3
    }

    //Store formatted mobile number
    let formattedMobNo: string;

    //Handle errors of each element
    const [validation, setValidation] = useState<seekerValidation>({
        firstNameError: "",
        firstName: true,

        emailError: "",
        email: true,

        mobNoError: "",
        mobNo: true,

        addressError: "",
        addFLine: true,
        addSLine: true,

        cityError: "",
        city: true,

        dobError: "",
        dob: true,

        nicError: "",
        nic: true,

        genderError: "",
        gender: true,

        passwordError: "",
        password: true,

        conPasswordError: "",
        conPassword: true,
    });

    //Check entered email already registered one or not
    const emailAvailability = async (email: string): Promise<void> => {
        const seekerVali = new SeekerVali();
        let resp: SignupErr;

        resp = await seekerVali.emailAvailablity(email);
        setValidation((prev) => ({ ...prev, emailError: resp.error, email: resp.isValid }));
    }

    //Validation of required data
    const checkValidation = async (): Promise<boolean> => {
        const seekerVali = new SeekerVali();
        let resp: SignupErr;
        let isValid: boolean = true;

        resp = await seekerVali.emailValidity(seekerData.email);
        setValidation((prev) => ({ ...prev, emailError: resp.error, email: resp.isValid }));
        if (isValid) isValid = resp.isValid;

        resp = await seekerVali.firstName(seekerData.firstName);
        setValidation((prev) => ({ ...prev, firstNameError: resp.error, firstName: resp.isValid }));
        if (isValid) isValid = resp.isValid;

        //Acceptable mobile number formats --> (0771234567, 94771234567, +94771234567)
        resp = await seekerVali.mobileNo(seekerData.mobNo);
        setValidation((prev) => ({ ...prev, mobNoError: resp.error, mobNo: resp.isValid }));
        formattedMobNo = resp.content;
        if (isValid) isValid = resp.isValid;

        resp = await seekerVali.checkAddFLineValidity(seekerData.addFLine);
        setValidation((prev) => ({ ...prev, addressError: resp.error, addFLine: resp.isValid }));
        if (isValid) isValid = resp.isValid;

        if (seekerData.addFLine != "") {
            resp = await seekerVali.checkAddSLineValidity(seekerData.addSLine);
            setValidation((prev) => ({ ...prev, addressError: resp.error, addSLine: resp.isValid }));
            if (isValid) isValid = resp.isValid;
        }

        resp = await seekerVali.checkCityValidty(seekerData.city);
        setValidation((prev) => ({ ...prev, cityError: resp.error, city: resp.isValid }));
        if (isValid) isValid = resp.isValid;

        if (!isDobSelected) {
            setValidation((prev) => ({ ...prev, dobError: "Date of birth cannot be empty", dob: false }));
            if (isValid) isValid = resp.isValid;
        }

        resp = await seekerVali.checkNicValidity(seekerData.nic);
        setValidation((prev) => ({ ...prev, nicError: resp.error, nic: resp.isValid }));
        if (isValid) isValid = resp.isValid;

        resp = await seekerVali.checkGenderValidity(seekerData.gender);
        setValidation((prev) => ({ ...prev, genderError: resp.error, gender: resp.isValid }));
        if (isValid) isValid = resp.isValid;

        resp = await seekerVali.checkPasswordValidity(seekerData.password, pwStrength);
        setValidation((prev) => ({ ...prev, passwordError: resp.error, password: resp.isValid }));
        if (isValid) isValid = resp.isValid;

        resp = await seekerVali.checkConPassword(seekerData.conPassword);
        setValidation((prev) => ({ ...prev, conPasswordError: resp.error, conPassword: resp.isValid }));
        if (isValid) isValid = resp.isValid;

        if (seekerData.password != "" && seekerData.conPassword != "") {
            resp = await seekerVali.isPasswordMatch(seekerData.password, seekerData.conPassword);
            setValidation((prev) => ({ ...prev, passwordError: resp.error, password: resp.isValid, conPassword: resp.isValid }));
            if (isValid) isValid = resp.isValid;
        }

        return isValid;
    }

    //Handle form inputs
    const handleInput = async (attr: string, value: any) => {
        setSeekerData((prev: any) => ({ ...prev, [attr]: value }));
        setValidation((prev) => ({ ...prev, [attr]: true }));
    }

    //Submit form data
    const handleSubmit = async () => {
        setIsBtnLoading(true);
        let isValid = await checkValidation();
        if (isValid) {
            //Store data in local storage while mobile number and email verify
            AsyncStorage.multiSet([['firstName', seekerData.firstName], ['lastName', seekerData.lastName], ['email', seekerData.email], ['mobNo', formattedMobNo], ['addFLine', seekerData.addFLine], ['addSLine', seekerData.addSLine], ['street', seekerData.street], ['city', seekerData.city], ['dob', seekerData.dob.toString()], ['nic', seekerData.nic], ['gender', seekerData.gender], ['password', seekerData.password]]);
            setIsLoading(true);
            await sendOtp();
        }
        setIsBtnLoading(false);
    }

    //Send mobile OTP
    async function sendOtp(): Promise<void> {
        try {
            const resp = await axios.post(server + 'sendMobOtp', { "fName": seekerData.firstName, "lName": seekerData.lastName, "mobNo": formattedMobNo });
            if (resp.data !== HttpStatusCode.Ok) {
                setErrorTitle("Oops...!!");
                setErrorMsg("Something went wrong");
                setIsError(true);
                setIsLoading(false);
                setIsBtnLoading(false);
            } else {
                props.navigation.reset({
                    index: 0,
                    routes: [{ name: 'MobOtp', params: {from: 'signup'} }]
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

    return (
        <SafeAreaView style={extStyles.body}>
            <View style={styles.mainContainer}>
                <View style={styles.headerContainer}>
                    <View style={styles.backBtnContainer}>
                        <AntDesign name="left" size={30} color={"#FFF"} onPress={() => props.navigation.goBack()} />
                    </View>
                    <View style={styles.titleContainer}>
                        <Text style={styles.titleTxt}>
                            Register
                        </Text>
                        <Text style={styles.subHeadingTxt}>
                            Register as a Job Seeker
                        </Text>
                    </View>
                </View>
                <View style={styles.bottomConatiner} />
                <View style={styles.scrollContainer}>
                    <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                        <View style={styles.formHeaderContainer}>
                            <Text style={styles.formTitle}>Let's Get Started</Text>
                            <Text style={styles.formSubTitle}>Create an account</Text>
                        </View>

                        {/* First name element */}
                        <View style={styles.elementContainer}>
                            <Text style={styles.labelTxt}>First name{' '}
                                <Text style={styles.requiredMark}>*{' '}</Text>
                                {!validation.firstName ? <Text style={styles.errorMsgTxt}>{validation.firstNameError}</Text> : null}
                            </Text>
                            <View style={{ ...styles.element, ...{ borderBottomColor: validation.firstName ? "#F2994A" : "#FF4122" } }}>
                                <View style={styles.inputContainer}>
                                    <TextInput style={styles.input} keyboardType={"default"} onChangeText={(value) => handleInput("firstName", value)} />
                                </View>
                            </View>
                        </View>

                        {/* Last name element */}
                        <View style={styles.elementContainer}>
                            <Text style={styles.labelTxt}>Last name</Text>
                            <View style={styles.element}>
                                <View style={styles.inputContainer}>
                                    <TextInput style={styles.input} keyboardType={"default"} onChangeText={(value) => handleInput("lastName", value)} />
                                </View>
                            </View>
                        </View>

                        {/* Email element */}
                        <View style={styles.elementContainer}>
                            <Text style={styles.labelTxt}>E-Mail{' '}
                                <Text style={styles.requiredMark}>*{' '}</Text>
                                {!validation.email ? <Text style={styles.errorMsgTxt}>{validation.emailError}</Text> : null}
                            </Text>
                            <View style={{ ...styles.element, ...{ borderBottomColor: validation.email ? "#F2994A" : "#FF4122" } }}>
                                <View style={styles.inputContainer}>
                                    <TextInput style={styles.input} keyboardType={"email-address"} onChangeText={(value) => { handleInput("email", value.toLowerCase()), emailAvailability(value) }} />
                                </View>
                            </View>
                        </View>

                        {/* Mobile No element */}
                        <View style={styles.elementContainer}>
                            <Text style={styles.labelTxt}>Mobile Number{' '}
                                <Text style={styles.requiredMark}>*{' '}</Text>
                                {!validation.mobNo ? <Text style={styles.errorMsgTxt}>{validation.mobNoError}</Text> : null}
                            </Text>
                            <View style={{ ...styles.element, ...{ borderBottomColor: validation.mobNo ? "#F2994A" : "#FF4122" } }}>
                                <View style={styles.inputContainer}>
                                    <TextInput style={styles.input} keyboardType={"phone-pad"} onChangeText={(value) => handleInput("mobNo", value)} />
                                </View>
                            </View>
                        </View>

                        {/* Address elements */}
                        <View style={styles.elementContainer}>
                            <Text style={styles.labelTxt}>Address{' '}
                                <Text style={styles.requiredMark}>*{' '}</Text>
                                {!validation.addFLine || !validation.addSLine ? <Text style={styles.errorMsgTxt}>{validation.addressError}</Text> : null}
                            </Text>
                            <View style={{ ...styles.element, ...{ borderBottomColor: validation.addFLine ? "#F2994A" : "#FF4122" } }}>
                                <View style={styles.inputContainer}>
                                    <TextInput style={styles.input} keyboardType={"default"} placeholder="First Line" placeholderTextColor={"#E4E7EB"} onChangeText={(value) => handleInput("addFLine", value)} />
                                </View>
                            </View>
                            <View style={{ ...styles.element, ...{ borderBottomColor: validation.addSLine ? "#F2994A" : "#FF4122" } }}>
                                <View style={styles.inputContainer}>
                                    <TextInput style={styles.input} keyboardType={"default"} placeholder="Second Line" placeholderTextColor={"#E4E7EB"} onChangeText={(value) => handleInput("addSLine", value)} />
                                </View>
                            </View>
                            <View style={styles.element}>
                                <View style={styles.inputContainer}>
                                    <TextInput style={styles.input} keyboardType={"default"} placeholder="Street" placeholderTextColor={"#E4E7EB"} onChangeText={(value) => handleInput("street", value)} />
                                </View>
                            </View>
                        </View>

                        {/* City element */}
                        <View style={styles.elementContainer}>
                            <Text style={styles.labelTxt}>City{' '}
                                <Text style={styles.requiredMark}>*{' '}</Text>
                                {!validation.city ? <Text style={styles.errorMsgTxt}>{validation.cityError}</Text> : null}
                            </Text>
                            <View style={{ ...styles.element, ...{ borderBottomColor: validation.city ? "#F2994A" : "#FF4122" } }}>
                                <View style={styles.inputContainer}>
                                    <TextInput style={styles.input} keyboardType={"default"} onChangeText={(value) => handleInput("city", value)} />
                                </View>
                            </View>
                        </View>

                        {/* Birthday element */}
                        <View style={styles.elementContainer}>
                            <Text style={styles.labelTxt}>Date of Birth{' '}
                                <Text style={styles.requiredMark}>*{' '}</Text>
                                {!validation.dob ? <Text style={styles.errorMsgTxt}>{validation.dobError}</Text> : null}
                            </Text>
                            <View style={{ ...styles.element, ...{ borderBottomColor: validation.dob ? "#F2994A" : "#FF4122" } }}>
                                <View style={styles.inputContainer} >
                                    <Pressable style={styles.dobPressable} onPress={() => setDateOpen(true)}>
                                        <View style={{ width: '90%', height: '100%', justifyContent: 'center' }}>
                                            {isDobSelected ?
                                                <Text style={{ fontSize: 14, color: '#373737' }}>{moment(seekerData.dob).format("YYYY/MM/DD")}</Text>
                                                :
                                                <Text style={{ fontSize: 14, color: '#E4E7EB' }}>YYYY/MM/DD</Text>
                                            }
                                        </View>
                                        <View style={{ width: '10%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                                            <EvilIcons name="calendar" size={28} style={{ alignSelf: 'flex-end' }} color={validation.dob ? "#F2994A" : "#FF4122"} />
                                        </View>
                                    </Pressable>
                                </View>
                            </View>
                        </View>

                        {/* NIC element */}
                        <View style={styles.elementContainer}>
                            <Text style={styles.labelTxt}>National ID No{' '}
                                <Text style={styles.requiredMark}>*{' '}</Text>
                                {!validation.nic ? <Text style={styles.errorMsgTxt}>{validation.nicError}</Text> : null}
                            </Text>
                            <View style={{ ...styles.element, ...{ borderBottomColor: validation.nic ? "#F2994A" : "#FF4122" } }}>
                                <View style={styles.inputContainer}>
                                    <TextInput style={styles.input} keyboardType={"default"} onChangeText={(value) => handleInput("nic", value.toUpperCase())} />
                                </View>
                            </View>
                        </View>

                        {/* Gender element */}
                        <View style={styles.elementContainer}>
                            <Text style={styles.labelTxt}>Gender{' '}
                                <Text style={styles.requiredMark}>*{' '}</Text>
                                {!validation.gender ? <Text style={styles.errorMsgTxt}>{validation.genderError}</Text> : null}
                            </Text>
                            <View style={{ ...styles.element, ...{ borderBottomColor: validation.gender ? "#F2994A" : "#FF4122" } }}>
                                <View style={{ ...styles.inputContainer, ...{ flexDirection: 'row' } }}>
                                    <View style={styles.divider}>
                                        <Pressable style={{ flexDirection: 'row' }} onPress={() => handleInput("gender", "male")}>
                                            <Fontisto name="male" size={22} color={seekerData.gender === "male" ? "#F2994A" : seekerData.gender === "female" ? "#9AA5B1" : "#9AA5B1"} />
                                            <Text style={{ ...styles.genderTxt, ...{ color: seekerData.gender === "male" ? "#F2994A" : seekerData.gender === "female" ? "#9AA5B1" : "#9AA5B1" } }}>Male</Text>
                                        </Pressable>
                                    </View>
                                    <View style={styles.divider}>
                                        <Pressable style={{ flexDirection: 'row' }} onPress={() => handleInput("gender", "female")}>
                                            <Fontisto name="female" size={22} color={seekerData.gender === "male" ? "#9AA5B1" : seekerData.gender === "female" ? "#F2994A" : "#9AA5B1"} />
                                            <Text style={{ ...styles.genderTxt, ...{ color: seekerData.gender === "male" ? "#9AA5B1" : seekerData.gender === "female" ? "#F2994A" : "#9AA5B1" } }}>Female</Text>
                                        </Pressable>
                                    </View>
                                </View>
                            </View>
                        </View>

                        {/* Password element and strength meter */}
                        <View style={styles.elementContainer}>
                            <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center' }}>
                                <View style={{}}>
                                    <Text style={styles.labelTxt}>Password{' '}
                                        <Text style={styles.requiredMark}>*{' '}</Text>
                                        {!validation.password ? <Text style={styles.errorMsgTxt}>{validation.passwordError}</Text> : null}
                                    </Text>

                                </View>
                                {seekerData.password !== "" && validation.password ?
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
                            <View style={{ ...styles.element, ...{ flexDirection: 'row', height: 50, borderBottomColor: validation.password ? "#F2994A" : "#FF4122" } }}>
                                <View style={{ width: '90%', height: '100%', justifyContent: 'center' }}>
                                    <TextInput style={styles.input} keyboardType={"default"} onChangeText={(value) => { handleInput("password", value), checkPasswordStrength(value) }} secureTextEntry={!isPwVisible} />
                                </View>
                                <View style={{ width: '10%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                                    <Entypo name={isPwVisible ? "eye" : "eye-with-line"} size={20} color={"rgba(242, 153, 74, 0.6)"} onPress={() => setIsPwVisible(!isPwVisible)} />
                                </View>
                            </View>
                        </View>

                        {/* Confirm password element */}
                        <View style={styles.elementContainer}>
                            <Text style={styles.labelTxt}>Confirm Password{' '}
                                <Text style={styles.requiredMark}>*{' '}</Text>
                                {!validation.conPassword ? <Text style={styles.errorMsgTxt}>{validation.conPasswordError}</Text> : null}
                            </Text>
                            <View style={{ ...styles.element, ...{ flexDirection: 'row', height: 50, borderBottomColor: validation.conPassword ? "#F2994A" : "#FF4122" } }}>
                                <View style={{ width: '90%', height: '100%', justifyContent: 'center' }}>
                                    <TextInput style={styles.input} keyboardType={"default"} onChangeText={(value) => handleInput("conPassword", value)} secureTextEntry={!isConPwVisible} />
                                </View>
                                <View style={{ width: '10%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                                    <Entypo name={isConPwVisible ? "eye" : "eye-with-line"} size={20} color={"rgba(242, 153, 74, 0.6)"} onPress={() => setIsConPwVisible(!isConPwVisible)} />
                                </View>
                            </View>
                        </View>

                        <View style={styles.btnContainer}>
                            <TouchableOpacity style={styles.btn} onPress={handleSubmit} disabled={isBtnLoading}>
                                {isBtnLoading ?
                                    <View style={styles.btnLoaderContainer}>
                                        <LottieView source={require('../assets/jsons/btn_loader.json')} loop autoPlay style={styles.btnLoader} />
                                    </View>
                                    :
                                    <Text style={styles.btnTxt}>Next</Text>
                                }
                            </TouchableOpacity>
                        </View>

                        <View style={styles.signInContainer}>
                            <Text style={styles.signInTxt}>Already have an account? <Text style={{ fontWeight: '600', color: '#F2994A' }} onPress={() => props.navigation.navigate("Login")}> Sign In</Text></Text>
                        </View>

                        <DatePicker modal open={dateOpen} buttonColor="#F2994A" dividerColor="#F2994A" maximumDate={new Date(moment().subtract(16, 'years').format('YYYY-MM-DD'))} date={seekerData.dob} mode="date" onCancel={() => setDateOpen(false)} onConfirm={(date) => { handleInput("dob", date), setIsDobSeleted(true), setDateOpen(false) }} />
                    </ScrollView>
                </View>
            </View >
            {isLoading ? <AppLoader /> : null}
            {isError ? <ErrorPopup closeModal={() => setIsError(false)} /> : null}
        </SafeAreaView >
    );
}

const styles = StyleSheet.create({
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

    errorMsgTxt: {
        fontSize: 10,
        color: "#FF4122",
        fontWeight: '600'
    },

    requiredMark: {
        color: "#FF4122",
        fontWeight: '800'
    },

    signInTxt: {
        color: '#373737',
        fontWeight: '300',
        fontSize: 15
    },

    signInContainer: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 30
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
        height: 100,
        justifyContent: 'center',
        alignItems: 'center'
    },

    genderTxt: {
        marginLeft: 5,
        fontSize: 14,
        color: '#9AA5B1'
    },

    divider: {
        width: '50%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10
    },

    dobPressable: {
        height: 50,
        justifyContent: 'center',
        flexDirection: 'row'
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

    formSubTitle: {
        fontWeight: '600',
        fontSize: 10,
        color: '#373737'
    },

    formTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#373737'
    },

    formHeaderContainer: {
        width: '100%',
        marginTop: 10
    },

    scrollView: {
        width: '100%',
        height: '100%',
        paddingHorizontal: 10,
    },

    scrollContainer: {
        width: '94%',
        marginHorizontal: '3%',
        height: "80%",
        backgroundColor: '#FFF',
        position: 'absolute',
        elevation: 10,
        borderRadius: 20,
        bottom: 10
    },

    subHeadingTxt: {
        fontSize: 14,
        fontWeight: '300',
        color: '#FFF'
    },


    titleTxt: {
        fontSize: 30,
        fontWeight: '700',
        color: '#FFF'
    },

    titleContainer: {
        paddingLeft: 10,
        width: '100%',
        height: 50,
        left: 50,
        justifyContent: 'center',
        marginTop: 15
    },

    backBtnContainer: {
        paddingLeft: 10,
        width: 40,
        height: 50,
        left: 50,
        justifyContent: 'center'
    },

    bottomConatiner: {
        flex: 4,
        width: '100%',
    },

    headerContainer: {
        flex: 2,
        width: '130%',
        backgroundColor: '#F2994A',
        borderBottomStartRadius: 200,
        borderBottomEndRadius: 250,
        left: -50
    },

    mainContainer: {
        flex: 1
    }
})

export default Signup;