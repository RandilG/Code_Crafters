import React, {useCallback, useEffect, useRef, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  Animated,
  Keyboard,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import VectorIcon from '../utils/Vectoricons'; // Importing custom vector icon component
import axios, {HttpStatusCode} from 'axios'; // Importing axios for HTTP requests
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  CardField,
  StripeProvider,
  useConfirmPayment,
} from '@stripe/stripe-react-native'; // Importing Stripe components for payment processing
import {server} from '../service/constant'; // Importing server address from constant.tsx file
import {setErrorMsg, setErrorTitle} from '../global/variable';
import ErrorPopUp from '../components/errorPopUp';
import AppLoader from '../components/appLoader';
import PaymentFailurePopUp from '../components/paymentFailurePopUp';

const Payment = (props: any) => {
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [isError, setIsError] = useState(false); // Error state
  const [isPaymentError, setIsPaymentError] = useState(false); // Payment error state
 
  // Calculation of charges
  const {jobId, title, hRate, seekers, wHours, userName} = props.route.params;
  const seekersCharge: number = Number(seekers * wHours * hRate);
  const serviceCharge: number = Number((seekersCharge * 10) / 100);
  const total: number = seekersCharge + serviceCharge;

  // State variables for payment handling
  const [clientSecret, setClientSecret] = useState<any>();
  const [isPaymentProcess, setIsPaymentProcess] = useState<boolean>(false);
  const {confirmPayment} = useConfirmPayment();

  // create payment intent
  async function createPaymentIntent() {
    try {
      const res = await axios.post(server + 'createPaymentIntent', {
        amount: total,
      });
      if (res.status === HttpStatusCode.Ok) {
        setClientSecret(res.data);
        setIsLoading(false);
      } else if (res.status === HttpStatusCode.InternalServerError) {
        setErrorTitle('Oops..!');
        setErrorMsg('res.data[0]');
        setIsError(true);
        setIsLoading(false);
      } else {
        setErrorTitle('Oops..!');
        setErrorMsg('res.data[0]');
        setIsError(true);
        setIsLoading(false);
      }
    } catch (error) {
      setErrorTitle('Oops..!');
      setErrorMsg('Something wrong has happened..');
      setIsError(true);
      setIsLoading(false);
      console.log(error);
    }
  }

  // handle payment processing
  async function handlePayment() {
    setIsPaymentProcess(true);
    const {paymentIntent, error} = await confirmPayment(clientSecret, {
      paymentMethodType: 'Card',
      paymentMethodData: {
        billingDetails: {email: userName},
      },
    });
    if (error) {
      setErrorTitle('Oops...');
      setErrorMsg(error.message);
      setIsError(true);
      setIsPaymentProcess(false);
      console.log('Payment confirmation error', error.message);
    } else if (paymentIntent) {
      // console.log('Success from promise', paymentIntent);
      setIsLoading(true);
      recordPayment(paymentIntent.id);
    }
  }

  async function recordPayment(paymentId: string) {
    try {
      const res = await axios.post(server + `payments/${jobId}`, {
        amount: total,
        payment_id: paymentId,
        seeker_charge: seekersCharge,
        service_charge: serviceCharge,
      });
      if (res.status == HttpStatusCode.Ok) {
        props.navigation.navigate('CompletePayment', {paymentId: paymentId});
      } else if (res.status == HttpStatusCode.InternalServerError) {
        setErrorTitle('Oops...');
        setErrorMsg(res.data);
        console.log(res.data);
        setIsLoading(false);
        setIsError(true);
        setIsPaymentProcess(false);
      } else {
        setErrorTitle('Oops...');
        setErrorMsg('Something wrong has happened..');
        setIsLoading(false);
        setIsError(true);
        setIsPaymentProcess(false);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setIsPaymentError(true);
      setIsPaymentProcess(false);
    }
  }

  const [animation] = useState(new Animated.Value(0));

  // open payment element
  const openPaymentElement = () => {
    setIsLoading(true);
    createPaymentIntent();
    Animated.timing(animation, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  // close payment element
  const closePaymentElement = () => {
    Keyboard.dismiss();
    Animated.timing(animation, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  return (
    <StripeProvider publishableKey="pk_test_51Oh6VQHVNXAKzs3pp5EUdDLLR4amNf6pSGXtlTdNwah8z3nf1EGPCCjnHQz8sQltuSTLW8OimawAz6yp7Ef6cgx200AdzLAQqy">
      <SafeAreaView style={{flex: 1, backgroundColor: '#FFF'}}>
        <View style={styles.topContainer}>
          <View style={styles.headerTopDivider}>
            <VectorIcon
              type="MaterialIcons"
              name="keyboard-arrow-left"
              color="#FFF"
              size={35}
              onPress={() => props.navigation.navigate('JobStatus')}
              style={{width: 35}}
            />
          </View>
          <View style={styles.headerBottomDivider}>
            <Text style={styles.headerTitle}>
              You can check your{'\n'}payment details here,
            </Text>
          </View>
        </View>
        <View style={styles.bottomContainer}>
          <View style={styles.paymentDataContainer}>
            <Text style={styles.jobTitle}>{title}</Text>
            <View
              style={{
                borderBottomColor: '#000',
                borderBottomWidth: StyleSheet.hairlineWidth,
              }}
            />
            {/* Display payment details (seekers, work hours, hourly rate) */}
            <View style={styles.paymentContainerHorzDivider}>
              <View style={styles.leftDivider}>
                <Text style={styles.paymentAttribute}>Amount of Seekers:</Text>
                <Text style={styles.paymentAttribute}>Work Hours:</Text>
                <Text style={styles.paymentAttribute}>Hourly Rate:</Text>
              </View>
              <View style={styles.rightDivider}>
                <Text style={styles.paymentValue}>{seekers}</Text>
                <Text style={styles.paymentValue}>{wHours}</Text>
                <Text style={styles.paymentValue}>Rs.{hRate}</Text>
              </View>
            </View>
            <View
              style={{
                borderBottomColor: '#000',
                borderBottomWidth: StyleSheet.hairlineWidth,
              }}
            />
            {/* Display calculated charges  */}
            <View style={styles.paymentContainerHorzDivider}>
              <View style={styles.leftDivider}>
                <Text style={styles.paymentAttribute}>Seekers' Charge:</Text>
                <Text style={styles.paymentAttribute}>
                  Service Charge (10%):
                </Text>
              </View>
              <View style={styles.rightDivider}>
                <Text style={styles.paymentValue}>
                  Rs.{seekersCharge.toFixed(2)}
                </Text>
                <Text style={styles.paymentValue}>
                  Rs.{serviceCharge.toFixed(2)}
                </Text>
              </View>
            </View>
            <View
              style={{
                borderBottomColor: '#000',
                borderBottomWidth: StyleSheet.hairlineWidth,
              }}
            />
            <View style={styles.paymentContainerHorzDivider}>
              <View style={[styles.leftDivider, {width: '60%'}]}>
                <Text style={styles.totalTxt}>Total:</Text>
              </View>
              <View style={[styles.rightDivider, {width: '40%'}]}>
                <Text style={styles.totalTxt}>Rs.{total.toFixed(2)}</Text>
              </View>
            </View>
            <View
              style={{
                borderBottomColor: '#000',
                borderBottomWidth: StyleSheet.hairlineWidth,
                marginBottom: 5,
                width: '40%',
                alignSelf: 'flex-end',
              }}
            />
            <View
              style={{
                borderBottomColor: '#000',
                borderBottomWidth: StyleSheet.hairlineWidth,
                marginBottom: 5,
                width: '40%',
                alignSelf: 'flex-end',
              }}
            />
            <View
              style={{
                borderBottomColor: '#000',
                borderBottomWidth: StyleSheet.hairlineWidth,
                marginVertical: 10,
              }}
            />
            <TouchableOpacity
              style={styles.payButton}
              onPress={openPaymentElement}>
              <Text style={styles.payButtonText}>Pay Now</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.calculateMessageContainer}>
            <Text
              style={[
                styles.calculationMessage,
                {fontWeight: '800', fontStyle: 'normal'},
              ]}>
              Note
            </Text>
            <Text style={styles.calculationMessage}>
              The seekers charge will be calculated based on,
            </Text>
            <Text style={[styles.calculationMessage, {fontWeight: '400'}]}>
              Amount of seekers x work hours x hourly rate
            </Text>
          </View>
        </View>

        {/* displaying payment form */}
        <Animated.View
          style={[
            styles.paymentElementContainer,
            {
              transform: [
                {
                  translateY: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1000, 0],
                  }),
                },
              ],
            },
          ]}>
          <View style={styles.paymentElement}>
            <View style={styles.paymentElementHeader}>
              <View style={styles.paymentBackBtnContainer}>
                <AntDesign
                  name="left"
                  size={25}
                  color={'#FE8230'}
                  style={styles.paymentBackBtn}
                  onPress={closePaymentElement}
                />
              </View>
              <View style={styles.paymentTitleContainer}>
                <Text style={styles.paymentElementTitle}>Payment</Text>
              </View>
            </View>
            <View style={styles.amountContainer}>
              <Text style={styles.amountTitleTxt}>Payable amount : </Text>
              <Text style={styles.amountTxt}>Rs.{total.toFixed(2)}</Text>
            </View>
            <View>
              <View>
                <Text style={styles.enterDetailText}>
                  Enter card details :{' '}
                </Text>
              </View>
              <View style={styles.cardFieldContainer}>
                <CardField
                  postalCodeEnabled={false}
                  placeholders={{
                    number: '4242 4242 4242 4242',
                    // 4242424242424242
                  }}
                  cardStyle={{
                    backgroundColor: '#FFFFFF',
                    textColor: '#000000',
                  }}
                  style={{
                    width: '90%',
                    height: 40,
                    margin: 5,
                    borderWidth: 1,
                  }}
                  onFocus={focusedField => {
                    console.log('focusField', focusedField);
                  }}
                />
              </View>
            </View>
            <View style={styles.paymentBtnContainer}>
              <TouchableOpacity style={styles.payBtn} onPress={handlePayment}>
                <Text style={styles.payBtnTxt}>Pay</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>
        {isError ? <ErrorPopUp closeModal={() => setIsError(false)} /> : null}
        {isPaymentError? <PaymentFailurePopUp navigateScreen={() => props.navigation.navigate('JobStatus')}/> : null}
        {isLoading ? <AppLoader /> : null}
      </SafeAreaView>
    </StripeProvider>
  );
};

//internal styles for payment.tsx
const styles = StyleSheet.create({
  payBtnTxt: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFF',
  },

  payBtn: {
    width: '95%',
    height: 50,
    borderRadius: 15,
    backgroundColor: '#FE8235',
    alignItems: 'center',
    justifyContent: 'center',
  },

  paymentBtnContainer: {
    height: 100,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 90,
  },

  amountTxt: {
    fontSize: 32,
    fontWeight: '800',
    color: '#F6A572',
    marginTop: 10,
    backgroundColor: '#ffffff',
    padding: 8,
    // paddingHorizontal:100,
    // borderRadius: 10,
    // elevation: 2,
  },

  amountTitleTxt: {
    fontSize: 20,
    fontWeight: '400',
    color: '#381c02',
    marginTop: 10,
  },

  amountContainer: {
    flexDirection: 'row',
    marginTop: 30,
    width: '100%',
    height: 140,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor:'#f0f'
  },

  cardFieldContainer: {
    borderWidth: 1,
    // marginTop: 80,
    marginHorizontal: 10,
    borderRadius: 10,
    borderColor: '#000',
    // backgroundColor: '#4f474b'
  },

  enterDetailText: {
    fontSize: 20,
    fontWeight: '400',
    color: '#381c02',
    marginLeft: 20,
  },

  paymentElementTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: '#FE8235',
  },

  paymentTitleContainer: {
    width: '90%',
    alignItems: 'center',
    paddingRight: '10%',
  },

  paymentBackBtn: {
    marginLeft: 15,
    width: 25,
  },

  paymentBackBtnContainer: {
    width: '10%',
  },

  paymentElementHeader: {
    width: '100%',
    height: 55,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },

  paymentElement: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFF',
    height: '60%',
    width: '100%',
    elevation: 20,
    borderTopLeftRadius: 30,
    borderTopEndRadius: 30,
  },

  paymentElementContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '115%',
    width: '100%',
    elevation: 20,
  },

  calculationMessage: {
    fontSize: 12,
    fontStyle: 'italic',
    color: '#636162',
    fontWeight: '300',
    alignSelf: 'center',
    textAlign: 'center',
  },

  calculateMessageContainer: {
    height: '15%',
    width: '100%',
    justifyContent: 'flex-end',
  },

  payButtonText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFF',
  },

  payButton: {
    width: '50%',
    height: 50,
    backgroundColor: '#FE8235',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginVertical: 20,
    marginTop: 20,
  },

  totalTxt: {
    color: '#000',
    fontWeight: '800',
    fontSize: 18,
    marginBottom: 5,
  },

  paymentValue: {
    color: '#000',
    fontWeight: '400',
    fontSize: 15,
    marginBottom: 5,
  },
  paymentAttribute: {
    color: '#000',
    fontWeight: '800',
    fontSize: 15,
    marginBottom: 5,
  },

  rightDivider: {
    width: '30%',
    alignItems: 'flex-end',
  },

  leftDivider: {
    width: '70%',
  },

  paymentContainerHorzDivider: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 10,
    // backgroundColor:'orange',
  },

  paymentDataContainer: {
    width: '100%',
    // backgroundColor:'#00f',
    height: '85%',
    borderRadius: 20,
    borderWidth: 3,
    borderColor: '#F2994A',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },

  jobTitle: {
    marginVertical: 20,
    fontSize: 25,
    fontWeight: '800',
    color: '#000',
    textAlign: 'center',
  },

  headerTitle: {
    fontSize: 25,
    fontWeight: '800',
    color: '#FFF',
    lineHeight: 35,
    marginLeft: 10,
  },

  headerBottomDivider: {
    padding: 20,
    flex: 4,
  },

  headerTopDivider: {
    paddingHorizontal: 20,
    justifyContent: 'flex-end',
    flex: 2,
  },

  bottomContainer: {
    flex: 4.2,
    padding: 20,
  },

  topContainer: {
    flex: 1.8,
    width: '110%',
    backgroundColor: '#F2994A',
    borderBottomLeftRadius: 70,
    borderBottomEndRadius: 100,
  },
});

export default Payment;

// rest of the code...

// const handlePayment = () => {
// PayHere.startPayment(
//     paymentObject,
//     (paymentId: any) => {
//         navigate();
//         console.log("Payment Completed", paymentId);
//         //Database implementation
//     },
//     (error: any) => {
//         setErrTitle("Oops...!!");
//         setErrContent(error);
//         setIsLoading(false);
//         setIsError(true);
//         console.log(error);
//     },
//     () => {
//         console.log("Payment Dismissed");
//     }
// );
// };

// const paymentObject = {
//     "sandbox": true,
//     "merchant_id": MerchantId,

// const handlePayment = () => {
// PayHere.startPayment(
//     paymentObject,
//     (paymentId: any) => {
//         navigate();
//         console.log("Payment Completed", paymentId);
//         //Database implementation
//     },
//     (error: any) => {
//         setErrTitle("Oops...!!");
//         setErrContent(error);
//         setIsLoading(false);
//         setIsError(true);
//         console.log(error);
//     },
//     () => {
//         console.log("Payment Dismissed");
//     }
// );
// };

// const paymentObject = {
//     "sandbox": true,
//     "merchant_id": MerchantId,
//     "notify_url": "",
//     "order_id": userName+title,
//     "items": title,
//     "amount": total,
//     "currency": "LKR",
//     "first_name": jobPoster.FirsName,
//     "last_name": jobPoster.LastName,
//     "email": userName,
//     "phone": jobPoster.TpNumber,
//     "address": jobPoster.Address,
//     "city": jobPoster.city,
//     "country": "Sri Lanka",
// };
