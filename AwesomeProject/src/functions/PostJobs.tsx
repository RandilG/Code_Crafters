import { Text, View,Image,Button } from 'react-native'
import { StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

function PostJobsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Settings" component={PostJobs} />
    </Stack.Navigator>
  );
}

const PostJobs = () => {
    return (
      <View style={Sty.container}>
        <Image
          style={{
            marginTop:40,
            marginHorizontal:60
          }}
          source={require('../../assets/img/Jobs.png')}
        />
        <Image
          style={{
            marginTop:5,
            marginLeft:10
          }}
          source={require('../../assets/img/Girl.png')}
        />
        <Text
          style={{
            fontSize: 30,
            color: '#000000',
            fontWeight: '600',
            marginTop: 5,
            marginLeft: 30,
          }}>
          {'Stremlined Hiring,Maximum impact, post part-time jobs and build your dream team!'}
        </Text>
        <View style={{
            flexDirection:'row',
            marginHorizontal:150
        }}>
        <Button title="Post the Jobs" color="#F2994A"/>
        </View>
      </View>
    );
}

export default PostJobs

const Sty=StyleSheet.create({
    container:{
      flex:1,
    },
  })
