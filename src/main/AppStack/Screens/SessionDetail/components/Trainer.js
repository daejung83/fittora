import React from 'react'
import { 
  View, 
  Text, 
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from 'react-native'
import {Image, Rating} from 'react-native-elements'
import STAR from '../../../../../assets/star.png'
import { material } from 'react-native-typography'

const Trainer = ({trainerInfo}) => {
  console.log('trainerInfo: ', trainerInfo)

  const {profilePics, firstName, lastName, bio, rank, fittora_profile, takingSessions,
    defaultRate, firstSessionIsFree, firstSessionRate, hasFirstSessionRate,
    numRated, rate, skills} = trainerInfo
  const checkedPic = profilePics && profilePics[0] ? {uri: profilePics[0].downloadURL} : default_profile  
  const source = fittora_profile ? {uri: fittora_profile} : checkedPic

  const rateNumber = numRated ? numRated : 0
  const rating = rate ? rate : 5

  return (
    <View style={styles.container}>
      <Image 
        source={source}
        style={styles.profileImage}
        PlaceholderContent={<ActivityIndicator />}
      />
      <View style={{justifyContent: 'center', alignItems: 'center', width: width * 0.6}}>
        <Text style={material.titleWhite}>{firstName}</Text>
        <Text style={material.captionWhite}>{lastName}</Text>
        <Rating 
          imageSize={15}
          type='custom'
          readonly
          startingValue={rating}
          ratingBackgroundColor='white'
          ratingImage={STAR}
        />
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
    marginBottom: 10,
    flexDirection: 'row',
    backgroundColor: 'black',
    borderRadius: 30,
    overflow: 'hidden',
  },
  profileImage: {
    width: width * 0.25,
    height: width * 0.25,
    // margin: 20
  }
});

export default Trainer
