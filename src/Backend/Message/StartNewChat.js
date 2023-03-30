import functions from '@react-native-firebase/functions'
import auth from '@react-native-firebase/auth'
import {showMessage} from 'react-native-flash-message'

export default function StartNewChat(params, stopLoading) {

  const clientUID = auth().currentUser.uid
  const {trainerUID} = params

  const func = functions().httpsCallable('AddChatRoom')

  // const data = {clientUID, trainerUID}
  const data = {clientUID, trainerUID: trainerUID}

  func(data)
  .then((result) => {
    stopLoading()
    console.log('result: ', result)
    // stopLoading()
    if(result.data.type === 'failed') {
      showMessage({
        duration: 5000,
        type: 'danger',
        icon: 'danger',
        message: 'Error',
        description: result.data.message
      })
    } else {
      showMessage({
        duration: 5000,
        type: 'success',
        icon: 'success',
        message: 'finished....'
      })
    }
  })
  .catch((e) => {
    stopLoading()
    console.log('Error: ', e.message)
    // stopLoading()
    showMessage({
      duration: 5000,
      type: 'danger',
      icon: 'danger',
      message: 'Error',
      description: e.message,
    })
  })
}