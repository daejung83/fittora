import React from 'react'
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
} from 'react-native'
import moment from 'moment'
import { material } from 'react-native-typography'
import randomColorGen from '../../../../../util/randomColorGen'


function Day({day, item, props}) {
  console.log('day: ', day)
  console.log('item: ', item)

  const color = randomColorGen()

  if(day) {
    const time = moment(day.dateString)

    return (
      <View style={[styles.container, {borderColor: color}]}>

        <Text style={material.caption}>{time.format('MMM')}</Text>
        <Text style={material.title}>{day.day}</Text>
        <Text style={material.body1}>{time.format('ddd')}</Text>
      </View>
    )
  } 

  return (
    <View style={styles.empty}>
      {/* <Text>Day</Text> */}
    </View>
  )
}

const {width, height} = Dimensions.get('screen')
const styles = StyleSheet.create({
  container: {
    // borderWidth: 1,
    width: width * 0.1,
    marginLeft: 15,
    marginBottom: 15,
    borderRightWidth: 1,
    // borderBottomWidth: 2,
    // borderTopRightRadius: 30,
    // borderColor: randomColorGen(),
  },
  empty: {
    width: width * 0.1,
    marginLeft: 15,
    marginBottom: 15,
  }
});

export default Day
