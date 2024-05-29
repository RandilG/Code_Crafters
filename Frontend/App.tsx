import React, { useState } from 'react';
import { Button, StyleSheet, Text, View, Image, TextInput } from 'react-native';
import 'react-native-gesture-handler';
import FontPage from './src/Functions/FontPage';
import SecondPage from './src/Functions/SecondPage';
import ThirdPage from './src/Functions/ThirdPage';
import RegisterScreen from './src/Functions/RegisterScreen';
import LoginSuccessful from './src/Functions/RegistrationSuccessful';
import Registrationful from './src/Functions/RegistrationSuccessful';
import LoginScreen from './src/Functions/LoginScreen';
import PostJobs from './src/Functions/PostJobs';
import JobCategory from './src/Functions/JobCategory';
import PostJobScreen from './src/Functions/PostJobScreen';
import PostSuccessful from './src/Functions/PostSuccessful';
import Ratings from './src/Functions/Ratings';
import RatingSuccessful from './src/Functions/RatingSuccessful';
import AppNavigation from './src/Navigations/AppNavigation';
import Home from './src/Functions/Home';

function App(): React.JSX.Element {
  return (
    // <FontPage/>
    // <SecondPage/>
    // <ThirdPage/>
    // <RegisterScreen/>
    // <Registrationful/>
    // <LoginScreen/>
    // <LoginSuccessful/>
    // <PostJobs/>
    // <JobCategory/>
    // <PostJobScreen/>
    // <PostSuccessful/>
    // <Ratings/>
    // <RatingSuccessful/>
     <AppNavigation/>
    // <Home/>
  );
}

const Sty = StyleSheet.create({
  container: {
    flex: 1,
  },
  label: {
    fontSize: 12,
    marginBottom: 5,
    marginTop: 5,
    marginLeft: 15,
    color: '#000000',
  },
  button: {
    height: 70,
    marginTop: 20,
    borderRadius: 10
  },
});

export default App;