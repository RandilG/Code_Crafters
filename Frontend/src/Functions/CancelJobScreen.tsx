import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, {Component} from 'react';
import {useState} from 'react';

const CancelJobScreen = () => {
  const [dummyData, setDummyData] = useState([
    {id: 1, name: 'Job 1', description: 'Description of Job 1'},
    {id: 2, name: 'Job 2', description: 'Description of Job 2'},
    {id: 3, name: 'Job 3', description: 'Description of Job 3'},
    {id: 4, name: 'Job 4', description: 'Description of Job 4'},
    {id: 5, name: 'Job 5', description: 'Description of Job 5'},
    // Add more dummy data entries as needed
  ]);

  const handleDelete = id => {
    const updatedData = dummyData.filter(item => item.id !== id);
    setDummyData(updatedData);
  };

  const renderItem = ({item}) => (
    <View style={styles.item}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDelete(item.id)}>
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
  return (
    <View style={styles.container}>
      <Image
        style={{
          width: '112%',
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
          //textAlign: 'center',
        }}>
        {'Cancel/Delete the Jobs'}
      </Text>
      <View
        style={{
          backgroundColor: '#FCF8F8',
          marginTop: 30,
          borderRadius: 20,
          marginHorizontal: 20,
          height: 700,
        }}>
        <View
          style={{
            marginTop: 20,
            marginHorizontal: 20,
          }}>
          {/*<Text
            style={{
              fontSize: 30,
              color: '#000000',
              fontWeight: '400',
              marginLeft: 20,
              marginTop: 50,
              textAlign: 'center',
            }}>
            {'Cancel/Delete the Job screen'}
          </Text>*/}
          <FlatList
            data={dummyData}
            renderItem={renderItem}
            keyExtractor={item => item.id.toString()}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  item: {
    backgroundColor: '#E5E5E5',
    padding: 20,
    marginBottom: 20,
    borderRadius: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 10,
  },
  deleteButton: {
    backgroundColor: '#FF6347',
    padding: 8,
    borderRadius: 5,
    alignItems: 'center',
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default CancelJobScreen;
