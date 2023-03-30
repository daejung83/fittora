import firestore from '@react-native-firebase/firestore'
import { showMessage } from 'react-native-flash-message'

export default function ResetBadge(chatID) {
  firestore().collection('ChatRooms').doc(chatID).update({clientChatBadge: 0})
  .then(() => {
    console.log('badge reset')
  })
  .catch((e) => {
    console.log('Error: ', e.message)
    showMessage({
      duration: 5000,
      type: 'danger',
      icon: 'danger',
      message: 'Error Resetting Badge',
      description: e.message,
    })
  })
}