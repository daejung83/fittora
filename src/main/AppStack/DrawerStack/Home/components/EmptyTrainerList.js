import React from 'react'
import { 
  View, 
  Text, 
  Dimensions,
  StyleSheet,
} from 'react-native'
import { material } from 'react-native-typography'

const EmptyTrainerList = ({props}) => {
  return (
    <View style={styles.container}>
      <Text style={[material.title, {color: 'red'}]}>No trainers available.</Text>
      <Text style={[material.caption, {textAlign: 'center', margin: 10}]}>Currently no available trainers at this gym.  Please check back later or try different gym.</Text>
    </View>
  )
}

const {width, height} = Dimensions.get('screen')
const styles = StyleSheet.create({
  container: {
    // borderWidth: 1,
    width: width * 0.8,
    height: height * 0.15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f8f3ed99',
    borderRadius: 10,
  }
});

export default EmptyTrainerList
