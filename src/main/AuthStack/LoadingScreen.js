import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet, Platform, PermissionsAndroid } from 'react-native'
// import {Button} from 'native-base'
import Spinner from 'react-native-spinkit'
import { material } from 'react-native-typography'
import LinearGradient from 'react-native-linear-gradient'

// import GeoFencing from 'react-native-geo-fencing'
// import Geolocation from '@react-native-community/geolocation'
// import {ChampaignArea} from '../../config/GeoArea'


import AuthCheck from '../../Backend/AuthStack/AuthCheck'
import GetClientData from '../../Backend/ClientData/GetClientData'
import GeoLocationCheck from './LoadingFuncs/GeoLocationCheck'
import ConfigCheck from './LoadingFuncs/ConfigCheck'
import StripeInit from './LoadingFuncs/StripeInit'
import MessageSetup from './LoadingFuncs/MessageSetup'
import CheckFinishInitSetup from './LoadingFuncs/CheckFinishInitSetup'


const types = ['CircleFlip', 'Bounce', 'Wave', 'WanderingCubes', 'Pulse', 'ChasingDots', 'ThreeBounce', 'Circle', '9CubeGrid', 'WordPress', 'FadingCircle', 'FadingCircleAlt', 'Arc', 'ArcAlt']

//TODO: Need to handle Android Back button
function LoadingScreen (props) {

    const [loadingIndex, setLoadingIndex] = useState(0)
    // const [LoggedOut, setLoggedOut] = useState(true)
    const [message, setMessage] = useState('Loading...')
    let LoggedOut = true

    useEffect(() => {
      const subscriber = AuthCheck(onAuthStateChanged)

      return subscriber
    }, [])

    function onAuthStateChanged (user) {
      if(user) {

        if(!user._user.emailVerified) {
          props.navigation.navigate('EmailValidate')
        } else if(LoggedOut) {
          LoggedOut = false

          ConfigCheck(props, () => GeoLocationCheck(props, LoadApp))
        }
          
      } else {
        LoggedOut = true
        ConfigCheck(props, () => GeoLocationCheck(props, goToLogin))
      }
    }

    function goToLogin () {
      props.navigation.navigate('Login')
    }

    function LoadApp () {

      setLoadingIndex(loadingIndex + 1)
      setMessage('Initializing App...')

      StripeInit()
      MessageSetup()

      GetClientData()
      .then(user => {
        CheckFinishInitSetup(user.data(), props)
      })
      .catch((e) => {
        props.navigation.navigate('SomethingWentWrong', {message: e.message})
      })
    }

    return (
      <LinearGradient colors={['#FFA720', '#605441']} style={styles.container}>
        <Text style={[material.headline, {marginBottom: 20}]}>{message}</Text>
        <Spinner 
          type={types[loadingIndex]}
        />

      </LinearGradient>
    )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default LoadingScreen