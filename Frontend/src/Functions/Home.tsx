import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React, { Component } from 'react';

const Home = (p: any) => {
  function GotoPostJobScreen() {  // navigations
    p.navigation.navigate('PostJobs');
  }

  function GotoViewJobsScreen() {
    p.navigation.navigate('ViewJobsScreen');
  }

  function GotoEditJobsScreen() {
    p.navigation.navigate('EditJobsScreen');
  }

  function GotoCancelJobScreen() {
    p.navigation.navigate('CancelJobScreen');
  }

  function GotoMakePaymentScreen() {
    p.navigation.navigate('MakePaymentScreen');
  }

  function GotoViewPaymentScreen() {
    p.navigation.navigate('ViewPaymentScreen');
  }

  function GotoRatings() {
    p.navigation.navigate('Ratings');
  }

  function GotoChangeProfileScreen() {
    p.navigation.navigate('ProfileScreen');
  }

  return (
    <View style={Sty.container}>
      <View
        style={{
          backgroundColor: '#FCF8F8',
          marginTop: 10,
          borderRadius: 20,
          marginHorizontal: 20,
          height: 500,
        }}>
        <View
          style={{
            marginTop: 40,
            marginHorizontal: 20,
          }}>
          <TouchableOpacity
            onPress={GotoPostJobScreen}
            style={Sty.button}>
            <Text style={Sty.buttonText}>Post the jobs</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            marginTop: 40,
            marginHorizontal: 20,
          }}>
          <TouchableOpacity
            onPress={GotoViewJobsScreen}
            style={Sty.button}>
            <Text style={Sty.buttonText}>View the jobs</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            marginTop: 40,
            marginHorizontal: 20,
          }}>
          <TouchableOpacity
            onPress={GotoEditJobsScreen}
            style={Sty.button}>
            <Text style={Sty.buttonText}>Edit the jobs</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            marginTop: 40,
            marginHorizontal: 20,
          }}>
          <TouchableOpacity
            onPress={GotoCancelJobScreen}
            style={Sty.button}>
            <Text style={Sty.buttonText}>Cancel/Delete posted jobs</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            marginTop: 40,
            marginHorizontal: 20,
          }}>
          <TouchableOpacity
            onPress={GotoMakePaymentScreen}
            style={Sty.button}>
            <Text style={Sty.buttonText}>Make payment</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            marginTop: 40,
            marginHorizontal: 20,
          }}>
          <TouchableOpacity
            onPress={GotoViewPaymentScreen}
            style={Sty.button}>
            <Text style={Sty.buttonText}>View payment info</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            marginTop: 40,
            marginHorizontal: 20,
          }}>
          <TouchableOpacity
            onPress={GotoRatings}
            style={Sty.button}>
            <Text style={Sty.buttonText}>Give Ratings</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            marginTop: 40,
            marginHorizontal: 20,
          }}>
          <TouchableOpacity
            onPress={GotoChangeProfileScreen}
            style={Sty.button}>
            <Text style={Sty.buttonText}>Change profile</Text>
          </TouchableOpacity>
        </View>
        
      </View>
    </View>
  );
};

export default Home;

const Sty = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    backgroundColor: '#F2994A',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});
