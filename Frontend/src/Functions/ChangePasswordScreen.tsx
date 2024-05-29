import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, TouchableOpacity } from 'react-native';

const ChangePasswordScreen = () => {

  const navigation = useNavigation();

  const gotoChangePasswordSuccessful = () => {
    navigation.navigate('ChangePasswordSuccessful');
  };

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChangePassword = () => {
    // Validate passwords
    if (!currentPassword || !newPassword || !confirmPassword) {
      setErrorMessage('Please fill in all fields');
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }

    // Implement logic to change password (e.g., send request to server)

    // Reset form fields
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setErrorMessage('');

    // Navigate to success screen
    gotoChangePasswordSuccessful();
  };

  return (
    <View style={styles.container}>
      <Image
        style={{
          width: '120%',
          height: '100%',
          position: 'absolute',
        }}
        source={require('../Assets/background.png')}
        resizeMode="cover"
      />
      <View
        style={{
          backgroundColor: '#FCF8F8',
          marginTop: 50,
          borderRadius: 20,
          marginHorizontal: 20,
          height: 400,
          width: 325,
        }}>
        <Text style={styles.title}>Change Password</Text>
        {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
        <TextInput
          style={styles.input}
          placeholder="Current Password"
          secureTextEntry
          value={currentPassword}
          onChangeText={setCurrentPassword}
        />
        <TextInput
          style={styles.input}
          placeholder="New Password"
          secureTextEntry
          value={newPassword}
          onChangeText={setNewPassword}
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm New Password"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        <View style={styles.buttonContainer}>
          <View
            style={{
              marginTop: 20,
              marginHorizontal: 30,
            }}>
            <TouchableOpacity
              onPress={handleChangePassword} // Changed to handle the form submission
              style={{
                backgroundColor: '#F2994A',
                paddingVertical: 8,
                paddingHorizontal: 20,
                borderRadius: 5,
                alignItems:'center',
              }}>
              <Text style={{ color: 'white', fontSize: 16 }}>Change password</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop:30,
    marginLeft:15
  },
  input: {
    width: '90%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    marginLeft:15,
  },
  error: {
    color: 'red',
    marginBottom: 10,
    marginLeft:15,
  },
  buttonContainer: {
    marginTop: 20,
    alignItems: 'center',
    width: '100%',
  },
});

export default ChangePasswordScreen;
