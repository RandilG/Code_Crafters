import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import extStyles from "../global/styles/extStyles";
import { Animated, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Image } from "react-native-animatable";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import EncryptedStorage from "react-native-encrypted-storage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Entypo from "react-native-vector-icons/Entypo";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import ErrorPopup from "../components/ErrorPopUp";
import AppLoader from "../components/AppLoader";
import { setErrorMsg, setErrorTitle } from "../global/variable";
import axios, { HttpStatusCode } from "axios";
import { server } from "../service/constant";

const Dashboard = (props: any) => {
    const [carouselWidth, setCarouselWidth] = useState<number>(0);
    const carouselRef = useRef<any>(null);

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);

    let activeIndex: number = 0;

    const startCarouselAutoPlay = () => {
        return setInterval(() => {
            let nextIndex = activeIndex + 1;
            if (nextIndex >= 3) {
                nextIndex = 0;
            }
            scrollToIndex(nextIndex);
            activeIndex = nextIndex;
        }, 8000);
    };

    useEffect(() => {
        const interval = startCarouselAutoPlay();
        return () => clearInterval(interval);
    }, [carouselRef.current]);

    const handleScroll = (event: any) => {
        const contentOffsetX = event.nativeEvent.contentOffset.x;
        const index = Math.round(contentOffsetX / carouselWidth);
        activeIndex = index;
    };

    const scrollToIndex = async (index: number) => {
        if (carouselRef.current) {
            {
                index == 0 ?
                    carouselRef.current.scrollTo({
                        x: index * carouselWidth,
                        animated: false,
                    })
                    :
                    carouselRef.current.scrollTo({
                        x: index * carouselWidth,
                        animated: true,
                    });
            }
        }
    };

    const [greeting, setGreeting] = useState<string>();
    //Generate greeting message
    useEffect(() => {
        getData();
        const currentHour = new Date().getHours();
        if (currentHour >= 0 && currentHour < 12) {
            setGreeting("Good Morning!");
        } else if (currentHour >= 12 && currentHour < 18) {
            setGreeting("Good Afternoon!");
        } else {
            setGreeting("Good Evening!");
        }
    }, []);

    const [name, setName] = useState<any>();
    const [coins, setCoins] = useState<any>();
    const [badge, setBadge] = useState<any>();
    const [rate, setRate] = useState<number>(0);
    const [reviews, setReviews] = useState<any[]>([]);
    //Get dashboard data
    async function getData() {
        try {
            setIsLoading(true);
            const session = await EncryptedStorage.getItem('session');
            let uName: string = '';
            if (session) uName = JSON.parse(session).userName;
            const resp = await axios.get(server + `dashboard/${uName}`);
            if (resp.data !== HttpStatusCode.NotFound && resp.data !== HttpStatusCode.InternalServerError) {
                setName(resp.data.firstName);
                setCoins(resp.data.coins);
                setBadge(resp.data.badge)
                setRate(resp.data.rates);
                setReviews(resp.data.reviews);
                setIsLoading(false);
            } else {
                setErrorTitle("Oops...!!");
                setErrorMsg("Something went wrong");
                setIsError(true);
                setIsLoading(false);
            }
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
            <View style={styles.mainConatiner}>
                <View style={styles.headerContainer}>
                    <View style={styles.greetingContainer}>
                        <Text style={styles.greetingTxt}>Hello {name},</Text>
                        <Text style={styles.greetingTxt}>{greeting}</Text>
                    </View>
                    <View style={styles.logoContainer}>
                        <Image source={require('../assets/images/logo_white_3-01.png')} style={styles.logo} />
                    </View>
                    <View style={styles.badgeContainer}>
                        <View style={styles.badgeDivider}>
                            <Text style={styles.coinTxt}>{coins}</Text>
                            <Image source={require('../assets/images/coin.png')} style={styles.badge} />
                        </View>
                        <View style={styles.badgeDivider}>
                            {badge === "blue" ?
                                <Image source={require('../assets/images/blue.png')} style={styles.badge} />
                                : badge === "bronze" ?
                                    <Image source={require('../assets/images/bronze.png')} style={styles.badge} />
                                    : badge === "silver" ?
                                        <Image source={require('../assets/images/silver.png')} style={styles.badge} />
                                        : badge === "gold" ?
                                            <Image source={require('../assets/images/gold.png')} style={styles.badge} />
                                            :
                                            null
                            }
                        </View>
                        <View style={styles.badgeDivider}>
                            <MaterialCommunityIcons name={"bell-ring"} size={25} color={"#FFF"} onPress={() => props.navigation.navigate("Notfications")} />
                        </View>
                    </View>
                </View>
                <ScrollView style={{ width: '100%', height: '100%' }} showsVerticalScrollIndicator={false}>
                    <View style={styles.carouselOutBox}>
                        <View style={styles.carouselConatiner} onLayout={(event) => { const { width } = event.nativeEvent.layout; setCarouselWidth(width) }}>
                            <ScrollView horizontal showsHorizontalScrollIndicator={false} ref={carouselRef} pagingEnabled onScroll={handleScroll} scrollEventThrottle={200}>
                                <View style={{ ...styles.scrollItem, ...{ width: carouselWidth, backgroundColor: '#12CD45' } }}>
                                    <Image source={require('../assets/images/cover.png')} style={{resizeMode: 'stretch', width: '100%', height: '100%', borderRadius: 15}}/>
                                </View>
                                <View style={{ ...styles.scrollItem, ...{ width: carouselWidth, backgroundColor: '#9922AA' } }}>
                                    <Text>Item 2</Text>
                                </View>
                                <View style={{ ...styles.scrollItem, ...{ width: carouselWidth, backgroundColor: '#229999' } }}>
                                    <Text>Item 3</Text>
                                </View>
                            </ScrollView>
                        </View>
                    </View>
                    <View style={styles.btnContainer}>
                        <View style={styles.btnRow}>
                            <TouchableOpacity style={styles.btnOrange} onPress={() => props.navigation.navigate("Jobs")}>
                                <FontAwesome name={"briefcase"} size={30} color={"#FFF"} />
                                <Text style={styles.btnOrangeTxt}>JOBS</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.btnOrange} onPress={() => props.navigation.navigate("ApppliedJobs")}>
                                <MaterialCommunityIcons name={"timer-sand"} size={35} color={"#FFF"} />
                                <Text style={styles.btnOrangeTxt}>APPLIED JOBS</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.btnOrange} onPress={() => props.navigation.navigate("CompletedJobs")}>
                                <Ionicons name={"checkmark-done-circle-sharp"} size={35} color={"#FFF"} />
                                <Text style={styles.btnOrangeTxt}>COMPLETED JOBS</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.btnRow}>
                            <TouchableOpacity style={styles.btnOrange} onPress={() => props.navigation.navigate("MyWallet")}>
                                <FontAwesome6 name={"hand-holding-dollar"} size={35} color={"#FFF"} />
                                <Text style={styles.btnOrangeTxt}>MY{'\n'}WALLET</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.btnOrange} onPress={() => props.navigation.navigate("Chat")}>
                                <Entypo name={"chat"} size={35} color={"#FFF"} />
                                <Text style={styles.btnOrangeTxt}>CHAT{'\n'}WITH US</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.btnOrange} onPress={() => props.navigation.navigate("MyProfile")}>
                                <FontAwesome name={"user-circle-o"} size={35} color={"#FFF"} />
                                <Text style={styles.btnOrangeTxt}>MY{'\n'}PROFILE</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.rateCard}>
                        <View style={{ height: '100%', width: '70%' }}>
                            <Text style={styles.rateCardTitle}>My Ratings</Text>
                            <View style={styles.starConatiner}>
                                <Ionicons name="star" size={35} color={rate >= 1 ? "#FCE404" : "#C3C3C3"} />
                                <Ionicons name="star" size={35} color={rate >= 2 ? "#FCE404" : "#C3C3C3"} style={styles.star} />
                                <Ionicons name="star" size={35} color={rate >= 3 ? "#FCE404" : "#C3C3C3"} style={styles.star} />
                                <Ionicons name="star" size={35} color={rate >= 4 ? "#FCE404" : "#C3C3C3"} style={styles.star} />
                                <Ionicons name="star" size={35} color={rate >= 5 ? "#FCE404" : "#C3C3C3"} style={styles.star} />
                            </View>
                        </View>
                        <View style={{ height: '100%', width: '30%', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={styles.rateNumber}>{rate}</Text>
                        </View>
                    </View>
                    <Text style={styles.reviewTitle}>My Reviews</Text>
                    {
                        reviews.length !== 0 ?
                            reviews.map((review, index) => (
                                <RateCard key={index} name={review.posterName} rates={review.rate} review={review.review} />
                            ))
                            :
                            <Text style={styles.noContentTxt}>No reviews to show</Text>
                    }
                </ScrollView>
            </View>
            {isError ? <ErrorPopup closeModal={() => setIsError(false)} /> : null}
            {isLoading ? <AppLoader /> : null}
        </SafeAreaView>
    )
}

const RateCard: React.FC<any> = ({ name, rates, review }) => {
    return (
        <View style={styles.reviewCard}>
            <View style={styles.reviewCardHeader}>
                <View style={{ width: '60%' }}>
                    <Text style={styles.posterName}>{name}</Text>
                </View>
                <View style={{ width: '40%', flexDirection: 'row', justifyContent: 'flex-end' }}>
                    <MaterialIcons name={"star"} size={20} color={'#FCE404'} />
                    <MaterialIcons name={"star"} size={20} color={rates >= 2 ? '#FCE404' : '#C3C3C3'} />
                    <MaterialIcons name={"star"} size={20} color={rates >= 3 ? '#FCE404' : '#C3C3C3'} />
                    <MaterialIcons name={"star"} size={20} color={rates >= 4 ? '#FCE404' : '#C3C3C3'} />
                    <MaterialIcons name={"star"} size={20} color={rates == 5 ? '#FCE404' : '#C3C3C3'} />
                </View>
            </View>
            <View>
                <Text style={styles.reviewTxt}>{review}</Text>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    noContentTxt: {
        textAlign: 'center',
        fontStyle: 'italic',
        fontWeight: '500',
        fontSize: 14,
        color: '#9AA5B1'
    },

    reviewTxt: {
        fontSize: 14,
        color: '#373737',
        textAlign: 'justify'
    },

    posterName: {
        fontSize: 18,
        fontWeight: '600',
        color: '#FE8235'
    },

    reviewCardHeader: {
        width: '100%',
        flexDirection: 'row',
    },

    reviewCard: {
        width: '90%',
        backgroundColor: '#FFF',
        alignSelf: 'center',
        borderRadius: 10,
        marginVertical: 5,
        elevation: 5,
        padding: 10
    },

    reviewTitle: {
        textAlign: 'center',
        fontSize: 16,
        color: '#373737',
        fontWeight: '700'
    },

    rateNumber: {
        fontSize: 50,
        color: '#373737',
        fontWeight: '700'
    },

    star: {
        marginHorizontal: 4
    },

    starConatiner: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 10
    },

    rateCardTitle: {
        fontSize: 18,
        color: '#373737',
        fontWeight: '600'
    },

    rateCard: {
        width: '90%',
        height: 100,
        backgroundColor: "#FFF",
        borderRadius: 20,
        elevation: 5,
        alignSelf: 'center',
        padding: 10,
        marginVertical: 15,
        flexDirection: 'row'
    },

    btnOrangeTxt: {
        fontSize: 15,
        color: "#FFF",
        fontWeight: '600',
        marginTop: 5,
        textAlign: 'center'
    },

    btnOrange: {
        width: 100,
        height: 100,
        backgroundColor: '#FE8235',
        borderRadius: 15,
        elevation: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },

    btnRow: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 15
    },

    btnContainer: {
        width: '100%',
        marginTop: 30,
    },

    scrollItem: {
        height: 200,
        backgroundColor: '#FF0',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15
    },

    carouselConatiner: {
        width: '100%',
        height: 200,
        borderRadius: 15,
        backgroundColor: '#FFF',
        elevation: 10
    },

    carouselOutBox: {
        width: '100%',
        height: 200,
        padding: 10
    },

    coinTxt: {
        fontSize: 14,
        color: '#FFDF00',
        fontWeight: '800',
        marginRight: 5
    },

    badgeDivider: {
        alignItems: 'center',
        justifyContent: 'flex-end',
        width: '33%',
        flexDirection: 'row'
    },

    badge: {
        resizeMode: 'contain',
        width: '60%',
        height: '60%'
    },

    logo: {
        resizeMode: 'contain',
        width: '60%',
        height: '60%'
    },

    badgeContainer: {
        width: '30%',
        height: '100%',
        justifyContent: 'space-between',
        flexDirection: 'row',
    },

    logoContainer: {
        width: '40%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },

    greetingTxt: {
        fontSize: 14,
        color: '#FFF',
        fontWeight: '600'
    },

    greetingContainer: {
        width: '30%',
        height: '100%',
        justifyContent: 'center'
    },

    headerContainer: {
        width: '100%',
        height: 50,
        backgroundColor: '#F2994A',
        elevation: 5,
        flexDirection: 'row',
        paddingHorizontal: 10
    },

    mainConatiner: {
        flex: 1
    },
});

export default Dashboard;