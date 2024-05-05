import {
  View,
  Text,
  SafeAreaView,
  Touchable,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import React from 'react';
import VectorIcon from '../utils/Vectoricons';
import {Image} from 'react-native-elements';
import LottieView from 'lottie-react-native';

const CompletePayment = (props: any) => {
  return (
    <SafeAreaView style={{backgroundColor: '#fff', height: '100%'}}>
      <View style={styles.container}>
      <LottieView source={require('../src/assets/confetti.json')} autoPlay loop style={{ width:'120%', height:'100%', position:'absolute', }} />
        <View>
          <VectorIcon
            type="MaterialIcons"
            name="keyboard-arrow-left"
            color="#F2994A"
            size={40}
            onPress={() => props.navigation.navigate('Test')}
            style={{width: 50}}
          />
          </View>
          <View>
          <Image
            source={require('../src/images/online-payment.png')}
            style={styles.imgComplete}
          />
        </View>
        <View>
          <Text style={styles.thankTxt}>Thank You!</Text>
        </View>
        <View>
          <Text style={styles.descriptionTxt}>Payment Done Successfully</Text>
        </View>
        <View>
          <Text style={styles.instructionTxt}>
            Lorem ipsum dolor sit abet consectetur adipisicing edit. t non culpa total defects exercitation site, bandits vitae ibague necessitates!
          </Text>
        </View>
        <View>
          <TouchableOpacity
            style={styles.homeBtn}
            onPress={() => props.navigation.navigate('Test')}>
            <Text style={styles.homeBtnTxt}>Home</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  imgComplete: {
    marginTop: 160,
    marginBottom: 25,
    height: 200,
    width: 200,
    marginHorizontal: 70,
  },

  thankTxt: {
    color: '#F2994A',
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  descriptionTxt: {
    color: '#691b18',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 80,
  },

  instructionTxt: {
    color: '#000',
    fontSize: 15,
    fontWeight: '500',
    textAlign: 'center',
  },

  homeBtn: {
    backgroundColor: '#F2994A',
    height: 46,
    width: 145,
    borderRadius: 20,
    elevation: 5,
    alignSelf: 'center',
    marginTop: 20,
  },

  homeBtnTxt: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 5,
  },
});
export default CompletePayment;
