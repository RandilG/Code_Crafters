import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import extStyles from "../global/styles/extStyles";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import { setErrorMsg, setErrorTitle } from "../global/variable";
import Modal from 'react-native-modal';
import Entypo from "react-native-vector-icons/Entypo";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import JobDescription from "../components/JobDescription";
import ErrorPopup from "../components/ErrorPopUp";
import AppLoader from "../components/AppLoader";
import EncryptedStorage from "react-native-encrypted-storage";
import axios, { HttpStatusCode } from "axios";
import { server } from "../service/constant";
import JobCancelPopUp from "../components/JobCancelPopUp";
import socket from "../service/socket";
import moment from "moment";

const AppliedJobs = (props: any) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);

    const [jobs, setJobs] = useState<any[]>();
    const [userName, setUserName] = useState<string>();

    async function getJobs() {
        try {
            const session = await EncryptedStorage.getItem('session');
            let uName: string = '';
            if (session) uName = JSON.parse(session).userName;
            setUserName(uName);
            const resp = await axios.get(server + `appliedJobs/${uName}`);
            if (resp.data !== HttpStatusCode.NotFound && resp.data !== HttpStatusCode.InternalServerError) {
                setJobs(resp.data);
                setIsLoading(false);
            } else if (resp.data === HttpStatusCode.InternalServerError) {
                setErrorTitle("Oops...!!");
                setErrorMsg("Something went wrong");
                setIsError(true);
                setIsLoading(false);
            }
            setIsLoading(false);
        } catch (error) {
            console.log(error);
            setErrorTitle("Oops...!!");
            setErrorMsg("Something went wrong");
            setIsError(true);
            setIsLoading(false);
        }
    }

    useEffect(() => {
        setIsLoading(true);
        getJobs();
    }, [])

    return (
        <SafeAreaView style={extStyles.body}>
            <View style={styles.mainContainer}>
                <View style={styles.headerContainer}>
                    <View style={styles.backBtnContainer}>
                        <AntDesign name="left" size={30} color={"#FFF"} onPress={() => props.navigation.goBack()} />
                    </View>
                    <View style={styles.titleContainer}>
                        <Text style={styles.titleTxt}>
                            Applied Jobs
                        </Text>
                        <Text style={styles.subHeadingTxt}>
                            Your targets in sight
                        </Text>
                    </View>
                </View>
                <View style={styles.bottomConatiner} />
                <View style={styles.scrollContainer}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        {jobs ?
                            jobs.map((item, index) => (
                                <JobCard key={index} userName={userName} job_id={item.job_id} title={item.title} hRate={item.hourly_rate} wHours={item.work_hours} income={item.income} longitude={item.longitude} latitude={item.latitude} date={item.job_date} time={item.start_time} description={item.description} setIsError={setIsError} setIsLoading={setIsLoading} props={props} />
                            ))
                            :
                            <Text style={styles.noContentTxt}>No Content</Text>
                        }
                    </ScrollView>
                </View>
            </View>
            {isError ? <ErrorPopup closeModal={() => setIsError(false)} /> : null}
            {isLoading ? <AppLoader /> : null}
        </SafeAreaView>
    )
}

const JobCard: React.FC<any> = ({ userName, job_id, title, hRate, wHours, income, longitude, latitude, date, time, description, setIsError, setIsLoading, props }) => {
    const [isMapView, setIsMapView] = useState<boolean>(false);
    const [isDescView, setIsDescView] = useState<boolean>(false);
    const [isCancel, setIsCancel] = useState<boolean>(false);

    //Select map region through job's coordinate
    const region = {
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: 0.0422,
        longitudeDelta: 0.0221
    }

    const [timer, setTimer] = useState(0);
    const [isCancelDisable, setIsCancelDisable] = useState<boolean>(false);

    useEffect(() => {
        const currentDate = moment().format('YYYY/MM/DD');
        if (currentDate === date) {
            setIsCancelDisable(true);
            socket.emit('joinJobRoom', job_id);

            socket.on('timerStarted', (data) => {
                setTimer(data.timer);
            });

            return () => {
                socket.off('timerStarted');
            };
        }
    }, [])

    return (
        <View style={styles.card}>
            <View style={{ ...styles.dataContainer, ...{ marginBottom: 5 } }}>
                <View style={styles.divider}>
                    <Text style={styles.cardTitle}>{title}</Text>
                </View>
                {timer != 0 ?
                    <View style={{ ...styles.divider, ...{ alignItems: 'flex-end', height: 30 } }}>
                        <Text style={styles.progressTxt}>Job in progress</Text>
                        <Text style={styles.timerTxt}>{timer}</Text>
                    </View>
                    :
                    null
                }
            </View>
            <View style={styles.dataContainer}>
                <View style={styles.divider}>
                    <Text style={styles.attrTxt}>Hourly Rate:{' '}<Text style={styles.valueTxt}>Rs.{hRate}</Text></Text>
                    <Text style={styles.attrTxt}>Work Hours:{' '}<Text style={styles.valueTxt}>{wHours}</Text></Text>
                    <Text style={styles.attrTxt}>Total Income:{' '}<Text style={styles.valueTxt}>Rs.{income}</Text></Text>
                </View>
                <View style={styles.divider}>
                    <Text style={styles.attrTxt}>Location:{' '}
                        <Text style={styles.mapTxt} onPress={() => setIsMapView(true)}>Map{' '}
                            <Entypo name={"pin"} />
                        </Text>
                    </Text>
                    <Text style={styles.attrTxt}>Job Date:{' '}<Text style={styles.valueTxt}>{date}</Text></Text>
                    <Text style={styles.attrTxt}>Start Time:{' '}<Text style={styles.valueTxt}>{time}</Text></Text>
                </View>
            </View>
            <View style={styles.btnContainer}>
                <TouchableOpacity style={{...styles.cancelBtn, ...{opacity: isCancelDisable ? 0.6 : 1}}} onPress={() => setIsCancel(true)} disabled={isCancelDisable}>
                    <Text style={styles.btnTxt}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ ...styles.descBtn, ...{ opacity: !description ? 0.6 : 1 } }} onPress={() => setIsDescView(true)} disabled={!description}>
                    <Text style={styles.btnTxt}>Description</Text>
                </TouchableOpacity>
            </View>
            <Modal isVisible={isMapView} backdropOpacity={0.7} style={styles.modal} animationIn={'fadeIn'} animationOut={'fadeOut'} animationInTiming={500} animationOutTiming={500}>
                <View style={styles.mapContainer}>
                    <MapView
                        provider={PROVIDER_GOOGLE}
                        style={StyleSheet.absoluteFillObject}
                        region={region}
                        loadingEnabled={true}
                        loadingIndicatorColor="#F2994A"
                    >
                        <Marker key={0} coordinate={{ latitude: latitude, longitude: longitude }} title={"Your Job is Here"} icon={require('../assets/images/map_pin.png')} />
                    </MapView>
                </View>
                <TouchableOpacity style={styles.mapCloseBtn} onPress={() => setIsMapView(false)}>
                    <Text style={styles.btnTxt}>Close</Text>
                </TouchableOpacity>
            </Modal>
            {isDescView ? <JobDescription description={description} closeDesc={() => setIsDescView(false)} /> : null}
            {isCancel ? <JobCancelPopUp colseConfirm={() => setIsCancel(false)} proceedJob={() => console.log("Clicked")} /> : null}
        </View>

    )
}

const styles = StyleSheet.create({
    progressTxt: {
        fontSize: 10,
        margin: 0,
        lineHeight: 10,
        fontWeight: '400',
        color: '#4C9A2A',
    },

    timerTxt: {
        color: '#373737',
        fontSize: 23,
        fontWeight: '700'
    },

    cancelBtn: {
        width: 100,
        height: 35,
        backgroundColor: '#FF4747',
        borderRadius: 10,
        elevation: 3,
        justifyContent: 'center',
        alignItems: 'center'
    },

    btnTxt: {
        color: '#FFF',
        fontWeight: '600',
        fontSize: 12
    },

    descBtn: {
        width: 100,
        height: 35,
        backgroundColor: '#373737',
        borderRadius: 10,
        elevation: 3,
        justifyContent: 'center',
        alignItems: 'center'
    },

    btnContainer: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },

    mapTxt: {
        fontWeight: '400',
        color: '#F2994A',
        fontStyle: 'italic',
        textDecorationLine: 'underline'
    },

    rateTxt: {
        fontSize: 10,
        color: '#373737',
        fontWeight: '300'
    },

    valueTxt: {
        fontWeight: '400'
    },

    attrTxt: {
        fontSize: 13,
        color: '#373737',
        fontWeight: '800'
    },

    noContentTxt: {
        textAlign: 'center',
        fontStyle: 'italic',
        fontWeight: '500',
        fontSize: 14,
        color: '#9AA5B1'
    },

    newPosterTxt: {
        fontSize: 14,
        color: '#4C9A2A',
        fontWeight: '400'
    },

    mapCloseBtn: {
        width: 110,
        height: 40,
        backgroundColor: '#FF4122',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center'
    },

    mapContainer: {
        width: '100%',
        height: 400,
        backgroundColor: '#FFF',
        justifyContent: 'flex-end',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#FE8235',
        marginBottom: 20
    },

    modal: {
        justifyContent: 'center',
        alignItems: 'center'
    },

    divider: {
        width: '50%',
    },

    dataContainer: {
        flexDirection: 'row'
    },

    cardTitle: {
        fontSize: 22,
        fontWeight: '700',
        color: '#FE8235'
    },

    card: {
        height: 160,
        backgroundColor: '#FFF',
        borderRadius: 10,
        elevation: 5,
        padding: 10,
        marginBottom: 15,
        marginHorizontal: 10
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

export default AppliedJobs;