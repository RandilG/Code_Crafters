import { Button, Image, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { GestureHandlerRootView } from 'react-native-gesture-handler';



function RegisterField({ onFormSubmit }) {
    const [formData,setFormData]=useState({
     username:'',
     password:'',
     email:'',
     telephone:'',
     companyName:'',
     address:''
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
      <GestureHandlerRootView style={{flex: 0.85}}>
        <View
          style={{
            flex: 1,
            backgroundColor: '#FFFFFF',
            borderRadius: 20,
            marginHorizontal: 30,
            marginTop: 20,
          }}>
          <Text style={Sty.label}>Username:</Text>
          <View
            style={{
              backgroundColor: '#FCF8F8',
              borderRadius: 20,
              height: 50,
              margin: 10,
              marginTop:2,
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
          <Text style={Sty.label}>Email Address:</Text>
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
              placeholder="Email Address"
              placeholderTextColor={'#000000'}
              value={formData.email}
              onChangeText={text => handleChange('email', text)}
            />
          </View>
          <Text style={Sty.label}>Telephone Number:</Text>
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
              placeholder="Telephone Number"
              placeholderTextColor={'#000000'}
              value={formData.telephone}
              onChangeText={text => handleChange('telephone', text)}
            />
          </View>
          <Text style={Sty.label}>Company Name:</Text>
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
              placeholder="Company Name"
              placeholderTextColor={'#000000'}
              value={formData.companyName}
              onChangeText={text => handleChange('companyName', text)}
            />
          </View>
          <Text style={Sty.label}>Address:</Text>
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
              placeholder="Address"
              placeholderTextColor={'#000000'}
              value={formData.address}
              onChangeText={text => handleChange('address', text)}
            />
          </View>
          <Button title="Register" onPress={registerSubmit} color="#F2994A"  />
        </View>
        <Text
          style={{
            fontSize: 10,
            color: '#000000',
            fontWeight: '600',
            marginTop: 10,
            marginLeft: 20,
            textAlign:'center'
          }}>
          {'Already have an Account?'}
        </Text>
      </GestureHandlerRootView>
      
    );
  }

const RegisterScreen = () => {
    const onFormSubmit = (formData: any) => {
        // Handle form submission here
        console.log('Form data submitted:', formData);
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
            marginTop: 80,
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
          {'Register as Job Postet'}
        </Text>
        <KeyboardAwareScrollView keyboardShouldPersistTaps='handled'>
        <RegisterField onFormSubmit={onFormSubmit} />
      </KeyboardAwareScrollView>
    </View>
  )
}

export default RegisterScreen

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