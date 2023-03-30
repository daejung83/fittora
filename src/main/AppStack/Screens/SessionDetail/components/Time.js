import React from 'react'
import { 
  View, 
  Text,
  StyleSheet,
  Dimensions, 
} from 'react-native'
import moment from 'moment'
import { material } from 'react-native-typography'
import {
  PENDING_SESSION,
  BOOKED_SESSION,
  PAYMENT_ISSUE_SESSION,
  STARTED_SESSION,
  COMPLETED_SESSION,
  REPORTED_NO_SHOW,
} from '../../../../../constants/sessionStatus'

const Time = ({timestamp, status}) => {
  const time = moment(timestamp)

  function _renderStatus () {
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
  return (
    <View style={styles.shadow}>
      <View style={styles.container}>
        <View style={styles.row}>
          <View style={{justifyContent: 'center',}}>
            <Text style={[material.titleWhite, styles.textShadow]}>{time.format('h:mm a')}</Text>
            <Text style={material.body1White}>{time.format('ddd')}</Text>
            {_renderStatus()}
          </View>
          <View style={{justifyContent: 'center', flexDirection: 'row', alignItems: 'center'}}>
            <View>
              <Text style={material.body1White}>{time.format('MMM')}</Text>
              <Text style={material.body1White}>{time.format('YYYY')}</Text>
            </View>

            <View style={styles.dateContainer}>
              <Text style={[material.title, styles.date]}>{time.format('DD')}</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  )
}

const {width, height} = Dimensions.get('screen')
const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    width: width * 0.9,
    // height: height * 0.15,
    marginBottom: 20,
    backgroundColor: 'black',
    borderRadius: 30,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },
  date: {
    fontSize: 30, 
    // marginLeft: 10,
  },
  textShadow: {
    textShadowColor: 'white',
    textShadowOffset: { width: 1.5, height: 1.5},
    textShadowRadius: 2,
    shadowOpacity: 0.8,
    elevation: 2,
  },
  dateContainer: {
    backgroundColor: 'yellow',
    marginLeft: 15,
    padding: 10,
    borderRadius: 100,
    paddingTop: 18,

    shadowColor: 'white',
    shadowOffset: { width: 1.5, height: 1.5 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 2,
  },
  shadow: {
    shadowColor: 'white',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 2,
  }
});

export default Time
