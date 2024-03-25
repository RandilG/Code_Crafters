import { Button, Image, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { GestureHandlerRootView } from 'react-native-gesture-handler';



function LoginField({ onFormSubmit }) {
    const [formData,setFormData]=useState({
     username:'',
     password:''
  });
  
  const handleChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const registerSubmit = () => {
    // Call the parent component's onSubmit function with the form data
    onFormSubmit(formData);
  };
  
    return (
      <GestureHandlerRootView style={{flex: 1}}>
        <View
          style={{
            flex: 1,
            backgroundColor: '#FFFFFF',
            borderRadius: 20,
            marginHorizontal: 30,
            marginTop: 70,
          }}>
            <Text
          style={{
            fontSize: 25,
            color: '#000000',
            fontWeight: '600',
            marginTop: 20,
            marginLeft: 20,
          }}>
          {'Let us get started!'}
        </Text>
          <Text style={Sty.label}>Username:</Text>
          <View
            style={{
              backgroundColor: '#FCF8F8',
              borderRadius: 20,
              height: 50,
              margin: 10,
              marginTop:10,
              justifyContent: 'center',
              paddingHorizontal: 20,
  
            }}>
            <TextInput
              placeholder="Username"
              placeholderTextColor={'#000000'}
              value={formData.username}
              onChangeText={text => handleChange('username', text)}
            />
          </View>
          <Text style={Sty.label}>Password:</Text>
          <View
            style={{
              backgroundColor: '#FCF8F8',
              borderRadius: 20,
              height: 60,
              margin: 10,
              justifyContent: 'center',
              paddingHorizontal: 20,
            }}>
            <TextInput
              placeholder="Password"
              placeholderTextColor={'#000000'}
              value={formData.password}
              onChangeText={text => handleChange('password', text)}
            />
          </View>
          
          <Button title="Login" onPress={registerSubmit} color="#F2994A" />
        </View>
        <Text
          style={{
            fontSize: 10,
            color: '#000000',
            fontWeight: '600',
            marginTop: 20,
            marginLeft: 20,
            textAlign:'center'
          }}>
          {'Do not have an Account?'}
        </Text>
      </GestureHandlerRootView>
      
    );
  }

const LoginScreen = () => {
    const onFormSubmit = (formData: any) => {
        // Handle form submission here
        console.log('Login successfully:', formData);
      };
  return (
    <View style={Sty.container}>
      
        <Image
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
          }}
          source={require('../../assets/img/background.png')}
          resizeMode="cover"
        />
        <Text
          style={{
            fontSize: 30,
            color: '#000000',
            fontWeight: '600',
            marginTop: 90,
            marginLeft: 20,
          }}>
          {'Register'}
        </Text>
        <Text
          style={{
            fontSize: 12,
            color: '#000000',
            fontWeight: '400',
            marginLeft: 20,
          }}>
          {'Login as Job Postet'}
        </Text>
        <KeyboardAwareScrollView keyboardShouldPersistTaps='handled'>
        <LoginField onFormSubmit={onFormSubmit} />
      </KeyboardAwareScrollView>
    </View>
  )
}

export default LoginScreen

const Sty=StyleSheet.create({
    container:{
      flex:1,
    },
    label: {
      fontSize: 12,
      marginBottom: 5,
      marginTop:25,
      marginLeft:15,
      color: '#000000',
    },
    button:{
      height:100,
      marginTop:20,
      borderRadius:10,
    },
  })