import React from 'react'
import { 
  View, 
  Text, 
  StyleSheet,
  Dimensions,
} from 'react-native'

const GetClientCharges = () => {
  return (
    <View style={styles.container}>
      <Text>Get Client Charges</Text>
    </View>
  )
}

const {width, height} = Dimensions.get('screen')
const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    marginTop: 20,
  }
});

export default GetClientCharges