import functions from '@react-native-firebase/functions'
import auth from '@react-native-firebase/auth'
import { showMessage } from 'react-native-flash-message'

export default function GetAddChatList(updateList, stopLoading) {

  const clientUID = auth().currentUser.uid

  // const func = functions().httpsCallable('CheckStartChatsClient')

  const func = functions().httpsCallable('CheckStartChatsClient')

  const data = {
    clientUID: clientUID,
  }

  func(data)
  .then((result) => {
    stopLoading()
    // console.log('result: ', result)
    if(result.data.type === 'failed') {
      showMessage({
        duration: 5000,
        type: 'danger',
        icon: 'danger',
        message: 'Error',
        description: result.data.message
      }) 
    } else {
      updateList(result.data.data)
    }
  })
  .catch((e) => {
    stopLoading()
    console.log('Error in Get AddChat: ', e)
    showMessage({
      duration: 5000,
      type: 'danger',
      icon: 'danger',
      message: 'Error:',
      description: e.message
    })
  })
}