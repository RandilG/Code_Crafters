import { Text, View,StyleSheet,Image } from 'react-native'
import React, { Component } from 'react'
import { Icon } from '@rneui/base/dist/Icon';



const RegistrationSuccessful = () => {
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
      <View 
      style={{
        backgroundColor: '#FCF8F8',
        marginTop:200,
        borderRadius:20,
        marginHorizontal:20
      }}>
        <Icon name={'checkcircle'} size={100} color={'#F2994A'}/>
        <Image
        style={{
            width:250,
            height:250,
            borderRadius:250/2,
            marginTop:20,
            marginEnd:20,
            marginHorizontal:65,
            alignItems:'center'
        }}
        source={require('../../assets/img/success.png')}>
        </Image>
        <Text
          style={{
            fontSize: 30,
            color: '#000000',
            fontWeight: '400',
            marginLeft: 20,
            textAlign: 'center',
          }}>
          {'Registration successfully completed!'}
        </Text>
      </View>
    </View>
  );
}

export default RegistrationSuccessful

const Sty=StyleSheet.create({
    container:{
      flex:1,
    },
  })
