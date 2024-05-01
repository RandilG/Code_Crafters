import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import extStyles from "../global/styles/extStyles";
import LottieView from "lottie-react-native";

const SignupSuccess = (props: any) => {

    const [seconds, setSeconds] = useState<number>(60);

    let interval: NodeJS.Timeout;

    useEffect(() => {
        const interval = setInterval(() => {
            setSeconds(prevSeconds => prevSeconds - 1);
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (seconds === 0) {
            navigate();
        }
    }, [seconds]);

    function navigate() {
        props.navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }]
        });
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return (
        <SafeAreaView style={extStyles.body}>
            <View style={styles.baseContainer}>
                <View style={styles.mainContainer}>
                    <View style={styles.animaContainer}>
                        <LottieView source={require('../assets/jsons/success.json')} loop={false} autoPlay style={styles.anima} />
                    </View>
                    <View style={styles.container}>
                        <Text style={styles.greetingTxt}>Congratulations!</Text>
                        <Text style={styles.headingText}>Your registration details have been submitted  successfully</Text>
                        <Text style={{ ...styles.headingText, ...{ marginVertical: 5, color: '#373737' } }}>The account will be activated after the authorization of our team</Text>
                        <Text style={{ ...styles.headingText, ...{ marginVertical: 5, color: '#373737', fontSize: 15, fontWeight: '300' } }}>We will notify you once the account is activated</Text>
                    </View>
                    <View style={styles.btnContainer}>
                        <TouchableOpacity style={styles.btn} onPress={() => {navigate()}}>
                            <Text style={styles.btnTxt}>OK</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.timerContainer}>
                        <Text style={styles.timerTxt}>You will be redirected to the login screen within{'\n'}{`${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`}</Text>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    btnTxt: {
        fontSize: 18,
        fontWeight: '700',
        color: '#FFF'
    },

    btn: {
        width: 200,
        height: 50,
        backgroundColor: '#F2994A',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnContainer: {
        width: '100%',
        height: '10%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20
    },
    timerTxt: {
        fontWeight: '400',
        fontSize: 12,
        textAlign: 'center',
        color: '#BAB9B9'
    },

    timerContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        marginVertical: 20
    },

    headingText: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: '400',
        color: '#F2994A',
        margin: 20
    },

    greetingTxt: {
        fontSize: 35,
        color: '#FE8235',
        fontWeight: '700',
        letterSpacing: 2
    },

    container: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },

    anima: {
        width: '100%',
        height: '100%'
    },

    animaContainer: {
        width: '100%',
        height: '30%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    mainContainer: {
        width: '80%',
        height: '80%',
        backgroundColor: '#FFF',
        elevation: 10,
        borderRadius: 20
    },

    baseContainer: {
        flex: 1,
        backgroundColor: '#F2994A',
        justifyContent: 'center',
        alignItems: 'center'
    },
});

export default SignupSuccess;