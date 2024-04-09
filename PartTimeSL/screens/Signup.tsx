import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import extStyles from "../global/styles/extStyles";
import { Text, View } from "react-native";

const Signup = (props: any) => {
    return(
        <SafeAreaView style={extStyles.body}>
            <View>
                <Text>Sign up screen</Text>
            </View>
        </SafeAreaView>
    );
}

export default Signup;