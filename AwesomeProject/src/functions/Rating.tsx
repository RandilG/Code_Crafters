import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, TextInput, Button, Image } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const RatingField = ({ onFormSubmit }) => {
  const [formData, setFormData] = useState({
    companyName: '',
    email: '',
    comment: '',
    rating: null,
  });

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    // Validate form fields here if needed
    onFormSubmit(formData);
  };

  const handleRating = (value) => {
    setFormData({ ...formData, rating: value });
  };

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView contentContainerStyle={styles.scrollViewContent}>
        <Text style={styles.headerText}>Give Ratings</Text>
        <View style={styles.formContainer}>
          <Text style={styles.label}>Company Name:</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Company Name"
              placeholderTextColor="#000000"
              onChangeText={(text) => handleChange('companyName', text)}
            />
          </View>
          <Text style={styles.label}>Where can we reach you?</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="you@gmail.com"
              placeholderTextColor="#000000"
              onChangeText={(text) => handleChange('email', text)}
            />
          </View>
          <Text style={styles.label}>Give some love:</Text>
          <View style={styles.rateContainer}>
            <TouchableOpacity
              style={[styles.option, formData.rating === 'plus' && styles.selectedOption]}
              onPress={() => handleRating('plus')}
            >
              <Text>+</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.option, formData.rating === 'neutral' && styles.selectedOption]}
              onPress={() => handleRating('neutral')}
            >
              <Text>=</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.option, formData.rating === 'minus' && styles.selectedOption]}
              onPress={() => handleRating('minus')}
            >
              <Text>-</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.label}>What do you want to say?</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Give the comment"
              placeholderTextColor="#000000"
              onChangeText={(text) => handleChange('comment', text)}
            />
          </View>
          <Button title="Give Review" onPress={handleSubmit} color="#F2994A" />
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

const Rating = () => {
  const onFormSubmit = (formData: any) => {
    // Handle form submission here
    console.log('Ratings submitted:', formData);
  };

  return (
    <View style={styles.container}>
      <Image
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
        }}
        source={require('../../assets/img/background.png')}
        resizeMode="cover"
      />
      <RatingField onFormSubmit={onFormSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  headerText: {
    fontSize: 30,
    color: '#000000',
    fontWeight: '600',
    textAlign: 'left',
    marginBottom: 20,
    marginTop:80
  },
  formContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    marginHorizontal:45,
    marginTop: 20,
    flex: 1,
  },
  inputContainer: {
    backgroundColor: '#FCF8F8',
    borderRadius: 20,
    height: 65,
    marginBottom: 10,
    //width: '100%',
  },
  input: {
    flex: 1,
    paddingHorizontal: 20,
    color: '#000000',
    marginTop: 10,
  },
  rateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 10,
    width: '100%',
  },
  option: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 5,
  },
  selectedOption: {
    backgroundColor: '#F2994A',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 5,
    marginTop: 10,
  },
});

export default Rating;
