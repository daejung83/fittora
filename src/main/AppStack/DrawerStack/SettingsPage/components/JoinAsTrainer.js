import React from 'react'
import { 
  View, 
  Text, 
  StyleSheet,
  Dimensions,
  Linking,
} from 'react-native'
import { Button } from 'react-native-elements'
import { material } from 'react-native-typography'

const JoinAsTrainer = () => {

  function handleJoinFittora () {
    const url = 'https://fittora.com/sign-up/trainer'
    Linking.canOpenURL(url)
    .then((supported) => {
      if(supported) {
        Linking.openURL(url)
      } else {
        alert('Can not open ' + url)
      }
    })
    .catch((e) => {
      alert(e.message)
    })
  }

  return (
    <View style={styles.container}>
      <Text style={material.title}>Want to become Fittora Trainer?</Text>
      <Button 
        title='Join us as Trainer!'
        onPress={handleJoinFittora}
        containerStyle={styles.buttonContainer}
        buttonStyle={{backgroundColor: '#8eb1c7'}}
        raised
      />
    </View>
  )
}

const {width, height} = Dimensions.get('screen')
const styles = StyleSheet.create({
  container: {
    width: width * 0.9,
    alignSelf: 'center',
    marginTop: 20,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#c1bfb5',
    borderRadius: 20,

    shadowColor: '#000',
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 3,
  },
  buttonContainer: {
    width: width * 0.8,
  }
});

export default JoinAsTrainer
