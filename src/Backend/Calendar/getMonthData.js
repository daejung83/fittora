import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'

export default function getMonthData(year, month, updateData) {

  const uid = auth().currentUser.uid

  console.log('year: ', year)
  console.log('month: ', month)
  console.log('uid: ', uid)
  firestore().collection('session')
  .where('month', '==', month)
  .where('year', '==', year)
  .where('clientUID', '==', uid)
  .where('isCancelled', '==', false).onSnapshot((snapQuery) => {
    const list = {}

    snapQuery.forEach((session, i) => {
      console.log('session: ', session.data())

      if(!list[session.data().selectedDate]) {
        list[session.data().selectedDate] = []
      }
      
      list[session.data().selectedDate].push(session.data())
    })
    console.log('snap of list: ', list)
    updateData(list, month, year)
  })

}