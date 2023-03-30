import firestore from '@react-native-firebase/firestore'
import { showMessage } from 'react-native-flash-message'

export default function GetTrainerData(trainerUID, updateTrainerInfo) {
  firestore().collection('trainer').doc(trainerUID).get()
  .then((doc) => {
    updateTrainerInfo(doc.data())
  })
  .catch((e) => {
    showMessage({
      duration: 5000,
      type: 'danger',
      icon: 'danger',
      message: 'Error Getting Trainer Data',
      description: e.message,
    })
  })
}