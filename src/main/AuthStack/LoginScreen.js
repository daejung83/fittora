import React, { useState, useEffect } from 'react'
import { 
  Text, 
  View, 
  StyleSheet, 
  Dimensions, 
  KeyboardAvoidingView,
  Image, 
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native'

import {Fumi} from 'react-native-textinput-effects'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MainColors from '../../colors/MainColors'
import Logo from '../../assets/fittora_1024_1024.png'

// import { Input, Button } from 'native-base'
import {Button, ButtonGroup} from 'react-native-elements'
import LinearGradient from 'react-native-linear-gradient'
import LoginCall from '../../Backend/AuthStack/LoginCall'
import { material } from 'react-native-typography'

const {width, height} = Dimensions.get('screen')


function LoginScreen (props) {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function LoginFunc () {
    LoginCall(email, password)
  }

  function handleForgotPassword () {
    props.navigation.navigate('ForgotPassword')
  }

  return (
    
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
      <LinearGradient colors={[MainColors.SubColor, '#a3a3a3']} style={styles.container}>
        <View>
          
          <View style={styles.logoContainer}>
            <Image source={Logo} style={styles.logo} />
          </View>
          <View style={styles.textContainer}>
            <Text style={[material.display3, styles.title, styles.textShadow]}>Fittora</Text>
            <Text style={[material.subheading, styles.textShadow]}>Find your perfect trainer</Text>
          </View>
        </View>

        <KeyboardAvoidingView style={[styles.center, styles.inputContainer]} behavior='padding' enabled>
          
          <Fumi 
            label={'email'}
            iconClass={MaterialCommunityIcons}
            iconName={'email'}
            iconColor={MainColors.SubColor}
            iconSize={20}
            iconWidth={40}
            inputPadding={16}
            style={{width: width * 0.7}}
            onChangeText={(text) => setEmail(text)}
            autoCapitalize={'none'}
            autoCompleteType='email' 
            textContentType='emailAddress'
            keyboardType='email-address' 
          />
          <Fumi 
            label={'password'}
            iconClass={MaterialCommunityIcons}
            iconName={'key'}
            iconColor={MainColors.SubColor}
            iconSize={20}
            iconWidth={40}
            inputPadding={16}
            style={{width: width * 0.7}}
            onChangeText={(text) => setPassword(text)}
            autoCompleteType='password'
            textContentType='password'
            autoCapitalize={'none'}
            secureTextEntry
          />
          
          <Button 
            title='Login'
            raised
            titleStyle={{color: MainColors.MainColor, fontWeight: 'bold'}}
            buttonStyle={styles.buttonSize}
            ViewComponent={LinearGradient} // Don't forget this!
            linearGradientProps={{
              colors: [MainColors.SubColor, MainColors.Mid2],
              start: { x: 0, y: 0.5 },
              end: { x: 1, y: 0.5 },
            }}
            onPress={LoginFunc}
          />
          <Text onPress={handleForgotPassword} style={{alignSelf: 'flex-end', margin: 10, color: '#5c7ff2'}}>forgot password?</Text>
        </KeyboardAvoidingView>
        <View>
          <Text style={{fontWeight: 'bold'}}>Not a member?</Text>
          <Button 
            title='register'
            type='clear'
            onPress={() => props.navigation.navigate('SignUp')}
          />
        </View>
      </LinearGradient>
      </TouchableWithoutFeedback>
    
  )
}

const styles = StyleSheet.create({
  container: {
    // borderWidth: 1,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  center: {
    // borderWidth: 1,
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonSize: {
    width: width * 0.7,
  },
  inputContainer: {
    padding: 10,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    width: width * 0.8,
    // borderWidth: 2,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
  },
  logo: {
    width: width * 0.4, 
    height: width * 0.4, 
    // marginTop: 150,
  },
  logoContainer: {
    // height: width * 0.5,
    borderWidth: 1,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 2,
  },
  textContainer: {
    alignItems: 'center',
    // borderWidth: 1,
    marginTop: 20,
    width: width,
    backgroundColor: '#FFF3',
  }, 
  title: {
    // marginTop: 20,
    // color: 'black',

  },
  textShadow: {
    textShadowColor: '#6C6C6CFF',
    textShadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    textShadowRadius: 1,
    elevation: 0.5,
  },
});

export default LoginScreen

