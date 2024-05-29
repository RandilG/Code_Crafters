import {View, Text} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import FontPage from '../Functions/FontPage';
import {NavigationContainer} from '@react-navigation/native';
import SecondPage from '../Functions/SecondPage';
import ThirdPage from '../Functions/ThirdPage';
import LoginScreen from '../Functions/LoginScreen';
import RegisterScreen from '../Functions/RegisterScreen';
import RegisterSuccessful from '../Functions/RegistrationSuccessful';
import LoginSuccessful from '../Functions/LoginSuccessful';
import Home from '../Functions/Home';
import PostJobs from '../Functions/PostJobs';
import JobCategory from '../Functions/JobCategory';
import PostJobScreen from '../Functions/PostJobScreen';
import PostSuccessful from '../Functions/PostSuccessful';
import ViewJobsScreen from '../Functions/ViewJobsScreen';
import EditJobsScreen from '../Functions/EditJobsScreen';
import CancelJobScreen from '../Functions/CancelJobScreen';
import MakePaymentScreen from '../Functions/MakePaymentScreen';
import ViewPaymentScreen from '../Functions/ViewPaymentScreen';
import Ratings from '../Functions/Ratings';
import ChangeProfileScreen from '../Functions/ChangeProfileScreen';
import RatingSuccessful from '../Functions/RatingSuccessful';


const Stack = createStackNavigator();

const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerShown:false,  //hide the header from screen
      }}>
        <Stack.Screen name="FontPage" component={FontPage} />
        <Stack.Screen name="SecondPage" component={SecondPage} />
        <Stack.Screen name="ThirdPage" component={ThirdPage} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="LoginSuccessful" component={LoginSuccessful} />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
        <Stack.Screen name="RegisterSuccessful" component={RegisterSuccessful} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="PostJobs" component={PostJobs} />
        <Stack.Screen name="JobCategory" component={JobCategory} />
        <Stack.Screen name="PostJobScreen" component={PostJobScreen} />
        <Stack.Screen name="PostSuccessful" component={PostSuccessful} />
        <Stack.Screen name="ViewJobsScreen" component={ViewJobsScreen} />
        <Stack.Screen name="EditJobsScreen" component={EditJobsScreen} />
        <Stack.Screen name="CancelJobScreen" component={CancelJobScreen} />
        <Stack.Screen name="MakePaymentScreen" component={MakePaymentScreen} />
        <Stack.Screen name="ViewPaymentScreen" component={ViewPaymentScreen} />
        <Stack.Screen name="Ratings" component={Ratings} />
        <Stack.Screen name="RatingSuccessful" component={RatingSuccessful} />
        <Stack.Screen name="ChangeProfileScreen" component={ChangeProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
