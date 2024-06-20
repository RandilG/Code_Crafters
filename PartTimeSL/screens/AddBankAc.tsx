import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import extStyles from "../global/styles/extStyles";
import LottieView from "lottie-react-native";
import { setErrorMsg, setErrorTitle } from "../global/variable";
import ErrorPopup from "../components/ErrorPopUp";
import AppLoader from "../components/AppLoader";
import axios, { HttpStatusCode } from "axios";
import { server } from "../service/constant";
import EncryptedStorage from "react-native-encrypted-storage";

const AddBankAc = (props: any) => {
    const [holderFName, setHolderFName] = useState<string>("");
    const [holderLName, setHolderLName] = useState<string>("");
    const [bank, setBank] = useState<string>("");
    const [branch, setBranch] = useState<string>("");
    const [account, setAccount] = useState<number>();

    const [isError, setIsError] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [isFormError, setIsFormError] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    const createAccount = async () => {
        try {
            setIsFormError(false);
            if (isValid()) {
                setIsLoading(true);
                const session = await EncryptedStorage.getItem('session');
                let uName: string = '';
                if (session) uName = JSON.parse(session).userName;
                const resp = await axios.post(server + 'createBankAc', {
                    "userName": uName,
                    "firstName": holderFName,
                    "lastName": holderLName,
                    "bank": bank,
                    "branch": branch,
                    "account": account
                })
                if (resp.data == HttpStatusCode.Ok) {
                    props.navigation.reset({
                        index: 0,
                        routes: [{ name: 'MyWallet' }]
                    });
                } else {
                    setErrorTitle("Oops...!!");
                    setErrorMsg("Something went wrong");
                    setIsError(true);
                    setIsLoading(false);
                }
            } else {
                setIsFormError(true);
                return;
            }
        } catch (error) {
            console.log(error);
            setErrorTitle("Oops...!!");
            setErrorMsg("Something went wrong");
            setIsError(true);
            setIsLoading(false);
        }
    };

    function isValid(): boolean {
        if (holderFName === "") {
            setError("Holder first name cannot be empty");
            return false;
        }
        if (holderLName === "") {
            setError("Holder last name cannot be empty");
            return false;
        }
        if (bank === "") {
            setError("Bank name cannot be empty");
            return false
        }
        if (branch === "") {
            setError("Branch cannot be empty");
            return false;
        }
        if (account == 0) {
            setError("Account number cannot be null");
            return false;
        }
        if (!/^\d+$/.test(String(account))) {
            setError("Invalid account number");
            return false;
        }
        return true;
    }

    return (
        <SafeAreaView style={extStyles.body}>
            <View style={styles.baseContainer}>
                <View style={styles.mainContainer}>
                    <Text style={styles.title}>Create Bank Account</Text>
                    <View style={styles.lottieContainer}>
                        <LottieView source={require('../assets/jsons/bank.json')} loop autoPlay style={styles.lottie} />
                    </View>
                    <View style={styles.elementContainer}>
                        <Text style={styles.label}>Holder First Name<Text style={styles.requiredMark}>*{' '}</Text></Text>
                        <View style={styles.element}>
                            <TextInput style={styles.input} onChangeText={(value) => setHolderFName(value)} />
                        </View>
                        <Text style={styles.label}>Holder Last Name<Text style={styles.requiredMark}>*{' '}</Text></Text>
                        <View style={styles.element}>
                            <TextInput style={styles.input} onChangeText={(value) => setHolderLName(value)} />
                        </View>
                        <Text style={styles.label}>Bank Name<Text style={styles.requiredMark}>*{' '}</Text></Text>
                        <View style={styles.element}>
                            <TextInput style={styles.input} onChangeText={(value) => setBank(value)} />
                        </View>
                        <Text style={styles.label}>Branch<Text style={styles.requiredMark}>*{' '}</Text></Text>
                        <View style={styles.element}>
                            <TextInput style={styles.input} onChangeText={(value) => setBranch(value)} />
                        </View>
                        <Text style={styles.label}>Account Number<Text style={styles.requiredMark}>*{' '}</Text></Text>
                        <View style={styles.element}>
                            <TextInput style={styles.input} keyboardType={'number-pad'} onChangeText={(value) => setAccount(Number(value))} />
                        </View>
                        <View style={{ marginVertical: 30 }}>
                            {isFormError ? <Text style={styles.errTxt}>{error}</Text> : null}
                            <TouchableOpacity style={styles.btn} onPress={() => createAccount()}>
                                <Text style={styles.btnTxt}>Create</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
            {isError ? <ErrorPopup closeModal={() => setIsError(false)} /> : null}
            {isLoading ? <AppLoader /> : null}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    requiredMark: {
        color: "#FF4122",
        fontWeight: '800'
    },

    errTxt: {
        fontSize: 12,
        textAlign: 'center',
        marginBottom: 5,
        color: '#FF4122'
    },

    btnTxt: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: '600'
    },

    btn: {
        width: '60%',
        height: 45,
        backgroundColor: '#FE8235',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        elevation: 5
    },

    input: {
        width: '100%',
        fontSize: 14,
        fontWeight: '400',
        color: '#373737',
    },

    element: {
        width: '100%',
        borderWidth: 2,
        height: 40,
        borderColor: '#F2994A',
        borderRadius: 10,
        justifyContent: 'center',
        marginTop: 5,
    },

    label: {
        color: '#373737',
        fontSize: 14,
        fontWeight: '400',
        marginTop: 10
    },

    elementContainer: {
        width: '100%',
    },

    lottie: {
        width: '90%',
        height: '90%'
    },

    lottieContainer: {
        width: '100%',
        height: 180,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    },

    title: {
        color: '#FE8235',
        textAlign: 'center',
        fontSize: 30,
        fontWeight: '700'
    },

    mainContainer: {
        width: '90%',
        height: 730,
        backgroundColor: '#FFF',
        elevation: 10,
        borderRadius: 20,
        padding: 10
    },

    baseContainer: {
        flex: 1,
        backgroundColor: '#F2994A',
        justifyContent: 'center',
        alignItems: 'center'
    },

});

export default AddBankAc;