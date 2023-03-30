import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'
import { showMessage } from 'react-native-flash-message'

export default function UpdateMyGym (gymID, callback) {

  const uid = auth().currentUser.uid

  firestore().collection('client').doc(uid).update({
    gymID: gymID,
  })
  .then(() => {
    //updated
    callback(true)
    showMessage({
      duration: 2000,
      type: 'success',
      icon: 'success',
      message: 'Gym Updated'
    })

    
  })
  .catch((e) => {
    console.log('Error: ', e.message)
    callback(false)
    showMessage({
      duration: 5000,
      type: 'danger',
      icon: 'danger',
      message: 'Error Updating Gym',
      description: e.message,
    })
  })
}