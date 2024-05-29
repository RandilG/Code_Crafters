import {Text, View, StyleSheet, Image, Button, FlatList, TouchableOpacity, } from 'react-native';
import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome'
import { useNavigation } from '@react-navigation/native';

const data = [
  {
    id: '1',
    hotelname: 'Hotel A',
    address: '123 Main Street',
    email: 'hotelA@example.com',
    telephone: '123-456-7890',
    date: '2024-04-28',
    time: '10:00 AM',
    numberOfEmployees: 5,
    payment: 2000,
  },
  {
    id: '2',
    hotelname: 'Hotel B',
    address: '456 Elm Street',
    email: 'hotelB@example.com',
    telephone: '987-654-3210',
    date: '2024-04-29',
    time: '11:00 AM',
    numberOfEmployees: 3,
    payment: 1800,
  },
  {
    id: '3',
    hotelname: 'Hotel C',
    address: '789 Main Street',
    email: 'hotelC@example.com',
    telephone: '123-654-3210',
    date: '2024-04-30',
    time: '04:00 PM',
    numberOfEmployees: 5,
    payment: 2500,
  },
  // Add  dummy data
];

const ViewJobsScreen = () => {
  const navigation = useNavigation();
  
  const renderItem = ({item}) => (
    <View style={Sty.jobItem}>
      <View style={Sty.section}>
        <Text style={Sty.sectionLabel}>Hotel Name:</Text>
        <Text>{item.hotelname}</Text>
      </View>
      <View style={Sty.section}>
        <Text style={Sty.sectionLabel}>Address/Location:</Text>
        <Text>{item.address}</Text>
      </View>
      <View style={Sty.section}>
        <Text style={Sty.sectionLabel}>Contact Information:</Text>
        <Text style={Sty.subText}>Email: {item.email}</Text>
        <Text style={Sty.subText}>Telephone: {item.telephone}</Text>
      </View>
      <View style={Sty.section}>
        <Text style={Sty.sectionLabel}>Schedule:</Text>
        <Text style={Sty.subText}>Date: {item.date}</Text>
        <Text style={Sty.subText}>Time: {item.time}</Text>
      </View>
      <View style={Sty.section}>
        <Text style={Sty.sectionLabel}>Job Details:</Text>
        <Text style={Sty.subText}>
          Number of Employees: {item.numberOfEmployees}
        </Text>
        <Text style={Sty.subText}>Payment: {item.payment}</Text>
      </View>
      <TouchableOpacity
        style={Sty.editIcon}
        onPress={() => navigation.navigate('EditJobsScreen', {jobId: item.id})}>
        <Icon name={'pencil'} size={30} color={'#F2994A'} />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={Sty.container}>
      <Image
        style={{
          width: '120%',
          height: '100%',
          position: 'absolute',
        }}
        source={require('../Assets/background.png')}
        resizeMode="cover"
      />
      <Text
        style={{
          fontSize: 25,
          color: '#000000',
          fontWeight: '400',
          marginLeft: 15,
          marginTop: 50,
        }}>
        {'View posted jobs'}
      </Text>
      <View
        style={{
          backgroundColor: '#FCF8F8',
          marginTop: 20,
          borderRadius: 20,
          marginHorizontal: 20,
          height: 600,
        }}>
        <View style={Sty.container}>
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          />
        </View>
      </View>
      {/*<View style={Sty.icon}>
        <Icon name={'pencil'} size={30}  color={'#F2994A'}/>
      
      </View>*/}
    </View>
    
  );
};

export default ViewJobsScreen;

const Sty = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  jobItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  label: {
    fontWeight: 'bold',
    marginTop: 5,
  },
  section: {
    marginBottom: 10,
  },
  sectionLabel: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subText: {
    marginLeft: 10,
  },
  icon:{
    //alignItems:'right',
    marginLeft: 10,
  },
  editIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
});
