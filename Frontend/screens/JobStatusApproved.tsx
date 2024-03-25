import React, {useState} from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  ScrollView,
  Alert,
  StyleProp,
  ViewProps,
  ViewStyle,
} from 'react-native';
import {Button, Card, Text} from 'react-native-paper';
//import { Icon } from 'react-native-elements';
// import Icon from 'react-native-vector-icons/FontAwesome';
import VectorIcon from '../utils/Vectoricons';

const JobStatusApproved = (props: any) => {
  const [isHoveredPay, setIsHoveredPay] = useState(false);
  const [isHoveredCancel, setIsHoveredCancel] = useState(false);
  const [status, setStatus] = useState<string>('pending');

  function handleStatus(statusIs: string) {
    setStatus(statusIs);
    console.log(`Status changed to: ${status}`);
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1}}>
        <View
          style={{
            backgroundColor: '#F2994A',
            flex: 2,
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
            zIndex: 1,
          }}>
          <View
            style={{
              paddingTop: 30,
              paddingLeft: 22,
              paddingBottom: 30,
              padding: 230,
            }}>
            <Pressable
              style={{flexDirection: 'row'}}
              onPress={() => props.navigation.navigate('Test')}>
              <VectorIcon
                type="MaterialIcons"
                name="keyboard-arrow-left"
                color="#FFFFFF"
                size={25}
                zIndex="-1"
              />
              <Text style={styles.heading}>Job Status</Text>
            </Pressable>
          </View>

          <View
            style={{
              alignItems: 'center',
              justifyContent: 'space-between',
              flexDirection: 'row',
              marginHorizontal: 30,
            }}>
            <TouchableOpacity style={styles.buttonOpacity}>
              <Pressable
                style={styles.button}
                onPress={() => handleStatus('pending')}>
                <Text style={styles.buttonText}>Pending</Text>
              </Pressable>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonOpacity}>
              <Pressable
                style={styles.buttonApproved}
                onPress={() => handleStatus('approved')}>
                <Text style={styles.buttonTextApproved}>Approved</Text>
              </Pressable>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonOpacity}>
              <Pressable
                style={styles.button}
                onPress={() => handleStatus('decline')}>
                <Text style={styles.buttonText}>Decline</Text>
              </Pressable>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{backgroundColor: '#FFFFFF', flex: 4, zIndex: 2}}></View>

        <ScrollView style={styles.contentBox}>
          <Card style={styles.cardContainer}>
            <Text style={styles.cardTitle}>Kitchen Helper</Text>
            <View style={{flexDirection: 'row'}}>
              <View style={styles.leftSide}>
                <Card.Content style={styles.cardData}>
                  <Text style={styles.cardAttribute}>
                    <Text style={styles.attributeBold}>Posted Date:</Text>{' '}
                    2024/03/10{' '}
                  </Text>
                  <Text style={styles.cardAttribute}>
                    <Text style={styles.attributeBold}>Job Date:</Text>{' '}
                    2024/03/15{' '}
                  </Text>
                  <Text style={styles.cardAttribute}>
                    <Text style={styles.attributeBold}>Amount of Seekers:</Text>{' '}
                    05
                  </Text>
                </Card.Content>
              </View>
              <View style={styles.rightSide}>
                <Card.Content style={styles.cardData}>
                  <Text style={styles.cardAttribute}>
                    <Text style={styles.attributeBold}>Work Hours: </Text>8h
                  </Text>
                  <Text style={styles.cardAttribute}>
                    <Text style={styles.attributeBold}>Hourly Rate: </Text>
                    Rs.250
                  </Text>
                </Card.Content>
              </View>
            </View>
            <Card.Actions>
              <Pressable
                style={[
                  styles.cancelButton,
                  isHoveredCancel && styles.hoveredButtonCancel,
                ]}
                onPress={() => Alert.alert('Pressed Cancel button')}
                onPressIn={() => setIsHoveredCancel(true)}
                onPressOut={() => setIsHoveredCancel(false)}>
                <Text style={styles.buttonTextCancel}>Cancel</Text>
              </Pressable>
              <Pressable
                style={[
                  styles.payButton,
                  isHoveredPay && styles.hoveredButtonPay,
                ]}
                onPress={() => Alert.alert('Pressed Pay button')}
                onPressIn={() => setIsHoveredPay(true)}
                onPressOut={() => setIsHoveredPay(false)}>
                <Text style={styles.buttonTextPay}>Pay</Text>
              </Pressable>
            </Card.Actions>
          </Card>

          <Card style={styles.cardContainer}>
            <Text style={styles.cardTitle}>Kitchen Helper</Text>
            <View style={{flexDirection: 'row'}}>
              <View style={styles.leftSide}>
                <Card.Content style={styles.cardData}>
                  <Text style={styles.cardAttribute}>
                    <Text style={styles.attributeBold}>Posted Date:</Text>{' '}
                    2024/03/10{' '}
                  </Text>
                  <Text style={styles.cardAttribute}>
                    <Text style={styles.attributeBold}>Job Date:</Text>{' '}
                    2024/03/15{' '}
                  </Text>
                  <Text style={styles.cardAttribute}>
                    <Text style={styles.attributeBold}>Amount of Seekers:</Text>{' '}
                    05
                  </Text>
                </Card.Content>
              </View>
              <View style={styles.rightSide}>
                <Card.Content style={styles.cardData}>
                  <Text style={styles.cardAttribute}>
                    <Text style={styles.attributeBold}>Work Hours: </Text>8h
                  </Text>
                  <Text style={styles.cardAttribute}>
                    <Text style={styles.attributeBold}>Hourly Rate: </Text>
                    Rs.250
                  </Text>
                </Card.Content>
              </View>
            </View>
            <Card.Actions>
              <Pressable
                style={[
                  styles.cancelButton,
                  isHoveredCancel && styles.hoveredButtonCancel,
                ]}
                onPress={() => Alert.alert('Pressed Cancel button')}
                onPressIn={() => setIsHoveredCancel(true)}
                onPressOut={() => setIsHoveredCancel(false)}>
                <Text style={styles.buttonTextCancel}>Cancel</Text>
              </Pressable>
              <Pressable
                style={[
                  styles.payButton,
                  isHoveredPay && styles.hoveredButtonPay,
                ]}
                onPress={() => Alert.alert('Pressed Pay button')}
                onPressIn={() => setIsHoveredPay(true)}
                onPressOut={() => setIsHoveredPay(false)}>
                <Text style={styles.buttonTextPay}>Pay</Text>
              </Pressable>
            </Card.Actions>
          </Card>

          <Card style={styles.cardContainer}>
            <Text style={styles.cardTitle}>Kitchen Helper</Text>
            <View style={{flexDirection: 'row'}}>
              <View style={styles.leftSide}>
                <Card.Content style={styles.cardData}>
                  <Text style={styles.cardAttribute}>
                    <Text style={styles.attributeBold}>Posted Date:</Text>{' '}
                    2024/03/10{' '}
                  </Text>
                  <Text style={styles.cardAttribute}>
                    <Text style={styles.attributeBold}>Job Date:</Text>{' '}
                    2024/03/15{' '}
                  </Text>
                  <Text style={styles.cardAttribute}>
                    <Text style={styles.attributeBold}>Amount of Seekers:</Text>{' '}
                    05
                  </Text>
                </Card.Content>
              </View>
              <View style={styles.rightSide}>
                <Card.Content style={styles.cardData}>
                  <Text style={styles.cardAttribute}>
                    <Text style={styles.attributeBold}>Work Hours: </Text>8h
                  </Text>
                  <Text style={styles.cardAttribute}>
                    <Text style={styles.attributeBold}>Hourly Rate: </Text>
                    Rs.250
                  </Text>
                </Card.Content>
              </View>
            </View>
            <Card.Actions>
              <Pressable
                style={[
                  styles.cancelButton,
                  isHoveredCancel && styles.hoveredButtonCancel,
                ]}
                onPress={() => Alert.alert('Pressed Cancel button')}
                onPressIn={() => setIsHoveredCancel(true)}
                onPressOut={() => setIsHoveredCancel(false)}>
                <Text style={styles.buttonTextCancel}>Cancel</Text>
              </Pressable>
              <Pressable
                style={[
                  styles.payButton,
                  isHoveredPay && styles.hoveredButtonPay,
                ]}
                onPress={() => Alert.alert('Pressed Pay button')}
                onPressIn={() => setIsHoveredPay(true)}
                onPressOut={() => setIsHoveredPay(false)}>
                <Text style={styles.buttonTextPay}>Pay</Text>
              </Pressable>
            </Card.Actions>
          </Card>

          <Card style={styles.cardContainer}>
            <Text style={styles.cardTitle}>Kitchen Helper</Text>
            <View style={{flexDirection: 'row'}}>
              <View style={styles.leftSide}>
                <Card.Content style={styles.cardData}>
                  <Text style={styles.cardAttribute}>
                    <Text style={styles.attributeBold}>Posted Date:</Text>{' '}
                    2024/03/10{' '}
                  </Text>
                  <Text style={styles.cardAttribute}>
                    <Text style={styles.attributeBold}>Job Date:</Text>{' '}
                    2024/03/15{' '}
                  </Text>
                  <Text style={styles.cardAttribute}>
                    <Text style={styles.attributeBold}>Amount of Seekers:</Text>{' '}
                    05
                  </Text>
                </Card.Content>
              </View>
              <View style={styles.rightSide}>
                <Card.Content style={styles.cardData}>
                  <Text style={styles.cardAttribute}>
                    <Text style={styles.attributeBold}>Work Hours: </Text>8h
                  </Text>
                  <Text style={styles.cardAttribute}>
                    <Text style={styles.attributeBold}>Hourly Rate: </Text>
                    Rs.250
                  </Text>
                </Card.Content>
              </View>
            </View>
            <Card.Actions>
              <Pressable
                style={[
                  styles.cancelButton,
                  isHoveredCancel && styles.hoveredButtonCancel,
                ]}
                onPress={() => Alert.alert('Pressed Cancel button')}
                onPressIn={() => setIsHoveredCancel(true)}
                onPressOut={() => setIsHoveredCancel(false)}>
                <Text style={styles.buttonTextCancel}>Cancel</Text>
              </Pressable>
              <Pressable
                style={[
                  styles.payButton,
                  isHoveredPay && styles.hoveredButtonPay,
                ]}
                onPress={() => Alert.alert('Pressed Pay button')}
                onPressIn={() => setIsHoveredPay(true)}
                onPressOut={() => setIsHoveredPay(false)}>
                <Text style={styles.buttonTextPay}>Pay</Text>
              </Pressable>
            </Card.Actions>
          </Card>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  arrow: {
    marginLeft: 24,
    // marginBottom: 4,
    //elevation:5,
  },
  heading: {
    fontSize: 20,
    color: '#FFFFFF',
    // marginTop: 30,
    marginLeft: 1,
    // marginBottom: 40,
    fontWeight: '800',
    letterSpacing: 0.25,
  },

  button: {
    height: 32,
    width: 98,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    shadowColor: 'rgba(0, 0, 0, 0.8)',
    shadowOpacity: 0.8,
    elevation: 20,
    shadowOffset: {width: 1, height: 13},
  },

  buttonOpacity: {
    shadowColor: 'rgba(0, 0, 0, 0.8)',
    shadowOpacity: 0.1,
    elevation: 20,
    shadowRadius: 15,
    shadowOffset: {width: 1, height: 13},
  },

  buttonText: {
    textAlign: 'center',
    marginHorizontal: 5,
    marginVertical: 5,
    fontWeight: 'bold',
    color: '#000000',
    fontSize: 15,
    letterSpacing: 0.75,
  },

  buttonApproved: {
    height: 32,
    width: 98,
    backgroundColor: '#FE8235',
    borderRadius: 20,
    shadowColor: 'rgba(0, 0, 0, 0.9)',
    shadowOpacity: 0.8,
    elevation: 10,
    shadowOffset: {width: 1, height: 13},
  },

  buttonTextApproved: {
    textAlign: 'center',
    marginHorizontal: 5,
    marginVertical: 5,
    fontWeight: 'bold',
    color: '#ffffff',
    fontSize: 15,
    letterSpacing: 0.75,
  },

  contentBox: {
    position: 'absolute',
    zIndex: 3,
    backgroundColor: '#FFFFFF',
    height: 600,
    width: '95%',
    alignSelf: 'center',
    marginTop: '40%',
    borderRadius: 25,
    
  },

  // card: {
  //   margin: 20,
  //   marginVertical: 10,
  // },

  cardContainer: {
    backgroundColor: '#ffffff',
    margin: 12,
  },

  cardData: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
    fontWeight: 'bold',
  },

  cardTitle: {
    color: '#FE8235',
    fontSize: 17,
    fontWeight: 'bold',
    margin: 12,
    marginBottom: 15,
    marginLeft: 16,
  },

  leftSide: {
    flex: 3.3,
    width: '60%',
  },

  rightSide: {
    flex: 2.7,
    width: '40%',
  },

  cardAttribute: {
    letterSpacing: 0.3,
    color: '#000000',
    fontSize: 13,
  },

  attributeBold: {
    letterSpacing: 0.3,
    color: '#000000',
    fontWeight: '700',
  },

  cancelButton: {
    height: 34,
    width: 100,
    marginRight:75,
    backgroundColor: '#C4C4C4',
    borderRadius: 10,
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    shadowOpacity: 0.8,
    elevation: 20,
    shadowOffset: {width: 1, height: 13},
    margin: 8,
    marginTop: 15,
  },

  hoveredButtonCancel: {
    backgroundColor: '#b0b0b0',
    borderColor: '#b0b0b0',
    shadowColor: 'rgba(0, 0, 0, 0.7)',
    shadowOpacity: 0.5,
    elevation: 20,
  },

  buttonTextCancel: {
    textAlign: 'center',
    marginHorizontal: 5,
    marginVertical: 5,
    fontWeight: 'bold',
    color: '#ffffff',
    fontSize: 15,
    letterSpacing: 0.75,
  },

  payButton: {
    height: 34,
    width: 100,
    backgroundColor: '#FE8235',
    borderRadius: 10,
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    shadowOpacity: 0.8,
    elevation: 20,
    shadowOffset: {width: 1, height: 13},
    margin: 8,
    marginRight: 20,
    marginTop: 15,
    marginLeft: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },

  hoveredButtonPay: {
    backgroundColor: '#ed782f',
    borderColor: '#ed782f',
    shadowColor: 'rgba(0, 0, 0, 0.8)',
    shadowOpacity: 0.2,
    elevation: 20,
  },

  buttonTextPay: {
    textAlign: 'center',
    marginHorizontal: 5,
    marginVertical: 5,
    fontWeight: 'bold',
    color: '#ffffff',
    fontSize: 15,
    letterSpacing: 0.75,
  }
});

export default JobStatusApproved;
