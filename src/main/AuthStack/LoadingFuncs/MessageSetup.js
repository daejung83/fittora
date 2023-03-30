import messaging from '@react-native-firebase/messaging'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import {requestNotifications, request, PERMISSIONS} from 'react-native-permissions'
import { showMessage } from 'react-native-flash-message'

//TODO: Setup Message Token Request - Might need to test on real device.

function SetupMessaging () {
  const uid = auth().currentUser.uid

  messaging().hasPermission()
  .then((enabled) => {
    console.log('has perm: ', enabled)
    if(enabled) {
      return Promise.resolve('got permission')
    } else {
      return messaging().requestPermission()
    }
  })
  .then((result) => {
    return messaging().registerForRemoteNotifications()
  })
  .then((result) => {
    console.log('got permission yay~', result)
    setTimeout(() => console.log('waiting...'), 1000)
    messaging().getToken()
      .then((fcmToken) => {
        return firestore().collection('client').doc(uid).update({fcmToken: fcmToken})
      })
      .then(() => {
        console.log('token updated')
      })
      .catch((e) => {
        console.log('Error updating token: ', e.message)
        // showMessage({
        //   duration: 4000,
        //   type: 'danger',
        //   icon: 'danger',
        //   message: 'Error updating token',
        //   description: e.message,
        // })
      })
  })
  .catch((e) => {
    console.log('Error in Has Perm: ', e.message)
  })
}
export default function MessageSetup () {

  const uid = auth().currentUser.uid
  // const fcmToken = await messaging().getToken()
  

  // messaging().requestPermission()
  // .then((result) => {
  //   console.log('permission: ', result)
    
  // })
  // .catch((e) => {
  //   console.log('Error Permission: ', e.message)
  // })
  
  requestNotifications(['alert', 'sound', 'badge'])
  .then((result) => {
    console.log('notifi result: ', result)
    if(result.status === 'granted') {
      
      SetupMessaging()
    } else {
      showMessage({
        duration: 8000,
        type: 'warning',
        icon: 'warning',
        message: 'Please turn on notification',
        description: 'notification permission is required so we can notification for booking confirmation and message notification',
      })
    }
  })
  .catch((e) => {
    console.log('err: ', e.message)
  })
  // messaging().getToken()
  // .then((fcmToken) => {
  //   console.log('token: ', fcmToken)
  //   return firestore().collection('client').doc(uid).update({fcmToken: fcmToken})
  // })
  // .then(() => {
  //   console.log('token updated')
  // })
  // .catch((e) => {
  //   console.log('Error getting Token: ', e.message)
  // })
  // const clientRef = firestore().collection('client').doc(uid)

  // console.log('fcmToken: ', fcmToken)

  // return clientRef.update({fcmToken})
  // .then(() => {
  //   console.log('fcmToken Update Completed')
  //   // return fcmToken
  // })
  // .catch((e) => {
  //   console.log('Error on updating fcmToken: ', e.message)
  // })
}