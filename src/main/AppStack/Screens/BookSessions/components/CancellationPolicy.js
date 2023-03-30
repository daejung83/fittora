import React from 'react'
import { 
  View, 
  Text, 
  StyleSheet,
  Dimensions,
} from 'react-native'
import { material } from 'react-native-typography'

const CancellationPolicy = () => {
  return (
    <View style={styles.container}>
      <Text style={{color: 'pink'}}>Cancellation Policy</Text>
      <Text style={[material.caption, styles.text]}>Session can be cancelled 6 hours in advance of scheduled sessions without being charged.</Text>
      <Text style={[material.caption, styles.text]}>If session is cancelled with in the 6 hour window, you will only be refunded 30% of the session cost.</Text>
      <Text style={[material.caption, styles.text]}>If you do not appear for a scheduled appointment, you will be charged for the full session.</Text>
      <Text style={[material.caption, styles.text]}>Personal trainers will only wait 15 minutes for late arrivals and your sessions will start from the time agreed upon. Please call or message your trainer if you are going to be more than 5 minutes late for a session.</Text>
    </View>
  )
}

const {width, height} = Dimensions.get('screen')
const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    marginTop: 20,
    width: width * 0.8,
    padding: 20,
    borderRadius: 20,
    backgroundColor: 'grey',

    shadowColor: 'black',
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.7,
    shadowRadius: 2,
    elevation: 3,
  }, 
  text: {
    marginTop: 10,
  }
});

export default CancellationPolicy
