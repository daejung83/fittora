import React, {useState} from 'react'
import {
  View,
  Text,
  StyleSheet,
  Linking,
  SafeAreaView,
  ScrollView,
  Dimensions,
} from 'react-native'
import {
  Button,
  CheckBox,
} from 'react-native-elements'
import LinearGradient from 'react-native-linear-gradient'
import { material } from 'react-native-typography'
import AgreeToTerms from '../../../Backend/AuthStack/AgreeToTerms'

function AgreeTermServices(props) {

  const [termsAgreed, setTermsAgreed] = useState(false)

  function handleAgreeButton () {
    AgreeToTerms(props, termsAgreed)
  }

  return (
    <LinearGradient
      style={{flex: 1}}
      colors={['#41F3F2FF', '#D5C351FF']}
      start={{x: 0, y: 0.5}}
      end={{x: 1, y: 0.5}}
    >
      <SafeAreaView style={{flex: 1}}>
        <ScrollView contentContainerStyle={styles.container} >
          <View style={styles.fittoraTermContainer}>
            <Text style={[material.display1, {marginBottom: 15}]}>Fittora Terms of Services</Text>

            <Text 
              style={{color: 'blue'}}
              onPress={() => Linking.openURL('https://fittora.com/privatepolicy')}
            >
              Fittora Privacy Policy
            </Text>
            <Text 
              style={{color: 'blue'}}
              onPress={() => Linking.openURL('https://fittora.com/termsandconditions')}
            >
              Fittora Terms and Conditions
            </Text>
            <Text 
              style={{color: 'blue'}}
              onPress={() => Linking.openURL('https://fittora.com/arbitrationprocedures')}
            >
              Fittora Arbitration Procedures
            </Text>
          </View>

          <View style={styles.stripeContainer}>
            <Text style={[material.headline, {marginBottom: 15}]}>Stripe Service Agreement</Text>
            <Text style={[material.caption, {marginBottom: 15}]}>
              Payment processing services for Clients/ Trainers on Fittora are provided 
              by Stripe and are subject to the Stripe Connected Account Agreement, 
              which includes the Stripe Terms of Service (collectively, the 
              “Stripe Services Agreement”). By agreeing to [this agreement / 
              these terms / etc.] or continuing to operate as a [account holder term] 
              on Fittora, you agree to be bound by the Stripe Services Agreement, 
              as the same may be modified by Stripe from time to time. As a condition 
              of Fittora enabling payment processing services through Stripe, you agree 
              to provide Fittora accurate and complete information about you and your 
              business, and you authorize Fittora to share it and transaction information 
              related to your use of the payment processing services provided by Stripe.
            </Text>

            <Text 
              style={{color: 'blue'}}
              onPress={() => Linking.openURL('https://stripe.com/us/connect-account/legal')}
            >
              Stripe Connected Account Agreement
            </Text>
            <Text 
              style={{color: 'blue'}}
              onPress={() => Linking.openURL('https://stripe.com/us/legal')}
            >
              Stripe Services Agreement — United States
            </Text>
          </View>
          
        </ScrollView>
        <View style={styles.footerContainer}>
          <CheckBox 
            title='Agree to terms of services'
            containerStyle={styles.checkBoxContainer}
            checked={termsAgreed}
            onPress={() => setTermsAgreed(!termsAgreed)}
          />
          <Button 
            title={'Agree'}
            containerStyle={styles.button}
            onPress={handleAgreeButton}
          />
        </View>
      </SafeAreaView>
    </LinearGradient>
  )
}

const {width, height} = Dimensions.get('screen')

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'space-between',
    alignItems: 'center',
    // width: width * 0.8,
  },
  fittoraTermContainer: {
    width: width * 0.8,
    marginBottom: 30,
  },
  stripeContainer: {
    width: width * 0.8,
    // marginBottom: 30,
  },
  footerContainer: {
    width: width * 0.8,
    alignSelf: 'center',
    alignItems: 'center',
  },
  checkBoxContainer: {
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
  button: {
    width: width * 0.8,
  }
});

export default AgreeTermServices
