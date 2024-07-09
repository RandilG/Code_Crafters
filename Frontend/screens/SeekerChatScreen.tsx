// Import necessary libraries and components //poster message-> id,poster,role,timestamp,message
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Pressable,
  TextInput,
} from 'react-native';
import axios, {HttpStatusCode} from 'axios';
import {io} from 'socket.io-client';
import VectorIcon from '../utils/Vectoricons';
import {server} from '../service/constant';

const socket = io('http://10.0.2.2:3000');

const SeekerChatScreen = (props: any) => {
  const [newMessage, setNewMessage] = useState<string>('');
  const userName = 'pramodjay470@icloud.com';
  const [messages, setMessages] = useState<any[]>([]);
  const [seekerName, setSeekerName] = useState<string>('');

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const res = await axios.get(server + `getMessageSeeker/${userName}`);
      if (res.status === HttpStatusCode.Ok) {
        setMessages(res.data[0].message);
        setSeekerName(res.data[0].name);
      } else {
        console.log('Error fetching messages');
      }
      socket.emit('joinSeekerChatroom', userName);

      socket.on('seekerChatStarted', data => {
        console.log(data.message[0]);
        setMessages((prevMessages: any) => [...prevMessages, data.message[0]]);
      });

      return () => {
        socket.off('chatStarted');
      };
    } catch (error) {
      console.log(error);
    }
  };

  // Function to handle sending a message
  const handleSend = async () => {
    try {
      const request = {
        userName: userName,
        name: seekerName,
        role: 'seeker',
        message: newMessage,
      };
      setNewMessage('');
      const res = await axios.post(server + 'sendMessageSeeker', request);
      if (res.status === HttpStatusCode.Ok) {
      } else if (res.status === HttpStatusCode.InternalServerError) {
        console.log('Internal Server Error');
      } else {
        console.log('error');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#FFFFFF'}}>
      <View style={styles.header}>
        <Pressable
          style={{marginRight: 50, marginLeft:-100}}
          onPress={() => props.navigation.navigate('Test')}>
          <VectorIcon
            type="MaterialIcons"
            name="keyboard-arrow-left"
            color="#FFFFFF"
            size={32}
            zIndex="-1"
          />
        </Pressable>
        <Text style={styles.title}>Chat with Us</Text>
      </View>
      <View style={styles.scrollContainer}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {messages.length != 0 ? (
            messages.map((message: any, index: any) =>
              message.role === 'admin' ? (
                 <ReceivedMessage
                  key={index}
                  message={message.message}
                  timeStamp={message.timeStamp}
                />
              ) : (
                <SendedMessage
                  key={index}
                  message={message.message}
                  timeStamp={message.timeStamp}
                />
              ),
            )
          ) : (
            <Text>No messages to show</Text>
          )}
        </ScrollView>
      </View>
      <View style={styles.bottomContainer}>
        <TextInput
          style={styles.inputText}
          placeholder="Write your message"
          value={newMessage}
          onChangeText={value => setNewMessage(value)}
          placeholderTextColor={'#9AA5B1'}
        />
        <Pressable
          style={{flexDirection: 'row'}}
          disabled={newMessage == ''}
          onPress={() => handleSend()}>
          <VectorIcon
            type="Ionicons"
            name="send"
            color="#FFFFFF"
            size={25}
            backgroundColor="red"
            style={styles.sendButton}
          />
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const ReceivedMessage: React.FC<any> = ({message, timeStamp}) => {
  return (
    <View style={styles.receivedMessage}>
      <Text style={styles.receivedMessageTxt}>{message}</Text>
      <Text style={styles.receivedTime}>{timeStamp}</Text>
    </View>
  );
};

const SendedMessage: React.FC<any> = ({message, timeStamp}) => {
  return (
    <View style={styles.sendMessageElement}>
      <Text style={styles.sendMessageTxt}>{message}</Text>
      <Text style={styles.sendTime}>{timeStamp}</Text>
    </View>
  );
};

// Styles for the chat screen components
const styles = StyleSheet.create({
  receivedTime: {
    color: '#ffffff',
    fontSize: 10,
    textAlign: 'right',
    fontWeight: '400',
  },

  sendTime: {
    color: '#ffffff',
    fontSize: 10,
    textAlign: 'left',
    fontWeight: '400',
  },

  sendButton: {
    height: 30,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    marginTop: 15,
  },

  inputText: {
    backgroundColor: '#FFF',
    width: '80%',
    height: 40,
    borderRadius: 10,
    paddingLeft: 10,
    margin: 10,
    color: '#373737',
  },

  sendMessageTxt: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'right',
  },

  receivedMessageTxt: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'left',
  },

  receivedMessage: {
    width: '60%',
    backgroundColor: '#5c5c5c',
    borderRadius: 10,
    padding: 8,
    marginVertical: 5,
  },

  sendMessageElement: {
    width: '60%',
    backgroundColor: '#FE8235',
    borderRadius: 10,
    padding: 8,
    alignSelf: 'flex-end',
    marginVertical: 5,
  },

  title: {
    color: '#FFF',
    fontSize: 22,
    fontWeight: '600',
    alignSelf: 'center',
    marginLeft: 40,

  },

  bottomContainer: {
    flex: 0.5,
    backgroundColor: '#F2994A',
    flexDirection: 'row',
  },

  linearGradient: {
    width: '100%',
    height: '100%',
    opacity: 0.95,
    justifyContent: 'center',
    alignItems: 'center'
  },

  scrollContainer: {
    flex: 5,
    padding: 10,
  },

  header: {
    flex: 0.5,
    backgroundColor: '#F2994A',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
  },
});

export default SeekerChatScreen;
