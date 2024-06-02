import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";
import LottieView from "lottie-react-native";

const CoinPopUp = (props:any) => {
    const navigate = () => {
        props.props.navigation.reset({
            index: 0,
            routes: [{ name: 'Dashboard' }]
        });
    }
    return(
        <Modal isVisible={true} backdropOpacity={0.7}  style={styles.modal} animationIn={'fadeIn'} animationOut={'fadeOut'} animationInTiming={500} animationOutTiming={500}>
            <View style={styles.container}>
                <View style={styles.coinContainer}>
                    <Image source={require('../assets/images/coin.png')} style={styles.coin} />
                </View>
                <Text style={styles.title}>Congratulations</Text>
                <Text style={styles.messageTxt}>You earned {props.coins} coins from{'\n'}this job</Text>
                <View style={styles.btnContainer}>
                    <TouchableOpacity style={styles.okBtn} onPress={navigate}>
                        <Text style={styles.btnTxt}>OK</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
};

const styles=StyleSheet.create({
    okBtn: {
        width: 150,
        height: 50,
        backgroundColor: '#FE8235',
        borderRadius: 10,
        elevation: 3,
        justifyContent: 'center',
        alignItems: 'center'
    },

    btnTxt: {
        color: '#FFF',
        fontWeight: '600',
        fontSize: 20
    },

    btnContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 15
    },

    messageTxt: {
        fontSize: 20,
        color: '#373737',
        textAlign: 'center',
        fontWeight: '600'
    },

    coin: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain'
    },

    coinContainer: {
        width: '100%',
        height: 100,
        justifyContent: 'center',
        alignItems: 'center'
    },

    title:{
        fontSize: 25,
        fontWeight: '800',
        color: '#FE8235',
        textAlign: 'center',
        marginBottom: 10
    },

    container: {
        width: '80%',
        backgroundColor: '#FFF',
        borderRadius: 15,
        padding: 15
    },

    modal: {
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default CoinPopUp;