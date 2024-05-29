import {Text, View, StyleSheet, Image, Button} from 'react-native';
import React, {Component} from 'react';

const ViewPaymentScreen = () => {
  // Dummy payment information
  const paymentInfo = {
    paymentMethod: 'Credit Card',
    cardNumber: '**** **** **** 1234',
    expirationDate: '12/24',
    securityCode: '***',
    billingAddress: '123 Main St, Colombo',
    lastbillingamount: '$50.00',
    totalamount: '$122.52',
  };

  return (
    <View style={styles.container}>
      <Image
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
        }}
        source={require('../Assets/background.png')}
        resizeMode="cover"
      />
      <Text
        style={{
          fontSize: 30,
          color: '#000000',
          fontWeight: '400',
          marginLeft: 20,
          marginTop: 150,
          //textAlign: 'center',
        }}>
        {'View Payment Info'}
      </Text>
      <View
        style={{
          backgroundColor: '#FCF8F8',
          marginTop: 30,
          borderRadius: 20,
          marginHorizontal: 20,
          paddingVertical: 20,
        }}>
        {/* Displaying dummy payment information */}
        <View style={styles.rowContainer}>
          <View style={styles.labelContainer}>
            <Text style={styles.label}>Payment Method:</Text>
            <Text style={styles.label}>Card Number:</Text>
            <Text style={styles.label}>Expiration Date:</Text>
            <Text style={styles.label}>Security Code:</Text>
            <Text style={styles.label}>Billing Address:</Text>
            <Text style={styles.label}>Last Billing Amount:</Text>
            <Text style={styles.label}>Total Amount:</Text>
          </View>
          <View style={styles.dataContainer}>
            <Text style={styles.data}>{paymentInfo.paymentMethod}</Text>
            <Text style={styles.data}>{paymentInfo.cardNumber}</Text>
            <Text style={styles.data}>{paymentInfo.expirationDate}</Text>
            <Text style={styles.data}>{paymentInfo.securityCode}</Text>
            <Text style={styles.data}>{paymentInfo.billingAddress}</Text>
            <Text style={styles.data}>{paymentInfo.lastbillingamount}</Text>
            <Text style={styles.data}>{paymentInfo.totalamount}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ViewPaymentScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  labelContainer: {
    flex: 1,
  },
  dataContainer: {
    flex: 1,
  },
  label: {
    fontSize: 15,
    color: '#333',
    marginBottom: 5,
  },
  data: {
    fontSize: 13,
    color: '#666',
    marginBottom: 10,
  },
});
