import auth from '@react-native-firebase/auth'
import {showMessage} from 'react-native-flash-message'
import RNRestart from 'react-native-restart'

export default function SignOut () {
  auth().signOut()
  .then(() => {
    // showMessage({
    //   message: 'Signed Out!',
    //   duration: 5000,
    //   type: 'success',
    //   icon: 'success',
    // })

    RNRestart.Restart()
  })
  .catch((e) => {
    showMessage({
      duration: 5000,
      message: 'Sign Out Error',
      description: e.message,
      type: 'danger',
      icon: 'danger',
    })
  })
}