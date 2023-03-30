import React, {useState} from 'react'
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Alert
} from 'react-native'
import {Button} from 'react-native-elements'
import {Icon} from 'native-base'
import moment from 'moment'
import LinearGradient from 'react-native-linear-gradient'
import { SwipeRow } from 'react-native-swipe-list-view'
import { material } from 'react-native-typography'

import {
  PENDING_SESSION,
  BOOKED_SESSION,
  PAYMENT_ISSUE_SESSION,
  STARTED_SESSION,
  COMPLETED_SESSION,
  REPORTED_NO_SHOW,
} from '../../../../../constants/sessionStatus'
import CancelSessionRequest from '../../../../../Backend/Sessions/CancelSessionRequest'
import OverlayLoading from '../../../../../components/OverlayLoading'

function Item({item, firstItemInDay, props}) {

  const {timestamp, status, trainerInfo} = item
  console.log('item: ', item)

  const time = moment(timestamp)
  const [isLoading, setIsLoading] = useState(false)

  function handleCancelSession() {
    Alert.alert(
      'Cancel Session',
      'Proceed with cancellation',
      [
        {text: 'OK', onPress: confirmCancelSession},
        {text: 'CANCEL', onPress: () => console.log('nothing todo')}
      ],
      {cancelable: true}
    )
  }

  function confirmCancelSession() {
    CancelSessionRequest(item, props, () => setIsLoading(false), true)
  }

  function _renderStatus (status) {
    console.log('status: ', status)
    let text = 'Invalid Status'
    let style = {}
    if(status === PENDING_SESSION) {
      style = styles.pending
      text = 'Pending'
    } else if(status === BOOKED_SESSION) {
      style = styles.scheduled
      text = 'Booked'
    } else if(status === PAYMENT_ISSUE_SESSION) {
      style = styles.paymentIssue
      text = 'Payment Issue'
    } else if(status === STARTED_SESSION) {
      style = styles.started
      text = 'Started'
    } else if(status === COMPLETED_SESSION) {
      style = styles.completed
      text = 'Finished'
    } else if(status === REPORTED_NO_SHOW) {
      style = styles.reportedNoShow
      text = 'Issue'
    } 

    return (<Text style={[material.button, style]}>{text}</Text>)
  }

  return (
    <SwipeRow
      leftOpenValue={width * 0.35}
      style={styles.swiper}
      disableLeftSwipe
    >
      <View style={styles.buttonRow}>
        <Button 
          buttonStyle={[styles.buttonSize]}
          title={'detail'}
          titleStyle={[material.button, {color: 'white'}]}
          raised
          onPress={() => props.navigation.navigate('SessionDetail', {session: item})}
        />
        <Button 
          buttonStyle={[styles.buttonSize, {backgroundColor: 'red'}]}
          title={'cancel'}
          titleStyle={[material.button, {color: 'white'}]}
          raised
          onPress={handleCancelSession}
        />
        
      </View>
      <View style={styles.shadow}>
        <LinearGradient
          style={styles.container}
          start={{x: 0, y: 0.5}}
          end={{x: 1, y: 1}}
          colors={['white', '#B6D1F4FF']}
        >

            <View>
              <Text style={material.title}>{time.format('h a')}</Text>
              {_renderStatus(status)}
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View style={{alignItems: 'flex-end'}}>
                
                <Text style={material.body1}>{trainerInfo.firstName}</Text>
                <Text style={material.caption}> {trainerInfo.lastName}</Text>
              </View>
              <Icon 
                type='MaterialCommunityIcons'
                name='menu-right'
              />
            </View>

        </LinearGradient>
        <OverlayLoading isLoading={isLoading} />
      </View>
    </SwipeRow>
  )
}

const {width, height} = Dimensions.get('screen')

const styles = StyleSheet.create({
  container: {
    // borderWidth: 1,
    // marginLeft: 15,
    // marginRight: 15,
    // marginBottom: 15,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 20,
    borderLeftWidth: 1,
    borderColor: 'grey',
    minHeight: height * 0.08,
  },
  swiper: {
    // borderWidth: 1,
    margin: 15,
    marginTop: 0,
    
    justifyContent: 'center',
    // alignItems: 'center'
  }, 
  buttonRow: {
    // justifyContent: 'center', 
    flexDirection: 'row',
    alignItems: 'center',
    height: height * 0.08,
    paddingLeft: 10,
    paddingTop: 15,
    paddingBottom: 15,
    // borderWidth: 1,
  },
  buttonSize: {
    height: height * 0.05, 
    width: width * 0.15
  },
  shadow: {
    shadowColor: 'black',
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.7,
    shadowRadius: 2,
    elevation: 3,
  },
  pending: {
    color: 'orange',
  },
  scheduled: {
    color: 'rgba(87, 165, 21, 1)',
  },
  paymentIssue: {
    color: '#dc1f1f',
  },
  started: {
    color: '#2b22d3',
  },
  completed: {
    color: '#2f0a83',
  },
  reportedNoShow: {
    color: 'rgba(222, 187, 7, 1)'
  },
});

export default Item
