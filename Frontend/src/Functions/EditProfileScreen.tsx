import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Image, TouchableOpacity } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const EditProfileScreen = () => {

    const navigation = useNavigation();


    const [username, setUsername] = useState('ABC company');
    const [telephoneNumber, setTelephoneNumber] = useState('1234567890');
    const [email, setEmail] = useState('abccompay@example.com');
    const [address, setAddress] = useState('123, Main Street, Colombo');
  
    const handleSaveChanges = () => {
      // Implement logic to save changes
      console.log('Username:', username);
      console.log('Telephone Number:', telephoneNumber);
      console.log('Email:', email);
      console.log('Address:', address);
    };

    const gotoEditProfileSuccessful = () => {
        navigation.navigate('EditProfileSuccessful');
      };

    return (
      <View style={styles.container}>
        <Image
          style={styles.backgroundImage}
          source={require('../Assets/background.png')}
          resizeMode="cover"
        />
        <KeyboardAwareScrollView contentContainerStyle={styles.scrollViewContent}>
          <Text style={styles.headerText}>Edit Profile</Text>
          <View style={styles.formContainer}>
            <Text style={styles.mainText}>General Information:</Text>
            <View>
              <Text style={styles.labelText}>Username:</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  placeholder="Username"
                  placeholderTextColor="#000000"
                  value={username}
                  onChangeText={setUsername}
                />
              </View>
              <Text style={styles.labelText}>Telephone Number:</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  placeholder="Telephone Number"
                  placeholderTextColor="#000000"
                  value={telephoneNumber}
                  onChangeText={setTelephoneNumber}
                />
              </View>
              <Text style={styles.labelText}>E-mail:</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  placeholder="E-mail"
                  placeholderTextColor="#000000"
                  value={email}
                  onChangeText={setEmail}
                />
              </View>
              <Text style={styles.labelText}>Address:</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  placeholder="Address"
                  placeholderTextColor="#000000"
                  value={address}
                  onChangeText={setAddress}
                />
              </View>
            </View>
            <View
            style={{
              marginTop: 20,
              marginHorizontal: 30,
            }}>
            <TouchableOpacity
              onPress={gotoEditProfileSuccessful}
              style={{
                backgroundColor: '#F2994A',
                paddingVertical: 8,
                paddingHorizontal: 20,
                borderRadius: 5,
                alignItems:'center',
              }}>
              <Text style={{ color: 'white', fontSize: 16 }}>Save changes</Text>
            </TouchableOpacity>
          </View>
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  headerText: {
    fontSize: 30,
    color: '#000000',
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 20,
    marginTop: 80,
  },
  formContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    marginHorizontal: 20,
    marginTop: 20,
    flex: 1,
    height: 800,
    width: 320,
  },
  mainText: {
    fontSize: 15,
    color: '#000000',
    fontWeight: '400',
    textAlign: 'left',
    marginBottom: 10,
  },
  inputContainer: {
    backgroundColor: '#FCF8F8',
    borderRadius: 20,
    height: 60,
    marginVertical: 10,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  labelText: {
    fontSize: 13,
    color: '#000000',
    fontWeight: '400',
    textAlign: 'left',
    marginBottom: 5,
  },
  buttonContainer: {
    marginTop: 20,
    width: '100%',
  },
});

export default EditProfileScreen;
