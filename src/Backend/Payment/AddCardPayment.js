import functions from '@react-native-firebase/functions'
import auth from '@react-native-firebase/auth'
import Stripe from 'tipsi-stripe'
import {Platform} from 'react-native'

import {live} from '../../config/config'
import { showMessage } from 'react-native-flash-message'

export default function AddCardPayment (props, clientInfo, addCard) {
  const opt = {
    requiredBillingAddressFields: 'zip',
    prefilledInformation: {
      email: clientInfo.email,
      billingAddress: {
        name: clientInfo.firstName + ' ' + clientInfo.lastName,
        country: "US",
        email: clientInfo.email,
      }
    }
  }
  console.log('starting stripe add: ', clientInfo)

  Stripe.paymentRequestWithCardForm(Platform.OS === 'ios' ? opt : null)
  .then((card) => {
    console.log('CARD: ', card)
    if(addCard) {
      console.log('card: ', card.card)
      addCard(card.card)
    }
    return functions().httpsCallable('addSourceToClient')({
      clientStripeID: clientInfo.stripeID, 
      card: card,
      testing: !live,
    })
  })
  .then((result) => {
    if(result.data.type === 'failed') {
      throw Error(result.data.message)
    }

    return functions().httpsCallable('updateDefaultSource')({
      clientStripeID: result.data.customer, 
      card: result.data.id,
      testing: !live,
    })
  })
  .then(() => {
    showMessage({
      duration: 4000,
      type: 'info',
      icon: 'info',
      message: 'Card Added'
    })
  })
  .catch((e) => {
    console.log('error: ', e.message)
    showMessage({
      duration: 5000,
      type: 'danger',
      icon: 'danger',
      message: 'Error Card Payment',
      description: e.message,
    })
  })
}