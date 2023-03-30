import React, {useState, useEffect} from 'react'
import { 
  View, 
  Text, 
  StyleSheet,
  Dimensions,
  TouchableHighlight,
} from 'react-native'
import { material } from 'react-native-typography'
import {
  PENDING_SESSION,
  BOOKED_SESSION,
  PAYMENT_ISSUE_SESSION,
  STARTED_SESSION,
  COMPLETED_SESSION,
  REPORTED_NO_SHOW,
} from '../../../../../constants/sessionStatus'
import moment from 'moment'
import GetTodaySession from '../../../../../Backend/Sessions/GetTodaySession'

const TodaySession = ({props}) => {

  const [todaySessionList, setTodaySessionList] = useState([])

  useEffect(() => {
    //TODO: Get Todays sessions
    GetTodaySession(updateTodaySession)
  }, [])

  function updateTodaySession(list) {
    setTodaySessionList(list)
  }

  function _renderStatus (status) {
    let color = 'white'

    if(status === PENDING_SESSION) {
      color = 'orange'
    } else if(status === BOOKED_SESSION) {
      color = 'rgba(87, 165, 21, 1)'
    } else if(status === PAYMENT_ISSUE_SESSION) {
      color = '#dc1f1f'
    } else if(status === STARTED_SESSION) {
      color = '#2b22d3'
    } else if(status === COMPLETED_SESSION) {
      color = '#2f0a83'
    } else if(status === REPORTED_NO_SHOW) {
      color = 'rgba(222, 187, 7, 1)'
    }

    return (
      <View>
        <Text style={[material.body1White, {color: color, fontWeight: 'bold'}]}>{status}</Text>
      </View>
    )
  }

  function _renderItem (item) {
    console.log('item: ', item)
    const {status, trainerInfo, timestamp} = item

    const time = moment(timestamp)
    return (
      <TouchableHighlight onPress={() => props.navigation.navigate('SessionDetail', {session: item})}>
        <View style={styles.infoContainer}>
          <View>
            <Text style={[material.titleWhite, styles.textShadow]}>{time.format('h:mm a')}</Text>
            {_renderStatus(status)}
            <Text style={material.body1White}>{trainerInfo.firstName}</Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={{alignItems: 'flex-end', marginRight: 10,}}>
              <Text style={material.titleWhite}>{time.format('ddd')}</Text>
              <Text style={material.subheadingWhite}>{time.format('MMM')}</Text>
              <Text style={material.captionWhite}>{time.format('YYYY')}</Text>
              
            </View>
            <View style={styles.dateBackground}>
              <Text style={material.display1White}>{time.format('DD')}</Text>
            </View>
          </View>
        </View>
      </TouchableHighlight>
    )
  }
  if(todaySessionList.length > 0) {
    return (
      <View style={styles.container}>
        <Text style={[material.titleWhite, {marginLeft: 30}]}>Today's Session</Text>
        <Text style={[material.captionWhite, {marginLeft: 30, marginBottom: 10,}]}>session for {moment().format('ddd MMM DD')}</Text>
        {todaySessionList.map((item, i) => {
          return (
            <View key={i}>{_renderItem(item, i)}</View>
          )
        })}
      </View>
    )
  } else {
    return null
  }
  
}

const {width, height} = Dimensions.get('screen')
const styles = StyleSheet.create({
  container: {
    // borderWidth: 1,
    marginTop: 20,
    width: width * 0.8,
    // backgroundColor: 'black',
  },
  infoContainer: {
    // borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 25,
    backgroundColor: 'black',
    borderRadius: 20,

    shadowColor: '#2B2B2BFF',
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 3,
  },
  textShadow: {
    textShadowColor: 'white',
    textShadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.8,
    textShadowRadius: 2,
    elevation: 1,
  },
  dateBackground: {
    // borderWidth: 1,
    padding: 15,
    borderRadius: 50,
    backgroundColor: 'orange'
  }
});

export default TodaySession
