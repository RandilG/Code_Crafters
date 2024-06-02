import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { StyleSheet } from "react-native";
import Modal from "react-native-modal";
import Ionicons from "react-native-vector-icons/Ionicons";

const RateReview = (props: any) => {
    return(
        <Modal isVisible={true} backdropOpacity={0.7}  style={styles.modal} animationIn={'fadeIn'} animationOut={'fadeOut'} animationInTiming={500} animationOutTiming={500}>
            <View style={styles.container}>
                <Text style={styles.title}>Rate & Review</Text>
                <View style={styles.starContainer}>
                    <Ionicons name="star" size={30} color={props.rate >= 1 ? "#FCE404" : "#C3C3C3"}/>
                    <Ionicons name="star" size={30} color={props.rate >= 2 ? "#FCE404" : "#C3C3C3"}/>
                    <Ionicons name="star" size={30} color={props.rate >= 3 ? "#FCE404" : "#C3C3C3"}/>
                    <Ionicons name="star" size={30} color={props.rate >= 4 ? "#FCE404" : "#C3C3C3"}/>
                    <Ionicons name="star" size={30} color={props.rate == 5 ? "#FCE404" : "#C3C3C3"}/>
                </View>
                <View style={styles.reviewConatiner}>
                    {props.review === "" ?
                        <Text style={styles.noReviewTxt}>No Review Posted</Text>
                        :
                        <Text style={styles.reviewTxt}>{props.review}</Text>
                    }
                </View>
                <View style={styles.btnContainer}>
                    <TouchableOpacity style={styles.okBtn} onPress={() => props.closeReview()}>
                        <Text style={styles.btnTxt}>OK</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    reviewTxt: {
        textAlign: 'center',
        fontWeight: '400',
        fontSize: 14,
        color: '#373737'
    },

    noReviewTxt: {
        textAlign: 'center',
        fontStyle: 'italic',
        fontWeight: '500',
        fontSize: 14,
        color: '#373737'
    },

    reviewConatiner: {
        width: '100%',
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },

    starContainer:{
        width: '60%',
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'row',
        alignSelf: 'center'
    },

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

    btnContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 15
    },

    title:{
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

export default RateReview;