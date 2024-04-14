import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import extStyles from "../global/styles/extStyles";
import { Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Entypo from 'react-native-vector-icons/Entypo';

const Login = (props: any) => {
    const [isPWVisible, setIsPWVisible] = useState<boolean>(false);
    const [userName, setUserName] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleLogin = () => {
        console.log(userName);
        console.log(password);
        Alert.alert("To be implement");
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
                                <Entypo name={isPWVisible ? "eye-with-line" : "eye"} size={20} color={"rgba(242, 153, 74, 0.6)"} onPress={() => setIsPWVisible(!isPWVisible)} />
                            </View>
                        </View>
                    </View>
                    <View style={styles.fogPWContainer}>
                        <Text style={styles.fogPWTxt} onPress={() => Alert.alert("To be implement")}>Forgot password?</Text>
                    </View>
                    <View style={styles.btnContainer}>
                        <TouchableOpacity style={styles.button} onPress={handleLogin}>
                            <Text style={styles.btnTxt}>Login</Text> 
                        </TouchableOpacity>
                    </View>
                    <View style={styles.signupConatiner}>
                        <Text style={styles.signUpTxt}>Don't have an account?<Text style={{fontWeight: '600', color: '#F2994A'}} onPress={() => props.navigation.navigate("Tnc")}> Sign Up</Text></Text>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    signUpTxt: {
        color: '#373737',
        fontWeight: '300',
        fontSize: 15
    },

    signupConatiner: {
        width: '100%',
        height: 90,
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
        borderRadius: 15
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