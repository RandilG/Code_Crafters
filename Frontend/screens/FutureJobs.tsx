import {View, Text, ScrollView, StyleSheet, Pressable, TouchableOpacity, Alert} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import VectorIcon from '../utils/Vectoricons';
import { Card } from 'react-native-paper';

const FutureJobs = (props: any) => {
  return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#FFFFFF'}}>
        <View style={{flex: 1}}>
        <View
          style={{
            backgroundColor: '#F2994A',
            flex: 2,
            width: 400,
            borderBottomLeftRadius: 25,
            borderBottomRightRadius: 25,
            zIndex: 1,
          }}>
          <View
            style={{
              paddingTop: 30,
              paddingLeft: 22,
              paddingBottom: 25,
              padding: 230,
            }}>
            <View style={{flexDirection: 'row'}}>
              <Pressable
                onPress={() => props.navigation.navigate('Test')}>
                <VectorIcon
                  type="MaterialIcons"
                  name="keyboard-arrow-left"
                  color="#FFFFFF"
                  size={25}
                  zIndex="-1"
                />
              </Pressable>
              <Text style={styles.heading}>Future Jobs</Text>
            </View>

          </View>
          </View>
          <View style={{backgroundColor: '#FFFFFF', flex: 4, zIndex: 2}}></View>
          <View style={styles.contentBox}>
            <ScrollView showsVerticalScrollIndicator={false}>
            <JobsCard
                    key={1}
                    props={props}
                    jobId={1}
                    title={"Waiter"}
                    postedDate={"2024/04/02"}
                    jobDate={"2024/04/02"}
                    seekers={5}
                    wHours={6}
                    hRate={200.00}
                    userName={"usernames"}
                  />
            </ScrollView>
          </View>
        </View>
      </SafeAreaView>
  );
};

const JobsCard: React.FC<any> = ({
  props,
  jobId,
  title,
  postedDate,
  jobDate,
  seekers,
  wHours,
  hRate,
  userName,
}) => {

  return (
    // style={[
    //             status == 'declined' ? styles.selectButton : styles.button,
    //           ]}
    <Card style={styles.cardContainer}>
      <Text style={styles.cardTitle}>{title} </Text>
      <View style={{flexDirection: 'row'}}>
        <View>
          <Card.Content>
            <Text style={styles.cardAttribute}>
              <Text style={styles.attributeBold}>Posted Date: </Text>{' '}
              {postedDate}
            </Text>
            <Text style={styles.cardAttribute}>
              <Text style={styles.attributeBold}>Job Date: </Text> {jobDate}
            </Text>
            <Text style={styles.cardAttribute}>
              <Text style={styles.attributeBold}>Amount of Seekers: </Text>{' '}
              {seekers}
            </Text>
          </Card.Content>
        </View>
        <View>
          <Card.Content>
            <Text style={styles.cardAttribute}>
              <Text style={styles.attributeBold}>Work Hours: </Text>
              {wHours}
            </Text>
            <Text style={styles.cardAttribute}>
              <Text style={styles.attributeBold}>Hourly Rate: </Text>
              {hRate}
            </Text>
            <Text style={styles.cardAttribute}>
              <Text style={styles.attributeBold}>Applied Seekers: </Text>{' '}
              {seekers}
            </Text>
          </Card.Content>
        </View>
      </View>
      <Card.Actions>
        <TouchableOpacity
          style={styles.leftButton}
          onPress={() => Alert.alert('Pressed Cancel button')}>
          <Text style={styles.buttonTextLeft}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.rightButton} onPress={() => Alert.alert('Pressed Start button')}>
          <Text style={styles.buttonTextRight}>Start</Text>
        </TouchableOpacity>
      </Card.Actions>
    </Card>
  );
};

const styles = StyleSheet.create({
  buttonTextRight: {
    textAlign: 'center',
    marginHorizontal: 5,
    marginVertical: 5,
    fontWeight: 'bold',
    color: '#ffffff',
    fontSize: 15,
    letterSpacing: 0.75,
  },

  rightButton: {
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

  buttonTextLeft: {
    textAlign: 'center',
    marginHorizontal: 5,
    marginVertical: 5,
    fontWeight: 'bold',
    color: '#ffffff',
    fontSize: 15,
    letterSpacing: 0.75,
  },

  leftButton: {
    height: 34,
    width: 100,
    marginRight: 75,
    backgroundColor: '#908883',
    borderRadius: 10,
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    shadowOpacity: 0.8,
    elevation: 20,
    shadowOffset: {width: 1, height: 13},
    margin: 8,
    marginTop: 15,
  },

  cardTitle: {
    color: '#FE8235',
    fontSize: 20,
    fontWeight: 'bold',
    margin: 12,
    marginBottom: 15,
    marginLeft: 16,
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

  cardContainer: {
    backgroundColor: 'purple',
    margin: 12,
  },

  contentBox: {
    position: 'absolute',
    zIndex: 3,
    backgroundColor: '#FFFFFF',
    height: 680,
    width: '95%',
    alignSelf: 'center',
    marginTop: '20%',
    borderRadius: 25,
    paddingTop: 4,
    paddingBottom: 10,
    elevation: 5,
  },

  heading: {
    fontSize: 20,
    color: '#FFFFFF',
    marginLeft: 1,
    fontWeight: '800',
    letterSpacing: 0.25,
  },
  // scrollviewContainer: {
  //   width: '50%'
  // },

  // topContainer: {
  //   flex:1.8,
  //   width: '100%',
  //   backgroundColor: '#F2994A',
  //   borderBottomLeftRadius: 30,
  //   borderBottomEndRadius: 30,

  // },

  // headerSection: {
  //   marginTop: 20,
  // },

  // backBtn: {
  //   marginTop: 12,
  //   marginLeft: 10,
  // },

  // heading: {
  //   color: '#FFFFFF',
  //   fontSize: 25,
  //   fontWeight: 'bold',
  //   marginLeft: 20,
  //   marginTop: 10,
  // },

  // bottomContainer: {
  //   flex: 4.2,
  //   padding: 20,
  //   zIndex: 2,
  //   backgroundColor: 'red',
  //   marginTop: -150,
  //   marginHorizontal: 10,
  //   borderTopEndRadius: 30,
  //   borderTopStartRadius: 30,
  // }
});

export default FutureJobs;


{/* <View style={{flex:1}}>

<View style={styles.topContainer}>
  <View style={styles.headerSection}>
    <Pressable
      style={{flexDirection: 'row'}}
      onPress={() => props.navigation.navigate('Test')}>
      <VectorIcon
        type="MaterialIcons"
        name="keyboard-arrow-left"
        color="#FFFFFF"
        size={30}
        zIndex="-1"
        style={styles.backBtn}
      />
      <Text style={styles.heading}>Future Jobs</Text>
    </Pressable>
  </View>
</View>

<View style={styles.bottomContainer}>
  <ScrollView style={styles.scrollviewContainer}>
    
  </ScrollView>
</View>

</View> */}