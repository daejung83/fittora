import React, {useState, useEffect} from 'react'
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  ActivityIndicator,
} from 'react-native'
import {Rating, Image} from 'react-native-elements'
import LinearGradient from 'react-native-linear-gradient'
import Spinner from 'react-native-spinkit'
import { material } from 'react-native-typography'
import GetTrainerData from '../../../../Backend/Trainers/GetTrainerData'

import STAR from '../../../../assets/star.png'
import ScheduleLayout from './components/ScheduleLayout'
import TrainerInfo from './components/TrainerInfo'
import MyTrainerOptions from './components/MyTrainerOptions'

function TrainerProfile(props) {

  console.log('TrainerProfile: ', props)

  const [uid, setUID] = useState(props.navigation.getParam('trainerUID', ''))
  const [trainerInfo, setTrainerInfo] = useState(undefined)

  useEffect(() => {
    GetTrainerData(uid, setTrainerInfo)
  }, [uid])

  function _renderTrainerProfile () {
    

    if(trainerInfo !== undefined) {

      const {profilePics, firstName, lastName, bio, rank, fittora_profile, takingSessions,
        defaultRate, firstSessionIsFree, firstSessionRate, hasFirstSessionRate,
        numRated, rate, skills} = trainerInfo
      const checkedPic = profilePics && profilePics[0] ? {uri: profilePics[0].downloadURL} : default_profile  
      const source = fittora_profile ? {uri: fittora_profile} : checkedPic

      const rateNumber = numRated ? numRated : 0
      const rating = rate ? rate : 5

      return (
        <View style={styles.profileContainer}>
          <View style={styles.headerProfileContainer}>
            <View style={styles.profileImageContainer}>
              <Image 
                source={source} 
                style={styles.profileImage} 
                PlaceholderContent={<ActivityIndicator/>}
              />
            </View>
            
            <Text style={material.titleWhite}>{firstName}</Text>
            <Text style={[material.body1White, {lineHeight: 13, marginBottom: 10}]}>{lastName}</Text>
            <Rating 
              imageSize={15}
              type='custom'
              readonly
              startingValue={rating}
              ratingBackgroundColor='white'
              ratingImage={STAR}
            />
            <Text style={material.captionWhite}>rated: {rateNumber}</Text>
          </View>
          <ScheduleLayout props={props} trainerInfo={trainerInfo} />
          <MyTrainerOptions props={props} trainerInfo={trainerInfo} />
          <TrainerInfo trainerInfo={trainerInfo} />
        </View>
      )
    } else {
      return (
        <View>
          <Text style={material.headlineWhite}>Getting Trainer Info...</Text>
          <Spinner 
            isVisible
            type='9CubeGrid'
            color='#FEBD45'
            size={85}
            style={{alignSelf: 'center', marginTop: 30}}
          />
        </View>
      )
    }
  }

  return (
    <LinearGradient 
      colors={['white', 'black']} 
      // start={{x: 0, y: 0.2}}
      // end={{x: 0, y: 1}}
      style={{flex: 1}}
    >
      <ScrollView style={{flex: 1}}>
        <View style={styles.container}>
          <View style={styles.headerBox}>
            
          </View>
          <View style={styles.contentContainer}>
            {_renderTrainerProfile()}
          </View>
          <View style={{height: height * 0.3}} />
        </View>
      </ScrollView>
    </LinearGradient>
  )
}

const {width, height} = Dimensions.get('screen')

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    // height: height * 2
  },
  headerBox: {
    position: 'absolute',
    
    top: -(width * 0.8),
    height: width * 1.5,
    width: width,
    backgroundColor: 'black',
    borderBottomLeftRadius: 200,
    borderBottomRightRadius: 200,
    // zIndex: 1,
  },
  contentContainer: {
    // position: 'absolute',
    top: height * 0.1,
    minHeight: height,
  },
  profileContainer: {
    flex: 1,
    width: width,
  },
  profileImageContainer: {
    borderRadius: 200, 
    overflow: 'hidden',
  },  
  profileImage: {
    width: width * 0.25, 
    height: width * 0.25,
  },
  headerProfileContainer: {
    justifyContent: 'center', 
    alignItems: 'center',
    marginBottom: height * 0.05
  },
});

export default TrainerProfile
