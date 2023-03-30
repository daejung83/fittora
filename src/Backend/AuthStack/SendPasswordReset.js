import auth from '@react-native-firebase/auth'
import { showMessage } from 'react-native-flash-message'

export default function SendPasswordReset (email, callback) {
  auth().sendPasswordResetEmail(email)
  .then((result) => {
    callback()
    showMessage({
      duration: 4000,
      type: 'info',
      icon: 'info',
      message: 'Password reset email sent',
      description: 'please check your email.'
    })
  })
  .catch((e) => {
    callback()
    showMessage({
      duration: 5000,
      type: 'danger',
      icon: 'danger',
      message: 'Error sending password reset',
      description: e.message,
    })
  })
}