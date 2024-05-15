import React, { useEffect, useState } from "react";
import { Dimensions, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
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
import { Dropdown } from "react-native-element-dropdown";
import moment from "moment";

const Jobs = (props: any) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);
    const [userName, setUserName] = useState<string>();

    const [jobs, setJobs] = useState<any[]>();

    //Get all the available jobs for the seeker
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

    //Handle search jobs
    const [filteredJobs, setFilteredJobs] = useState<any[]>([]);
    function filterJobs(value: string) {
        if (value) {
            if (jobs) {
                const filteredData = jobs.filter((j) => String(j.title).toLowerCase().includes(value.toLowerCase()));
                if (filteredData.length != 0) {
                    setFilteredJobs(filteredData);
                } else {
                    setFilteredJobs(['none']);
                }
            }
        } else {
            setFilteredJobs([]);
        }
    }

    const [selectedSortMethod, setSelectedSortMethod] = useState<string>('1');

    //Handle sort of job cards
    function sortJobs(method: string) {
        let sortedJobs: any[];
        if(!jobs){
            return
        }
        switch (method) {
            case '1':
                sortedJobs = [...jobs].sort((a, b) => moment(a.job_date, 'YYYY-MM-DD').valueOf() - moment(b.job_date, 'YYYY-MM-DD').valueOf());
                setJobs(sortedJobs);
                sortedJobs = [...filteredJobs].sort((a, b) => moment(a.job_date, 'YYYY-MM-DD').valueOf() - moment(b.job_date, 'YYYY-MM-DD').valueOf());
                setFilteredJobs(sortedJobs);
                break;
            case '2':
                sortedJobs = [...jobs].sort((a, b) => moment(b.job_date, 'YYYY-MM-DD').valueOf() - moment(a.job_date, 'YYYY-MM-DD').valueOf());
                setJobs(sortedJobs);
                sortedJobs = [...filteredJobs].sort((a, b) => moment(b.job_date, 'YYYY-MM-DD').valueOf() - moment(a.job_date, 'YYYY-MM-DD').valueOf());
                setFilteredJobs(sortedJobs);
                break;
            case '3':
                sortedJobs = [...jobs].sort((a, b) => Number(b.income) - Number(a.income));
                setJobs(sortedJobs);
                sortedJobs = [...filteredJobs].sort((a, b) => Number(b.income) - Number(a.income));
                setFilteredJobs(sortedJobs);
                break;
            case '4':
                sortedJobs = [...jobs].sort((a, b) => Number(a.income) - Number(b.income));
                setJobs(sortedJobs);
                sortedJobs = [...filteredJobs].sort((a, b) => Number(a.income) - Number(b.income));
                setFilteredJobs(sortedJobs);
                break;
            case '5':
                sortedJobs = [...jobs].sort((a, b) => Number(a.work_hours) - Number(b.work_hours));
                setJobs(sortedJobs);
                sortedJobs = [...filteredJobs].sort((a, b) => Number(a.work_hours) - Number(b.work_hours));
                setFilteredJobs(sortedJobs);
                break;
            case '6':
                sortedJobs = [...jobs].sort((a, b) => Number(b.work_hours) - Number(a.work_hours));
                setJobs(sortedJobs);
                sortedJobs = [...filteredJobs].sort((a, b) => Number(b.work_hours) - Number(a.work_hours));
                setFilteredJobs(sortedJobs);
                break;
            case '7':
                sortedJobs = [...jobs].sort((a, b) => Number(b.rates) - Number(a.rates));
                setJobs(sortedJobs);
                sortedJobs = [...filteredJobs].sort((a, b) => Number(b.rates) - Number(a.rates));
                setFilteredJobs(sortedJobs);
                break;
            default:
                break;
        }

        setSelectedSortMethod(method);
    }

    const dropDownData = [
        { label: 'Job Date Nearest to Farthest', value: '1' },
        { label: 'Job Date Farthest to Nearest', value: '2' },
        { label: 'Income High to Low', value: '3' },
        { label: 'Income Low to High', value: '4' },
        { label: 'Work Hours Low to High', value: '5' },
        { label: 'Work Hours High to Low', value: '6' },
        { label: 'Top Rated Posters', value: '7' },
    ];

    return (
        <SafeAreaView style={extStyles.body}>
            <View style={styles.mainContainer}>
                <View style={styles.headerContainer}>
                    <View style={styles.titleContainer}>
                        <View style={styles.backBtnContainer}>
                            <AntDesign name="left" size={30} color={"#FFF"} onPress={() => props.navigation.goBack()} />
                        </View>
                        <View style={styles.sortConatiner}>
                            <Text style={styles.rateTxt}>Sort By:{' '}</Text>
                            <Dropdown
                                data={dropDownData}
                                labelField={"label"}
                                valueField={"value"}
                                value={selectedSortMethod}
                                search={false}
                                onChange={(item) => sortJobs(item.value)}
                                style={styles.sortDropDown}
                                placeholderStyle={{ fontSize: 10 }}
                                selectedTextStyle={{ fontSize: 10 }}
                                itemTextStyle={styles.itemTextStyles}
                                maxHeight={200}
                                autoScroll={false}
                            />
                        </View>
                    </View>
                    <View style={styles.titleContainer}>
                        <View style={{ width: '40%' }}>
                            <Text style={styles.titleTxt}>
                                Jobs
                            </Text>
                            <Text style={styles.subHeadingTxt}>
                                Your path starts here
                            </Text>
                        </View>
                        <View style={{ width: '60%', alignItems: 'flex-end' }}>
                            <View style={styles.serachContainer}>
                                <View style={styles.elementContainer}>
                                    <TextInput placeholder="Search jobs by title" style={styles.searchElement} onChangeText={(value) => filterJobs(value)} />
                                </View>
                                <View style={styles.searchIconContainer}>
                                    <AntDesign name="search1" size={20} color={"#9AA5B1"} />
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={styles.bottomConatiner} />
                <View style={styles.scrollContainer}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        {jobs && filteredJobs.length == 0 ?
                            jobs.map((item, index) => (
                                <JobCard key={index} userName={userName} job_id={item.job_id} title={item.title} hRate={item.hourly_rate} wHours={item.work_hours} income={item.income} longitude={item.longitude} latitude={item.latitude} date={item.job_date} time={item.start_time} description={item.description} rates={item.rates} setIsError={setIsError} setIsLoading={setIsLoading} props={props} />
                            ))
                            : filteredJobs.length != 0 && filteredJobs[0] != 'none' ?
                                filteredJobs.map((item, index) => (
                                    <JobCard key={index} userName={userName} job_id={item.job_id} title={item.title} hRate={item.hourly_rate} wHours={item.work_hours} income={item.income} longitude={item.longitude} latitude={item.latitude} date={item.job_date} time={item.start_time} description={item.description} rates={item.rates} setIsError={setIsError} setIsLoading={setIsLoading} props={props} />
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
    const [isApply, setIsApply] = useState<boolean>(false);

    //Select map region through job's coordinate
    const region = {
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: 0.0422,
        longitudeDelta: 0.0221
    }

    //Handle apply process of the job
    async function proceedJob() {
        try {
            setIsApply(false);
            setIsLoading(true);
            const resp = await axios.post(server + 'applyJob', { userName: userName, jobId: job_id });
            if (resp.data === HttpStatusCode.Ok) {
                props.navigation.reset({
                    index: 0,
                    routes: [{ name: 'ApplyJob', params: { jobId: job_id, title: title, date: date, time: time, wHours: wHours, latitude: latitude, longitude: longitude } }]
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
                                <MaterialIcons name={"star"} size={18} color={'#FCE404'} />
                                <MaterialIcons name={"star"} size={18} color={rates>=2 ? '#FCE404' : '#C3C3C3'} />
                                <MaterialIcons name={"star"} size={18} color={rates>=3 ? '#FCE404' : '#C3C3C3'} />
                                <MaterialIcons name={"star"} size={18} color={rates>=4 ? '#FCE404' : '#C3C3C3'} />
                                <MaterialIcons name={"star"} size={18} color={rates==5 ? '#FCE404' : '#C3C3C3'} />
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
                <TouchableOpacity style={{ ...styles.descBtn, ...{ opacity: !description ? 0.6 : 1 } }} onPress={() => setIsDescView(true)} disabled={!description}>
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

    itemTextStyles: {
        fontSize: 10,
        color: '#373737',
    },

    sortDropDown: {
        width: 150,
        height: 30,
        backgroundColor: 'rgba(255, 255, 255, .5)',
        borderRadius: 5,
        paddingLeft: 5
    },

    sortConatiner: {
        width: '80%',
        justifyContent: 'flex-end',
        alignItems: 'center',
        flexDirection: 'row'
    },

    topContainer: {
        width: Dimensions.get('window').width,
        height: 50,
        flexDirection: 'row',
    },

    searchElement: {
        width: '100%',
        fontSize: 14,
        color: '#373737'
    },

    searchIconContainer: {
        width: '15%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },

    elementContainer: {
        width: '85%',
        height: '100%',
        justifyContent: 'center'
    },

    serachContainer: {
        width: 200,
        height: 40,
        backgroundColor: '#FFF',
        borderRadius: 5,
        flexDirection: 'row'
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
        marginTop: 160,
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
        paddingHorizontal: 20,
        width: Dimensions.get('window').width,
        height: 50,
        left: 50,
        justifyContent: 'center',
        marginTop: 15,
        flexDirection: 'row',
        alignItems: 'center'
    },

    backBtnContainer: {
        width: '20%',
        height: 50,
        justifyContent: 'center',
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