import React from "react";
import { View, Text, SafeAreaView, Pressable, Button } from "react-native";

const Test = (props:any) => {

  return(
    <SafeAreaView>
      <View>
        <Text>This is test screen</Text>
      </View>
      <Pressable onPress={() => props.navigation.navigate("Test2")}>
        <View>
          <Text>
            Press me for Navigate to screen 2
          </Text>
        </View>
      </Pressable>
      <Button title="Click me to navigate to screen 3" onPress={() => props.navigation.navigate("Test3")} />
      <Button title="Click me to navigate to jobStatus" onPress={() => props.navigation.navigate("JobStatus")} />
    </SafeAreaView>
  );

}

export default Test;



// cardButton:{
//   backgroundColor:'#F2994A',
//   height: 40,
//   width:100,
//   borderBlockColor: 'none',
// }