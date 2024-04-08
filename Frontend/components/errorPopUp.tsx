import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import LottieView from 'lottie-react-native';
import Modal from 'react-native-modal';
import VectorIcon from '../utils/Vectoricons';
import {getErrorTitle, getErrorMsg} from '../global/variable';

const ErrorPopup = (props: any) => {
  return (
    <Modal isVisible={true} backdropOpacity={0.4}>
      <View style={styles.container}>
        <View>
          <Pressable onPress={() => props.closeModal()}>
            <VectorIcon
              type="FontAwesome"
              name="close"
              color="#F2994A"
              size={25}
              zIndex="-1"
              style={styles.closeBtn}
            />
          </Pressable>
        </View>
        <View>
          <LottieView
            source={require('../src/assets/err.json')}
            autoPlay
            loop
            style={styles.animation}
          />
        </View>
        <View>
          <Text style={styles.oopsText}>{getErrorTitle()}</Text>
        </View>
        <View>
          <Text style={styles.errText}>{getErrorMsg()}.</Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    padding: 20,
    backgroundColor: '#FFF',
    elevation: 10,
    margin: 10,
  },

  closeBtn: {
    marginLeft: 250,
  },

  animation: {
    width: 200,
    height: 200,
  },
  oopsText: {
    fontSize: 35,
    color: '#F2994A',
    fontWeight: 'bold',
  },
  errText: {
    fontSize: 18,
    color: '#691b18',
    fontWeight: '600',
    marginVertical: 5,
    textAlign: 'justify',
  },
});

export default ErrorPopup;
