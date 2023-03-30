import auth from '@react-native-firebase/auth'
import {showMessage} from 'react-native-flash-message'

export default function SignUpWithEmail(params) {
  const {email, password} = params

  console.log('email: ', email)
  console.log('password: ', password)

  auth().createUserWithEmailAndPassword(email, password)
  .then((user) => {
    console.log('Sign Up')
  })
  .catch((e) => {
    showMessage({
      duration: 5000,
      type: 'danger',
      icon: 'danger',
      message: 'Sign Up Error: ',
      description: e.message,
    })
  })
}