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
import Dashboard from "./screens/Dashboard";
import Jobs from "./screens/Jobs";
import ApplyJob from "./screens/ApplyJob";
import AppliedJobs from "./screens/AppliedJobs";
import CompletedJobs from "./screens/CompletedJobs";
import MyWallet from "./screens/MyWallet";
import RatePoster from "./screens/RatePoster";
import Chat from "./screens/Chat";
import AddBankAc from "./screens/AddBankAc";
import WithdrawSuccess from "./screens/WithdrawSuccess";
import MyProfile from "./screens/MyProfile";
import ChangePassword from "./screens/ChangePassword";

const Stack = createNativeStackNavigator();

const Navigation = (props: any) => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
                <Stack.Screen name="ChangePassword" component={ChangePassword} />
                <Stack.Screen name="MyProfile" component={MyProfile} />
                <Stack.Screen name="WithdrawSuccess" component={WithdrawSuccess} />
                <Stack.Screen name="AddBankAc" component={AddBankAc} />
                <Stack.Screen name="Chat" component={Chat} />
                <Stack.Screen name="RatePoster" component={RatePoster} />
                <Stack.Screen name="MyWallet" component={MyWallet} />
                <Stack.Screen name="CompletedJobs" component={CompletedJobs} />
                <Stack.Screen name="ApppliedJobs" component={AppliedJobs} />
                <Stack.Screen name="ApplyJob" component={ApplyJob} />
                <Stack.Screen name="Jobs" component={Jobs} />
                <Stack.Screen name="Dashboard" component={Dashboard} />
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