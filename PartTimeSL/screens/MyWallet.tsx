import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import extStyles from "../global/styles/extStyles";
import { Animated, Dimensions, Keyboard, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import moment from "moment";
import { Image } from "react-native-animatable";
import ErrorPopup from "../components/ErrorPopUp";
import AppLoader from "../components/AppLoader";
import { setErrorMsg, setErrorTitle } from "../global/variable";
import axios, { HttpStatusCode } from "axios";
import { server } from "../service/constant";
import EncryptedStorage from "react-native-encrypted-storage";
import LottieView from "lottie-react-native";
import BankAccountPopUp from "../components/BankAcPopUp";

const MyWallet = (props: any) => {
    const [animation] = useState(new Animated.Value(0));

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);
    const [userName, setUserName] = useState<string>();

    const [isElementOpen, setIsElemenatOpen] = useState<boolean>(false);

    // open payment element
    const openWithdrawElement = () => {
        Animated.timing(animation, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
        }).start();
        setIsElemenatOpen(true);
    };

    // close payment element
    const closeWithdrawElement = () => {
        Keyboard.dismiss();
        Animated.timing(animation, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
        }).start();
        setIsElemenatOpen(false);
    };
    const [coins, setCoins] = useState<number>(0);
    const [balance, setBalance] = useState<number>(0);
    const [isProbation, setProbation] = useState<boolean>(false);
    const [transactions, setTransations] = useState<any[]>([]);
    const [serviceChargePct, setServiceChargePct] = useState<number>(0);

    const [amount, setAmount] = useState<number>(0);
    const [isCoinsAdded, setIsCoinsAdded] = useState<boolean>(false);
    const [amountError, setAmountError] = useState<string>();
    const [isAmountError, setIsAmountError] = useState<boolean>(false);

    //Add coins to the amount
    const addCoins = () => {
        setIsAmountEmpty(false);
        setAmount(amount + coins);
        setIsCoinsAdded(true);
    }

    //Remove coins from the amount
    const removeCoins = () => {
        setAmount(amount - coins);
        setIsCoinsAdded(false);
    }

    //Handel amount input process
    const handleAmount = (value: number) => {
        setIsAmountError(false);
        setIsAmountEmpty(false);
        setAmount(value);
        if (value > balance) {
            setAmountError("Cannot exceed the balance");
            setIsAmountError(true);
        }
    }

    //Get wallet data
    const getData = async () => {
        try {
            const session = await EncryptedStorage.getItem('session');
            let uName: string = '';
            if (session) uName = JSON.parse(session).userName;
            setUserName(uName);
            const resp = await axios.get(server + `walletData/${uName}`);
            if (resp.data !== HttpStatusCode.InternalServerError) {
                setBalance(resp.data.balance);
                setCoins(resp.data.coins);
                setProbation(resp.data.probation);
                setTransations(resp.data.transactions);
                setServiceChargePct(resp.data.serviceChargePct);
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
        setIsLoading(true);
        getData();
    }, []);

    const [isBtnLoading, setIsBtnLoading] = useState<boolean>(false);
    const [isBanAccAvailable, setIsBanAccAvailable] = useState<boolean>(false);

    //Check bank account is created or not
    const checkBankAccount = async () => {
        try {
            setIsBtnLoading(true);
            const resp = await axios.get(server + `checkBankAccount/${userName}`);
            if (resp.data == true) {
                setIsBtnLoading(false);
                openWithdrawElement();
            } else if (resp.data == false) {
                setIsBtnLoading(false);
                setIsBanAccAvailable(true);
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
    };

    //Navigate to bank account creating screen
    const navigate = () => {
        setIsBanAccAvailable(false);
        props.navigation.navigate('AddBankAc');
    };

    //Handle withdrawing process
    const [isAmountEmpty, setIsAmountEmpty] = useState<boolean>(false);
    const handleWithdraw = async () => {
        try {
            Keyboard.dismiss();
            if (amount == 0) {
                setIsAmountEmpty(true);
                return;
            }
            setIsLoading(true);
            let withdrawAmount = amount;
            let coinsAmount = 0;
            if (isCoinsAdded && coins != 0) {
                withdrawAmount = amount - coins;
                coinsAmount = coins;
            }

            const resp = await axios.post(server + 'withdraw', {
                "userName": userName,
                "amount": withdrawAmount,
                "coins": coinsAmount,
                "probation": isProbation
            });

            if (resp.data == HttpStatusCode.Ok) {
                props.navigation.reset({
                    index: 0,
                    routes: [{ name: 'WithdrawSuccess' }]
                });
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

    return (
        <SafeAreaView style={extStyles.body}>
            <View style={styles.mainContainer}>
                <View style={styles.headerContainer}>
                    <View style={styles.topContainer}>
                        <View style={styles.backBtnContainer}>
                            <AntDesign name="left" size={30} color={"#FFF"} onPress={() => props.navigation.reset({index: 0, routes: [{ name: 'Dashboard' }]})} />
                        </View>
                        <View style={styles.messageContainer}>
                            {isProbation ?
                                <View style={styles.messageBox}>
                                    <Text style={styles.message}>**Please Note you are in a probation period. Therefore, A 5% amount will be deducted from the withdrawing amount as a service charge.</Text>
                                </View>
                                :
                            null}
                        </View>
                    </View>
                    <View style={styles.titleContainer}>
                        <Text style={styles.titleTxt}>
                            My Wallet
                        </Text>
                        <Text style={styles.subHeadingTxt}>
                            Your Finances in Control
                        </Text>
                    </View>
                </View>
                <View style={styles.bottomConatiner} />
                <View style={styles.scrollContainer}>
                    <View style={{ flex: 3 }}>
                        <View style={styles.amountContainer}>
                            <Text style={styles.dateTxt}>Balance on {moment().format('YYYY/MM/DD')}</Text>
                            <View style={styles.amountOval}>
                                <Text style={styles.amountTxt}><Text style={{ fontSize: 20 }}>Rs.</Text>{(balance).toFixed(2)}</Text>
                                <View style={styles.coinContainer}>
                                    <Image source={require('../assets/images/coin.png')} style={styles.coinImg} />
                                    <Text style={styles.coinTxt}>{coins}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.btnContainer}>
                            <TouchableOpacity style={styles.btn} onPress={() => checkBankAccount()} disabled={isBtnLoading}>
                                {isBtnLoading ?
                                    <LottieView source={require('../assets/jsons/btn_loader.json')} loop autoPlay style={styles.btnLoader} />
                                    :
                                    <Text style={styles.btnTxt}>Withdraw</Text>
                                }
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ flex: 3, padding: 10 }}>
                        <Text style={styles.historyTxt}>Transaction History</Text>
                        <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
                            {transactions.length != 0 ?
                                transactions.map((item, index) => (
                                    item.type === "debit" ?
                                        <DebitCard key={index} id={item.id} date={item.date} amount={item.amount} coins={item.coins} total={item.total} />
                                        : item.type === "credit" ?
                                            <CreditCard key={index} id={item.id} date={item.date} amount={item.amount} coins={item.coins} service_charge={item.serviceCharge} total={item.total} />
                                            :
                                            null
                                ))
                                :
                                <Text style={styles.noHistoryTxt}>No History</Text>
                            }
                        </ScrollView>
                    </View>
                </View>
            </View>
            <Animated.View style={[styles.withdrawElementContainer, { transform: [{ translateY: animation.interpolate({ inputRange: [0, 1], outputRange: [1000, 0], }), },], },]}>
                <View style={styles.withdrawElement}>
                    <View style={styles.closeBtnContainer}>
                        <AntDesign name="close" size={30} color={"#373737"} onPress={() => closeWithdrawElement()} />
                    </View>
                    <View style={styles.inputContainer}>
                        <View style={styles.inputFrame}>
                            <TextInput value={amount > 0 ? String(amount) : ""} onChangeText={(value) => handleAmount(parseInt(value))} style={styles.input} keyboardType={'number-pad'} placeholder="00.00" placeholderTextColor={"#B7BFC8"} />
                        </View>
                        <Text style={styles.withdrawNote}>Note: A {isProbation ? '15' : serviceChargePct}% amount will be deducted from the withdrawing amount as a service charge</Text>
                        {isAmountError ?
                            <Text style={styles.errTxt}>{amountError}</Text>
                            :
                            null
                        }
                        {coins != 0 ?
                            isCoinsAdded ?
                                <View style={{ alignSelf: 'center', justifyContent: 'center', alignItems: 'center' }}>
                                    <TouchableOpacity style={styles.removeCoinBtn} onPress={() => removeCoins()}>
                                        <Image source={require('../assets/images/coin.png')} style={styles.coinBtnImage} />
                                        <Text style={styles.removeCoinBtnTxt}>Remove{'\n'}Coins</Text>
                                    </TouchableOpacity>
                                    <Text style={{ ...styles.errTxt, ...{ color: '#4C9A2A', } }}>{coins} coins will be added to the withdrawal amount</Text>
                                </View>
                                :
                                <TouchableOpacity style={styles.coinBtn} onPress={() => addCoins()}>
                                    <Image source={require('../assets/images/coin.png')} style={styles.coinBtnImage} />
                                    <Text style={styles.coinBtnTxt}>Add Coins</Text>
                                </TouchableOpacity>

                            : null}
                        <View style={{ ...styles.btnContainer, ...{ marginTop: 40 } }}>
                            {isAmountEmpty ? <Text style={{ ...styles.errTxt, ...{ marginBottom: 5 } }}>Please add the amount to withdraw</Text> : null}
                            <TouchableOpacity style={styles.btn} onPress={() => handleWithdraw()}>
                                <Text style={styles.btnTxt}>Withdraw</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Animated.View>
            {isElementOpen ? <View style={styles.screenCover} /> : null}
            {isError ? <ErrorPopup closeModal={() => setIsError(false)} /> : null}
            {isLoading ? <AppLoader /> : null}
            {isBanAccAvailable ? <BankAccountPopUp createAccount={() => navigate()} closeBankPopUp={() => setIsBanAccAvailable(false)} /> : null}
        </SafeAreaView>
    )
}

const DebitCard: React.FC<any> = ({ id, date, amount, coins, total }) => {
    return (
        <View style={styles.card}>
            <View style={{ width: '60%', flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={styles.cardTxt}>{id}</Text>
                <Text style={styles.cardTxt}>{date}</Text>
                <Text style={styles.cardTxt}>{amount}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', width: 40 }}>
                    <Image source={require('../assets/images/coin.png')} style={{ ...styles.coinBtnImage, ...{ width: '50%', height: '70%' } }} />
                    <Text style={styles.cardTxt}>{coins}</Text>
                </View>
            </View>
            <View style={{ width: '40%', alignItems: 'flex-end' }}>
                <Text style={styles.debitTxt}>+{total}</Text>
            </View>
        </View>
    )
}


const CreditCard: React.FC<any> = ({ id, date, amount, coins, service_charge, total }) => {
    return (
        <View style={styles.card}>
            <View style={{ width: '60%', flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={styles.cardTxt}>{id}</Text>
                <Text style={styles.cardTxt}>{date}</Text>
                <Text style={styles.cardTxt}>{amount}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', width: 40 }}>
                    <Image source={require('../assets/images/coin.png')} style={{ ...styles.coinBtnImage, ...{ width: '50%', height: '70%' } }} />
                    <Text style={styles.cardTxt}>{coins}</Text>
                </View>
            </View>
            <View style={{ width: '40%', justifyContent: 'space-between', flexDirection: 'row' }}>
                <Text style={styles.serviceTxt}>{service_charge}</Text>
                <Text style={styles.creditTxt}>-{total}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    message: {
        textAlign: 'right',
        fontSize: 10,
        fontWeight: '400',
        color: '#FFF'
    },

    messageBox: {
        backgroundColor: '#FF7A66',
        padding: 5,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#FF4122'
    },

    messageContainer: {
        width: '90%',
        alignItems: 'flex-end',
        paddingRight: 30
    },

    topContainer: {
        width: Dimensions.get('window').width,
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'center'
    },

    withdrawNote: {
        fontSize: 12,
        textAlign: 'center',
        fontWeight: '500',
        color: '#FE8235'
    },

    btnLoader: {
        width: '100%',
        height: '100%'
    },

    creditTxt: {
        fontSize: 12,
        color: '#FF4122',
        fontWeight: '600',
    },

    serviceTxt: {
        fontSize: 12,
        color: '#FE8235',
        fontWeight: '600',
    },

    debitTxt: {
        fontSize: 12,
        color: '#4C9A2A',
        fontWeight: '600',
    },

    cardTxt: {
        fontSize: 12,
        color: '#373737',
        fontWeight: '600'
    },

    card: {
        width: '100%',
        flexDirection: 'row',
        paddingHorizontal: 10,
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderColor: '#9AA5B1'
    },

    removeCoinBtnTxt: {
        fontSize: 14,
        color: '#FFF',
        fontWeight: '600',
        textAlign: 'center',
        marginLeft: 10
    },

    removeCoinBtn: {
        marginTop: 30,
        marginBottom: 5,
        height: 50,
        width: 130,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: '#373737',
        borderRadius: 20,
        elevation: 5,
        padding: 5
    },

    coinBtnImage: {
        height: '100%',
        width: '20%',
        resizeMode: 'contain'
    },

    coinBtnTxt: {
        fontSize: 16,
        color: '#373737',
        fontWeight: '600'
    },

    coinBtn: {
        marginTop: 30,
        marginBottom: 5,
        height: 50,
        width: 130,
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: '#FE8235',
        borderRadius: 20,
        elevation: 5,
        padding: 10
    },

    errTxt: {
        color: '#FF4122',
        fontWeight: '500',
        fontSize: 12
    },

    input: {
        width: '100%',
        textAlign: 'center',
        fontSize: 40,
        padding: 5,
        fontWeight: '500',
        color: '#FE8235'
    },

    inputFrame: {
        borderBottomColor: '#FE8235',
        borderBottomWidth: 2,
        width: 200,
        height: 60,
        justifyContent: 'flex-end'
    },

    inputContainer: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },

    screenCover: {
        position: 'absolute',
        zIndex: 1,
        backgroundColor: 'rgba(0, 0, 0, .4)',
        width: '100%',
        height: '100%'
    },

    closeBtnContainer: {
        width: '100%',
        padding: 10,
        alignItems: 'flex-end'
    },

    withdrawElement: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#FFF',
        height: '40%',
        width: '100%',
        elevation: 20,
        borderTopLeftRadius: 30,
        borderTopEndRadius: 30,
    },

    withdrawElementContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '115%',
        width: '100%',
        zIndex: 2
    },

    coinTxt: {
        fontSize: 18,
        color: '#373737',
        fontWeight: '700',
    },

    coinImg: {
        height: '80%',
        width: '10%',
        resizeMode: 'contain'
    },

    coinContainer: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        height: 25
    },

    noHistoryTxt: {
        textAlign: 'center',
        fontStyle: 'italic',
        fontWeight: '500',
        fontSize: 14,
        color: '#9AA5B1',
    },

    scroll: {
        width: '100%'
    },

    historyTxt: {
        textAlign: 'center',
        fontSize: 14,
        color: '#373737',
        fontStyle: 'italic',
        marginBottom: 10
    },

    btnTxt: {
        fontSize: 20,
        fontWeight: '500',
        color: '#FFF'
    },

    btn: {
        width: '60%',
        backgroundColor: '#62C837',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        paddingVertical: 15,
        elevation: 5,
        height: 55
    },

    btnContainer: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 30,
        paddingBottom: 15
    },

    amountOval: {
        backgroundColor: '#FE8235',
        width: '90%',
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10
    },

    dateTxt: {
        fontSize: 12,
        color: '#373737',
        fontWeight: '600',
        marginBottom: 10
    },

    amountTxt: {
        fontSize: 50,
        fontWeight: '600',
        color: '#FFF',
    },

    amountContainer: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 50
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
        width: '10%',
        height: 50,
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
});

export default MyWallet;