import React, {useState} from 'react';
import {
  Button,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

const isValidEmail = email => {
  // Comprehensive email validation regex
  return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
};

function RegisterField({navigation}) {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    telephone: '',
    companyName: '',
    address: '',
  });

  const [formErrors, setFormErrors] = useState({
    username: '',
    password: '',
    email: '',
    telephone: '',
    companyName: '',
    address: '',
  });

  const handleChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const registerSubmit = () => {
    let errors = {};
    let hasError = false;

    // Validate all input fields
    for (const key in formData) {
      if (formData.hasOwnProperty(key)) {
        const value = formData[key];
        if (!value.trim()) {
          errors[key] = `${
            key.charAt(0).toUpperCase() + key.slice(1)
          } is required`;
          hasError = true;
        } else {
          errors[key] = '';
        }
      }
    }

    // Additional validation for email
    if (formData.email.trim() && !isValidEmail(formData.email)) {
      errors.email = 'Invalid Email Address';
      hasError = true;
    }

    // Validation for telephone number
    if (!/^\d{10}$/.test(formData.telephone)) {
      errors.telephone = 'Telephone number must be 10 digits';
      hasError = true;
    } else {
      errors.telephone = '';
    }

    if (hasError) {
      setFormErrors(errors);
    } else {
      // Clear form errors
      setFormErrors({
        username: '',
        password: '',
        email: '',
        telephone: '',
        companyName: '',
        address: '',
      });

      navigation.navigate('RegisterSuccessful');
    }
  };

  return (
    <GestureHandlerRootView style={{flex: 0.85}}>
      <View style={sty.formContainer}>
        <Text style={sty.label}>Username:</Text>
        <View style={sty.inputContainer}>
          <TextInput
            placeholder="Username"
            placeholderTextColor={'#000000'}
            value={formData.username}
            onChangeText={text => handleChange('username', text)}
          />
          {formErrors.username !== '' && (
            <Text style={sty.error}>{formErrors.username}</Text>
          )}
        </View>
        <Text style={sty.label}>Password:</Text>
        <View style={sty.inputContainer}>
          <TextInput
            placeholder="Password"
            placeholderTextColor={'#000000'}
            value={formData.password}
            onChangeText={text => handleChange('password', text)}
            secureTextEntry={true} // Hide password input
          />
          {formErrors.password !== '' && (
            <Text style={sty.error}>{formErrors.password}</Text>
          )}
        </View>
        <Text style={sty.label}>Email Address:</Text>
        <View style={sty.inputContainer}>
          <TextInput
            placeholder="Email Address"
            placeholderTextColor={'#000000'}
            value={formData.email}
            onChangeText={text => handleChange('email', text)}
          />
          {formErrors.email !== '' && (
            <Text style={sty.error}>{formErrors.email}</Text>
          )}
        </View>
        <Text style={sty.label}>Telephone Number:</Text>
        <View style={sty.inputContainer}>
          <TextInput
            placeholder="Telephone Number"
            placeholderTextColor={'#000000'}
            value={formData.telephone}
            onChangeText={text => {
              // Filter out non-numeric characters and limit length to 10
              const formattedText = text.replace(/\D/g, '').slice(0, 10);
              handleChange('telephone', formattedText);
            }}
            keyboardType="numeric" // This ensures the keyboard shows only numbers
          />
          {formErrors.telephone !== '' && (
            <Text style={sty.error}>{formErrors.telephone}</Text>
          )}
        </View>
        <Text style={sty.label}>Company Name:</Text>
        <View style={sty.inputContainer}>
          <TextInput
            placeholder="Company Name"
            placeholderTextColor={'#000000'}
            value={formData.companyName}
            onChangeText={text => handleChange('companyName', text)}
          />
          {formErrors.companyName !== '' && (
            <Text style={sty.error}>{formErrors.companyName}</Text>
          )}
        </View>
        <Text style={sty.label}>Address:</Text>
        <View style={sty.inputContainer}>
          <TextInput
            placeholder="Address"
            placeholderTextColor={'#000000'}
            value={formData.address}
            onChangeText={text => handleChange('address', text)}
          />
          {formErrors.address !== '' && (
            <Text style={sty.error}>{formErrors.address}</Text>
          )}
        </View>
        <View
          style={{
            marginTop: 10,
            marginHorizontal: 35,
          }}>
          <TouchableOpacity
            onPress={registerSubmit}
            style={{
              backgroundColor: '#F2994A',
              paddingVertical: 6,
              paddingHorizontal: 20,
              borderRadius: 5,
              alignItems: 'center',
            }}>
            <Text style={{color: 'white', fontSize: 16}}>Register</Text>
          </TouchableOpacity>
        </View>
        <Text
          style={{
            fontSize: 10,
            color: '#000000',
            fontWeight: '600',
            marginTop: 10,
            marginLeft: 20,
            textAlign: 'center',
          }}>
          {'Already have an Account?'}
        </Text>
      </View>
    </GestureHandlerRootView>
  );
}

const RegisterScreen = ({navigation}) => {
  const onFormSubmit = formData => {
    // Handle form submission here
    console.log('Form data submitted:', formData);
  };

  return (
    <View style={sty.container}>
      <Image
        style={{width: '100%', height: '100%', position: 'absolute'}}
        source={require('../Assets/background.png')}
        resizeMode="cover"
      />
      <Text style={sty.header}>Register</Text>
      <Text style={sty.subheader}>Register as Job Poster</Text>
      <KeyboardAwareScrollView keyboardShouldPersistTaps="handled">
        <RegisterField navigation={navigation} />
      </KeyboardAwareScrollView>
    </View>
  );
};

const sty = StyleSheet.create({
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
  subheader: {
    fontSize: 12,
    color: '#000000',
    fontWeight: '400',
    marginLeft: 20,
  },
});

export default RegisterScreen;
