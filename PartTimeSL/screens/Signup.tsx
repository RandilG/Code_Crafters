import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import extStyles from "../global/styles/extStyles";
import { StyleSheet, Text, View } from "react-native";

const Signup = (props: any) => {
    return(
        <SafeAreaView style={extStyles.body}>
            <View style={styles.mainContainer}>
                <View style={styles.headerContainer}>

                </View>
                <View style={styles.bottomConatiner}>

                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    bottomConatiner: {
        flex: 4,
        width: '100%',
        backgroundColor: '#FF0'
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
})

export default Signup;