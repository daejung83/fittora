import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import { showMessage } from 'react-native-flash-message'

export default function CheckEmailValidation (props) {
  const uid = auth().currentUser.uid

  auth().currentUser.reload()
  .then((user) => {
    console.log('user: ', user)
    console.log('auth user email: ', auth().currentUser.emailVerified)
    if(auth().currentUser.emailVerified) {

      const clientData = {
        uid: uid,
        initSetupFinished: false,
        create: new Date(),
        lastLoggedIn: new Date(),
      }
      
      firestore().collection('client').doc(uid).set(clientData)
      .then((result) => {
        console.log('result: ', result)
        props.navigation.navigate('CreateProfile')
        showMessage({
          duration: 2000,
          type: 'success',
          icon: 'success',
          message: 'Email Verified!'
        })
      })
      .catch((e) => {
        showMessage({
          duration: 5000,
          type: 'danger',
          icon: 'danger',
          message: 'Error Creating Account',
          description: e.message
        })
      })

      
    } else {
      showMessage({
        duration: 5000,
        type: 'warning',
        icon: 'warning',
        message: 'Email not verified',
        description: 'Please check your email and verify your email.',
      })
    }
  })
  .catch((e) => {
    console.log('ERror: ', e.message)

    showMessage({
      duration: 5000,
      type: 'danger',
      icon: 'danger',
      message: 'Error',
      description: e.message,
    })
  })
}