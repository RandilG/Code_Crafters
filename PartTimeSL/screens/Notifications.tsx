import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import extStyles from "../global/styles/extStyles";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import socket from "../service/socket";
import ErrorPopup from "../components/ErrorPopUp";
import AppLoader from "../components/AppLoader";
import { setErrorMsg, setErrorTitle } from "../global/variable";
import EncryptedStorage from "react-native-encrypted-storage";
import axios from "axios";
import { server } from "../service/constant";

const Notifications = (props: any) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);

    const [userName, setUserName] = useState<string>("");
    const [notifications, setNotofications] = useState<any[]>([]);

    useEffect(() => {
        setIsLoading(true);
        getData();
    }, []);

    async function getData() {
        try {
            const session = await EncryptedStorage.getItem('session');
            let uName: string = '';
            if (session) uName = JSON.parse(session).userName;
            setUserName(uName);

            const resp = await axios.get(server + `appNotifications/${uName}`);

            setNotofications(resp.data);

            socket.emit('joinCommonNotification');
            socket.emit('joinSeekerNotification', (uName));

            socket.on('allNotifyStarted', (data) => {
                setNotofications((prevItems) => ([data.notification, ...prevItems]));
            });

            socket.on('seekerNotifyStarted', (data) => {
                setNotofications((prevItems) => ([data.notification, ...prevItems]));
            });
            setIsLoading(false);
        } catch (error) {
            console.log(error);
            setErrorTitle("Oops...!!");
            setErrorMsg("Something went wrong");
            setIsError(true);
            setIsLoading(false);
        }
    }
    return (
        <SafeAreaView style={extStyles.body}>
            <View style={styles.mainContainer}>
                <View style={styles.headerContainer}>
                    <View style={styles.backBtnContainer}>
                        <AntDesign name="left" size={30} color={"#FFF"} onPress={() => props.navigation.goBack()} />
                    </View>
                    <View style={styles.titleContainer}>
                        <Text style={styles.titleTxt}>
                            Notifications
                        </Text>
                        <Text style={styles.subHeadingTxt}>
                            Timely Job Updates
                        </Text>
                    </View>
                </View>
                <View style={styles.bottomConatiner} />
                <View style={styles.scrollContainer}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        {notifications.length != 0 ?
                            notifications.map((notification, index) => (
                                <NotifyCard key={index} title={notification.title} message={notification.message} date={notification.date} />
                            ))
                            :
                            <Text style={styles.noContentTxt}>No notifications to show</Text>
                        }
                    </ScrollView>
                </View>
            </View>
            {isError ? <ErrorPopup closeModal={() => setIsError(false)} /> : null}
            {isLoading ? <AppLoader /> : null}
        </SafeAreaView>
    )
}

const NotifyCard: React.FC<any> = ({ title, message, date }) => {
    return (
        <View style={styles.card}>
            <View style={styles.header}>
                <View style={{ width: '60%' }}>
                    <Text style={styles.cardTitle}>{title}</Text>
                </View>
                <View style={{ width: '40%', alignItems: 'flex-end' }}>
                    <Text style={styles.cardDate}>{date}</Text>
                </View>
            </View>
            <View>
                <Text style={styles.message}>
                    {message}
                </Text>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    noContentTxt: {
        textAlign: 'center',
        fontStyle: 'italic',
        fontWeight: '500',
        fontSize: 14,
        color: '#9AA5B1'
    },

    message: {
        fontSize: 14,
        color: '#373737',
        textAlign: 'justify'
    },

    cardDate: {
        fontSize: 14,
        color: '#373737',
        fontWeight: '400'
    },

    cardTitle: {
        fontSize: 18,
        color: '#FE8235',
        fontWeight: '700',
    },

    header: {
        width: '100%',
        flexDirection: 'row'
    },

    card: {
        width: "95%",
        backgroundColor: "#FFF",
        borderRadius: 15,
        elevation: 5,
        marginHorizontal: '2.5%',
        marginBottom: 10,
        padding: 10
    },

    scrollContainer: {
        width: '94%',
        marginHorizontal: '3%',
        height: "80%",
        backgroundColor: '#FFF',
        position: 'absolute',
        elevation: 10,
        borderRadius: 20,
        bottom: 10,
        paddingVertical: 10
    },

    subHeadingTxt: {
        fontSize: 14,
        fontWeight: '300',
        color: '#FFF'
    },

    titleTxt: {
        fontSize: 30,
        fontWeight: '700',
        color: '#FFF'
    },

    titleContainer: {
        paddingLeft: 10,
        width: '100%',
        height: 50,
        left: 50,
        justifyContent: 'center',
        marginTop: 15
    },

    backBtnContainer: {
        paddingLeft: 10,
        width: 40,
        height: 50,
        left: 50,
        justifyContent: 'center'
    },

    bottomConatiner: {
        flex: 4,
        width: '100%',
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
});

export default Notifications;