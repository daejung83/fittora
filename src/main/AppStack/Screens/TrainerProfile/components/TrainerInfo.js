import React, {useState, useEffect} from 'react'
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Modal,
  ActivityIndicator,
  TouchableHighlight,
} from 'react-native'
import {
  Divider,
  Image,
  Rating,
} from 'react-native-elements'
import { material } from 'react-native-typography'

import LangList from '../../../../../config/LangList'
import ProfileSwiper from './ProfileSwiper'
import GetTrainerReviews from '../../../../../Backend/Trainers/GetTrainerReviews'

import STAR from '../../../../../assets/star.png'

function TrainerInfo({trainerInfo}) {

  const [imageViewing, setImageViewing] = useState(false)
  const [reviews, setReviews] = useState([])

  const {bio, skills, credentials, languages, profilePics} = trainerInfo

  console.log('trainerInfo: ', trainerInfo)

  useEffect(() => {
    GetTrainerReviews(trainerInfo.uid, setReviews)
  }, [trainerInfo])

  function _renderSkills() {
    return (
      <View style={styles.flexRow}>
        {skills.map((item, index) => {
          // console.log('item skills: ', item)
          return (
            <View key={index} style={styles.skillsItem} >
              <Text style={material.body1White}>{item}</Text>
            </View>
          )
        })}
      </View>
    )
  }

  function _renderLanguage() {
    return (
      <View style={styles.flexRow}>
        {languages.map((item, index) => {
          // console.log('Lang: ', LangList[item])
          return (
            <View key={index} style={styles.skillsItem}>
              <Text style={material.body1White}>{LangList[item].name}</Text>
            </View>
          )
        })}
      </View>
    )
  }

  function _renderImages() {
    return (
      <View style={styles.flexRow}>
        {profilePics.map((item, index) => {
          console.log('image: ', item)
          return (
            <TouchableHighlight onPress={() => setImageViewing(true)}>
              <View key={index} style={styles.ImageContainer}>
                <Image 
                  source={{uri: item.downloadURL}}
                  style={styles.image}
                  PlaceholderContent={<ActivityIndicator />}
                />
              </View>
            </TouchableHighlight>
          )
        })}
      </View>
    )
  }

  function _renderReviews() {

    return (
      <View>
        {reviews.map((item, index) => {
          return (
            <View key={index} style={{marginTop: 10,}}>
              <Text style={material.body1White}>{item.review ? item.review : 'No comment'}</Text>
              <Rating 
                imageSize={15}
                readonly
                startingValue={item.rating}
                type='custom'
                ratingBackgroundColor='white'
                ratingImage={STAR}
                style={{alignSelf: 'flex-start', marginTop: 5}}
              />
            </View>
          )
        })}
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Text style={[material.display1White, styles.header]}>Trainer Info</Text>
      <View style={styles.infoItemContainer}>
        <Text style={material.titleWhite}>Profile Pics</Text>
        <Divider />
        {_renderImages()}
      </View>

      <View style={styles.infoItemContainer}>
        <Text style={material.titleWhite}>Languages</Text>
        <Divider />
        {_renderLanguage()}
      </View>

      <View style={styles.infoItemContainer}>
        <Text style={material.titleWhite}>Skills</Text>
        <Divider />
        {_renderSkills()}
      </View>

      <View style={styles.infoItemContainer}>
        <Text style={material.titleWhite}>Bio</Text>
        <Divider />
        <Text style={material.body1White}>{bio}</Text>
      </View>

      <View style={styles.infoItemContainer}>
        <Text style={material.titleWhite}>Credentials</Text>
        <Divider />
        <Text style={material.body1White}>{credentials}</Text>
      </View>

      <View style={styles.infoItemContainer}>
        <Text style={material.titleWhite}>Reviews</Text>
        <Divider />
        {reviews.length > 0 ? _renderReviews() : <Text style={[material.body1White, {marginTop: 10}]}>No Reviews</Text>}
      </View>

      <Modal 
        visible={imageViewing}
        animationType='fade'
        transparent={false}
      >
        <ProfileSwiper profilePics={profilePics} closeWindow={() => setImageViewing(false)} />
      </Modal>
    </View>
  )
}

const {width, height} = Dimensions.get('screen')

const styles = StyleSheet.create({
  container: {
    width: width * 0.9,
    alignSelf: 'center',
    // borderWidth: 1,
    marginTop: 20,
  },
  header: {
    marginLeft: 10, 
    paddingLeft:30,
    paddingRight:30,
    textShadowColor:'black',
    textShadowOffset: {width: 2, height: 2},
    textShadowRadius: 3,
    elevation: 2
  },  
  infoItemContainer: {
    // borderWidth: 1,
    padding: 15,
    borderRadius: 20,
    backgroundColor: 'black',
    marginTop: 20,

    shadowColor: 'black',
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.7,
    shadowRadius: 2,
    elevation: 3,
  },
  flexRow: {
    flexDirection: 'row', 
    flexWrap: 'wrap',
    marginTop: 10,
  },
  skillsItem: {
    // borderWidth: 1, 
    // borderColor: 'white',
    backgroundColor: '#FEA82F',
    padding: 5,
    marginRight: 10,
    marginBottom: 10,
    borderRadius: 10,

    shadowColor: 'grey',
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.7,
    shadowRadius: 2,
    elevation: 3,
  },
  image: {
    width: width * 0.2,
    height: width * 0.2,
  },
  ImageContainer: {
    marginRight: 10,
    marginBottom: 10,
    borderRadius: 5,
    overflow: 'hidden',
  }
});

export default TrainerInfo