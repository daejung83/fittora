import auth from '@react-native-firebase/auth'
import {showMessage} from 'react-native-flash-message'

import functions from '@react-native-firebase/functions'

export default function SendEmailValidation() {

  // functions().httpsCallable('RunCharges')({isLivePayment: true})
  // .then(() => {
  //   console.log('done')
  // })
  // .catch((e) => {
  //   console.log('Error: ', e.message)
  // })

  auth().currentUser.sendEmailVerification()
  .then((result) => {
    showMessage({
      duration: 1500,
      type: 'info',
      icon: 'info',
      message: 'Confirmation Email Sent!'
    })
  })
  .catch((e) => {
    console.log('Error: ', e.message)
    showMessage({
      duration: 5000,
      type: 'danger',
      icon: 'danger',
      message: 'Error Sending Email',
      description: e.message,
    })
  })
}