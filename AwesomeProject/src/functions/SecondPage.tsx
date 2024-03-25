import { Text, View,Image,Button } from 'react-native'
import { StyleSheet } from 'react-native';

const SecondPage = () => {
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
            fontSize: 50,
            color: '#000000',
            fontWeight: '600',
            marginTop: 5,
            marginLeft: 30,
          }}>
          {'Find a Perfect Job Match'}
        </Text>
        <View style={{
            flexDirection:'row',
            marginHorizontal:150
        }}>
        <Button title="Login" color="#F2994A"/>
        <Button title="Sign Up" color="#C0C0C0"/>
        </View>
      </View>
    );
}

export default SecondPage

const Sty=StyleSheet.create({
    container:{
      flex:1,
    },
  })
