import functions from '@react-native-firebase/functions'

import {live} from '../../config/config'
import { showMessage } from 'react-native-flash-message'

export default function GetClientStripeData(updateDefault, updateCards, updateStripeID) {

  const params = {
    testing: !live
  }

  const func = functions().httpsCallable('getClientSource')

  func(params)
  .then((result) => {
    console.log('result: ', result)
    updateDefault(result.data.default_source)
    updateCards(result.data.sources.data)
    updateStripeID(result.data.id)
  })
  .catch((e) => {
    showMessage({
      duration: 5000,
      type: 'danger',
      icon: 'danger',
      message: 'Error Getting Stripe Info',
      description: e.message,
    })
  })
}