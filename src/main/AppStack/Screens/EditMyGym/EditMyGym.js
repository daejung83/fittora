import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native'
import {
  Button,
} from 'react-native-elements'
import Carousel from 'react-native-snap-carousel'
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps'
import Logo from '../../../../assets/fittora_1024_1024.png'
import mapStyle from '../../../../config/mapStyle.json'
import GetGymsNear from '../../../../Backend/Gym/GetGymsNear'
import { material } from 'react-native-typography'
import UpdateMyGym from '../../../../Backend/Gym/UpdateMyGym'

const {width, height} = Dimensions.get('screen')


//TODO: Map Loading and goto your location
function EditMyGym(props) {
  console.log('EditMyGym: ', props)

  const initialRegion = {
    latitude: 40.107073,
    longitude: -88.243861,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  }

  const [gymID, setGymID] = useState(props.navigation.getParam('gymID', ''))
  const [gymList, setGymList] = useState([])
  const [region, setRegion] = useState(initialRegion)
  const [firstItemIndex, setFirstItemIndex] = useState(0)
  const [saving, setSaving] = useState(true)
  let _carousel = {}

  useEffect(() => {
    GetGymsNear(updateGymList)
  }, [])

  function updateGymList (list) {

    //TODO: if gymID exist set it to current gym
    let index = 0
    // if(gymID) {
    //   index = list.findIndex(gym => gym.placeID === gymID)
    // }

    setSaving(false)

    const newRegion = {
      latitude: list[index].latitude,
      longitude: list[index].longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }

    setGymID(list[index].placeID)
    setRegion(newRegion)
    setFirstItemIndex(index)

    setGymList(list)
  }

  function handleMarkerPressed (item) {
    const index = gymList.findIndex(gym => gym == item)
    const newRegion = {
      latitude: gymList[index].latitude,
      longitude: gymList[index].longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }

    setRegion(newRegion)
    setGymID(item.placeID)
    _carousel.snapToItem(index)
  }

  function handleSnapToItem (index) {
    console.log('index: ', index)

    const newRegion = {
      latitude: gymList[index].latitude,
      longitude: gymList[index].longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }
    setGymID(gymList[index].placeID)
    setRegion(newRegion)
  }

  function handleChooseGym () {
    setSaving(true)
    UpdateMyGym(gymID, finishedUpdatingGym)
  }

  function finishedUpdatingGym (done) {
    setSaving(false)
    if(done) {
      props.navigation.goBack()
    }
  }

  function _renderCarouselItems ({item, index}) {
    console.log('item: ', item)
    return (
      <View style={styles.overlayItem}>
        <Text numberOfLines={1} style={[material.titleWhite]}>{item.name}</Text>
        <Text numberOfLines={1} style={[material.body1White]}>{item.address}</Text>
        <Text numberOfLines={1} style={[material.captionWhite]}>{item.phoneNumber}</Text>

        <Text numberOfLines={1} style={[material.subheadingWhite, {color: 'orange'}]}>{item.gymMembershipType}</Text>
        <Text numberOfLines={1} style={[material.captionWhite, {color: 'pink'}]}>{item.gymPromo}</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <MapView 
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        customMapStyle={mapStyle}
        initialRegion={region}
        showsUserLocation
        showsMyLocationButton
        showsCompass
        region={region}
      >
        {gymList.map((item) => (
            <Marker 
              coordinate={{latitude: item.latitude, longitude: item.longitude}}
              onPress={() => handleMarkerPressed(item)}
              pinColor={gymID === item.placeID ? '#37C737' : 'orange'}
            />
        ))}
      </MapView>
      <View style={[styles.logoSize, styles.logo]}>
        <Image source={Logo} style={styles.logoSize} />
      </View>
      
      <View style={styles.overlay}>
        <Carousel
          ref={(c) => { _carousel = c; }}
          data={gymList}
          renderItem={_renderCarouselItems}
          sliderWidth={width}
          itemWidth={width * 0.8}
          loop
          
          onSnapToItem={handleSnapToItem}
          // enableMomentum
          firstItem={firstItemIndex}
          
        />
      </View>
      <View style={styles.footer}>
        
        <Button 
          title={'save'}
          buttonStyle={[styles.buttonSize, {backgroundColor: '#000'}]}
          onPress={handleChooseGym}
        />
        <Button 
          title={'cancel'}
          buttonStyle={[styles.buttonSize]}
          onPress={() => props.navigation.goBack()}
          loading={saving}
        />
      </View>
    </View>
  )
}



const LOGO_WIDTH = width * 0.15
const BUTTON_HEIGHT = height * 0.08

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }, 
  map: {
    flex: 1,
  },
  footer: {
    flexDirection: 'row',
    width: width,
    backgroundColor: 'black'
  },
  buttonSize: {
    width: width * 0.5,
    height: BUTTON_HEIGHT
  },
  logo: {
    position: 'absolute',
    bottom: BUTTON_HEIGHT - (LOGO_WIDTH * 0.5), 
    left: width * 0.5 - (LOGO_WIDTH * 0.5),
    zIndex: 2,
    backgroundColor: 'black',
    shadowColor: 'black',
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 3,
  },
  logoSize: {
    width: LOGO_WIDTH,
    height: LOGO_WIDTH,
  },
  overlay: {
    backgroundColor: 'transparent',
    width: width,
    height: 150,
    position: 'absolute',
    top: height * 0.1,
  }, 
  overlayItem: {
    borderWidth: 1,
    height: 150,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    padding: 15,
    borderTopLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: 'black',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 3,
  },
});

export default EditMyGym
