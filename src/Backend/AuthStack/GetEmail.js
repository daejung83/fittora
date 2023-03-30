import auth from '@react-native-firebase/auth'

export default function GetEmail () {
  return auth().currentUser.email
}