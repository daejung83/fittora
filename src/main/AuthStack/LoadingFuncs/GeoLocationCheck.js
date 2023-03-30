import {Platform, PermissionsAndroid} from 'react-native'
import functions from '@react-native-firebase/functions'
import firestore from '@react-native-firebase/firestore'
import GeoFencing from 'react-native-geo-fencing'
import Geolocation from '@react-native-community/geolocation'
import {ChampaignArea} from '../../../config/GeoArea'

let navigation
let callback

export default async function GeoLocationCheck (props, callbackFunc) {

  navigation = props.navigation
  callback = callbackFunc
  const config = { enableHighAccuracy: false, timeout: 15000, maximumAge: 100000 }

  console.log('Starting GeoLocationCheck')

  if(Platform.OS === 'android') {
    return PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Fittora Location Permission',
        message:
          'Fittora App needs access to your location ' +
          'so you can find gyms near you',
        // buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      })
      .then((granted) => {
        console.log('granted: ', granted)
        if(granted === 'granted') {
          return Geolocation.getCurrentPosition(
            getCurLocSuccess, getCurLocError,
            config
          )
        } else {
          props.navigation.navigate('LocationReq')
        }
      })
      .catch((e) => {
        console.log('Error: ', e.message)
        props.navigation.navigate('SomethingWentWrong', {message: e.message})
      })
  } else {
    // IOS
    return Geolocation.getCurrentPosition(
      getCurLocSuccess, getCurLocError,
      config
    )
  }
}

function getCurLocSuccess (info) {
  console.log('location: ', info)
  const {longitude, latitude} = info.coords

  const point = {
    lat: latitude,
    lng: longitude
  }

  return GeoFencing.containsLocation(point, ChampaignArea)
  .then(() => {
    callback()
  })
  .catch((e) => {
    navigation.navigate('NotAvailableArea')
  })
}

function getCurLocError (e) {
  console.log('location error: ', e.message)
  
  navigation.navigate('LocationReq')
}
