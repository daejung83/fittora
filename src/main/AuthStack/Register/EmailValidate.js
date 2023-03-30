import React, {useState, useEffect} from 'react'
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Dimensions,
} from 'react-native'
import {
  Button,
  Input,
} from 'react-native-elements'
import {Icon} from 'native-base'
import LinearGradient from 'react-native-linear-gradient'
import { material } from 'react-native-typography'
import GetEmail from '../../../Backend/AuthStack/GetEmail'
import SendEmailValidation from '../../../Backend/AuthStack/SendEmailValidation'
import SignOut from '../../../Backend/AuthStack/SignOut'
import CheckEmailValidation from '../../../Backend/AuthStack/CheckEmailValidation'

function EmailValidate(props) {

  const [currentEmail, setCurrentEmail] = useState('user@email.com')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    setCurrentEmail(GetEmail())
  })

  useEffect(() => {
    //TODO: Need to un-comment this before running
    // SendEmailValidation()
  })

  function handleEmailConfirm() {
    CheckEmailValidation(props)
  }

  function handleResendEmail() {
    SendEmailValidation()
  }

  function handleSignOut() {
    SignOut()
  }

  return (
    <LinearGradient 
      colors={['#F8FE2F', '#FE9E2F']}  
      start={{x: 0, y: 0}} 
      end={{x: 1, y: 0.5}}
      style={{flex: 1}} 
    >
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <View style={{position: 'absolute', left: 0}}>
              <Icon 
                type='MaterialCommunityIcons' 
                name='chevron-left'
                onPress={handleSignOut}
              />
            </View>
            <Text style={material.title}>Confirm your email address</Text>
            <Text style={[material.body1, {marginTop: 15}]}>We sent a confirmation email to: </Text>
            <Text style={material.body2}>{currentEmail}</Text>
            <Text style={[material.body1, {textAlign: 'center', marginLeft: 30, marginRight: 30}]}>Check your email and click on the confirmation link and re-login here.</Text>

            
          </View>
          <Icon 
            type='MaterialCommunityIcons'
            name='email-check-outline'
            style={{fontSize: 150}}
          />

          {/* <View style={styles.bodyContainer}>
            <Input 
              placeholder={'email'}
              label={'email'}
              autoCapitalize='none'
              leftIcon={
                <Icon type='MaterialCommunityIcons' name='email' style={{fontSize: 20, color: MainColors.MainColor}}/>
              }
              leftIconContainerStyle={{marginLeft: 0, marginRight: 5}}
              value={email}
              onChangeText={setEmail}
            />
            <Input 
              placeholder='password'
              label='password'
              autoCapitalize='none'
              secureTextEntry
              leftIcon={
                <Icon type='MaterialCommunityIcons' name='onepassword' style={{fontSize: 20, color: MainColors.MainColor}}/>
              }
              leftIconContainerStyle={{marginLeft: 0, marginRight: 5}}
              value={password}
              onChangeText={setPassword}
            />
          </View> */}

          <View>
            {/* <Text onPress={() => alert('hello')} style={styles.resendLink}>Re-send Email</Text> */}
            
            <Button 
              style={styles.button}
              title={'Check Validation'}
              raised
              ViewComponent={LinearGradient}
              linearGradientProps={{
                colors: ['black', 'grey'],
                start: { x: 0, y: 0.5 },
                end: { x: 1, y: 0.5 },
              }}
              onPress={handleEmailConfirm}
            />
            <Button 
              title={'Re-send Email'}
              type={'clear'}
              style={{marginTop: 15}}
              // loading
              onPress={handleResendEmail}
            />
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  )
}

const {width, height} = Dimensions.get('screen')

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    width: width * 0.75
  },
  resendLink: {
    alignSelf: 'center',
    marginBottom: 15,
    color: 'blue',
    fontWeight: '200',
  },
  headerContainer: {
    alignItems: 'center',
  },  
  bodyContainer: {
    width: width * 0.8
  },
});

export default EmailValidate
