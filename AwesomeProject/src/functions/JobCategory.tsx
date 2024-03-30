import {Text, View, StyleSheet, Image} from 'react-native';
import React, {Component} from 'react';

const JobCategory = () => {
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
          fontSize: 40,
          color: '#000000',
          fontWeight: '600',
          marginTop: 90,
          marginLeft: 20,
        }}>
        {'Job Category'}
      </Text>
      <View
        style={{
          flex: 1,
          backgroundColor: '#FFFFFF',
          borderRadius: 20,
          marginHorizontal: 30,
          marginTop: 20,
          
        }}>
        <View
          style={{
            backgroundColor: '#FCF8F8',
            borderRadius: 20,
            height: 100,
            margin: 10,
            marginTop: 2,
            justifyContent: 'center',
            paddingHorizontal: 20,
          }}>
          <Text
          style={{
            fontSize:18
          }}>
            Food Server</Text>
        </View>
      <View
        style={{
          backgroundColor: '#FCF8F8',
          borderRadius: 20,
          height: 100,
          margin: 10,
          marginTop: 2,
          justifyContent: 'center',
          paddingHorizontal: 20,
        }}>
        <Text
          style={{
            fontSize:18
          }}>
            Kitchen Helper</Text>
      </View>
      <View
        style={{
          backgroundColor: '#FCF8F8',
          borderRadius: 20,
          height: 100,
          margin: 10,
          marginTop: 2,
          justifyContent: 'center',
          paddingHorizontal: 20,
        }}>
        <Text
          style={{
            fontSize:18
          }}>
            Cleaner</Text>
      </View>
      <View
        style={{
          backgroundColor: '#FCF8F8',
          borderRadius: 20,
          height: 100,
          margin: 10,
          marginTop: 2,
          justifyContent: 'center',
          paddingHorizontal: 20,
        }}>
        <Text
          style={{
            fontSize:18
          }}>
            Decoration Creater</Text>
      </View>
    </View>
    </View>
  );
};

export default JobCategory;

const Sty = StyleSheet.create({
  container: {
    flex: 1,
  },
});
