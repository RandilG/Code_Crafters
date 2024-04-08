import React, { useSyncExternalStore } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import LottieView from 'lottie-react-native';
import Modal from 'react-native-modal';
// import {getErrorTitle, getErrorMsg} from '../global/variable';

const PaymentFailurePopUp  = (props: any) => {
  return (
    <Modal isVisible={true} backdropOpacity={0.4}>
      <View style={styles.container}>
        <View>
          <LottieView
            source={require('../src/assets/serverError.json')}
            autoPlay
            loop
            style={styles.animation}
          />
        </View>
        <View>
        {/* {getErrorTitle()} */}
          <Text style={styles.oopsText}>Oops...!</Text>
        </View>
        <View>
        {/* {getErrorMsg()}. */}
          <Text style={styles.errText}>Something went wrong at our side. Don't  worry, its not to you.{'\n'}Your refund will be received within 5 - 10 days</Text>
          <Text style={styles.sorryTxt}>Sorry for the inconvenience</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={() => props.navigateScreen()}  style={styles.backToPageBtn}>
            <Text style={styles.btnTxt}>Back to Page</Text>
          </TouchableOpacity>
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
    textAlign: 'center',
  },

  sorryTxt: {
  fontSize: 20,
    color: '#FE8235',
    fontWeight: '600',
    marginVertical: 5,
    textAlign: 'center',
  },

  buttonContainer: {
    alignItems: 'center',
  },

  navigateText: {
    fontSize: 16,
    color: '#4d4c49',
    fontWeight: '400',
    textAlign: 'justify',
    marginTop:5,
  },

  backToPageBtn: {
    width:250,
    height: 50,
    borderRadius: 20,
    backgroundColor: '#FE8235',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },

  btnTxt: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },

});

export default PaymentFailurePopUp;
