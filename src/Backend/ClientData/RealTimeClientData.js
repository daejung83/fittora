import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'

export default function RealTimeClientData(updateClientInfo) {
  const uid = auth().currentUser.uid

  return firestore().collection('client').doc(uid).onSnapshot((user) => {
    // if(!user.metadata.isEqual) {
      console.log('user: ', user.data())
      updateClientInfo(user.data())
    // }
    
    // updateClientInfo(user.data())
  }, (e) => {
    console.log('Error real time client Info: ', e.message)
  })
}