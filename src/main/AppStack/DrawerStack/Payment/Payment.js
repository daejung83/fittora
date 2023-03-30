import React, {useEffect, useState} from 'react'
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
} from 'react-native'
import {Button} from 'react-native-elements'
import LinearGradient from 'react-native-linear-gradient'
import { material } from 'react-native-typography'
import Stripe from 'tipsi-stripe'
import GetClientData from '../../../../Backend/ClientData/GetClientData'
import { showMessage } from 'react-native-flash-message'
import AddCardPayment from '../../../../Backend/Payment/AddCardPayment'
import GetClientStripeData from '../../../../Backend/Payment/GetClientStripeData'
import PaymentList from '../../Screens/BookSessions/components/PaymentList'
import GetClientCharges from './components/GetClientCharges'

function Payment(props) {

  return (
    <LinearGradient 
      style={{flex: 1}}
      colors={['grey', 'black']}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.topBox} />
        <View style={styles.contentContainer}>
          <PaymentList />
          {/* TODO: Build Payment List */}
          {/* <GetClientCharges /> */}
        </View>
      </ScrollView>
    </LinearGradient>
  )
}

const {width, height} = Dimensions.get('screen')

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
  },
  topBox: {
    top: -height * 0.55,
    height: height * 0.8,
    width: width,
    backgroundColor: 'black',
    borderBottomStartRadius: 150,
  },
  contentContainer: {
    top: -height * 0.7,
  }
});

export default Payment
