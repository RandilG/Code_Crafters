// Import necessary components and libraries from React Native and other dependencies
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import VectorIcon from '../utils/Vectoricons';
import {Card} from 'react-native-paper';
import {server} from '../service/constant';
import axios, {HttpStatusCode} from 'axios';
import moment from 'moment';
import {setErrorMsg, setErrorTitle} from '../global/variable';
import ErrorPopup from '../components/errorPopUp';
import AppLoader from '../components/appLoader';

// Define the main functional component 'FutureJobs'
const FutureJobs = (props: any) => {
  // Define state variables using the 'useState'
  const [futureJobs, setFutureJobs] = useState<any[]>([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

    //change email for specific job poster
  const userName = 'zab@example.com';

  // Function to fetch future jobs from the job table
  async function getFutureJobs() {
    try {
      const response = await axios.get(server + `fetchFutureJobs/${userName}`);

      if (response.status === HttpStatusCode.Ok) {
         // If request is successful, update state with fetched data
        setFutureJobs(response.data);
        setIsLoading(false);
      } else if (response.status === HttpStatusCode.InternalServerError) {
        // If internal server error, set error state
        setErrorTitle('Oops...!');
        setErrorMsg('response.data[0]');
        setIsLoading(false);
        setIsError(true);
      } else {
        //set generic error message
        setErrorTitle('Oops...!');
        setErrorMsg('Something wrong has happened..');
        setIsError(true);
        setIsLoading(false);
      }
    } catch (error) {
      // Catch any other errors
      setErrorTitle('Oops...!');
      setErrorMsg('Something wrong has happened..');
      setIsError(true);
      setIsLoading(false);
      console.log(error); 
    }
  }

  useEffect(() => {
    setIsError(false);
    setIsLoading(true);
    getFutureJobs();
  }, []);// Empty dependency array means this effect runs only once after initial render

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
              <Pressable onPress={() => props.navigation.navigate('Test')}>
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
          {isLoading ? <AppLoader /> : null}

          <ScrollView showsVerticalScrollIndicator={false}>
            {futureJobs.length !== 0 ? (
              futureJobs.map((item, index) => (
                <JobsCard
                  key={index}
                  props={props}
                  jobId={item.job_id}
                  title={item.title}
                  postedDate={moment(item.posted_date).format('YYYY-MM-DD')}
                  jobDate={moment(item.job_date).format('YYYY-MM-DD')}
                  seekers={item.amount_of_seekers}
                  wHours={item.work_hours}
                  hRate={Number(item.hourly_rate).toFixed(2)}
                  appliedCount={item.count}
                  userName={userName}
                />
              ))
            ) : (
              <Text style={styles.noContentText}>No Content...</Text>
            )}
          </ScrollView>
        </View>
      </View>
      {isError ? <ErrorPopup closeModal={() => setIsError(false)} /> : null}
    </SafeAreaView>
  );
};

// Define JobsCard component for displaying individual job details
const JobsCard: React.FC<any> = ({
  title,
  postedDate,
  jobDate,
  seekers,
  wHours,
  hRate,
  appliedCount,
}) => {
  
  const isToday: boolean = jobDate == moment(new Date()).format('YYYY-MM-DD');

  return (
    <Card
      style={
        appliedCount == seekers
          ? styles.cardContainerSame
          : styles.cardContainerDifferent
      }>
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
              {appliedCount}
            </Text>
          </Card.Content>
        </View>
      </View>
      <Card.Actions>
        <TouchableOpacity style={styles.leftButton} onPress={() => Alert.alert("pressed cancel button")}>
          <Text style={styles.buttonTextLeft}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          disabled={!isToday}
          style={{
            ...styles.rightButton,
            ...{backgroundColor: isToday ? '#FE8235' : '#908883'},
          }}
          onPress={() => Alert.alert('Pressed Start button')}>
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
    borderRadius: 10,
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
    backgroundColor: '#373737',
    borderRadius: 10,
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

  cardContainerSame: {
    backgroundColor: '#d1d0cf',
    margin: 12,
  },

  cardContainerDifferent: {
    backgroundColor: 'white',
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

  noContentText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#000000',
  },
});

export default FutureJobs;
