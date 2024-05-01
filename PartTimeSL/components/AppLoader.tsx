import LottieView from "lottie-react-native";
import React from "react";
import { StyleSheet, View } from "react-native";

const AppLoader = () => {
    return(
        <View style={styles.container}>
            <LottieView source={require('../assets/jsons/app_loader.json')} loop autoPlay style={styles.lottie}/>
        </View>
    )
}

const styles = StyleSheet.create({
    lottie: {
        width: '80%',
        height: '80%'
    },

    container: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FBE3CD',
        position: 'absolute',
        zIndex: 200
    },
});

export default AppLoader;