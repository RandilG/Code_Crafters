import React,{useState} from 'react'
import { Button,StyleSheet,Text,View,Image} from 'react-native'
import { TextInput } from 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import RegisterScreen from './src/functions/RegisterScreen';
import LoginScreen from './src/functions/LoginScreen';
import RegistrationSuccessful from './src/functions/RegistrationSuccessful';
import FontPage from './src/functions/FontPage';
import SecondPage from './src/functions/SecondPage';
import { NavigationContainer } from '@react-navigation/native'
import 'react-native-gesture-handler';
import AppRoute from './src/Routes/AppRoute';
import TwoPage from './src/functions/TwoPage';
import PostJobs from './src/functions/PostJobs';
import JobCategory from './src/functions/JobCategory';
import PostJobScreen from './src/functions/PostJobScreen';
import PostSuccessful from './src/functions/PostSuccessful';
import LoginSuccessful from './src/functions/LoginSuccessful';

function App(): JSX.Element {
  return (
    <View style={Sty.container}>
      {/*<AppRoute/>*/}
      {/*<RegisterScreen/>*/}
      <RegistrationSuccessful/>
      {/*<LoginSuccessful/>*/}
      {/*<LoginScreen/>*/}
      {/*<FontPage/>*/}
      {/*<SecondPage/>*/}
      {/*<TwoPage/>*/}
      {/*<PostJobs/>*/}
      {/*<JobCategory/>*/}
      {/*<PostJobScreen/>*/}
      {/*<PostSuccessful/>*/}
    </View>
  );
}

const Sty=StyleSheet.create({
  container:{
    flex:1,
  },
  label: {
    fontSize: 12,
    marginBottom: 5,
    marginTop:5,
    marginLeft:15,
    color: '#000000',
  },
  button:{
    height:70,
    marginTop:20,
    borderRadius:10
  },
})

export default App;