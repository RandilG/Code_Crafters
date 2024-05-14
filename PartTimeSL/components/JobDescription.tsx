import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";

const JobDescription = (props:any) => {
    return(
        <Modal isVisible={true} backdropOpacity={0.7} style={styles.modal} animationIn={'fadeIn'} animationOut={'fadeOut'} animationInTiming={500} animationOutTiming={500}>
            <View style={styles.descContainer}>
                <Text style={styles.descTitleTxt}>Job Description</Text>
                <Text style={styles.descTxt}>
                    {props.description}
                </Text>
                <TouchableOpacity style={styles.btn} onPress={() => props.closeDesc()}>
                    <Text style={styles.btnTxt}>Got It</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    btnTxt: {
        color: '#FFF',
        fontWeight: '600',
        fontSize: 12
    },

    btn: {  
        width: 120,
        height: 40,
        backgroundColor: '#373737',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center'
    },

    descTxt: {
        fontSize: 14,
        color: '#373737',
        fontWeight: '400',
        textAlign: 'justify',
        marginBottom: 10
    },

    descTitleTxt: {
        fontSize: 20,
        fontWeight: '800',
        color: '#FE8235',
        textAlign: 'center',
        marginBottom: 10
    },

    descContainer: {
        width: '100%',
        backgroundColor: '#FFF',
        borderRadius: 15,
        padding: 10
    }, 

    modal: {
        alignItems: 'center',
        justifyContent: 'center'
    }
});


export default JobDescription;