import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  ActivityIndicator,
} from 'react-native'
import {
  Button,
  Image,
} from 'react-native-elements'
import LinearGradient from 'react-native-linear-gradient'
import moment from 'moment'
import { material } from 'react-native-typography'
import { Icon } from 'native-base'
import GetClientStripeData from '../../../../Backend/Payment/GetClientStripeData'
import PaymentList from './components/PaymentList'
import SendBookingRequest from '../../../../Backend/Sessions/SendBookingRequest'
import OverlayLoading from '../../../../components/OverlayLoading'
import CancellationPolicy from './components/CancellationPolicy'

function BookSessions(props) {
  console.log('Booking Screen: ', props)
  const [bookingList, setBookingList] = useState(props.navigation.getParam('bookingList', {}))
  const [isLoading, setIsLoading] = useState(false)

  const trainerInfo = props.navigation.getParam('trainerInfo', {})
  const rateSet = props.navigation.getParam('rateSet', {})

  const {profilePics, firstName, lastName, bio, rank, fittora_profile, takingSessions,
    defaultRate, firstSessionIsFree, firstSessionRate, hasFirstSessionRate,
    numRated, rate, skills} = trainerInfo
  const checkedPic = profilePics && profilePics[0] ? {uri: profilePics[0].downloadURL} : default_profile  
  const source = fittora_profile ? {uri: fittora_profile} : checkedPic

  const rateNumber = numRated ? numRated : 0
  const rating = rate ? rate : 5

  function handleDelete(key) {
    setBookingList(bookingList => {
      return bookingList.filter((item) => {
        return item.key !== key
      })
    })
  }

  function handleBookSessions() {
    
    setIsLoading(true)

    const params = {
      bookingList, rateSet,
      trainerInfo, props
    }

    SendBookingRequest(params, handleFinishedBooking)
  }

  function handleFinishedBooking() {
    setIsLoading(false)
  }

  function _renderItems () {

    if(bookingList.length < 1) {
      return (
        <>
          <Text style={[material.display1White, {marginBottom: 20}]}>Session List</Text>
          <View style={styles.emptySessionsContainer}>
            <Text style={material.display1White}>Empty</Text>
            <Text style={material.subheadingWhite}>Session request queue is empty</Text>
          </View>
        </>
      )
    }
    return (
      <View>
        <Text style={[material.display1White, {marginBottom: 0}]}>Session Queue</Text>
        <Text style={[material.titleWhite, {marginBottom: 20, marginLeft: 5}]}>Please Review Requests</Text>
        {bookingList.map((item, index) => {
          console.log('item: ', item)

          const {key, day, hour, startOfWeek, time} = item
          const rate = index === 0 ? rateSet.rate : rateSet.defaultRate

          return (
            <View key={item.key} style={styles.itemContainer}>
              <View>
                <Text style={material.headlineWhite}>{time.format('MMM DD YY ddd')}</Text>
                <Text style={material.subheadingWhite}>{time.format('h:mm a')}</Text>
                <Text style={material.captionWhite}>{time.fromNow()}</Text>
              </View>
              <View style={{justifyContent: 'center',}}>
              <Text style={[material.titleWhite, styles.rate, rate === 0 ? {color: 'pink'} : null]}>{rate !== 0 ? '$' : ''}{rate === 0 ? 'FREE' : rate}</Text>
                <Button 
                  // icon={<Icon type='MaterialCommunityIcons' name='cancel' style={{color: 'white', fontSize: 20}}/>}
                  title={'delete'}
                  buttonStyle={styles.cancelButton}
                  onPress={() => {
                    handleDelete(key)
                  }}
                />
              </View>
            </View>
          )
        })}
      </View>
    )
  }

  return (
    <LinearGradient 
      colors={['grey', 'black']}
      style={{flex: 1}}
    >
      <ScrollView style={{flex: 1}} >
        <View style={styles.headerBox }/>
        <View style={styles.container}>
          
          <View style={styles.contentContainer}>
            <Text style={[material.titleWhite, {marginTop: 100, alignSelf: 'center'}]}>Request List</Text>

            <View style={styles.trainerInfoContainer}>
              <View style={styles.profileImageContainer}>
                <Image 
                  source={source}
                  PlaceholderContent={<ActivityIndicator />}
                  style={styles.profileImage}
                />
              </View>
              <Text style={material.titleWhite}>{firstName}</Text>
              <Text style={[material.body1White, {lineHeight: 13, marginBottom: 10}]}>{lastName}</Text>
            </View>

            <View style={styles.listContainer}>
              {_renderItems()}
            </View>

            <CancellationPolicy />

            <PaymentList />
          </View>
        </View>
      </ScrollView>
      <View style={styles.bookButton}>
        <Button 
          title={'BOOK SESSIONS'}
          // style={{flex: 1}}
          onPress={handleBookSessions}
          ViewComponent={LinearGradient}
          linearGradientProps={{
            colors: ['black', '#FCD34E'],
            start: {x: 0.4, y: -0.2},
            end: {x: 1, y: 2}
          }}
        />
      </View>
      
      <OverlayLoading isLoading={isLoading} />
    </LinearGradient>
  )
}

const {width, height} = Dimensions.get('screen')

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    // borderWidth: 1
  },
  headerBox: {
    position: 'absolute',
    
    top: -(width * 0.7),
    height: width * 1.6,
    width: width,
    backgroundColor: 'black',
    // borderTopLeftRadius: 200,
    // borderBottomLeftRadius: 200,
    borderBottomRightRadius: 200,
    // zIndex: 1,
  },
  contentContainer: {
    // flex: 1,
    // position: 'absolute',
    // top: 0,
    top: -(height * 0.05),
    // borderWidth: 1,
  },
  trainerInfoContainer: {
    // borderWidth: 1,
    // borderColor: 'white',
    marginTop: height * 0.03,
    alignItems: 'center',
  },
  profileImage: {
    width: width * 0.25,
    height: width * 0.25,
  },
  profileImageContainer: {
    borderRadius: 200, 
    overflow: 'hidden',
  },
  listContainer: {
    width: width * 0.8,
    alignSelf: 'center',
    // height: height * 0.5
    // borderWidth: 1,
  },  
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    width: width * 0.8,
    backgroundColor: '#2A2E42FF',
    padding: 10,
    marginBottom: 10,
    // borderRadius: 20,
    borderBottomLeftRadius: 20,
    borderTopRightRadius: 20,

    shadowColor: 'black',
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.7,
    shadowRadius: 2,
    elevation: 3,
  },
  cancelButton: {
    backgroundColor: '#FF9898FF',
    borderRadius: 100,
    shadowColor: 'white',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.6,
    shadowRadius: 2,
    elevation: 1,
  },
  emptySessionsContainer: {
    width: width * 0.8,
    backgroundColor: '#F88C8CB3',
    height: height * 0.1,
    marginBottom: 10,
    // borderRadius: 20,
    borderBottomLeftRadius: 20,
    borderTopRightRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',

    shadowColor: 'black',
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.7,
    shadowRadius: 2,
    elevation: 3,
  },
  rate: {
    marginBottom: 5
  },  
  bookButton: {
    marginBottom: 20,
    marginTop: 10,
    width: width * 0.8,
    alignSelf: 'center',
  }
});

export default BookSessions
