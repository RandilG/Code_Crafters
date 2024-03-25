import React from 'react';
import {SafeAreaView, View, Text, Alert} from 'react-native';
import VectorIcon from '../utils/Vectoricons';
import {Pressable} from 'react-native';
import {StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native';

const Payment = (props: any) => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1}}>
        <View style={{flex: 1.6}}>
          <View style={styles.topView}>
            <Pressable
              onPress={() => props.navigation.navigate('JobStatus')}
              style={{flexDirection: 'row', alignItems: 'center'}}>
              <VectorIcon
                style={styles.arrow}
                type="Feather"
                name="arrow-left"
                color="#FFFFFF"
                size={25}
                zIndex="-1"
              />
            </Pressable>
            <Text style={styles.heading}>
              You Can Check Your{'\n'}               Payment Details Here ,
            </Text>
          </View>
        </View>
        <View style={{flex: 4.4}}>
          <View style={styles.card}>

            <View>
              <Text style={styles.title}>Table Arranger</Text>
            </View>

            <View style={styles.cardSection}>
              <View style={styles.totalContainer}>
              <View style={styles.cardAttribute}>
                <Text style={styles.attributeText}>Amount of Seekers: </Text>
              </View>
              <View style={styles.cardValue}>
                <Text style={styles.valueText}>5</Text>
              </View>
            </View>
            <View style={styles.totalContainer}>
              <View style={styles.cardAttribute}>
                <Text style={styles.attributeText}>Work Hours: </Text>
              </View>
              <View style={styles.cardValue}>
                <Text style={styles.valueText}>6</Text>
              </View>
            </View>
            <View style={styles.totalContainer}>
              <View style={styles.cardAttribute}>
                <Text style={styles.attributeText}>Hourly Rate: </Text>
              </View>
              <View style={styles.cardValue}>
                <Text style={styles.valueText}>Rs 300.00</Text>
              </View>
            </View>
            </View>

            <View style={styles.cardSection}>
              <View style={styles.totalContainer}>
              <View style={styles.cardAttribute}>
                <Text style={styles.attributeText}>Seekers' Charge: </Text>
              </View>
              <View style={styles.cardValue}>
                <Text style={styles.valueText}>Rs 9000.00</Text>
              </View>
            </View>
            <View style={styles.totalContainer}>
              <View style={styles.cardAttribute}>
                <Text style={styles.attributeText}>Service Charge: </Text>
              </View>
              <View style={styles.cardValue}>
                <Text style={styles.valueText}>Rs 1800.00</Text>
              </View>
            </View>
            </View>

            <View style={styles.cardSection}>
              <View style={styles.totalContainer}>
              <View style={styles.cardAttribute}>
                <Text style={styles.attributeText}>Total: </Text>
              </View>
              <View style={styles.cardValue}>
                <Text style={styles.valueText}>Rs 10800.00</Text>
              </View>
            </View>
            </View>

            <View>
              <TouchableOpacity
                style={styles.payNowButton}
                onPress={() => Alert.alert('Pressed Pay Now button')}>
                <Text style={styles.payNowButtonText}>Pay Now</Text>
              </TouchableOpacity>
            </View>

          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  topView: {
    backgroundColor: '#F2994A',
    height: '100%',
    borderBottomLeftRadius: 80,
    borderBottomRightRadius: 40,
  },

  arrow: {
    marginHorizontal: '5%',
    marginTop: '8%',
  },

  heading: {
    fontSize: 22,
    color: '#FFFFFF',
    fontWeight: 'bold',
    margin: '5%',
    lineHeight: 30,
    paddingTop: '2%',
  },

  title: {
    fontSize: 25,
    fontWeight: '900',
    marginHorizontal: '5%',
    paddingVertical: '6%',
    textAlign: 'center',
    color: '#000000',
  },

  card: {
    backgroundColor: '#fffbf9',
    // borderColor: '#FE8235',
    // borderWidth: 1,
     margin: '5%',
     marginVertical: '15%',
    padding: '5%',
    borderRadius: 20,
    elevation: 8,
  },

  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginHorizontal: '2%',
    marginVertical: '2%', 
  },

  cardAttribute: {
    flex: 3.5,
  },

  cardValue: {
    flex: 2.5,
    alignItems: 'flex-end',
  },

  attributeText: {
    fontSize: 17,
    fontWeight: '800',
    color: '#000000',
    textAlign: 'left',
  },

  valueText: {
    fontSize: 17,
    color: '#000000',
    textAlign: 'right',
  },

  payNowButton: {
    backgroundColor: '#FE8235',
    padding: 10,
    borderRadius: 10,
    marginHorizontal: '20%',
    marginTop: '10%',
    marginBottom: '2%',
    alignItems: 'center',
    width: '60%',
    elevation: 6,
  },

  payNowButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },

  cardSection: {
    borderBottomWidth: 0.6,
    borderBottomColor: '#FE8235', 
    marginVertical: '2%',
  }
});

export default Payment;
