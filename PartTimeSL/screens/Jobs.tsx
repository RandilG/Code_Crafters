import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import extStyles from "../global/styles/extStyles";
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Entypo from "react-native-vector-icons/Entypo";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import Modal from 'react-native-modal';
import AppLoader from "../components/AppLoader";
import ErrorPopup from "../components/ErrorPopUp";
import { setErrorMsg, setErrorTitle } from "../global/variable";
import axios, { HttpStatusCode } from "axios";
import { server } from "../service/constant";
import EncryptedStorage from "react-native-encrypted-storage";
import JobDescription from "../components/JobDescription";
import JobConfirmPopUp from "../components/JobConfirmPopUp";

const Jobs = (props: any) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);
    const [userName, setUserName] = useState<string>();

    const [jobs, setJobs] = useState<any[]>();

    useEffect(() => {
        if(jobs){
        const filteredData = jobs.filter((j) => String(j.title).toLowerCase().includes('er'));
        for(const job of filteredData){
            console.log(job.title);
        }

    }
    },[jobs])

    async function getJobs() {
        try {
            const gender = await EncryptedStorage.getItem('gender');
            const session = await EncryptedStorage.getItem('session');
            let uName: string = '';
            if (session) uName = JSON.parse(session).userName;
            setUserName(uName);
            const resp = await axios.get(server + 'jobList', { params: { gender: gender, userName: uName } });
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
                            Jobs
                        </Text>
                        <Text style={styles.subHeadingTxt}>
                            Your path starts here
                        </Text>
                    </View>
                </View>
                <View style={styles.bottomConatiner} />
                <View style={styles.scrollContainer}>
                    <ScrollView style={{}} showsVerticalScrollIndicator={false}>
                        {jobs ?
                            jobs.map((item, index) => (
                                <JobCard key={index} userName={userName} job_id={item.job_id} title={item.title} hRate={item.hourly_rate} wHours={item.work_hours} income={item.income} longitude={item.longitude} latitude={item.latitude} date={item.job_date} time={item.start_time} description={item.description} rates={item.rates} setIsError={setIsError} setIsLoading={setIsLoading} props={props}/>
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

const JobCard: React.FC<any> = ({ userName, job_id, title, hRate, wHours, income, longitude, latitude, date, time, description, rates, setIsError, setIsLoading, props }) => {
    const [isMapView, setIsMapView] = useState<boolean>(false);
    const [isDescView, setIsDescView] = useState<boolean>(false);
    const [isDescriptionNull, setIsDescriptionNull] = useState<boolean>(false);
    const [isApply, setIsApply] = useState<boolean>(false);
    const [starsColor, setStartsColor] = useState<any>({
        s1: "#FCE404",
        s2: "#C3C3C3",
        s3: "#C3C3C3",
        s4: "#C3C3C3",
        s5: "#C3C3C3"
    })

    //Select map region through job's coordinate
    const region = {
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: 0.0422,
        longitudeDelta: 0.0221
    }

    //Handle job description and poster's ratings when component rendering
    useEffect(() => {
        if (!description) {
            setIsDescriptionNull(true);
        }
        if (rates != 0) {
            switch (rates) {
                case 5:
                    setStartsColor((prev: any) => ({ ...prev, s2: "#FCE404", s3: "#FCE404", s4: "#FCE404", s5: "#FCE404" }));
                    break;
                case 4:
                    setStartsColor((prev: any) => ({ ...prev, s2: "#FCE404", s3: "#FCE404", s4: "#FCE404" }));
                    break;
                case 3:
                    setStartsColor((prev: any) => ({ ...prev, s2: "#FCE404", s3: "#FCE404" }));
                    break;
                case 2:
                    setStartsColor((prev: any) => ({ ...prev, s2: "#FCE404" }));
                    break;
                default:
                    break;
            }
        }
    }, []);

    //Handle apply process of the job
    async function proceedJob() {
        try {
            setIsApply(false);
            setIsLoading(true);
            const resp = await axios.post(server + 'applyJob', { userName: userName, jobId: job_id });
            if (resp.data === HttpStatusCode.Ok) {
                props.navigation.reset({
                    index: 0,
                    routes: [{ name: 'ApplyJob', params: {jobId: job_id, title:title, date:date, time:time, wHours:wHours, latitude: latitude, longitude: longitude} }]
                });
            } else if (resp.data === HttpStatusCode.Conflict) {
                setErrorTitle("Oops...!!");
                setErrorMsg("Sorry, you have applied for another job at this time slot");
                setIsError(true);
                setIsLoading(false);
            } else {
                setErrorTitle("Oops...!!");
                setErrorMsg("Something went wrong");
                setIsError(true);
                setIsLoading(false);
            }
        } catch (error) {
            setErrorTitle("Oops...!!");
            setErrorMsg("Something went wrong");
            setIsError(true);
            setIsLoading(false);
        }
    }

    return (
        <View style={styles.card}>
            <View style={{ ...styles.dataContainer, ...{ marginBottom: 5 } }}>
                <View style={styles.divider}>
                    <Text style={styles.cardTitle}>{title}</Text>
                </View>
                <View style={{ ...styles.divider, ...{ alignItems: 'flex-end' } }}>
                    {rates != 0 ?
                        <View>
                            <Text style={styles.rateTxt}>Poster Ratings</Text>
                            <View style={{ flexDirection: 'row' }}>
                                <MaterialIcons name={"star"} size={18} color={starsColor.s1} />
                                <MaterialIcons name={"star"} size={18} color={starsColor.s2} />
                                <MaterialIcons name={"star"} size={18} color={starsColor.s3} />
                                <MaterialIcons name={"star"} size={18} color={starsColor.s4} />
                                <MaterialIcons name={"star"} size={18} color={starsColor.s5} />
                            </View>
                        </View>
                        :
                        <Text style={styles.newPosterTxt}>New Poster</Text>
                    }
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
                <TouchableOpacity style={{ ...styles.descBtn, ...{ opacity: isDescriptionNull ? 0.6 : 1 } }} onPress={() => setIsDescView(true)} disabled={isDescriptionNull}>
                    <Text style={styles.btnTxt}>Description</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.applyBtn} onPress={() => setIsApply(true)}>
                    <Text style={styles.btnTxt}>Apply</Text>
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
            {isApply ? <JobConfirmPopUp colseConfirm={() => setIsApply(false)} proceedJob={() => proceedJob()} /> : null}
        </View>

    )
}

const styles = StyleSheet.create({
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

    applyBtn: {
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

export default Jobs;