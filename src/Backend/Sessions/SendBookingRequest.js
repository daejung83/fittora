import functions from '@react-native-firebase/functions'
import auth from '@react-native-firebase/auth'
import {live} from '../../config/config'
import { showMessage } from 'react-native-flash-message'


//firstSession or defaultRate
export default function SendBookingRequest(params, finishedLoading) {
  const {bookingList, rateSet, trainerInfo, props} = params

  const Proms = []

  const bookFunc = functions().httpsCallable('V3BookSession')

  bookingList.forEach((item, index) => {
    const {hour, key, startOfWeek, time} = item

    const date = time.date()
    const month = time.month() + 1
    const year = time.year()
    const timestamp = time.valueOf()

    const timeObject = {
      date, month, year, timestamp
    }

    const selectedDate = time.format('YYYY-MM-DD')

    let sessionType = ''
    let rate = 0
    if(index === 0 && rateSet.defaultRate !== rateSet.rate) {
      sessionType = 'firstSession'
      rate = rateSet.rate
    } else {
      sessionType = 'defaultRate'
      rate = rateSet.defaultRate
    }
    
    const data = {
      date: selectedDate,
      hour: hour,
      trainer: trainerInfo,
      time: timeObject,
      testing: !live,
      sessionType: sessionType,
      rate: rate,
    }
    console.log('data: ', data)
    console.log('index: ', index)
    console.log('day: ', date)
    console.log('month: ', month)
    console.log('year: ', year)
    console.log('hour: ', hour)
    console.log('time: ', time.format('YYYY-MM-DD h:mm a'))

    const prom = bookFunc(data)

    Proms.push(prom)
  })

  Promise.all(Proms)
  .then((result) => {
    console.log('result: ', result)
    finishedLoading()
    //Booking Done
    props.navigation.navigate('BookingConfirmedPage', {
      result, bookingList, rateSet, props
    })
  })
  .catch((e) => {
    finishedLoading()
    console.log('Error: ', e.message)
    showMessage({
      duration: 5000,
      type: 'danger',
      icon: 'danger',
      message: 'Error Booking Sessions',
      description: e.message,
    })
  })
}