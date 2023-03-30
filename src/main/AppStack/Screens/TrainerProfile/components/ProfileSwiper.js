import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableHighlight,
} from 'react-native'
import {
  Image,
} from 'react-native-elements'
import Swiper from 'react-native-swiper'

function ProfileSwiper({profilePics, closeWindow}) {
  return (
    <View style={styles.container}>
      <Text onPress={closeWindow}>Swiper</Text>
      <Swiper
        showsButtons
        bounces
        // style={{flex: 1}}
      >
        {profilePics.map((item, index) => {
          return (
            <TouchableHighlight onPress={closeWindow}>
              <View style={styles.imageContainer}>
                <Image 
                  source={{uri: item.downloadURL}}
                  style={styles.image}
                  resizeMode={'contain'}
                />
              </View>
            </TouchableHighlight>
          )
        })}
      </Swiper>
    </View>
  )
}

const {width, height} = Dimensions.get('screen')

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'grey',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    flex: 1,
    width: width,
    height: height,
    
  },
  imageContainer: {
    flex: 1,
  }
});

export default ProfileSwiper
