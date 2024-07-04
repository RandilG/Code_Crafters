import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";

const CancelProceedPopUp = (props: any) => {
    return (
        <Modal isVisible={true} backdropOpacity={0.7} style={styles.modal} animationIn={'fadeIn'} animationOut={'fadeOut'} animationInTiming={500} animationOutTiming={500}>
            <View style={styles.container}>
                <Text style={styles.title}>Cancellation Notice</Text>
                <Text style={styles.message}>You cannot cancel this job as it is less than two days before the job date. This job will not be cancelled until the admin proceedings.</Text>
                <View style={styles.btnContainer}>
                    <TouchableOpacity style={styles.okBtn} onPress={() => props.navigate()}>
                        <Text style={styles.btnTxt}>OK</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
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
        height: 230,
        backgroundColor: '#FFF',
        borderRadius: 15,
        padding: 15
    },

    modal: {
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default CancelProceedPopUp;