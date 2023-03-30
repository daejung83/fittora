import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'
import PushNotification from 'react-native-push-notification'

import {BOOKED_SESSION} from '../../../../constants/sessionStatus'
import { showMessage } from 'react-native-flash-message'
import moment from 'moment'

export default  function RunCurrentNotifications (params) {
  const uid = auth().currentUser.uid

  PushNotification.cancelAllLocalNotifications()

  //TODO: Need to setup for each account
  
  // console.log('timestamp: ', new Date().getTime())
  firestore().collection('session')
  .where('timestamp', '>', new Date().getTime())
  .where('status', '==', BOOKED_SESSION)
  .where('clientUID', '==', uid)
  .get()
  .then((query) => {
    query.forEach((item) => {
      console.log('query item: ', item.data())

      const {timestamp, trainerInfo, gymName, sessionID} = item.data()
      const message = 'Session with ' + trainerInfo.firstName + ' in 1 hour'
      const title = 'Session Notification'
      const setTime = new Date(timestamp)
      setTime.setHours(setTime.getHours() - 1)

      PushNotification.localNotificationSchedule({

        data: {test: 'testdata'},
        id: sessionID,
        title: title,
        message: message,
        date: setTime,
      })
    })
  })
  .catch((e) => {
    console.log('error in query: ', e.message)
    showMessage({
      duration: 5000,
      type: 'danger',
      icon: 'danger',
      message: 'Error Getting Notification',
      description: e.message,
    })
  })
}