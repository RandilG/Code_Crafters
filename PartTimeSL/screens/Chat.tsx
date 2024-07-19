import React, { useEffect } from "react";
import { BackHandler, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import extStyles from "../global/styles/extStyles";
import { View } from "react-native";
import LottieView from "lottie-react-native";

const Chat = (props:any) => {
    //Handle back event
    useEffect(() => {
        const backAction = () => {
            props.navigation.reset({
                index: 0,
                routes: [{
                    name: 'Dashboard',
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
    return(
        <SafeAreaView style={extStyles.body}>
            <View style={styles.container}>
                <View style={styles.lottieContainer}>
                    <LottieView source={require('../assets/jsons/coming_soon.json')} autoPlay loop style={styles.lottie}/>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    lottie: {
        width: '100%',
        height: '100%'
    },

    lottieContainer: {
        width: '100%',
        height: 300,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    },

    container: {
        flex: 1,
        backgroundColor: '#F2994A',
        justifyContent: 'center',
        alignItems: 'center'
    },
});

export default Chat;