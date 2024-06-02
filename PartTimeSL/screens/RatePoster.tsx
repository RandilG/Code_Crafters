import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import extStyles from "../global/styles/extStyles";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import LottieView from "lottie-react-native";
import { Text } from "react-native-animatable";
import Ionicons from "react-native-vector-icons/Ionicons";
import ErrorPopup from "../components/ErrorPopUp";
import AppLoader from "../components/AppLoader";
import { setErrorMsg, setErrorTitle } from "../global/variable";
import axios, { HttpStatusCode } from "axios";
import { server } from "../service/constant";
import EncryptedStorage from "react-native-encrypted-storage";

const RatePoster = (props: any) => {
    const [rate, setRate] = useState<number>(0);
    const [review, setReview] = useState<string>('');
    const [lengthReview, setLengthReview] = useState<number>(0);

    const [isError, setIsError] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isBtnLoading, setIsBtnLoading] = useState<boolean>(false);

    function handleReview(value: string) {
        setReview(value);
        setLengthReview(value.length);
    }

    const handleSubmit = async () => {
        try {
            setIsBtnLoading(true);
            if(rate==0){
                setErrorTitle("Oops...!!");
                setErrorMsg("Please give a rate");
                setIsBtnLoading(false);
                setIsLoading(false);
                setIsError(true);
                return;
            }
            const session = await EncryptedStorage.getItem('session');
            let uName: string = '';
            if (session) uName = JSON.parse(session).userName;
            const { job_id } = props.route.params;
            setIsLoading(true);
            const resp = await axios.post(server + `ratePoster/${uName}/${job_id}`, {
                rate: rate,
                review: review
            });
            if (resp.data === HttpStatusCode.Ok) {
                props.navigation.reset({
                    index: 0,
                    routes: [{ name: 'Dashboard' }]
                });
            } else {
                setErrorTitle("Oops...!!");
                setErrorMsg("Something went wrong");
                setIsBtnLoading(false);
                setIsLoading(false);
                setIsError(true);
            }
        } catch (error) {
            console.log(error);
            setErrorTitle("Oops...!!");
            setErrorMsg("Something went wrong");
            setIsBtnLoading(false);
            setIsLoading(false);
            setIsError(true);
        }
    }

    return (
        <SafeAreaView style={extStyles.body}>
            <View style={styles.body}>
                <View style={styles.container}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>Rate and Review</Text>
                    </View>
                    <View style={styles.animationContainer}>
                        <LottieView source={require('../assets/jsons/rate.json')} loop={true} autoPlay style={styles.animation} />
                    </View>
                    <View style={styles.greetingContainer}>
                        <Text style={styles.greeting}>We value your feedback on Employers</Text>
                    </View>
                    <View style={styles.starContainer}>
                        <Ionicons name="star" size={40} color={rate >= 1 ? "#FCE404" : "#C3C3C3"} onPress={() => setRate(1)} />
                        <Ionicons name="star" size={40} color={rate >= 2 ? "#FCE404" : "#C3C3C3"} onPress={() => setRate(2)} />
                        <Ionicons name="star" size={40} color={rate >= 3 ? "#FCE404" : "#C3C3C3"} onPress={() => setRate(3)} />
                        <Ionicons name="star" size={40} color={rate >= 4 ? "#FCE404" : "#C3C3C3"} onPress={() => setRate(4)} />
                        <Ionicons name="star" size={40} color={rate >= 5 ? "#FCE404" : "#C3C3C3"} onPress={() => setRate(5)} />
                    </View>
                    <View style={styles.valueContainer}>
                        <Text style={styles.value}>{rate}/5</Text>
                    </View>
                    <View style={styles.reviewContainer}>
                        <Text style={styles.reviewTitle}>Write a Review</Text>
                        <View style={styles.reviewBox}>
                            <Text style={styles.reviewLength}>{lengthReview}/300</Text>
                            <TextInput multiline style={styles.textInput} onChangeText={(value) => handleReview(value)} maxLength={300} />
                        </View>
                    </View>
                    <View style={styles.btnContainer}>
                        <TouchableOpacity style={styles.btn} disabled={isBtnLoading} onPress={handleSubmit}>
                            {isBtnLoading ?
                                <View style={styles.btnLoaderContainer}>
                                    <LottieView source={require('../assets/jsons/btn_loader.json')} loop autoPlay style={styles.btnLoader} />
                                </View>
                                :
                                <Text style={styles.btnTxt}>Submit</Text>
                            }
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            {isError ? <ErrorPopup closeModal={() => setIsError(false)} /> : null}
            {isLoading ? <AppLoader /> : null}
        </SafeAreaView>
    )
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

    btnTxt: {
        fontSize: 18,
        fontWeight: '700',
        color: '#FFF'
    },

    btn: {
        width: 250,
        height: 50,
        backgroundColor: '#FE8235',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },

    btnContainer: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10
    },

    reviewLength: {
        fontSize: 10,
        color: '#C3C3C3',
        paddingRight: 10,
        fontWeight: '500'
    },

    greeting: {
        fontSize: 14,
        color: '#FE8235',
        fontWeight: '500'
    },

    greetingContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        paddingVertical: 10
    },

    textInput: {
        width: '100%',
        fontSize: 14,
        color: '#373737',
        paddingHorizontal: 5,
    },

    reviewBox: {
        width: '100%',
        height: 120,
        borderWidth: 2,
        borderColor: '#373737',
        borderRadius: 15,
        alignItems: 'flex-end'
    },

    reviewTitle: {
        color: '#373737',
        fontSize: 14,
        fontWeight: '400',
        textAlign: 'center'
    },

    reviewContainer: {
        width: '100%',
        padding: 10,
    },

    value: {
        color: '#373737',
        fontSize: 15,
        fontWeight: '600'
    },

    valueContainer: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },

    starContainer: {
        width: '80%',
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'row',
        alignSelf: 'center'
    },

    title: {
        fontSize: 30,
        fontWeight: '700',
        color: '#FE8235'
    },

    titleContainer: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },

    animation: {
        width: '100%',
        height: '100%'
    },

    animationContainer: {
        width: '100%',
        height: 200
    },

    container: {
        height: 600,
        width: '90%',
        backgroundColor: '#FFF',
        borderRadius: 20,
        elevation: 5,
        padding: 10
    },

    body: {
        flex: 1,
        backgroundColor: '#F2994A',
        justifyContent: 'center',
        alignItems: 'center'
    },

});

export default RatePoster;