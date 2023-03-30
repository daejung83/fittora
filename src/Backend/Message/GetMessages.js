import firestore from '@react-native-firebase/firestore'
import { showMessage } from 'react-native-flash-message'

export default function GetMessages(params, updateMessages) {

  const {chatID} = params
  
  return firestore().collection('Chats').doc(chatID)
  .onSnapshot(snap => {
    if(snap.exists) {
      const messages = snap.data().messages.reverse()

      updateMessages(messages)
    }
  }, err => {
    showMessage({
      duration: 5000,
      type: 'danger',
      icon: 'danger',
      message: 'Error Getting Messages',
      description: err.message
    })
  })
}