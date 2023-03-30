import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'

export default async function GetClientData () {

  const uid = auth().currentUser.uid
  return firestore().collection('client').doc(uid).get()
}