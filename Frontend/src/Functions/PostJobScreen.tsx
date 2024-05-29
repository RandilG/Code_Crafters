import React, { useState } from 'react';
import { Image, StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';

const isValidEmail = (email) => {
  // Comprehensive email validation regex
  return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
};

function PostField({ onFormSubmit }) {
  const [formData, setFormData] = useState({
    hotelname: '',
    address: '',
    email: '',
    telephone: '',
    date: new Date(),
    time: new Date(),
    payment: '',
  });

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [formErrors, setFormErrors] = useState({
    hotelname: '',
    address: '',
    email: '',
    telephone: '',
    numberOfEmployees:'',
    payment: '',
  });

  const handleChange = (name, value) => {
    let errorMessage = '';
    switch (name) {
      case 'hotelname':
        if (value.trim() === '') {
          errorMessage = 'Hotel Name is required';
        }
        break;
      case 'address':
        if (value.trim() === '') {
          errorMessage = 'Address/Location is required';
        }
        break;
      case 'email':
        if (value.trim() === '') {
          errorMessage = 'Email Address is required';
        } else if (!isValidEmail(value)) {
          errorMessage = 'Invalid Email Address';
        }
        break;
      case 'telephone':
        if (value.trim() === '') {
          errorMessage = 'Telephone Number is required';
        }
        break;
      case 'numberOfEmployees':
        if (!/^\d+$/.test(value)) {
          errorMessage = 'Number of Employees must be a valid number';
        } else if (parseInt(value) < 1) {
          errorMessage = 'Number of Employees must be at least 1';
        }
        break;
      case 'payment':
        if (parseFloat(value) <= 1499) {
          errorMessage = 'Payment should be above 1500';
        }
        break;
      default:
        break;
    }
  
    setFormErrors({ ...formErrors, [name]: errorMessage });
    setFormData({ ...formData, [name]: value });
  };
  

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || formData.date;
    setFormData({ ...formData, date: currentDate });
    setShowDatePicker(false);
  };

  const handleTimeChange = (event, selectedTime) => {
    const currentTime = selectedTime || formData.time;
    setFormData({ ...formData, time: currentTime });
    setShowTimePicker(false);
  };

  const toggleDatePicker = () => {
    setShowDatePicker(!showDatePicker);
  };

  const toggleTimePicker = () => {
    setShowTimePicker(!showTimePicker);
  };

  const postSubmit = () => {
    // Check if any field is empty
    for (const key in formData) {
      if (formData.hasOwnProperty(key)) {
        const fieldValue = formData[key];
        if (!fieldValue || (typeof fieldValue === 'string' && fieldValue.trim() === '')) { // Check if fieldValue is a string before calling trim()
          setFormErrors({ ...formErrors, [key]: `${key.charAt(0).toUpperCase() + key.slice(1)} is required` });
          return; // Stop submission
        }
      }
    }
    // Check if payment is above 1500
    if (parseFloat(formData.payment) < 1500) {
      setFormErrors({ ...formErrors, payment: 'Payment should be above 1500' });
      return; // Stop submission
    }
    // If no empty fields, submit the form
    onFormSubmit(formData);
    // Clear form fields after submission
    setFormData({
      hotelname: '',
      address: '',
      email: '',
      telephone: '',
      date: new Date(),
      time: new Date(),
      numberOfEmployees: '',
      payment: '',
    });
    setFormErrors({
      hotelname: '',
      address: '',
      email: '',
      telephone: '',
      numberOfEmployees:'',
      payment: '',
    });
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.formContainer}>
        <Text style={styles.label}>Hotel Name:</Text>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Hotel Name"
            placeholderTextColor={'#000000'}
            value={formData.hotelname}
            onChangeText={text => handleChange('hotelname', text)}
          />
          {formErrors.hotelname !== '' && <Text style={styles.error}>{formErrors.hotelname}</Text>}
        </View>
        <Text style={styles.label}>Address/Location:</Text>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Address/Location"
            placeholderTextColor={'#000000'}
            value={formData.address}
            onChangeText={text => handleChange('address', text)}
          />
          {formErrors.address !== '' && <Text style={styles.error}>{formErrors.address}</Text>}
        </View>
        <Text style={styles.label}>Email Address:</Text>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Email Address"
            placeholderTextColor={'#000000'}
            value={formData.email}
            onChangeText={text => handleChange('email', text)}
          />
          {formErrors.email !== '' && <Text style={styles.error}>{formErrors.email}</Text>}
        </View>
        <Text style={styles.label}>Telephone Number:</Text>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Telephone Number"
            placeholderTextColor={'#000000'}
            value={formData.telephone}
            onChangeText={text => handleChange('telephone', text)}
          />
          {formErrors.telephone !== '' && <Text style={styles.error}>{formErrors.telephone}</Text>}
        </View>
        <Text style={styles.label}>Date:</Text>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Date"
            placeholderTextColor={'#000000'}
            value={formData.date.toDateString()}
            onTouchStart={toggleDatePicker}
            editable={true}
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
        <Text style={styles.label}>Time:</Text>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Time"
            placeholderTextColor={'#000000'}
            value={formData.time.toLocaleTimeString()}
            onTouchStart={toggleTimePicker}
            editable={true}
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
        <Text style={styles.label}>Number of employees:</Text>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Number of employees"
            placeholderTextColor={'#000000'}
            value={formData.numberOfEmployees}
            onChangeText={text => handleChange('numberOfEmployees', text)}
          />
          {formErrors.numberOfEmployees !== '' && <Text style={styles.error}>{formErrors.numberOfEmployees}</Text>}
        </View>
        <Text style={styles.label}>Payment:</Text>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Payment"
            placeholderTextColor={'#000000'}
            value={formData.payment}
            onChangeText={text => handleChange('payment', text)}
          />
          {formErrors.payment !== '' && <Text style={styles.error}>{formErrors.payment}</Text>}
        </View>
        <TouchableOpacity onPress={postSubmit} style={styles.button}>
          <Text style={styles.buttonText}>Post</Text>
        </TouchableOpacity>
      </View>
    </GestureHandlerRootView>
  );
}

const PostJobScreen = (p:any) => {
  const navigation = useNavigation();

  const onFormSubmit = (formData) => {
    console.log('Submitting form data:', formData);
  
    // Navigate to PostSuccessful page after successful form submission
    p.navigation.navigate('PostSuccessful');
    console.log('Navigated to PostSuccessful page.');
  
    // Navigate to Home page after PostSuccessful page
    navigation.navigate('Home');
    console.log('Navigated to Home page.');
  };

  return (
    <View style={styles.container}>
      <Image
        style={{ width: '100%', height: '100%', position: 'absolute' }}
        source={require('../Assets/background.png')}
        resizeMode="cover"
      />
      <Text style={styles.header}>Post the Jobs</Text>
      <KeyboardAwareScrollView keyboardShouldPersistTaps='handled'>
        <PostField onFormSubmit={onFormSubmit} />
      </KeyboardAwareScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    marginHorizontal: 30,
    marginTop: 20,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  inputContainer: {
    backgroundColor: '#FCF8F8',
    borderRadius: 20,
    height: 60,
    marginVertical: 10,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  label: {
    fontSize: 12,
    marginBottom: 5,
    marginTop: 10,
    marginLeft: 15,
    color: '#000000',
  },
  error: {
    color: 'red',
    marginLeft: 15,
  },
  header: {
    fontSize: 30,
    color: '#000000',
    fontWeight: '600',
    marginTop: 80,
    marginLeft: 20,
  },
  button: {
    backgroundColor: '#F2994A',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default PostJobScreen;
