import React, { useEffect, useMemo, useState } from "react";
import { BackHandler, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import extStyles from "../global/styles/extStyles";
import { RadioGroup } from "react-native-radio-buttons-group";
import LottieView from "lottie-react-native";
import { TextInput } from "react-native";
import CancelProceedPopUp from "../components/CancelProceedPopUp";
import CancelRequestedPopUp from "../components/CancelRequestedPopUp";
import ErrorPopup from "../components/ErrorPopUp";
import { setErrorMsg, setErrorTitle } from "../global/variable";
import axios, { HttpStatusCode } from "axios";
import { server } from "../service/constant";

const CancelJob = (props: any) => {
    //Handle back event
    useEffect(() => {
        const backAction = () => {
            props.navigation.reset({
                index: 0,
                routes: [{
                    name: 'ApppliedJobs',
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

    const labelStyles = {
        fontSize: 15,
        color: '#373737',
    }

    const radioButtons = useMemo(() => ([
        {
            id: '1',
            label: 'Found another job',
            value: 'Found another job',
            color: "#FE8235",
            size: 18,
            labelStyle: labelStyles
        },
        {
            id: '2',
            label: 'Schedule conflict',
            value: 'Schedule conflict',
            color: "#FE8235",
            size: 18,
            labelStyle: labelStyles
        },
        {
            id: '3',
            label: 'Low pay rate',
            value: 'Low pay rate',
            color: "#FE8235",
            size: 18,
            labelStyle: labelStyles
        },
        {
            id: '4',
            label: 'Job not as expected',
            value: 'Job not as expected',
            color: "#FE8235",
            size: 18,
            labelStyle: labelStyles
        },
        {
            id: '5',
            label: 'Illness/Sickness',
            value: 'Illness/Sickness',
            color: "#FE8235",
            size: 18,
            labelStyle: labelStyles
        },
        {
            id: '6',
            label: 'Transportation issue',
            value: 'Transportation issue',
            color: "#FE8235",
            size: 18,
            labelStyle: labelStyles
        },
        {
            id: '7',
            label: 'Personal reasons',
            value: 'Personal reasons',
            color: "#FE8235",
            size: 18,
            labelStyle: labelStyles
        },
        {
            id: '8',
            label: 'Other',
            value: 'Other',
            color: "#FE8235",
            size: 18,
            labelStyle: labelStyles
        },
    ]), [])

    const [reason, setReason] = useState<string>("");
    const [selectedId, setSelectedId] = useState('0');
    const [isOther, setIsOther] = useState<boolean>(false);
    const [isBtnLoading, setIsBtnLoading] = useState<boolean>(false);

    const handleSelect = (id: string) => {
        setIsOther(false);
        switch (id) {
            case "1":
                setReason("Found another job");
                break;
            case "2":
                setReason("Schedule conflict");
                break;
            case "3":
                setReason("Low pay rate");
                break;
            case "4":
                setReason("Job not as expected");
                break;
            case "5":
                setReason("Illness/Sickness");
                break;
            case "6":
                setReason("Transportation issue");
                break;
            case "7":
                setReason("Personal reasons");
                break;
            case "8":
                setReason("");
                setIsOther(true);
                break;
        }
        setSelectedId(id);
    }

    const [lengthReason, setLengthReason] = useState<number>(0);

    const handleOtherReson = (reason: string) => {
        setReason(reason);
        setLengthReason(reason.length);
    }

    const [isToApproved, setIsToApproved] = useState<boolean>(false);
    const [isAlreadyRequested, setIsAlreadyRequested] = useState<boolean>(false);

    const handleProceed = async () => {
        try {
            setIsBtnLoading(true);
            const { jobId, userName } = props.route.params;
            const resp = await axios.post(server + `cancelJob/${userName}/${jobId}`, {
                reason: reason
            });

            if (resp.data == HttpStatusCode.Conflict) {
                setIsBtnLoading(false);
                setIsAlreadyRequested(true);
                return;
            }

            if (resp.data == HttpStatusCode.NotAcceptable) {
                setIsBtnLoading(false);
                setIsToApproved(true);
                return
            }

            if (resp.data == HttpStatusCode.Accepted) {
                setIsBtnLoading(false);
                handleNavigate();
            }

            setErrorTitle("Oops...!!");
            setErrorMsg("Something went wrong");
            setIsError(true);
            setIsBtnLoading(false);
            return;
        } catch (error) {
            console.log(error);
            setErrorTitle("Oops...!!");
            setErrorMsg("Something went wrong");
            setIsError(true);
            setIsBtnLoading(false);
        }
    };

    const handleNavigate = () => {
        props.navigation.reset({
            index: 0,
            routes: [{
                name: 'ApppliedJobs'
            }]
        });
    }
    return (
        <SafeAreaView style={extStyles.body}>
            <View style={styles.body}>
                <View style={styles.container}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <Text style={styles.title}>Tell Us Reason</Text>
                        <View style={styles.lottieContainer}>
                            <LottieView source={require('../assets/jsons/sad.json')} autoPlay loop style={styles.lottie} />
                        </View>
                        <View>
                            <RadioGroup radioButtons={radioButtons}
                                onPress={(id) => handleSelect(id)}
                                selectedId={selectedId}
                                containerStyle={styles.radBtnContainer}
                            />
                        </View>
                        <View style={styles.reviewBox}>
                            <Text style={styles.reviewLength}>{lengthReason}/300</Text>
                            <TextInput multiline style={styles.textInput} onChangeText={(value) => handleOtherReson(value)} maxLength={300} editable={isOther} />
                        </View>
                        <View style={styles.btnContainer}>
                            <TouchableOpacity style={{ ...styles.btn, ...{ opacity: reason == "" || isBtnLoading ? .7 : 1 } }} disabled={reason == "" || isBtnLoading} onPress={() => handleProceed()}>
                                {isBtnLoading ?
                                    <LottieView source={require('../assets/jsons/btn_loader.json')} loop autoPlay style={styles.btnLoader} />
                                    :
                                    <Text style={styles.btnTxt}>Proceed</Text>
                                }
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>
            </View>
            {isToApproved ? <CancelProceedPopUp navigate={() => handleNavigate()} /> : null}
            {isAlreadyRequested ? <CancelRequestedPopUp navigate={() => handleNavigate()} /> : null}
            {isError ? <ErrorPopup closeModal={() => setIsError(false)} /> : null}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    btnLoader: {
        width: '80%',
        height: '80%'
    },

    btnTxt: {
        fontSize: 18,
        fontWeight: '700',
        color: '#FFF',
    },

    btn: {
        width: '60%',
        height: 50,
        backgroundColor: '#FE8235',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        elevation: 5
    },

    btnContainer: {
        width: '100%',
        padding: 30,
        alignItems: 'center',
        justifyContent: 'center'
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

    reviewLength: {
        fontSize: 10,
        color: '#C3C3C3',
        paddingRight: 10,
        fontWeight: '500'
    },

    lottie: {
        width: '100%',
        height: '100%'
    },

    lottieContainer: {
        width: '100%',
        height: 150,
        alignItems: "center",
        justifyContent: 'center',
    },

    radBtnContainer: {
        alignItems: 'flex-start',
        marginVertical: 15
    },

    title: {
        fontSize: 24,
        color: "#FE8235",
        fontWeight: '600',
        textAlign: 'center'
    },

    container: {
        width: '90%',
        top: 70,
        bottom: 70,
        backgroundColor: '#FFF',
        borderRadius: 20,
        position: 'absolute',
        padding: 10,
        elevation: 10
    },

    body: {
        flex: 1,
        backgroundColor: '#F2994A',
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default CancelJob;