import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import LottieView from 'lottie-react-native';
import Modal from 'react-native-modal';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { getErrorTitle, getErrorMsg } from '../global/variable';

const ErrorPopup = (props: any) => {
  return (
    <Modal isVisible={true} backdropOpacity={0.4} onBackdropPress={() => props.closeModal()} style={{ justifyContent: 'center', alignItems: 'center' }}>
      <View style={styles.container}>
        <View style={styles.closeBtnContainer}>
          <Ionicons
            name="close-sharp"
            color="#373737"
            size={30}
            onPress={() => props.closeModal()}
          />
        </View>
        <View style={styles.animaContainer}>
          <LottieView
            source={require('../assets/jsons/error.json')}
            autoPlay
            loop={false}
            style={styles.animation}
          />
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>{getErrorTitle()}</Text>
        </View>
        <View style={styles.errContainer}>
          <Text style={styles.errText}>{getErrorMsg()}</Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  errContainer: {
    width: '100%',
    height: '40%',
    alignItems: 'center',
  },

  titleContainer: {
    width: '100%',
    height: '20%',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10
  },

  animaContainer: {
    width: '100%',
    height: '30%',
    justifyContent: 'center',
    alignItems: 'center'
  },

  container: {
    borderRadius: 20,
    padding: 10,
    backgroundColor: '#FFF',
    elevation: 10,
    width: '90%',
    height: '35%'
  },

  closeBtnContainer: {
    width: '100%',
    alignItems: 'flex-end',
  },

  animation: {
    width: '140%',
    height: '140%',
  },

  titleText: {
    fontSize: 45,
    color: '#FE8235',
    fontWeight: '700',
  },
  errText: {
    fontSize: 25,
    color: '#373737',
    fontWeight: '300',
    marginVertical: 5,
    textAlign: 'center',
  },
});

export default ErrorPopup;
