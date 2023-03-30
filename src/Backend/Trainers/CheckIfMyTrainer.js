import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'
import { showMessage } from 'react-native-flash-message'

export default function CheckIfMyTrainer(params, isMyTrainer) {
  const uid = auth().currentUser.uid
  const {trainerUID} = params

  firestore().collection('client').doc(uid)
  .collection('recentTrainers').doc(trainerUID)
  .get()
  .then((doc) => {
    if(doc.exists) {
      isMyTrainer()
    }
  })
  .catch((e) => {
    showMessage({
      duration: 4000,
      type: 'danger',
      icon: 'danger',
      message: 'Error Checking My Trainer',
      description: e.message,
    })
  })
}