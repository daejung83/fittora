import React from 'react'
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native'
import { Button, } from 'react-native-elements'
import LinearGradient from 'react-native-linear-gradient'
import moment from 'moment'
import { material } from 'react-native-typography'
import randomColorGen from '../../../../util/randomColorGen'

function BookingConfirmedPage(props) {

  const data = props.navigation.getParam('result', [])
  const bookingList = props.navigation.getParam('bookingList', [])
  const rateSet = props.navigation.getParam('rateSet', {})

  console.log('data: ', data)
  console.log('bookingList: ', bookingList)
  console.log('rateSet: ', rateSet)

  function handleConfirm () {
    props.navigation.navigate('App')
  }

  function _renderResult () {
    //render bookingList with data
    return (
      <View>
        {bookingList.map((item, index) => {
          
          const result = data[index].data
          const success = result.type === 'success'
          const {time, day, hour} = item

          const ColorCode = randomColorGen()

          const successMsg = 'Booking request have been sent.  Once trainer accepts the session you will be notified.'
          const message = success ? successMsg : result.message

          return (
            <View style={styles.itemContainer} key={index}>
              <View style={[styles.dayContainer, {borderColor: ColorCode}]}>
                <Text style={material.caption}>{time.format('YYYY')}</Text>
                <Text style={material.subheading}>{time.format('MMM')}</Text>
                <Text style={material.display1}>{day}</Text>
                <Text style={material.caption}>{time.format('h a')}</Text>
              </View>
              <View style={{width: width * 0.65}}>
                <Text style={[{
                  alignSelf: 'flex-end', 
                  color: success ? 'green' : 'red'}]}>{ success ? 'Requested' : 'Error'}</Text>
                <Text style={[material.caption, {flexWrap: 'wrap'}]}>{message}</Text>
              </View>
            </View>
          )
        })}
      </View>
    )
  }

  return (
    <LinearGradient 
      colors={['#F8E65CFF', 'black']}
      style={styles.container}
    >
      <SafeAreaView style={{flex: 1}}>
        <ScrollView>
          <Text style={[material.titleWhite, styles.pageTitle]}>Booking Confirmed</Text>

          {_renderResult()}
        </ScrollView>
        <Button 
          title={'Confirm'}
          style={styles.confirmButton}
          ViewComponent={LinearGradient}
          linearGradientProps={{
            colors: ['#F8E65CFF', 'white'],
            start: {x: 0, y: 0},
            end: {x: 0.5, y: 1}
          }}
          titleStyle={material.title}
          onPress={handleConfirm}
        />
      </SafeAreaView>
    </LinearGradient>
  )
}

const {width, height} = Dimensions.get('screen')

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    // overflow: 'visible'
  },
  pageTitle: {
    marginTop: 5,
    alignSelf: 'center',

    textShadowColor: 'grey',
    textShadowOffset: { width: 4, height: 4},
    textShadowRadius: 2,
    shadowOpacity: 0.7,
    elevation: 3,
  },
  itemContainer: {
    width: width * 0.9,
    borderWidth: 1,
    marginTop: 10,
    padding: 10,
    borderRadius: 15,
    flexDirection: 'row',
    backgroundColor: '#F5F5F5FF',
    // overflow: 'visible',

    shadowColor: 'black',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 4,
  },
  dayContainer: {
    // borderWidth: 1,
    width: width * 0.13,
    borderRightWidth: 2,
    // borderTopRightRadius: 10,
    marginRight: 10
  },
  confirmButton: {
    width: width * 0.9,
    alignSelf: 'center',

    shadowColor: 'yellow',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 4,
  }
});

export default BookingConfirmedPage
