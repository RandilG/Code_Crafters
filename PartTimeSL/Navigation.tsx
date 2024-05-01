import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Splash from './screens/Splash';
import Login from './screens/Login';
import Signup from './screens/Signup';
import Tnc from "./screens/Tnc";
import MobOtp from "./screens/MobOtp";
import EmailOtp from "./screens/EmailOtp";
import NicUpload from "./screens/NicUpload";
import SignupSuccess from "./screens/SignupSuccess";


const Stack = createNativeStackNavigator();

const Navigation = (props: any) => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="EmailOtp" screenOptions={{ headerShown: false }}>
                <Stack.Screen name="SignupSuccess" component={SignupSuccess} />
                <Stack.Screen name="NicUpload" component={NicUpload} />
                <Stack.Screen name="EmailOtp" component={EmailOtp} />
                <Stack.Screen name="MobOtp" component={MobOtp} />
                <Stack.Screen name="Tnc" component={Tnc} />
                <Stack.Screen name="Signup" component={Signup} />
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Splash" component={Splash} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigation;