import auth from '@react-native-firebase/auth'
import {showMessage} from 'react-native-flash-message'

export default function LoginCall(email, password, callback) {
  auth().signInWithEmailAndPassword(email, password)
  .then((user) => {
    console.log('logged in: ', user)
  })
  .catch((e) => {
    showMessage({
      message: 'Login Error',
      description: e.message,
      duration: 5000,
      type: 'danger',
      icon: 'danger',
    })
  })
}