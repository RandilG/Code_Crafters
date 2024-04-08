import {View, Text, StyleSheet, Modal} from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';
import {create} from 'react-test-renderer';

const appLoader = () => {
  return (
    
      <View style={[ StyleSheet.absoluteFillObject, style.loaderContainer]}>
        <LottieView
          source={require('../src/assets/loading.json')}
          style={{width: 150, height: 150}}
          autoPlay
          loop
        />
      </View>
    
  );
};

const style = StyleSheet.create({
  loaderContainer: {
    // flex: 1,
    zIndex: 200,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
  },

  lottieLoading: {
    width: 100,
    height: 100,
    position: 'absolute',
    alignSelf: 'center',
  },
});

export default appLoader;
