import React, {useEffect, useState} from 'react'
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  TouchableHighlight,
} from 'react-native'
import RNElements, {
  Image,
  Rating,
} from 'react-native-elements'
import { material } from 'react-native-typography'
import LinearGradient from 'react-native-linear-gradient'
import Carousel from 'react-native-snap-carousel'
import GetTrainersAtGym from '../../../../../Backend/Trainers/GetTrainersAtGym'
import { Icon } from 'native-base'

import STAR_IMAGE from '../../../../../assets/star.png'
import EmptyTrainerList from './EmptyTrainerList'

const {width, height} = Dimensions.get('screen')

function MyGymTrainers({props, gymID}) {
  let _carousel = {}

  const [trainerList, setTrainerList] = useState([])

  useEffect(() => {
    GetTrainersAtGym(gymID, handleUpdateTrainerList)
    
  }, [gymID])

  function handleUpdateTrainerList (list) {
    if(list) {
      setTrainerList(list)
    }
  }

  function handleTrainerPressed (trainerUID) {
    props.navigation.navigate('TrainerProfile', {trainerUID})
  }

  function _renderCarouselItems ({item, index}) {

    const {profilePics, firstName, lastName, bio, rank, fittora_profile, takingSessions,
      defaultRate, firstSessionIsFree, firstSessionRate, hasFirstSessionRate,
      numRated, rate, skills} = item
    const checkedPic = profilePics && profilePics[0] ? {uri: profilePics[0].downloadURL} : default_profile  
    const source = fittora_profile ? {uri: fittora_profile} : checkedPic

    const rateNumber = numRated ? numRated : 0
    const rating = rate ? rate : 5

    return (
      <TouchableHighlight onPress={() => handleTrainerPressed(item.uid)} >
        <View style={styles.carouselBox}>
          <Image 
            source={source}
            style={styles.profileImage}
            PlaceholderContent={<ActivityIndicator />}
          />

          <LinearGradient 
            colors={['transparent', 'black']}
            start={{x: 0, y: 0}}
            end={{x: 0, y: 0.5}}
            style={styles.overlay}
          />

          <View style={styles.textArea}>
            <View style={{flexDirection: 'row'}}>
              <View>
                <Text style={[material.titleWhite]}>{firstName}</Text>
                <Text style={[material.subheadingWhite, {lineHeight: 15}]}>{lastName}</Text>
              </View>
              <View style={styles.rightContainer}>
                <Rating 
                  imageSize={15}
                  type='custom'
                  readonly
                  startingValue={rating}
                  ratingBackgroundColor='white'
                  ratingImage={STAR_IMAGE}
                />
                {hasFirstSessionRate && firstSessionIsFree ? 
                <Text style={[material.captionWhite, {color: 'orange'}]}>First Session Free</Text> : null}
              </View>
            </View>
            <Text numberOfLines={2} style={[material.captionWhite]}>{bio}</Text>
          </View>
        </View>
      </TouchableHighlight>
    )
  }

  return (
    <View style={styles.container}>

      <Text style={[material.headlineWhite, styles.LeftMargin]}>Trainers</Text>
      <Text style={[material.captionWhite, styles.LeftMargin]}>Trainers at current gym</Text>

      <View style={styles.listContainer}>
        {trainerList.length > 0 ?
        <Carousel
          ref={(c) => { _carousel = c; }}
          data={trainerList}
          renderItem={_renderCarouselItems}
          sliderWidth={width}
          itemWidth={width * 0.6}
          offs
          loop
          inactiveSlideOpacity={0.5}
          inactiveSlideScale={0.75}
          // onSnapToItem={handleSnapToItem}
        />
        : <EmptyTrainerList props={props} />}
      </View>
    </View>
  )
}

const CONTAINER_HEIGHT = width * 0.85
const CARD_WIDTH = width * 0.6

const styles = StyleSheet.create({
  container: {
    width: width,   
    marginTop: 10, 
    
  },
  LeftMargin: {
    marginLeft: width * 0.2
  },
  listContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    // borderWidth: 1,
    // height: width,
    shadowColor: 'black',
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.7,
    shadowRadius: 2,
    elevation: 3,
  },
  carouselBox: {
    width: CARD_WIDTH,
    height: CONTAINER_HEIGHT,
    backgroundColor: 'transparent',
    overflow: 'hidden',
    // flexDirection: 'row',
    // alignItems: 'center',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  overlay: {
    position: 'absolute',
    width: CARD_WIDTH,
    height: CONTAINER_HEIGHT * 0.6,
    // opacity: 0.7,
    bottom: 0
  },
  profileImage: {
    width: CARD_WIDTH,
    height: width * 0.6,
    // opacity: 0.7
  },
  textArea: {
    // position: 'absolute',
    // bottom: 0,
    // backgroundColor: 'yellow',
    marginLeft: 10,
    marginRight: 10,
    width: CARD_WIDTH - 20,
    height: CONTAINER_HEIGHT * 0.2,
  }, 
  rightContainer: {
    flex: 1, 
    alignItems: 'flex-end', 
    backgroundColor: 'transparent',
    marginTop: 5
  },
});

export default MyGymTrainers
