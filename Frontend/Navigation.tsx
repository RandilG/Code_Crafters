import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Test from './screens/test';
import Test2 from './screens/test2';
import Test3 from './screens/Test3';
import JobStatus from './screens/JobStatus';
import Payment from './screens/Payment';
import CompletePayment from './screens/CompletePayment';
import errorPopUp from './components/errorPopUp';
import FutureJobs from './screens/FutureJobs';
import InProgressJobs from './screens/InProgressJobs';
import CompletedJobs from './screens/CompletedJobs';

const Stack = createNativeStackNavigator();

const Navigation = (props: any) => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Test">
        <Stack.Screen
          name="Test"
          component={Test}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Test2"
          component={Test2}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Test3"
          component={Test3}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="JobStatus"
          component={JobStatus}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Payment"
          component={Payment}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="errorPopUp"
          component={errorPopUp}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="CompletePayment"
          component={CompletePayment}
          options={{headerShown: false}}
        />
        <Stack.Screen 
        name="FutureJobs"
        component={FutureJobs}
        options={{headerShown: false}}
        />
         <Stack.Screen 
        name="InProgressJobs"
        component={InProgressJobs}
        options={{headerShown: false}}
        />
         <Stack.Screen 
        name="CompletedJobs"
        component={CompletedJobs}
        options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
