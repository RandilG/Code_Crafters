import LottieView from "lottie-react-native";
import React from "react";
import { SafeAreaView, View, Text } from "react-native";

const Test3 = (props:any)  =>{
  return(
    <View>
      <LottieView source={require('../src/assets/loading.json')} autoPlay loop style={{ width: 200, height: 200 }} />
    </View>
  )
}

export default Test3;