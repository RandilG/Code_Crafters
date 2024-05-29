import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Text, View, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';

const EditJobsScreen = () => {
  const navigation = useNavigation();

  // Dummy data for the selected job (replace it with actual logic to fetch job details)
  const [selectedJob, setSelectedJob] = useState({
    hotelname: 'Hotel A',
    address: '123 Main Street',
    email: 'hotelA@example.com',
    telephone: '123-456-7890',
    date: '2024-04-28',
    time: '10:00 AM',
    numberOfEmployees: '5',
    payment: '2000',
  });

  const handleInputChange = (field, value) => {
    setSelectedJob(prevJob => ({
      ...prevJob,
      [field]: value,
    }));
  };

  const handleSaveChanges = () => {
    // Implement logic to save changes (e.g., send updated job details to the server)
    console.log('Updated Job Details:', selectedJob);
    navigation.goBack(); // Navigate back to the previous screen after saving changes
  };

  return (
    <View style={styles.container}>
      <Image
        style={{
          width: '115%',
          height: '100%',
          position: 'absolute',
        }}
        source={require('../Assets/background.png')}
        resizeMode="cover"
      />
      <Text style={styles.title}>Edit Job</Text>
      <View style={styles.formContainer}>
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Hotel Name:</Text>
          <TextInput
            style={styles.input}
            value={selectedJob.hotelname}
            onChangeText={text => handleInputChange('hotelname', text)}
          />
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Address/Location:</Text>
          <TextInput
            style={styles.input}
            value={selectedJob.address}
            onChangeText={text => handleInputChange('address', text)}
          />
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Contact Information:</Text>
          <TextInput
            style={styles.input}
            value={selectedJob.email}
            onChangeText={text => handleInputChange('email', text)}
          />
          <TextInput
            style={styles.input}
            value={selectedJob.telephone}
            onChangeText={text => handleInputChange('telephone', text)}
          />
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Schedule:</Text>
          <TextInput
            style={styles.input}
            value={selectedJob.date}
            onChangeText={text => handleInputChange('date', text)}
          />
          <TextInput
            style={styles.input}
            value={selectedJob.time}
            onChangeText={text => handleInputChange('time', text)}
          />
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Job Details:</Text>
          <TextInput
            style={styles.input}
            value={selectedJob.numberOfEmployees}
            onChangeText={text => handleInputChange('numberOfEmployees', text)}
          />
          <TextInput
            style={styles.input}
            value={selectedJob.payment}
            onChangeText={text => handleInputChange('payment', text)}
          />
        </View>
        <TouchableOpacity style={styles.saveButton} onPress={handleSaveChanges}>
          <Text style={styles.saveButtonText}>Save Changes</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  formContainer: {
    backgroundColor: '#FCF8F8',
    borderRadius: 20,
    marginHorizontal: 20,
    padding: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionLabel: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    height: 40,
  },
  saveButton: {
    backgroundColor: '#F2994A',
    borderRadius: 8,
    paddingVertical: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default EditJobsScreen;
