import React from 'react'
import {
  View, 
  Text, 
  StyleSheet,
  Dimensions,
  Platform,
  Linking,
} from 'react-native'
import {Button} from 'react-native-elements'
import LinearGradient from 'react-native-linear-gradient'
import { material } from 'react-native-typography'

function UpdateRequired() {

  function handleUpdate() {
    const url = Platform.OS === 'ios' ? 'https://itunes.apple.com/us/app/fittora/id1433997661' : 'https://play.google.com/store/apps/details?id=com.fitbox.fitboxclient'
    
    Linking.canOpenURL(url)
    .then((supported) => {
      if(supported) {
        Linking.openURL(url)
      } else {
        Toast.show({
          duration: 10000,
          type: 'danger',
          text: 'Can not open ' + url,
          buttonText: 'okay',
          position: 'top',
        })
      }
    })
    .catch((e) => {
      Toast.show({
        duration: 10000,
        type: 'danger',
        text: e.message,
        buttonText: 'okay',
        position: 'top',
      })
    })
  }

  return (
    <LinearGradient 
      colors={['#eeb1d5', '#e0efda']}
      style={styles.container}
    >
      <Text style={[material.title, {color: 'red', marginBottom: 10}]}>Update Required</Text>
      <Text style={[material.caption, {marginBottom: 20}]}>Please visit App Store to update the app</Text>
      <Button 
        title={'UPDATE NOW'}
        titleStyle={material.button}
        onPress={handleUpdate}
        raised
        buttonStyle={{backgroundColor: '#e0efda'}}
      />
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default UpdateRequired
