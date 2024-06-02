import React, { useEffect, useState } from "react";
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import extStyles from "../global/styles/extStyles";
import AntDesign from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";
import Modal from "react-native-modal";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import JobDescription from "../components/JobDescription";
import ErrorPopup from "../components/ErrorPopUp";
import AppLoader from "../components/AppLoader";
import { setErrorMsg, setErrorTitle } from "../global/variable";
import EncryptedStorage from "react-native-encrypted-storage";
import axios, { HttpStatusCode } from "axios";
import { server } from "../service/constant";
import RateReview from "../components/RateReview";

const CompletedJobs = (props: any) => {
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
            const resp = await axios.get(server + `completedJobs/${uName}`);
            if (resp.data !== HttpStatusCode.NotFound && resp.data !== HttpStatusCode.InternalServerError) {
                setJobs(resp.data);
                setIsLoading(false);
            } else {
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
    };

    useEffect(() => {
        setIsLoading(true);
        getJobs();
    }, []);

    return (
        <SafeAreaView style={extStyles.body}>
            <View style={styles.mainContainer}>
                <View style={styles.headerContainer}>
                    <View style={styles.topContainer}>
                        <View style={styles.backBtnContainer}>
                            <AntDesign name="left" size={30} color={"#FFF"} onPress={() => props.navigation.goBack()} />
                        </View>
                        <View style={styles.messageContainer}>
                            <View style={styles.messageBox}>
                                <Text style={styles.message}>**Please Note if to add the earnings to the{'\n'}wallet, you must rate the Job(Employer).</Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.titleContainer}>
                        <Text style={styles.titleTxt}>
                            Completed Jobs
                        </Text>
                        <Text style={styles.subHeadingTxt}>
                            Tasks excelled with precision
                        </Text>
                    </View>
                </View>
                <View style={styles.bottomConatiner} />
                <View style={styles.scrollContainer}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        {jobs ?
                            jobs.map((item, index) => (
                                <JobCard key={index} userName={userName} job_id={item.job_id} title={item.title} hRate={item.hourly_rate} wHours={item.work_hours} income={item.income} longitude={item.longitude} latitude={item.latitude} date={item.job_date} time={item.start_time} description={item.description} props={props} rates={item.rates} review={item.review} />
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
};

const JobCard: React.FC<any> = ({ userName, job_id, title, hRate, wHours, income, longitude, latitude, date, time, description, props, rates, review }) => {
    const [isMapView, setIsMapView] = useState<boolean>(false);
    const [isDescView, setIsDescView] = useState<boolean>(false);
    const [isRateView, setIsRateView] = useState<boolean>(false);

    const navigate = () => {
        props.navigation.navigate('RatePoster', { job_id: job_id });
    }

    //Select map region through job's coordinate
    const region = {
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: 0.0422,
        longitudeDelta: 0.0221
    }

    return (
        <View style={styles.card}>
            <View style={{ ...styles.dataContainer, ...{ marginBottom: 5 } }}>
                <View style={styles.divider}>
                    <Text style={styles.cardTitle}>{title}</Text>
                </View>
                <View style={{ ...styles.divider, ...{ alignItems: 'flex-end' } }}>

                </View>
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
                <TouchableOpacity style={{ ...styles.descBtn, ...{ opacity: !description ? 0.6 : 1 } }} onPress={() => setIsDescView(true)} disabled={!description}>
                    <Text style={styles.btnTxt}>Description</Text>
                </TouchableOpacity>
                {rates ?
                    <TouchableOpacity style={styles.rateBtn} onPress={() => setIsRateView(true)}>
                        <Text style={styles.btnTxt}>View Rate & Review</Text>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity style={styles.makeRateBtn} onPress={navigate}>
                        <Text style={styles.btnTxt}>Make Rate & Review</Text>
                    </TouchableOpacity>
                }
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
            {isRateView ? <RateReview review={review} rate={rates} closeReview={() => setIsRateView(false)}/> : null }
        </View>

    )
}

const styles = StyleSheet.create({
    message: {
        textAlign: 'right',
        fontSize: 10,
        fontWeight: '400',
        color: '#FFF'
    },

    messageBox: {
        backgroundColor: '#FF7A66',
        padding: 5,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#FF4122'
    },

    messageContainer: {
        width: '90%',
        alignItems: 'flex-end',
        paddingRight: 30
    },

    topContainer: {
        width: Dimensions.get('window').width,
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'center'
    },

    timerTxt: {
        color: '#373737',
        fontSize: 25,
        fontWeight: '700'
    },

    makeRateBtn:{
        width: 100,
        height: 35,
        backgroundColor: '#B24501',
        borderRadius: 10,
        elevation: 3,
        justifyContent: 'center',
        alignItems: 'center'
    },

    rateBtn: {
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
        fontSize: 12,
        textAlign: 'center'
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
        width: '50%'
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
        width: '10%',
        height: 50,
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

export default CompletedJobs;