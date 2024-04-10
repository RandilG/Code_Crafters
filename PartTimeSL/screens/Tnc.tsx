import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import extStyles from "../global/styles/extStyles";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";

const Tnc = (props: any) => {
    return (
        <SafeAreaView style={extStyles.body}>
            <View style={styles.mainContainer}>
                <View style={styles.headerContainer}>
                    <View style={styles.backBtnContainer}>
                        <AntDesign name="left" size={30} color={"#FFF"} onPress={() => props.navigation.goBack()} />
                    </View>
                    <View style={styles.titleContainer}>
                        <Text style={styles.titleTxt}>
                            Terms & Conditions
                        </Text>
                        <Text style={styles.subHeadingTxt}>
                            Guide to understand our policies
                        </Text>
                    </View>
                </View>
                <View style={styles.bottomConatiner} />
                <View style={styles.scrollContainer}>
                    <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                        <Text style={styles.highlightTxt}>Introduction</Text>
                        <Text style={styles.paraTxt}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. A scelerisque purus semper eget duis. Nec feugiat in fermentum posuere urna nec tincidunt praesent semper. Velit euismod in pellentesque massa placerat duis. Pellentesque habitant morbi tristique senectus et. Erat pellentesque adipiscing commodo elit at imperdiet. Turpis egestas integer eget aliquet nibh. Tincidunt praesent semper feugiat nibh sed pulvinar. Donec ultrices tincidunt arcu non sodales neque sodales. Non sodales neque sodales ut etiam sit amet nisl purus. Neque laoreet suspendisse interdum consectetur libero id faucibus. Eget mi proin sed libero enim. Sagittis orci a scelerisque purus semper. Pellentesque habitant morbi tristique senectus et netus et malesuada fames. Faucibus et molestie ac feugiat sed lectus vestibulum. Amet porttitor eget dolor morbi non.</Text>

                        <Text style={styles.highlightTxt}>License to Use the App</Text>
                        <Text style={styles.paraTxt}>Sagittis nisl rhoncus mattis rhoncus urna neque viverra. Dui sapien eget mi proin sed libero enim. Amet mattis vulputate enim nulla. Nunc vel risus commodo viverra maecenas accumsan lacus vel. Mattis aliquam faucibus purus in massa tempor nec feugiat. Amet tellus cras adipiscing enim eu turpis egestas pretium aenean. Dolor purus non enim praesent elementum. Lobortis mattis aliquam faucibus purus in massa tempor. Egestas sed tempus urna et pharetra pharetra. Lectus vestibulum mattis ullamcorper velit sed ullamcorper morbi. Eget est lorem ipsum dolor sit. Arcu vitae elementum curabitur vitae nunc sed velit. Aliquam sem fringilla ut morbi tincidunt augue interdum velit euismod. Urna neque viverra justo nec ultrices dui sapien. Accumsan sit amet nulla facilisi morbi tempus iaculis urna id. Consequat ac felis donec et odio pellentesque. Ligula ullamcorper malesuada proin libero nunc consequat interdum varius. Feugiat nisl pretium fusce id velit ut tortor pretium. Eu volutpat odio facilisis mauris sit amet massa vitae.</Text>

                        <Text style={styles.highlightTxt}>Use of the Services</Text>
                        <Text style={styles.paraTxt}>Scelerisque felis imperdiet proin fermentum leo vel orci porta non. Vitae elementum curabitur vitae nunc sed velit. Enim neque volutpat ac tincidunt vitae semper quis lectus. Eget sit amet tellus cras adipiscing enim. Volutpat sed cras ornare arcu dui vivamus arcu. Semper auctor neque vitae tempus quam pellentesque nec. Vestibulum mattis ullamcorper velit sed ullamcorper. Sit amet volutpat consequat mauris nunc. Quam nulla porttitor massa id neque aliquam. Lectus mauris ultrices eros in cursus turpis massa. Ut venenatis tellus in metus. A pellentesque sit amet porttitor eget. Tellus mauris a diam maecenas sed enim ut sem viverra. Consectetur adipiscing elit pellentesque habitant morbi tristique senectus. Libero id faucibus nisl tincidunt eget. Velit aliquet sagittis id consectetur purus ut faucibus pulvinar elementum. Ultrices gravida dictum fusce ut placerat.</Text>

                        <View style={styles.btnConatiner}>
                            <View style={styles.btnDivider}>
                                <TouchableOpacity style={styles.cancelBtn} onPress={() => props.navigation.goBack()}>
                                    <Text style={styles.btnTxt}>
                                        Cancel
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.btnDivider}>
                                <TouchableOpacity style={styles.agreeBtn} onPress={() => props.navigation.navigate('Signup')}>
                                    <Text style={styles.btnTxt}>
                                        Agree
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    btnTxt: {
        fontSize: 15,
        fontWeight: '600',
        color: '#FFF'
    },

    agreeBtn: {
        width: 120,
        height: 40,
        backgroundColor: '#FE8235',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20
    },

    cancelBtn: {
        width: 120,
        height: 40,
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20
    },

    btnDivider: {
        width: '50%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },

    btnConatiner: {
        width: '100%',
        height: 80,
        marginVertical: 10,
        flexDirection: 'row'
    },

    paraTxt: {
        color: '#000',
        fontSize: 12,
        textAlign: 'justify',
        marginBottom: 15
    },

    highlightTxt: {
        color: '#000',
        fontSize: 18,
        fontWeight: '700',
        marginBottom: 5
    },

    scrollView: {
        width: '100%',
        height: '100%',
        paddingHorizontal: 10,
        paddingTop: 10
    },

    scrollContainer: {
        width: '90%',
        marginHorizontal: '5%',
        height: 610,
        backgroundColor: '#FFF',
        position: 'absolute',
        bottom: 20,
        elevation: 10,
        borderRadius: 20
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
})

export default Tnc;