import auth from '@react-native-firebase/auth'

export default function AuthCheck (onAuthStateChanged) {
  const sub = auth().onAuthStateChanged(onAuthStateChanged)

  return sub
}