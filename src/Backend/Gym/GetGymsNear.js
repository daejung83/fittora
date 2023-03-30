import functions from '@react-native-firebase/functions'
import { showMessage } from 'react-native-flash-message'

export default function GetGymsNear (updateList) {
  functions().httpsCallable('getGymsNearMe')()
  .then((result) => {
    // console.log('result: ', result.data)
    updateList(result.data)
  })
  .catch((e) => {
    showMessage({
      duration: 5000,
      type: 'danger',
      icon: 'danger',
      message: 'Error Getting Gyms Near',
      description: e.message,
    })
  })
}