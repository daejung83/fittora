import React, {useEffect, useState} from 'react'
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableHighlight,
} from 'react-native'
import moment from 'moment'

function Slot({REQUESTED, callback, day, hour, time}) {
  
  const [req, setReq] = useState(REQUESTED)

  useEffect(() => {
    setReq(REQUESTED)
  }, [REQUESTED])

  const isBefore = time.isBefore(moment().add(2, 'hour'))
  const buttonColor = req ? '#48F697' : (isBefore ? 'grey' : '#DAF1FB')

  function handlePressed () {
    console.log('REQ: ', REQUESTED)
    if(!isBefore) {
      setReq(!req)
      callback(day, hour, time)
    }
  }

  return (
    <TouchableHighlight
      // key={key}
      style={[styles.slot, {backgroundColor: buttonColor}]}
      onPress={handlePressed}
    >
      <Text>{moment().hour(hour).format('h a')}</Text>
    </TouchableHighlight>
  )
}

const {width, height} = Dimensions.get('screen')

const styles = StyleSheet.create({
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
});

export default Slot
