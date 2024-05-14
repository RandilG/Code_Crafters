import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import extStyles from "../global/styles/extStyles";
import { Text } from "react-native-animatable";
import LottieView from "lottie-react-native";
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import RNCalendarEvents from "react-native-calendar-events";
import moment from "moment";
import { setErrorMsg, setErrorTitle } from "../global/variable";
import ErrorPopup from "../components/ErrorPopUp";

const ApplyJob = (props: any) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);
    const [isEventAdd, setIsEventAdd] = useState<boolean>(false);

    async function addCalendarEvent() {
        try {
            setIsLoading(true);
            const { jobId, title, date, time, wHours, latitude, longitude } = props.route.params;
            const startDate = moment(`${date} ${time}`, 'YYYY/MM/DD h:mm A');
            const endTime = moment(`${date} ${time}`, 'YYYY/MM/DD h:mm A').add(wHours, 'hours');

            //Request permession for calendar access
            await RNCalendarEvents.requestPermissions();

            //Grant permoission to write on calendar
            const permission: string = await RNCalendarEvents.checkPermissions();
            if (permission !== 'authorized') {
                setErrorTitle("Oops...!!");
                setErrorMsg("Access denied to the calendar");
                setIsError(true);
                setIsLoading(false);
                return;
            }

            //Fetch all the calendars that device have
            const calendars = await RNCalendarEvents.findCalendars();

            //Check calendar exist or not
            let isCalAvailable: boolean = false;
            let calId: string = "";
            for (const calendar of calendars) {
                if (calendar.title === "Parttime Jobs") {
                    isCalAvailable = true;
                    calId = calendar.id;
                    break;
                }
            }

            //Create calendar for job events if dosn't exist
            if (!isCalAvailable) {
                calId = await RNCalendarEvents.saveCalendar({ title: "Parttime Jobs", color: "#FE8235", entityType: 'event', name: 'JOBS', accessLevel: 'owner', ownerAccount: 'JOBS', source: { name: 'JOBS', isLocalAccount: true } });
            }

            //Save event on calendar
            await RNCalendarEvents.saveEvent(title, {
                calendarId: calId,
                startDate: startDate.toISOString(),
                endDate: endTime.toISOString(),
                location: `https://www.google.com/maps?q=${latitude},${longitude}`
            });
            setIsEventAdd(true);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
            setErrorTitle("Oops...!!");
            setErrorMsg("Something went wrong");
            setIsError(true);
            setIsLoading(false);
        }
    }

    function navigate() {
        props.navigation.reset({
            index: 0,
            routes: [{ name: 'Dashboard' }]
        });
    }
    return (
        <SafeAreaView style={extStyles.body}>
            <View style={styles.baseContainer}>
                <View style={styles.mainContainer}>
                    <View style={styles.animaContainer}>
                        <LottieView source={require('../assets/jsons/success.json')} loop={false} autoPlay style={styles.anima} />
                    </View>
                    <View style={styles.container}>
                        <Text style={styles.greetingTxt}>Congratulations!</Text>
                        <Text style={styles.headingText}>You have successfully{'\n'}applied to this job</Text>
                        <Text style={{ ...styles.headingText, ...{ marginVertical: 5, color: '#373737' } }}>Kindly arrive on time for your scheduled job</Text>
                        <Text style={{ ...styles.headingText, ...{ marginVertical: 5, color: '#373737', fontSize: 15, fontWeight: '300' } }}>You can  view this job in the{'\n'}Applied Jobs section</Text>
                    </View>
                    <View style={styles.btnContainer}>
                        <TouchableOpacity style={styles.calendarBtn} onPress={() => addCalendarEvent()} disabled={isEventAdd}>
                            {isLoading && !isEventAdd ?
                                <View style={styles.loaderContainer}>
                                    <LottieView source={require('../assets/jsons/btn_loader.json')} loop autoPlay style={styles.btnLoader} />
                                </View>
                            : isEventAdd ?
                                <Text style={styles.calendarBtnTxt}>Done</Text>
                            :
                                <View style={styles.calendarBtn}>
                                    <Text style={styles.calendarBtnTxt}>Add to calendar</Text>
                                    <EvilIcons name="calendar" size={30} color={'#FFF'} style={{ marginBottom: 5 }} />
                                </View>
                            }
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btn} onPress={() => { navigate() }}>
                            <Text style={styles.btnTxt}>OK</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            {isError ? <ErrorPopup closeModal={() => setIsError(false)} /> : null}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    btnLoader: {
        width: '80%',
        height: '80%'
    },

    loaderContainer: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },

    calendarBtnTxt: {
        fontSize: 16,
        fontWeight: '700',
        color: '#FFF'
    },

    calendarBtn: {
        width: 200,
        height: 50,
        backgroundColor: '#373737',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20,
        flexDirection: 'row'
    },

    btnTxt: {
        fontSize: 18,
        fontWeight: '700',
        color: '#FFF'
    },

    btn: {
        width: 200,
        height: 50,
        backgroundColor: '#F2994A',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnContainer: {
        width: '100%',
        height: '10%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20
    },

    headingText: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: '400',
        color: '#F2994A',
        margin: 20
    },

    greetingTxt: {
        fontSize: 35,
        color: '#FE8235',
        fontWeight: '700',
        letterSpacing: 2
    },

    container: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 30
    },

    anima: {
        width: '100%',
        height: '100%'
    },

    animaContainer: {
        width: '100%',
        height: '30%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    mainContainer: {
        width: '80%',
        height: '75%',
        backgroundColor: '#FFF',
        elevation: 10,
        borderRadius: 20,
    },

    baseContainer: {
        flex: 1,
        backgroundColor: '#F2994A',
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default ApplyJob;