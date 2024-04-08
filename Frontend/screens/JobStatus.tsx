import React, {useEffect, useState} from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import {Button, Card, Text} from 'react-native-paper';
import VectorIcon from '../utils/Vectoricons';
import {server} from '../service/constant';
import axios, {HttpStatusCode} from 'axios';
import moment from 'moment';
import {setErrorMsg, setErrorTitle} from '../global/variable';
import ErrorPopup from '../components/errorPopUp';
import AppLoader from '../components/appLoader';

const JobStatus = (props: any) => {
  //const [isHoveredPay, setIsHoveredPay] = useState(false);
  //const [isHoveredCancel, setIsHoveredCancel] = useState(false);
  const [status, setStatus] = useState<string>('pending');
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [pendingJobs, setPendingJobs] = useState<any[]>([]);
  const [approvedJobs, setApprovedJobs] = useState<any[]>([]);
  const [declinedJobs, setDeclinedJobs] = useState<any[]>([]);

  function handleStatus(statusIs: string) {
    setStatus(statusIs);
    console.log(`Status changed to: ${statusIs}`);
  }

  const userName = 'david@gmail.com'; //change email for specific user

  //fetch pending jobs
  async function getPendingJobs() {
    try {
      const response = await axios.get(server + `fetchPending/${userName}`);
      if (response.status === HttpStatusCode.Ok) {
        setPendingJobs(response.data);
        setIsLoading(false);
      } else if (response.status === HttpStatusCode.InternalServerError) {
        setErrorTitle('Oops...!');
        setErrorMsg('response.data[0]');
        setIsLoading(false);
        setIsError(true);
      } else {
        setErrorTitle('Oops...!');
        setErrorMsg('Something wrong has happened..');
        setIsLoading(false);
        setIsError(true);
      }
    } catch (error) {
      setErrorTitle('Oops...!');
      setErrorMsg('Something wrong has happened..');
      setIsError(true);
      setIsLoading(false);
      console.log(error); //Handle error here
    }
  }

  //fetch approved jobs
  async function getApprovedJobs() {
    try {
      const response = await axios.get(server + `fetchApproved/${userName}`);
      if (response.status === HttpStatusCode.Ok) {
        setApprovedJobs(response.data);
        setIsLoading(false);
      } else if (response.status === HttpStatusCode.InternalServerError) {
        setErrorTitle('Oops...!');
        setErrorMsg('Something wrong has happened..');
        setIsLoading(false);
        setIsError(true);
      } else {
        setErrorTitle('Oops...!');
        setErrorMsg('Something wrong has happened..');
        setIsLoading(false);
        setIsError(true);
      }
    } catch (error) {
      setErrorTitle('Oops...!');
      setErrorMsg('Something wrong has happened..');
      setIsError(true);
      setIsLoading(false);
      console.log(error); //Handle error here
    }
  }

  //fetch declined jobs
  async function getDeclinedJobs() {
    try {
      const response = await axios.get(server + `fetchDeclined/${userName}`);

      if (response.status === HttpStatusCode.Ok) {
        setDeclinedJobs(response.data);
        setIsLoading(false);
      } else if (response.status === HttpStatusCode.InternalServerError) {
        setErrorTitle('Oops...!');
        setErrorMsg('response.data[0]');
        setIsLoading(false);
        setIsError(true);
      } else {
        setErrorTitle('Oops...!');
        setErrorMsg('Something wrong has happened..');
        setIsError(true);
        setIsLoading(false);
      }
    } catch (error) {
      setErrorTitle('Oops...!');
      setErrorMsg('Something wrong has happened..');
      setIsError(true);
      setIsLoading(false);
      console.log(error); //Handle error here
    }
  }

  useEffect(() => {
    setIsError(false);
    setIsLoading(true);
    getPendingJobs();
    getApprovedJobs();
    getDeclinedJobs();
  }, []);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
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
              marginHorizontal: 20,
            }}>
            <TouchableOpacity
              style={[
                status == 'pending' ? styles.selectButton : styles.button,
              ]}
              onPress={() => handleStatus('pending')}>
              <Text
                style={[
                  status == 'pending'
                    ? styles.selectButtonText
                    : styles.buttonText,
                ]}>
                Pending
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                status == 'approved' ? styles.selectButton : styles.button,
              ]}
              onPress={() => handleStatus('approved')}>
              <Text
                style={[
                  status == 'approved'
                    ? styles.selectButtonText
                    : styles.buttonText,
                ]}>
                Approved
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                status == 'declined' ? styles.selectButton : styles.button,
              ]}
              onPress={() => handleStatus('declined')}>
              <Text
                style={[
                  status == 'declined'
                    ? styles.selectButtonText
                    : styles.buttonText,
                ]}>
                Declined
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{backgroundColor: '#FFFFFF', flex: 4, zIndex: 2}}></View>
        <View style={styles.contentBox}>
          {isLoading ? <AppLoader /> : null}

          <ScrollView showsVerticalScrollIndicator={false}>
            {status == 'pending' ? (
              pendingJobs.length != 0 ? (
                pendingJobs.map((item, index) => (
                  <PendingCards
                    key={index}
                    title={item.title}
                    postedDate={moment(item.posted_date).format('YYYY-MM-DD')}
                    jobDate={moment(item.job_date).format('YYYY-MM-DD')}
                    seekers={item.amount_of_seekers}
                    wHours={item.work_hours}
                    hRate={Number(item.hourly_rate).toFixed(2)}
                  />
                ))
              ) : (
                <Text style={styles.noContentText}>No Content...</Text>
              )
            ) : status == 'approved' ? (
              approvedJobs.length != 0 ? (
                approvedJobs.map((item, index) => (
                  <ApprovedCards
                    key={index}
                    props={props}
                    jobId={item.tempory_job_id}
                    title={item.title}
                    postedDate={moment(item.posted_date).format('YYYY-MM-DD')}
                    jobDate={moment(item.job_date).format('YYYY-MM-DD')}
                    seekers={item.amount_of_seekers}
                    wHours={item.work_hours}
                    hRate={Number(item.hourly_rate).toFixed(2)}
                    userName={userName}
                  />
                ))
              ) : (
                <Text style={styles.noContentText}>No Content...</Text>
              )
            ) : status == 'declined' ? (
              declinedJobs.length != 0 ? (
                declinedJobs.map((item, index) => (
                  <DeclinedCards
                    key={index}
                    title={item.title}
                    postedDate={moment(item.posted_date).format('YYYY-MM-DD')}
                    jobDate={moment(item.job_date).format('YYYY-MM-DD')}
                    seekers={item.amount_of_seekers}
                    wHours={item.work_hours}
                    hRate={Number(item.hourly_rate).toFixed(2)}
                    userName={userName}
                    reason={item.decline_reason}
                  />
                ))
              ) : (
                <Text style={styles.noContentText}>No Content...</Text>
              )
            ) : null}
          </ScrollView>
        </View>
      </View>
      {isError ? <ErrorPopup closeModal={() => setIsError(false)} /> : null}
    </SafeAreaView>
  );
};

const PendingCards: React.FC<any> = ({
  title,
  postedDate,
  jobDate,
  seekers,
  wHours,
  hRate,
}) => {
  return (
    <Card style={styles.cardContainer}>
      <Text style={styles.cardTitle}>{title}</Text>
      <View style={{flexDirection: 'row'}}>
        <View>
          <Card.Content>
            <Text style={styles.cardAttribute}>
              <Text style={styles.attributeBold}>Posted Date: </Text>
              {postedDate}
            </Text>
            <Text style={styles.cardAttribute}>
              <Text style={styles.attributeBold}>Job Date: </Text>
              {jobDate}
            </Text>
            <Text style={styles.cardAttribute}>
              <Text style={styles.attributeBold}>Amount of Seekers: </Text>
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
          </Card.Content>
        </View>
      </View>
      <Card.Actions>
        <TouchableOpacity
          style={styles.leftButton}
          onPress={() => Alert.alert('Pressed Cancel button')}>
          <Text style={styles.buttonTextLeft}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.rightButton}
          onPress={() => Alert.alert('Pressed Edit button')}>
          <Text style={styles.buttonTextRight}>Edit</Text>
        </TouchableOpacity>
      </Card.Actions>
    </Card>
  );
};

const ApprovedCards: React.FC<any> = ({
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
  const handlePayButton = () => {
    props.navigation.navigate('Payment', {
      jobId: jobId,
      title: title,
      seekers: seekers,
      wHours: wHours,
      hRate: hRate,
      userName: userName,
    });
  };

  return (
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
          </Card.Content>
        </View>
      </View>
      <Card.Actions>
        <TouchableOpacity
          style={styles.leftButton}
          onPress={() => Alert.alert('Pressed Cancel button')}>
          <Text style={styles.buttonTextLeft}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.rightButton} onPress={handlePayButton}>
          <Text style={styles.buttonTextRight}>Pay</Text>
        </TouchableOpacity>
      </Card.Actions>
    </Card>
  );
};

const DeclinedCards: React.FC<any> = ({
  title,
  postedDate,
  jobDate,
  seekers,
  wHours,
  hRate,
  reason,
}) => {
  return (
    <Card style={styles.cardContainer}>
      <Text style={styles.cardTitle}>{title} </Text>
      <View style={{flexDirection: 'row'}}>
        <View>
          <Card.Content>
            <Text style={styles.cardAttribute}>
              <Text style={styles.attributeBold}>Posted Date: </Text>
              {postedDate}
            </Text>
            <Text style={styles.cardAttribute}>
              <Text style={styles.attributeBold}>Job Date: </Text>
              {jobDate}
            </Text>
            <Text style={styles.cardAttribute}>
              <Text style={styles.attributeBold}>Amount of Seekers: </Text>
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
          </Card.Content>
        </View>
      </View>
      <Text style={styles.attributeBoldReason}>Reason for decline: </Text>
      <Text style={styles.cardAttributeReason}>{reason}</Text>
    </Card>
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
    marginLeft: 1,
    fontWeight: '800',
    letterSpacing: 0.25,
  },

  button: {
    height: 40,
    width: 105,
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 20,
    shadowColor: 'rgba(0, 0, 0, 0.8)',
    shadowOpacity: 0.8,
    elevation: 20,
    marginTop: 10,
    shadowOffset: {width: 1, height: 13},
  },

  buttonText: {
    textAlign: 'center',
    marginHorizontal: 5,
    marginVertical: 5,
    fontWeight: '600',
    color: '#656464',
    fontSize: 15,
    letterSpacing: 0.75,
  },
  selectButton: {
    height: 40,
    width: 105,
    backgroundColor: '#FE8235',
    justifyContent: 'center',
    borderRadius: 20,
    shadowColor: 'rgba(0, 0, 0, 0.9)',
    shadowOpacity: 0.8,
    elevation: 10,
    shadowOffset: {width: 1, height: 13},
  },

  selectButtonText: {
    textAlign: 'center',
    marginHorizontal: 5,
    marginVertical: 5,
    fontWeight: '600',
    color: '#ffffff',
    fontSize: 15,
    letterSpacing: 0.75,
  },

  lottieLoading: {
    // backgroundColor:'red',
    width: 150,
    height: 150,
    position: 'absolute',
    alignSelf: 'center',
  },

  contentBox: {
    position: 'absolute',
    zIndex: 3,
    backgroundColor: '#FFFFFF',
    height: 620,
    width: '95%',
    alignSelf: 'center',
    marginTop: '38%',
    borderRadius: 25,
    paddingTop: 4,
    paddingBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },

  // card: {
  //   margin: 20,
  //   marginVertical: 10,
  // },

  cardContainer: {
    backgroundColor: '#ffffff',
    margin: 12,
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

  // hoveredButtonCancel: {
  //   backgroundColor: '#b0b0b0',
  //   borderColor: '#b0b0b0',
  //   shadowColor: 'rgba(0, 0, 0, 0.7)',
  //   shadowOpacity: 0.5,
  //   elevation: 20,
  // },

  buttonTextLeft: {
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

  // hoveredButtonPay: {
  //   backgroundColor: '#ed782f',
  //   borderColor: '#ed782f',
  //   shadowColor: 'rgba(0, 0, 0, 0.8)',
  //   shadowOpacity: 0.2,
  //   elevation: 20,
  // },

  buttonTextRight: {
    textAlign: 'center',
    marginHorizontal: 5,
    marginVertical: 5,
    fontWeight: 'bold',
    color: '#ffffff',
    fontSize: 15,
    letterSpacing: 0.75,
  },

  cardAttributeReason: {
    letterSpacing: 0.3,
    color: '#000000',
    fontSize: 13,
    marginLeft: 18,
    marginRight: 18,
    marginBottom: 10,
    textAlign: 'justify',
  },

  attributeBoldReason: {
    letterSpacing: 0.3,
    color: '#000000',
    fontWeight: '700',
    marginLeft: 18,
    marginTop: 15,
  },

  buttonPending: {
    height: 32,
    width: 92,
    backgroundColor: '#F2994A',
    borderRadius: 20,
    shadowColor: 'rgba(0, 0, 0, 0.9)',
    shadowOpacity: 0.8,
    elevation: 20,
    shadowOffset: {width: 1, height: 13},
  },

  buttonTextPending: {
    textAlign: 'center',
    marginHorizontal: 5,
    marginVertical: 5,
    fontWeight: 'bold',
    color: '#ffffff',
    fontSize: 15,
    letterSpacing: 0.75,
  },

  EditButton: {
    height: 30,
    width: 90,
    backgroundColor: '#F2994A',
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

  hoveredButtonEdit: {
    backgroundColor: '#FFFFFF',
    borderColor: '#F2994A',
    borderWidth: 3,
    height: 34,
  },

  buttonDecline: {
    height: 32,
    width: 92,
    backgroundColor: '#F2994A',
    borderRadius: 20,
    shadowColor: 'rgba(0, 0, 0, 0.9)',
    shadowOpacity: 0.8,
    elevation: 20,
    shadowOffset: {width: 1, height: 13},
  },

  buttonTextDecline: {
    textAlign: 'center',
    marginHorizontal: 5,
    marginVertical: 5,
    fontWeight: 'bold',
    color: '#ffffff',
    fontSize: 15,
    letterSpacing: 0.75,
  },

  noContentText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#000000',
  },
});

export default JobStatus;
