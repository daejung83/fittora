import functions from '@react-native-firebase/functions'
import { showMessage } from 'react-native-flash-message'

export default function SendMessage(params) {
  
  const func = functions().httpsCallable('V2SendChatClient')

  func(params)
  .then((result) => {
    if(result.data.type === 'failed') {
      showMessage({
        duration: 5000,
        type: 'danger',
        icon: 'danger',
        message: 'Error Sending Message',
        description: result.data.message,
      })
    }
  })
  .catch((e) => {
    showMessage({
      duration: 5000,
      type: 'danger',
      icon: 'danger',
      message: 'Error Sending Message',
      description: e.message,
    })
  })
}