import functions from '@react-native-firebase/functions'
import {live} from '../../config/config'
import { showMessage } from 'react-native-flash-message'

export default function UpdateDefaultCard(card, stripeID, setDefault){
  const func = functions().httpsCallable('updateDefaultSource')

  console.log('card: ', card)
  console.log('stripeID: ', stripeID)

  func({
    clientStripeID: stripeID, 
    card: card,
    testing: !live,
  })
  .then(() => {
    setDefault(card)
    showMessage({
      duration: 2000,
      type: 'info',
      icon: 'info',
      message: 'Card Updated',
    })
  })
  .catch((e) => {
    setDefault()
    showMessage({
      duration: 5000,
      type: 'danger',
      icon: 'danger',
      message: 'Error on Updating Card',
      description: e.message,
    })
  })
}