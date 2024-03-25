import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../functions/RegisterScreen';
import RegisterScreen from '../functions/RegisterScreen';

const Stack = createStackNavigator();



export default function AppNavigation() {
  return (
    <NavigationContainer>
        <Stack.Navigator screenOptions={{
          headerShown:false,
        }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
    </NavigationContainer>
  )
}