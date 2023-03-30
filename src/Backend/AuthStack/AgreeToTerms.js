import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'
import { showMessage } from 'react-native-flash-message'

export default function AgreeToTerms (props, agreed) {
  if(agreed) {
    const uid = auth().currentUser.uid
    firestore().collection('client').doc(uid).update({
      TOSAgreed: agreed,
      TOSAgreedDate: new Date(),
    })
    .then(() => {
      props.navigation.navigate('App')
    })
    .catch((e) => {
      showMessage({
        duration: 5000,
        type: 'danger',
        icon: 'danger',
        message: 'Error accepting terms',
        description: e.message,
      })
    })
  } else {
    showMessage({
      duration: 4000,
      type: 'warning',
      icon: 'warning',
      message: 'Agree to terms of services',
    })
  }
}