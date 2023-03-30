import React, { useState } from 'react'
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import {Icon} from 'native-base'
import {
  Input, Button,
  // Icon,
} from 'react-native-elements'
import {showMessage} from 'react-native-flash-message'
import { material } from 'react-native-typography'

import MainColors from '../../../colors/MainColors'
import SignUpWithEmail from '../../../Backend/AuthStack/SignUpWithEmail'

function SignUp(props) {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [password1, setPassword1] = useState('')

  function handleSignUp () {
    if(password === password1) {
      SignUpWithEmail({email, password})
    } else {
      showMessage({
        message: 'Sign Up Error',
        description: 'Confirm Password Do not Match',
        duration: 5000,
        type: 'danger',
        icon: 'danger',
      })
    }
  }

  function handleBack() {
    props.navigation.goBack()
  }

  return (
    <LinearGradient 
      colors={['#C4FDEE', MainColors.SubColor]}  
      start={{x: -0.5, y: 0}} 
      end={{x: 1, y: 1}}
      style={{flex: 1}} 
    >
      <SafeAreaView style={{flex: 1, backgroundColor: 'transparent'}}>
        <ScrollView contentContainerStyle={styles.scroll}>
          <View style={styles.headerBox}>
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
              <View style={{position: 'absolute', left: 0}}>
                <Icon
                  type='MaterialCommunityIcons' 
                  name='chevron-left'
                  onPress={handleBack}
                />
              </View>
              <Text style={material.title}>Sign Up</Text>
            </View>
            <View style={{alignItems: 'center', marginTop: 15}}>
              <Text style={material.subheading}>Create a new login using email and password.</Text>
            </View>
          </View>
          <View style={styles.sectionContainer}>
            <Input 
              placeholder='email'
              leftIcon={
                <Icon type='MaterialCommunityIcons' name='email' style={{fontSize: 20, color: MainColors.MainColor}}/>
                // <Icon type='FontAwesome' name='user' size={15} />
              }
              leftIconContainerStyle={{marginLeft: 0, marginRight: 5}}
              errorMessage={''}
              label='email'
              value={email}
              onChangeText={setEmail}
              autoCapitalize={'none'}
            />
            <Input 
              placeholder='password'
              leftIcon={
                <Icon type='MaterialCommunityIcons' name='onepassword' style={{fontSize: 20, color: MainColors.MainColor}}/>
                // <Icon type='FontAwesome' name='user' size={15} />
              }
              leftIconContainerStyle={{marginLeft: 0, marginRight: 5}}
              errorMessage={''}
              label='password'
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              autoCapitalize={'none'}
            />
            <Input 
              placeholder='confirm password'
              leftIcon={
                <Icon type='MaterialCommunityIcons' name='onepassword' style={{fontSize: 20, color: MainColors.MainColor}}/>
                // <Icon type='FontAwesome' name='user' size={15} />
              }
              leftIconContainerStyle={{marginLeft: 0, marginRight: 5}}
              errorMessage={''}
              label='confirm password'
              secureTextEntry
              value={password1}
              onChangeText={setPassword1}
              autoCapitalize={'none'}
            />
          </View>

          <View>
            <Button 
              title={'Sign Up'}
              buttonStyle={styles.button}
              raised
              onPress={handleSignUp}
              ViewComponent={LinearGradient}
              linearGradientProps={{
                colors: ['black', 'grey'],
                start: { x: 0, y: 0.5 },
                end: { x: 1, y: 0.5 },
              }}
            />
          </View>

        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  )
}

const {width, height} = Dimensions.get('screen')

const styles = StyleSheet.create({
  scroll: {
    flexGrow : 1, 
    justifyContent : 'center',
    alignItems: 'center',
    justifyContent: 'space-between'
  }, 
  header: {
    fontSize: 40,
    // fontWeight: 'bold',
  },  
  headerBox: {
    width: width,
  },
  sectionContainer: {
    width: width * 0.8,
    borderWidth: 1,
    padding: 20,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    // backgroundColor: 'rgba(73, 162, 255, 0.5)',
    // shadowColor: '#000',
    // shadowOffset: { width: 1, height: 1 },
    // shadowOpacity: 0.6,
    // shadowRadius: 2,
    // elevation: 1,
  },
  button: {
    backgroundColor: 'black',
    width: width * 0.8,
  }
});

export default SignUp
