import React, { useEffect } from "react";
import { Image, SafeAreaView, StyleSheet, Text, View } from "react-native";
import extStyles from "../global/styles/extStyles";
import * as Animatable from 'react-native-animatable';

const Splash = (props: any) => {

    const AnimatedImage = Animatable.createAnimatableComponent(Image);
    const AnimatedView = Animatable.createAnimatableComponent(View);

    async function initialRoute() {
        props.navigation.reset({
            index: 0,
            routes: [{name: "Login"}]
        })
    } 

    useEffect(() => {
        setTimeout(() => {
            initialRoute();
        }, 5000);
    })

    return (
        <SafeAreaView style={extStyles.body}>
            <AnimatedView style={styles.mainContainer} delay={5000} animation='fadeOutLeft'>
                <View style={styles.imageContainer}>
                    <AnimatedImage source={require('./../assets/images/logo_white-01.png')} animation='zoomIn' duration={5000} style={styles.image} />
                </View>
            </AnimatedView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    image: {
        width: '70%',
        height: '100%',
        resizeMode: 'center'
    },

    imageContainer: {
        height: 300,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },

    mainContainer: {
        flex: 1,
        backgroundColor: '#F2994A',
        alignItems: 'center',
        justifyContent: 'center'
    },
})

export default Splash;