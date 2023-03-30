import React from 'react'
import {
  View, 
  Text, 
  StyleSheet,
  Dimensions,
  ScrollView,
} from 'react-native'
import {Button} from 'react-native-elements'
import LinearGradient from 'react-native-linear-gradient'

import SignOut from '../../../../Backend/AuthStack/SignOut'
import JoinAsTrainer from './components/JoinAsTrainer'
import ContactFittora from './components/ContactFittora'
import AppInfo from './components/AppInfo'
import { material } from 'react-native-typography'

function Settings() {

  function handleSignOut () {
    SignOut()
  }

  return (
    <LinearGradient 
      colors={['#252323', '#f5f1ed']}
      style={styles.container}
    >
      <ScrollView style={{marginTop: 50}}>
        <Text style={[material.display1White, {alignSelf: 'center', marginBottom: 20}]}>About</Text>

        <AppInfo />
        <JoinAsTrainer />
        <ContactFittora />
        

        <Button 
          title={'Sign Out'}
          onPress={handleSignOut}
          buttonStyle={{backgroundColor: 'black'}}
          containerStyle={styles.signOutButton}
          raised
        />
      </ScrollView>
    </LinearGradient>
  )
}

const {width, height} = Dimensions.get('screen')

const styles = StyleSheet.create({
  container: {
    flex: 1,    
  },
  signOutButton: {
    width: width * 0.9,
    alignSelf: 'center',
    marginTop: 20,
  }
});

export default Settings
