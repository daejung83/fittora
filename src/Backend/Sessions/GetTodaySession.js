import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'
import { showMessage } from 'react-native-flash-message'
import moment from 'moment'

export default function GetTodaySession(updateList){
  const uid = auth().currentUser.uid
  firestore().collection('session')
  .where('clientUID', '==', uid)
  .where('isCancelled', '==', false)
  .where('selectedDate', '==', moment().format('YYYY-MM-DD'))
  .get()
  .then((query) => {
    const list = []
    query.forEach(item => {
      list.push(item.data())
    })
    updateList(list)
  })
  .catch((e) => {
    console.log('Error getting today session: ', e.message)
    showMessage({
      duration: 5000,
      type: 'danger',
      icon: 'danger',
      message: 'Error Getting Today\'s session',
      description: e.message,
    })
  })
}