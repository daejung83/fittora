import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native'
import moment from 'moment'
import { material } from 'react-native-typography'
import {Icon} from 'native-base'

const dayIndex = [0, 1, 2, 3, 4, 5, 6]
function CalendarStrip({startOfWeek, props, updateStartWeek}) {

  let startDate = startOfWeek

  function _renderDates () {
    return (
      dayIndex.map((item, i) => {
        const slotTime = moment(startDate).add(item, 'day')

        return (
          <View style={styles.dayContainer} key={i} >
            <Text style={material.caption}>{slotTime.format('ddd')}</Text>
            <Text style={[material.title, slotTime.isBefore(moment().subtract(1, 'day')) ? {color: 'grey'} : null]}>{slotTime.get('date')}</Text>
          </View>
        )
      })
    )
  }

  function _renderMonth () {
    const endDate = moment(startDate).add(6, 'day')
  
    console.log('startDate: ', startDate.format('YYYY-MM-DD h:mm a'))
    console.log('endDate: ', endDate.format('YYYY-MM-DD h:mm a'))
    console.log('startMonth', startDate.format('MMM'))
    console.log('endMonth')

    const startMonth = startDate.format('MMM')
    const endMonth = endDate.format('MMM')
    const startYear = startDate.format('YYYY')
    const endYear = endDate.format('YYYY')

    const month = startMonth === endMonth ? startMonth : startMonth + '/ ' + endMonth
    const year = startYear === endYear ? startYear : startDate.format('YY') + '-' + endDate.format('YY')

    return month + ' ' + year
  }

  function _moveRight () {
    updateStartWeek(moment(startOfWeek).add(1, 'week'))
  }

  function _moveLeft () {
    updateStartWeek(moment(startOfWeek).subtract(1, 'week'))
  }

  const isBeforeLimitTime = startOfWeek.isBefore(moment())
  const isAfterLimitTime = moment().add(6, 'week').isBefore(startOfWeek)
  return (
    <View style={styles.container}>
      <View style={styles.monthRow}>

        <Icon 
          style={[styles.arrow, isBeforeLimitTime ? {color: 'grey'} : null]} 
          type='SimpleLineIcons' 
          name='arrow-left' 
          onPress={isBeforeLimitTime ? () => console.log('nothing') : _moveLeft}  
        />

        <Text style={material.title}>{_renderMonth()}</Text>

        <Icon 
          style={[styles.arrow, isAfterLimitTime ? {color: 'grey'} : null]} 
          type='SimpleLineIcons' 
          name='arrow-right' 
          onPress={isAfterLimitTime ? () => console.log('nothing') : _moveRight}
        />
      </View>
      <View style={styles.dayRow}>
        {_renderDates()}
      </View>
    </View>
  )
}



const {width, height} = Dimensions.get('screen')

const styles = StyleSheet.create({
  container: {
    // width: width,
    // borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  monthRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: width,
  },
  dayRow: {
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'space-between',
    width: width * 0.95,
  },
  dayContainer: {
    // borderWidth: 1,
    width: (width * 0.95) / 7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrow: {
    fontSize: 20,
    marginRight: 20,
    marginLeft: 20,
  }
});

export default CalendarStrip
