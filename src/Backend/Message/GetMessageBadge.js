import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'

export default function GetMessageBadge (updateBadge) {
  const clientUID = auth().currentUser.uid

  return firestore().collection('ChatRooms')
  .where('clientUID', '==', clientUID)
  .onSnapshot(result => {
    let badge = 0
    result.forEach((item) => {
      
      const {clientChatBadge} = item.data()

      const num = clientChatBadge ? clientChatBadge : 0

      badge += num
    })
    updateBadge(badge)
  })
}