import React from "react";
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Test from './screens/test';
import Test2 from "./screens/test2";
import Test3 from "./screens/Test3";
import JobStatusApproved from "./screens/JobStatusApproved";
import JobStatusPending from "./screens/JobStatusPending";
import JobStatusDecline from "./screens/JobStatusDecline";
import JobStatus from "./screens/JobStatus";
import payment from "./screens/payment";

const Stack = createNativeStackNavigator();

const Navigation = (props:any) => {
  return(
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Test">
        <Stack.Screen name="Test" component={Test} options={{ headerShown: false }} />
        <Stack.Screen name="Test2" component={Test2} options={{ headerShown: false}} />
        <Stack.Screen name="Test3" component={Test3} options={{ headerShown:false}}/>
        <Stack.Screen name="JobStatusApproved" component={JobStatusApproved} options={{ headerShown:false}}/>
        <Stack.Screen name="JobStatusPending" component={JobStatusPending} options={{ headerShown:false}}/>
        <Stack.Screen name="JobStatusDecline" component={JobStatusDecline} options={{ headerShown:false}}/>
        <Stack.Screen name="JobStatus" component={JobStatus} options={{ headerShown:false}}/>
        <Stack.Screen name="Payment" component={payment} options={{ headerShown:false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;