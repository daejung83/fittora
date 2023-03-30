import React, {useState} from 'react'
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import {
  Button,
  Input,
} from 'react-native-elements'
import {Icon} from 'native-base'
import { material } from 'react-native-typography'
import SendPasswordReset from '../../../Backend/AuthStack/SendPasswordReset'

function ForgotPassword(props) {

  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  function handleSendReset () {
    setIsLoading(true)
    SendPasswordReset(email, () => setIsLoading(false))
  }

  

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
      
    <LinearGradient 
      start={{x: 0, y: 1}}  
      end={{x: 1, y: 0.5}}
      colors={['#FFA720', '#a3a3a3']}  
      style={{flex: 1}}
    >
      <SafeAreaView style={{flex: 1}}>
      <KeyboardAvoidingView style={styles.container} behavior='height'>
      
      
        <View style={styles.headerContainer}>
          <View style={{position: 'absolute', left: 0}}>
            <Icon 
              type='MaterialCommunityIcons' 
              name='chevron-left'
              onPress={() => props.navigation.goBack()}
            />
          </View>
          <Text style={material.title}>Email Reset</Text>
        </View>

        <View style={{alignItems: 'center'}}>
          <Icon 
            type='MaterialCommunityIcons'
            name='email-search-outline'
            style={{fontSize: 150}}
          />
          <Text style={material.body1}>Enter your email address to reset your password.</Text>
        </View>

        <View style={styles.inputBox}>
          <Input 
            title={'email'}
            label={'email'}
            leftIcon={
              <Icon type='MaterialCommunityIcons' name='email' style={{fontSize: 20}}/>
            }
            leftIconContainerStyle={{marginLeft: 0, marginRight: 5}}
            autoCapitalize='none'
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View>
          <Button 
            raised
            title='Send Reset Request'
            style={styles.button}
            ViewComponent={LinearGradient}
            linearGradientProps={{
              colors: ['black', 'grey'],
              start: { x: 0, y: 0.5 },
              end: { x: 1, y: 0.5 },
            }}
            loading={isLoading}
            onPress={handleSendReset}
          />
        </View>
      
      
      </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
    
    </TouchableWithoutFeedback>
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
    width: width * 0.8,
  },
  headerContainer: {
    width: width,
    alignItems: 'center'
  },
  inputBox: {
    width: width * 0.75
  }
});

export default ForgotPassword
