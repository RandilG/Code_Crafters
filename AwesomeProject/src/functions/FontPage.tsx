import { Text, View,Image,Button } from 'react-native'
import { StyleSheet } from 'react-native';

const FontPage = () => {
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
        <Button title="Let us get start!" color="#F2994A"  />
      </View>
    );
}

export default FontPage

const Sty=StyleSheet.create({
    container:{
      flex:1,
    },
  })
