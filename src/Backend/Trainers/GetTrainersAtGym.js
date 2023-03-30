import firestore from '@react-native-firebase/firestore'
import {live} from '../../config/config'
import { ThemeConsumer } from 'react-native-elements'
import { showMessage } from 'react-native-flash-message'


function handleUpdateList(result, callback) {
  const list = []
  result.forEach(item => {
    if(item.exists) {
      list.push(item.data())
    }
  })

  callback(list)
}

function handleError(e, callback) {
  callback()
  showMessage({
    duration: 5000,
    type: 'danger',
    icon: 'danger',
    message: 'Error getting trainers at the gym',
    description: e.message,
  })
}

export default function GetTrainersAtGym (gymID, callback) {
  if(live) {
    firestore().collection('trainer')
    .where('gymID', '==', gymID)
    .where('accountApproved', '==', true)
    .where('takingSessions', '==', true)
    .where('testingAccount', '==', false)
    .get()
    .then((result) => {
      handleUpdateList(result, callback)
    })
    .catch((e) => {
      handleError(e, callback)
    })
  } else {
    firestore().collection('trainer')
    .where('gymID', '==', gymID)
    .where('accountApproved', '==', true)
    .where('takingSessions', '==', true)
    .get()
    .then((result) => {
      handleUpdateList(result, callback)
    })
    .catch((e) => {
      handleError(e, callback)
    })
  }
}