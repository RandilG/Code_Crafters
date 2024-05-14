import React, { useEffect, useState } from "react";
import { Image, SafeAreaView, StyleSheet, Text, View } from "react-native";
import extStyles from "../global/styles/extStyles";
import * as Animatable from 'react-native-animatable';
import EncryptedStorage from "react-native-encrypted-storage";
import axios, { HttpStatusCode } from "axios";
import { server } from "../service/constant";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Splash = (props: any) => {

    const AnimatedImage = Animatable.createAnimatableComponent(Image);
    const AnimatedView = Animatable.createAnimatableComponent(View);

    let session: any;

    //Authorize through the token
    async function initialRoute() {
        try {
            if(session){
                const jsonObj = JSON.parse(session);
                const resp = await axios.get(server + `seekerAuth/${jsonObj.token}/${jsonObj.userName}`);
                if(resp.data === HttpStatusCode.Accepted){
                    props.navigation.reset({
                        index: 0,
                        routes: [{name: "Dashboard"}]
                    })
                }else{
                    props.navigation.reset({
                        index: 0,
                        routes: [{name: "Login"}]
                    })
                }
            }else{
                props.navigation.reset({
                    index: 0,
                    routes: [{name: "Login"}]
                })
            }  
        } catch (error) {
            props.navigation.reset({
                index: 0,
                routes: [{name: "Login"}]
            })
        }
    } 

    //Get login session from encrypted storage
    async function getSession(){
        session = await EncryptedStorage.getItem("session");
    }

    useEffect(() => {
        getSession();
        setTimeout(() => {
            initialRoute();
        }, 5000);
    },[])

    return (
        <SafeAreaView style={extStyles.body}>
            <AnimatedView style={styles.mainContainer} delay={5000} animation='fadeOutLeft'>
                <View style={styles.imageContainer}>
                    <AnimatedImage source={require('./../assets/images/logo_white_3-01.png')} animation='zoomIn' duration={5000} style={styles.image} />
                </View>
            </AnimatedView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    image: {
        width: '50%',
        height: '50%',
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