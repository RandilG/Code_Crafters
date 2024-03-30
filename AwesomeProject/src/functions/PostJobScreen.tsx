import { Button, Image, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import DateTimePicker from '@react-native-community/datetimepicker';


function PostField({ onFormSubmit }) {
    const [formData,setFormData]=useState({
     hotelname:'',
     address:'',
     email:'',
     telephone:'',
     date:new Date(),
     time:new Date(),
     payment:'',
  });

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const handleChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };

const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || formData.date;
    setFormData({
      ...formData,
      date: currentDate,
    });
    setShowDatePicker(false); 
  };

  const handleTimeChange = (event, selectedTime) => {
    const currentTime = selectedTime || formData.time;
    setFormData({
      ...formData,
      time: currentTime,
    });
    setShowTimePicker(false); // Close the time picker after selecting a time
  };

  const toggleDatePicker = () => {
    setShowDatePicker(!showDatePicker);
  };

  const toggleTimePicker = () => {
    setShowTimePicker(!showTimePicker);
  };
  
  const postSubmit = () => {
    // Call the parent component's onSubmit function with the form data
    onFormSubmit(formData);
  };
  
    return (
      <GestureHandlerRootView style={{flex: 0.85}}>
        <View
          style={{
            flex: 1,
            backgroundColor: '#FFFFFF',
            borderRadius: 20,
            marginHorizontal: 30,
            marginTop: 20,
          }}>
          <Text style={Sty.label}>Hotel Name:</Text>
          <View
            style={{
              backgroundColor: '#FCF8F8',
              borderRadius: 20,
              height: 50,
              margin: 10,
              marginTop:2,
              justifyContent: 'center',
              paddingHorizontal: 20,
  
            }}>
            <TextInput
              placeholder="Hotel Name"
              placeholderTextColor={'#000000'}
              value={formData.hotelname}
              onChangeText={text => handleChange('username', text)}
            />
          </View>
          <Text style={Sty.label}>Address/Location:</Text>
          <View
            style={{
              backgroundColor: '#FCF8F8',
              borderRadius: 20,
              height: 60,
              margin: 10,
              justifyContent: 'center',
              paddingHorizontal: 20,
            }}>
            <TextInput
              placeholder="Address/Location"
              placeholderTextColor={'#000000'}
              value={formData.address}
              onChangeText={text => handleChange('password', text)}
            />
          </View>
          <Text style={Sty.label}>Email Address:</Text>
          <View
            style={{
              backgroundColor: '#FCF8F8',
              borderRadius: 20,
              height: 60,
              margin: 10,
              justifyContent: 'center',
              paddingHorizontal: 20,
            }}>
            <TextInput
              placeholder="Email Address"
              placeholderTextColor={'#000000'}
              value={formData.email}
              onChangeText={text => handleChange('email', text)}
            />
          </View>
          <Text style={Sty.label}>Telephone Number:</Text>
          <View
            style={{
              backgroundColor: '#FCF8F8',
              borderRadius: 20,
              height: 60,
              margin: 10,
              justifyContent: 'center',
              paddingHorizontal: 20,
            }}>
            <TextInput
              placeholder="Telephone Number"
              placeholderTextColor={'#000000'}
              value={formData.telephone}
              onChangeText={text => handleChange('telephone', text)}
            />
          </View>
          <Text style={Sty.label}>Date:</Text>
        <View style={Sty.inputContainer}>
          <TextInput
            placeholder="Date"
            placeholderTextColor={'#000000'}
            value={formData.date.toDateString()} // Display date in a readable format
            onTouchStart={toggleDatePicker} // Show calendar on touch
            editable={true} // Prevent editing directly
          />
        </View>
        {showDatePicker && (
          <DateTimePicker
            value={formData.date}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}
          <Text style={Sty.label}>Time:</Text>
        <View style={Sty.inputContainer}>
          <TextInput
            placeholder="Time"
            placeholderTextColor={'#000000'}
            value={formData.time.toLocaleTimeString()} // Display time in a readable format
            onTouchStart={toggleTimePicker} // Show time picker on touch
            editable={true} // Allow editing
          />
        </View>
        {showTimePicker && (
          <DateTimePicker
            value={formData.time}
            mode="time"
            display="default"
            onChange={handleTimeChange}
          />
        )}
          <Text style={Sty.label}>Payment:</Text>
          <View
            style={{
              backgroundColor: '#FCF8F8',
              borderRadius: 20,
              height: 60,
              margin: 10,
              justifyContent: 'center',
              paddingHorizontal: 20,
            }}>
            <TextInput
              placeholder="Payment"
              placeholderTextColor={'#000000'}
              value={formData.payment}
              onChangeText={text => handleChange('address', text)}
            />
          </View>
          <Button title="Post" onPress={postSubmit} color="#F2994A"  />
        </View>
      </GestureHandlerRootView>
    );
  }

const PostJobScreen = () => {
    const onFormSubmit = (formData: any) => {
        // Handle form submission here
        console.log('Form data submitted:', formData);
      };
  return (
    <View style={Sty.container}>
      
        <Image
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
          }}
          source={require('../../assets/img/background.png')}
          resizeMode="cover"
        />
        <Text
          style={{
            fontSize: 30,
            color: '#000000',
            fontWeight: '600',
            marginTop: 80,
            marginLeft: 20,
          }}>
          {'Register'}
        </Text>
        <Text
          style={{
            fontSize: 12,
            color: '#000000',
            fontWeight: '400',
            marginLeft: 20,
          }}>
          {'Register as Job Postet'}
        </Text>
        <KeyboardAwareScrollView keyboardShouldPersistTaps='handled'>
        <PostField onFormSubmit={onFormSubmit} />
      </KeyboardAwareScrollView>
    </View>
  )
}

export default PostJobScreen

const Sty=StyleSheet.create({
    container:{
      flex:1,
    },
    inputContainer: {
        backgroundColor: '#FCF8F8',
        borderRadius: 20,
        height: 50,
        margin: 10,
        marginTop: 2,
        justifyContent: 'center',
        paddingHorizontal: 20,
      },
    label: {
      fontSize: 12,
      marginBottom: 5,
      marginTop:5,
      marginLeft:15,
      color: '#000000',
    },
    button:{
      height:70,
      marginTop:20,
      borderRadius:10
    },
  })