import firestore from '@react-native-firebase/firestore'
import { showMessage } from 'react-native-flash-message'

export default function GetGymData (gymID, updateGym) {
  console.log('gymID: ', gymID)
  firestore().collection('gym').doc(gymID).get()
  .then((gym) => {
    console.log('gym: ', gym.data())
    updateGym(gym.data())
  })
  .catch((e) => {
    showMessage({
      duration: 5000,
      type: 'danger',
      icon: 'danger',
      message: 'Error Getting Gym Data',
      description: e.message,
    })
  })
}