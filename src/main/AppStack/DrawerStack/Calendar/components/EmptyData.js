import React from 'react'
import { 
  View, 
  Text, 
  StyleSheet, 
  Dimensions,
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { material } from 'react-native-typography'

const EmptyData = ({props}) => {
  return (
    
    <View style={styles.shadow}>
      <LinearGradient 
        colors={['#B6D1F4FF', 'pink']}
        style={styles.container}
        start={{x: 0.2, y: 0.5}}
        end={{x: 1, y: 1.5}}
      >
        <Text style={material.title}>Nothing booked for the day.</Text>  
        <Text style={material.subheading}>Please book a session or select a different date.</Text>
      </LinearGradient>
    </View>
    
  )
}

const {width, height} = Dimensions.get('screen')
const styles = StyleSheet.create({
  container: {
    // borderWidth: 1,
    marginTop: 20,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    width: width * 0.8,
    padding: 15,
    borderRadius: 30,
  }, 
  shadow: {
    shadowColor: 'black',
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.7,
    shadowRadius: 2,
    elevation: 3,
  }
});

export default EmptyData
