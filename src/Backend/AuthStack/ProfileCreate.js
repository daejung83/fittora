import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'
import functions from '@react-native-firebase/functions'

import {live} from '../../config/config'
import { showMessage } from 'react-native-flash-message'

export default function ProfileCreate (props, clientInfo, callback) {
  const client = clientInfo
  const uid = auth().currentUser.uid

  client['profilePics'] = [] 
  client['email'] = auth().currentUser.email

  const createStripeAccount = functions().httpsCallable('createCustomerStripe')

  const stripeParams = {
    email: auth().currentUser.email,
    testing: !live,
    name: client.firstName,
  }

  return createStripeAccount(stripeParams)
  .then((result) => {
    client['stripeID'] = result.data.id
    client['initSetupFinished'] = true
    client['totalSessions'] = 0
    client['scheduledSessions'] = 0
    client['rank'] = 'Starter Flex'
    client['languageSkills'] = []
    client['testingAccount'] = !live

    return firestore().collection('client').doc(uid).update(client)
  })
  .then(() => {
    callback()
    props.navigation.navigate('AgreeTermServices')
  })
  .catch((e) => {
    callback()
    showMessage({
      duration: 5000,
      type: 'danger',
      icon: 'danger',
      message: 'Error Creating Profile',
      description: e.message,
    })
  })
}