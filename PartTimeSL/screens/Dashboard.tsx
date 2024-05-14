import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import extStyles from "../global/styles/extStyles";
import { Animated, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Image } from "react-native-animatable";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import EncryptedStorage from "react-native-encrypted-storage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Entypo from "react-native-vector-icons/Entypo";

const Dashboard = (props: any) => {
    const [carouselWidth, setCarouselWidth] = useState<number>(0);
    const carouselRef = useRef<any>(null);

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
    //Get dashboard data from local storage
    async function getData() {
        setName(await AsyncStorage.getItem('name'));
        setCoins(await AsyncStorage.getItem('coins'));
        setBadge(await AsyncStorage.getItem('badge'));
    }

    async function Logout() {
        await EncryptedStorage.clear();
        await AsyncStorage.clear();
        props.navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }]
        });
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
                            <MaterialCommunityIcons name={"bell-ring"} size={25} color={"#FFF"} onPress={() => Logout()} />
                        </View>
                    </View>
                </View>
                <ScrollView style={{width: '100%', height: '100%'}}>
                    <View style={styles.carouselOutBox}>
                        <View style={styles.carouselConatiner} onLayout={(event) => { const { width } = event.nativeEvent.layout; setCarouselWidth(width) }}>
                            <ScrollView horizontal showsHorizontalScrollIndicator={false} ref={carouselRef} pagingEnabled onScroll={handleScroll} scrollEventThrottle={200}>
                                <View style={{ ...styles.scrollItem, ...{ width: carouselWidth, backgroundColor: '#12CD45' } }}>
                                    <Text>Item 1</Text>
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
                            <BtnOrange icon={"archive"} title={"JOBS"} props={props} navi={"Jobs"}/>
                            <BtnWhite props={props}/>
                            <BtnOrange />
                        </View>
                        <View style={styles.btnRow}>
                            <BtnWhite />
                            <BtnOrange />
                            <BtnWhite />
                        </View>
                        <View style={styles.btnRow}>
                            <BtnOrange />
                            <BtnWhite />
                            <BtnOrange />
                        </View>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

const BtnOrange:React.FC<any> = ({icon, title, props, navi}) => {
    return (
        <TouchableOpacity style={styles.btnOrange} onPress={() => props.navigation.navigate(navi)}>
            <Entypo name={icon} size={30} color={"#FFF"} />
            <Text style={styles.btnOrangeTxt}>{title}</Text>
        </TouchableOpacity>
    )
}

const BtnWhite:React.FC<any> = ({icon, ttitle, props}) => {
    return (
        <TouchableOpacity style={styles.btnWhite} onPress={() => props.navigation.navigate("ApplyJob")}>

        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    btnOrangeTxt: {
        fontSize: 15,
        color: "#FFF",
        fontWeight: '600',
        marginTop: 5
    },

    btnWhite: {
        width: 100,
        height: 100,
        backgroundColor: '#FFF',
        borderRadius: 15,
        elevation: 5,
        justifyContent: 'center',
        alignItems: 'center'
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