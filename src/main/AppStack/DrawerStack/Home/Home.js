import React, {useState, useEffect} from 'react'
import { 
  Text, 
  View, 
  StyleSheet,
  ScrollView,
  Dimensions,
  BackHandler,
} from 'react-native'
import {
  Icon,
} from 'native-base'
import {Button} from 'react-native-elements'
import LinearGradient from 'react-native-linear-gradient'
import { material } from 'react-native-typography'

import MainColors from '../../../../colors/MainColors'
const {MainColor, SubColor, BaseColor, Color1} = MainColors

import functions from '@react-native-firebase/functions'
import MyGym from './components/MyGym'
import RealTimeClientData from '../../../../Backend/ClientData/RealTimeClientData'
import MyGymTrainers from './components/MyGymTrainers'
import LoadingFunctions from '../../../../Backend/LoadingFunctions/LoadingFunctions'
import TodaySession from './components/TodaySession'

function Home(props) {

  const [index, setIndex] = useState(0)
  const [clientInfo, setClientInfo] = useState({})

  useEffect(() => {
    const backSub = BackHandler.addEventListener('hardwareBackPress', function() {
      props.navigation.navigate('Home')

      return true
    })

    return backSub
  }, [])

  useEffect(() => {
    const sub = RealTimeClientData(setClientInfo)

    return sub
  }, [])

  useEffect(() => {
    LoadingFunctions(props)
  }, [])

  return (
    <LinearGradient 
      colors={['black', 'gray']}  
      style={styles.container}
      start={{x: 0, y: 0.3}}
      end={{x: 0.8, y: 1}}
    >
      <ScrollView style={{flex: 1}}>
        <View style={styles.scroll}>
          <Text style={material.display1White}>FITTORA</Text>

          <MyGym gymID={clientInfo.gymID} props={props}/>
          <TodaySession props={props} />

          {clientInfo && clientInfo.gymID ? <MyGymTrainers gymID={clientInfo.gymID} props={props} /> : null}
        </View>
        <View style={{height: 200}} />
      </ScrollView>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  container: {
    // marginTop: 80,
    flex: 1,
  }, 
  scroll: {
    alignItems: 'center',
    marginTop: 45,
    flex: 1,
  },
});

export default Home