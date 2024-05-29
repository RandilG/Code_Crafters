import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, TextInput, Button, Image, FlatList, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import the search icon

const Ratings = () => {
  const navigation = useNavigation();

  const [formData, setFormData] = useState({
    jobSeekerName: '',
    email: '',
    comment: '',
    rating: null,
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [jobSeekers, setJobSeekers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
    { id: 3, name: 'Michael Johnson', email: 'michael@example.com' },
    { id: 4, name: 'Cliffered Berry', email: 'cliffered@example.com' },
    { id: 5, name: 'David Hilton', email: 'david@example.com' },
    { id: 6, name: 'Anne Teen', email: 'Anne@example.com' },
    // Add more job seeker profiles here
  ]);

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    console.log('Submitted Data:', formData);
    // Implement logic to submit rating data to backend
    navigation.navigate('RatingSuccessful'); // Redirect to success screen
  };

  const handleRating = (value) => {
    setFormData({ ...formData, rating: value });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.jobSeekerItem}
      onPress={() => handleChange('jobSeekerName', item.name)}
    >
      <Text style={styles.jobSeekerName}>{item.name}</Text>
      <Text style={styles.jobSeekerEmail}>{item.email}</Text>
    </TouchableOpacity>
  );

  const handleSearch = () => {
    const filteredJobSeekers = jobSeekers.filter(
      (seeker) =>
        seeker.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        seeker.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setJobSeekers(filteredJobSeekers);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
        }}
        source={require('../Assets/background.png')}
        resizeMode="cover"
      />
      <View style={styles.scrollViewContent}>
        <Text style={styles.headerText}>Rate the Employee</Text>
        <View style={styles.formContainer}>
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search"
              placeholderTextColor="#000000"
              onChangeText={(text) => setSearchQuery(text)}
              value={searchQuery}
              onSubmitEditing={handleSearch}
            />
            <TouchableOpacity style={styles.searchIcon} onPress={handleSearch}>
              <Icon name="search" size={20} color="#000" />
            </TouchableOpacity>
          </View>
          <FlatList
            data={jobSeekers}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
          />
          <Text style={styles.label}>Give some love:</Text>
          <View style={styles.rateContainer}>
            <TouchableOpacity
              style={[styles.option, formData.rating === 'good' && styles.selectedOption]}
              onPress={() => handleRating('good')}
            >
              <Text>Good+</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.option, formData.rating === 'average' && styles.selectedOption]}
              onPress={() => handleRating('average')}
            >
              <Text>Average=</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.option, formData.rating === 'poor' && styles.selectedOption]}
              onPress={() => handleRating('poor')}
            >
              <Text>Poor-</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.label}>Additional Comments:</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter your comments"
              placeholderTextColor="#000000"
              onChangeText={(text) => handleChange('comment', text)}
            />
          </View>
          <View
            style={{
              marginTop: 20,
              marginHorizontal: 30,
            }}>
            <TouchableOpacity
              onPress={handleSubmit}
              style={{
                backgroundColor: '#F2994A',
                paddingVertical: 8,
                paddingHorizontal: 20,
                borderRadius: 5,
                alignItems:'center',
              }}>
              <Text style={{ color: 'white', fontSize: 16 }}>Give Ratings</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContent: {
    flex: 1,
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
    marginTop: 80,
  },
  formContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    //marginHorizontal: 5,
    marginTop: 20,
    flex: 1,
    height: 'auto',
    width: '100%',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  searchInput: {
    backgroundColor: '#FCF8F8',
    borderRadius: 20,
    height: 40,
    paddingHorizontal: 20,
    marginBottom: 10,
    marginTop: 10,
    width: '90%',
  },
  searchIcon: {
    position: 'absolute',
    right: 10,
  },
  jobSeekerItem: {
    backgroundColor: '#FCF8F8',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    width: '100%',
  },
  jobSeekerName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  jobSeekerEmail: {
    fontSize: 16,
    color: '#666666',
  },
  inputContainer: {
    backgroundColor: '#FCF8F8',
    borderRadius: 20,
    height: 65,
    marginBottom: 10,
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
    borderColor: '#F2994A',
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

export default Ratings;
