import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import RegisterScreen from '../functions/RegisterScreen'
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../functions/LoginScreen';
import FontPage from '../functions/FontPage';
import SecondPage from '../functions/SecondPage';

const Stack = createStackNavigator();

const AppRoute=() =>{
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={
        {
            headerShown:false,//hide the stack names from screen
        }
      }>
        <Stack.Screen name="First" component={FontPage} />
        <Stack.Screen name="Second" component={SecondPage} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default FontPage