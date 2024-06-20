import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";

const BankAccountPopUp = (props: any) => {
    return (
        <Modal isVisible={true} backdropOpacity={0.7} style={styles.modal} animationIn={'fadeIn'} animationOut={'fadeOut'} animationInTiming={500} animationOutTiming={500}>
            <View style={styles.container}>
                <Text style={styles.title}>Create Bank Account</Text>
                <Text style={styles.message}>You have not added any bank account to transfer your payments. Please include account details first to initiate transactions.</Text>
                <View style={styles.btnContainer}>
                    <TouchableOpacity style={styles.cancelBtn} onPress={() => props.closeBankPopUp()}>
                        <Text style={styles.btnTxt}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.okBtn} onPress={() => props.createAccount()}>
                        <Text style={styles.btnTxt}>Add Account</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    okBtn: {
        width: 100,
        height: 35,
        backgroundColor: '#FE8235',
        borderRadius: 10,
        elevation: 3,
        justifyContent: 'center',
        alignItems: 'center'
    },

    btnTxt: {
        color: '#FFF',
        fontWeight: '600',
        fontSize: 14
    },

    cancelBtn: {
        width: 100,
        height: 35,
        backgroundColor: '#373737',
        borderRadius: 10,
        elevation: 3,
        justifyContent: 'center',
        alignItems: 'center'
    },

    btnContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around'
    },

    message: {
        color: '#373737',
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 10
    },

    title: {
        fontSize: 25,
        fontWeight: '800',
        color: '#FE8235',
        textAlign: 'center',
        marginBottom: 10
    },

    container: {
        width: '100%',
        backgroundColor: '#FFF',
        borderRadius: 15,
        padding: 15
    },

    modal: {
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default BankAccountPopUp;