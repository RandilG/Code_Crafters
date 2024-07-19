import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";

const DeleteAccountPopUp = (props: any) => {
    return (
        <Modal isVisible={true} backdropOpacity={0.7} style={styles.modal} animationIn={'fadeIn'} animationOut={'fadeOut'} animationInTiming={500} animationOutTiming={500}>
            <View style={styles.container}>
                <Text style={styles.title}>Confirmation</Text>
                <Text style={styles.message}>Before proceeding, would you like to confirm that you want to delete account permenantly?</Text>
                <View style={styles.btnContainer}>
                    <TouchableOpacity style={styles.cancelBtn} onPress={() => props.colseConfirm()}>
                        <Text style={styles.btnTxt}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.okBtn} onPress={() => props.proceedDelete()}>
                        <Text style={styles.btnTxt}>OK</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
};

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
        fontSize: 18
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
        height: 200,
        backgroundColor: '#FFF',
        borderRadius: 15,
        padding: 15
    },

    modal: {
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default DeleteAccountPopUp;