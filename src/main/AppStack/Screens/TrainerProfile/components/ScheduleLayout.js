import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  ActivityIndicator,
  TouchableHighlight,
  Platform
} from 'react-native'
import {
  Button,
} from 'react-native-elements'
import Spinner from 'react-native-spinkit'
import {Icon} from 'native-base'
import CalendarStrip from './CalendarStrip'
import LinearGradient from 'react-native-linear-gradient'
import moment from 'moment'
import GetTrainerFreeSlotWeek from '../../../../../Backend/Trainers/GetTrainerFreeSlotWeek'
import Slot from './Slot'
import GetSessionRate from '../../../../../Backend/Trainers/GetSessionRate'
import { material } from 'react-native-typography'
import { showMessage } from 'react-native-flash-message'

const hours = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]
const week = [0, 1, 2, 3, 4, 5, 6]
const SLOT_STATUS = {
  BUSY: 'BUSY',
  OPEN: 'OPEN SLOT',
  REQUEST: 'REQUEST'
}

function ScheduleLayout({props, trainerInfo}) {

  const [data, setData] = useState([])
  const [requestedSlots, setRequestedSlots] = useState({})
  const [startOfWeek, setStartOfWeek] = useState(moment().startOf('week'))
  const [isLoading, setIsLoading] = useState(true)
  const [rateLoading, setRateLoading] = useState(true)
  const [rateSet, setRate] = useState({})

  useEffect(() => {
    setIsLoading(true)
    GetTrainerFreeSlotWeek(trainerInfo.uid, startOfWeek, setData, () => setIsLoading(false))
  }, [startOfWeek])

  useEffect(() => {
    setRateLoading(true)
    const params = {
      trainerUID: trainerInfo.uid,
    }
    GetSessionRate(params, handleUpdateRate)
  }, [])

  function handleUpdateRate(success, data) {
    setRateLoading(false)
    if(success) {
      setRate(data)
    }
  }

  function handleSlotPressed (day, hour, time) {

    console.log('day: ', day)
    console.log('hour: ', hour)
    console.log('time: ', time.format('YYYY-MM-DD h:mm a'))

    console.log('moment: ', moment().format('YYYY-MM-DD h:mm a'))
    console.log('moment start of week: ', moment().startOf('week').format('YYYY-MM-DD h: mm a'))

    console.log('start Of Week: ', startOfWeek.format('YYYY-MM-DD h:mm a'))

    const params = {
      startOfWeek: startOfWeek,
      day: day,
      hour: hour,
      time: time,
    }
    const key = startOfWeek.format('YYYYMMDD') + day + hour

    let newRequestedSlots = requestedSlots
    let newData = data

    const slotIndex = newData[day].findIndex((slot) => {
      return slot.hour === hour
    })

    if(requestedSlots[key]) {
      console.log('exists!')
      delete newRequestedSlots[key]
    } else {
      newRequestedSlots[key] = params
      newData[slotIndex].status = SLOT_STATUS.REQUEST
    }
    setRequestedSlots(newRequestedSlots)
    setData(newData)
  }

  function handleSendBookRequest () {
    console.log('req: ', Object.keys(requestedSlots).sort())

    const bookingList = []
    Object.keys(requestedSlots).sort().forEach(key => {
      bookingList.push({...requestedSlots[key], key})
    })

    if(bookingList.length > 0) {
      props.navigation.navigate('BookSessions', {bookingList, trainerInfo, rateSet})
    } else {
      showMessage({
        duration: 3000,
        type: 'warning',
        icon: 'warning',
        message: 'Slot Selection Required',
        description: 'please click on slot from schedule',
      })
    }
  }

  function _renderRates () {
    const {defaultRate, rate} = rateSet

    if(rateLoading) {
      return (
        <View style={styles.rateContainer}>
          <View style={{alignItems: 'center'}}>
            <Spinner 
              type='WanderingCubes'
              color='white'
            />
          </View>
        </View>
      )
    } else if(defaultRate === rate) {
      return (
        <View style={styles.rateContainer}>
          <View style={{alignItems: 'center'}}>
            <Text style={[material.captionWhite, styles.rateText]}>rate</Text>
            <Text style={[material.titleWhite, styles.rateText]}>${defaultRate}</Text>
          </View>
        </View>
      )
    } else {
      return (
        <View style={styles.rateContainer}>
          <View style={styles.rateRow}>
            <Text style={[material.captionWhite, styles.rateText, {color: 'red'}]}>first session rate</Text>
            <Text style={[material.captionWhite, styles.rateText]}>normal rate</Text>
          </View>
          <View style={styles.rateRow}>
            <Text style={[material.titleWhite, styles.rateText]}>{rate === 0 ? 'FREE' : rate}</Text>
            <Text style={[material.titleWhite, styles.rateText]}>${defaultRate}</Text> 
          </View>
        </View>
      )
    }
  }

  function _renderSlots () {
    return (
      <View style={styles.columnContainer}>
        {week.map((day) => {
          if(data){
            console.log("data: ", data)
            return (
  
              <View key={day} style={styles.column} >
                { data[day] ? 
                    data[day].map((slot) => {
                      const time = moment(startOfWeek).add(day, 'day').hour(slot.hour)

                      const key = startOfWeek.format('YYYYMMDD') + day + slot.hour
                      let REQUESTED = requestedSlots[key] ? true : false

                      
                      if(slot.status === SLOT_STATUS.OPEN) {
                        
                        return (
                            <Slot 
                              REQUESTED={REQUESTED} 
                              callback={handleSlotPressed} 
                              day={day}
                              hour={slot.hour}
                              time={time}
                              key={key}
                            />
                        )
                      }
                    })
                    : null
                  }
              </View>
            )
          }
        })}
      </View>
    )
  }

  function _renderLoading () {
    return (
      <View style={styles.loadingContainer}>
        <Spinner type={'Circle'} />
      </View>
    )
  }

  function _platformRender () {
    if(Platform.OS === 'ios') {
      return (
        <ScrollView style={styles.timeScheduleViewScroll}>
          <View style={{flex: 1}}>
            {isLoading ? _renderLoading() : _renderSlots()}
          </View>
        </ScrollView>
      )
    } else {
      return (
        <View style={{flex: 1}}>
          {isLoading ? _renderLoading() : _renderSlots()}
        </View>
      )
    }
  }

  return (

    <View style={styles.container}>
      {_renderRates()}

      <CalendarStrip 
        startOfWeek={startOfWeek} 
        props={props} 
        updateStartWeek={setStartOfWeek} 
      />



      {_platformRender()}
      <View style={styles.bookingButton}>
        <Button 
          title={'SEND BOOKING REQUEST'}
          // style={styles.bookingButton}
          ViewComponent={LinearGradient}
          linearGradientProps={{
            colors: ['black', '#FCD34E'],
            start: {x: 0.4, y: -0.2},
            end: {x: 1, y: 2}
          }}
          icon={
            <Icon 
              type='MaterialIcons' 
              name='schedule' 
              style={{color: 'white', marginRight: 10, fontSize: 20}} 
            />
          }
          onPress={handleSendBookRequest}
        />
      </View>
      

    </View>
  )
}

const {width, height} = Dimensions.get('screen')

const styles = StyleSheet.create({
  container: {
    // borderWidth: 1,
    // borderColor: 'white',
  },
  timeScheduleViewScroll: {
    height: height * 0.14,
    // borderTopWidth: 1,
    borderBottomWidth: 2,   
  }, 
  loadingContainer: {
    width: width,
    height: height * 0.14,
    justifyContent: 'center',
    alignItems: 'center',
  }, 
  columnContainer: {
    flexDirection: 'row', 
    justifyContent: 'center',
  }, 
  column: {
    width: (width * 0.95) / 7,
    // height: 500,
    // borderColor: 'black',
    // borderWidth: 1,
  },
  slot: {
    width: (width * 0.9) / 7,
    height: (width * 0.95) / 14,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 20,
    marginBottom: 10,
    backgroundColor: 'grey',
    shadowColor: 'black',
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.7,
    shadowRadius: 2,
    elevation: 3,
  },
  bookingButton: {
    margin: 20,
    // backgroundColor: 'black',
    shadowColor: 'black',
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.7,
    shadowRadius: 2,
    elevation: 3,
  },
  rateContainer: {
    width: width * 0.9,
    height: height * 0.08,
    borderWidth: 1,
    alignSelf: 'center',
    backgroundColor: 'black',
    justifyContent: 'center',
    borderRadius: 20,
    marginTop: 10,
    marginBottom: 20,

    shadowColor: 'black',
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.7,
    shadowRadius: 2,
    elevation: 3,
  },
  rateRow: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    width: width * 0.9
  },
  rateText: {
    marginLeft: 20,
    marginRight: 20,
  }
});

export default ScheduleLayout
