import React, { useState } from 'react';
import { Image, StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const isValidEmail = email => {
  // Comprehensive email validation regex
  return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
};

function LoginField({ navigation }) {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [formErrors, setFormErrors] = useState({
    username: '',
    password: '',
    errorMessage: '',
  });

  const handleChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const loginSubmit = () => {
    let errors = {};
    let hasError = false;

    // Validate all input fields
    for (const key in formData) {
      if (formData.hasOwnProperty(key)) {
        const value = formData[key];
        if (!value.trim()) {
          errors[key] = `${key.charAt(0).toUpperCase() + key.slice(1)} is required`;
          hasError = true;
        } else {
          errors[key] = '';
        }
      }
    }

    if (hasError) {
      setFormErrors({
        ...errors,
        errorMessage: 'Please fill all fields',
      });
    } else {
      // Clear form data
      setFormData({
        username: '',
        password: '',
      });

      // Clear form errors
      setFormErrors({
        username: '',
        password: '',
        errorMessage: '',
      });

      navigation.navigate('LoginSuccessful');
    }
  };

  return (
    <GestureHandlerRootView style={{ flex: 0.85 }}>
      <View style={styles.formContainer}>
        <Text style={styles.label}>Username:</Text>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Username"
            placeholderTextColor={'#000000'}
            value={formData.username}
            onChangeText={text => handleChange('username', text)}
          />
          {formErrors.username !== '' && (
            <Text style={styles.error}>{formErrors.username}</Text>
          )}
        </View>
        <Text style={styles.label}>Password:</Text>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Password"
            placeholderTextColor={'#000000'}
            value={formData.password}
            onChangeText={text => handleChange('password', text)}
            secureTextEntry={true} // Hide password input
          />
          {formErrors.password !== '' && (
            <Text style={styles.error}>{formErrors.password}</Text>
          )}
        </View>
        <View style={{ marginTop: 20 }}>
          <TouchableOpacity
            onPress={loginSubmit}
            style={{
              backgroundColor: '#F2994A',
              paddingVertical: 8,
              paddingHorizontal: 20,
              borderRadius: 5,
              alignItems:'center',
            }}>
            <Text style={{ color: 'white', fontSize: 16 }}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
      {formErrors.errorMessage !== '' && (
        <Text style={styles.errorMessage}>{formErrors.errorMessage}</Text>
      )}
      <Text
        style={{
          fontSize: 10,
          color: '#000000',
          fontWeight: '600',
          marginTop: 10,
          marginLeft: 20,
          textAlign: 'center',
        }}>
        {'Let us get started!'}
      </Text>
    </GestureHandlerRootView>
  );
}

const LoginScreen = ({ navigation }) => {
  const onFormSubmit = formData => {
    // Handle form submission here
    console.log('Login data submitted:', formData);
  };

  return (
    <View style={styles.container}>
      <Image
        style={{ width: '100%', height: '100%', position: 'absolute' }}
        source={require('../Assets/background.png')}
        resizeMode="cover"
      />
      <Text style={styles.header}>Login</Text>
      <Text style={styles.subheader}>Login as Job Poster</Text>
      <KeyboardAwareScrollView keyboardShouldPersistTaps="handled">
        <LoginField navigation={navigation} />
      </KeyboardAwareScrollView>
    </View>
  );
};

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
  errorMessage: {
    color: 'red',
    marginLeft: 20,
    marginTop: 10,
    textAlign: 'center',
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

export default LoginScreen;
