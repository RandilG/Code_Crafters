import {Text, View, StyleSheet, Image, Button} from 'react-native';
import React, {Component} from 'react';


const LoginSuccessful = () => {
  
  return (
    <View style={Sty.container}>
      <Image
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
        }}
        source={require('../Assets/background.png')}
        resizeMode="cover"
      />
      <View
        style={{
          backgroundColor: '#FCF8F8',
          marginTop: 200,
          borderRadius: 20,
          marginHorizontal: 20,
          height: 500,
        }}>
        <View
          style={{
            marginTop: 150,
            marginHorizontal: 20,
          }}>

          <Text
            style={{
              fontSize: 30,
              color: '#000000',
              fontWeight: '400',
              marginLeft: 20,
              marginTop: 50,
              textAlign: 'center',
            }}>
            {'Make Payment'}
          </Text>
          
        </View>
      </View>
    </View>
  );
};

export default LoginSuccessful;

const Sty = StyleSheet.create({
  container: {
    flex: 1,
  },
});
