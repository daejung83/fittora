import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'

export default function GetChatRooms (updateList) {
  const clientUID = auth().currentUser.uid

  return firestore().collection('ChatRooms')
  .where('clientUID', '==', clientUID)
  .onSnapshot(result => {
    const list = []
    result.forEach((item) => {
      list.push(item.data())
    })
    updateList(list)
    console.log('list: ', list)
  })
}