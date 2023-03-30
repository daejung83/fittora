import React, {useEffect, useState} from 'react'
import { 
  View, 
  Text, 
  StyleSheet,
  Dimensions,
} from 'react-native'
import {Rating} from 'react-native-elements'
import STAR from '../../../../../assets/star.png'
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps'
import mapStyle from '../../../../../config/mapStyle.json'
import GetGymData from '../../../../../Backend/Gym/GetGymData'
import { material } from 'react-native-typography'

const Location = ({gymID}) => {

  const initialRegion = {
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  }

  const [gym, setGym] = useState({})
  const [loading, setLoading] = useState(true)
  const [region, setRegion] = useState(initialRegion)
  
  useEffect(() => {
    GetGymData(gymID, handleGymUpdate)
  }, [gymID])

  function handleGymUpdate (gym) {
    setLoading(false)
    const newRegion = {
      latitude: gym.latitude,
      longitude: gym.longitude,
      latitudeDelta: 0.018,
      longitudeDelta: 0.018,
    }
    setRegion(newRegion)
    setGym(gym)
  }

  return (
    <View style={styles.shadow}>
      <View style={styles.container}>
        <View pointerEvents='none' style={{flexDirection: 'row'}}>
          <MapView
            provider={PROVIDER_GOOGLE}
            style={[styles.map]}
            // showsMyLocationButton
            showsUserLocation
            initialRegion={region}
            region={region}
            customMapStyle={mapStyle}
          >
            <Marker 
              coordinate={region}
            /> 
          </MapView>
          <View style={styles.rightBox}>
            <Text numberOfLines={1} style={material.titleWhite}>{gym.name}</Text>
            
            <Text style={material.buttonWhite}>{gym.phoneNumber}</Text>
            {/* <Text>{gym.rating}</Text> */}
            <Rating 
              startingValue={gym.rating}
              // showRating
              fractions
              readonly
              imageSize={15}
              type='custom'
              ratingBackgroundColor='white'
              ratingImage={STAR}
            />
          </View>
        </View>
        <View style={styles.bottomBox}>
          <Text style={material.body2White}>{gym.address}</Text>
          <Text style={[material.body1White, {color: 'orange', marginBottom: 10}]}>{gym.gymMembershipType}</Text>
        </View>
      </View>
    </View>
  )
}

const {width, height} = Dimensions.get('screen')
const styles = StyleSheet.create({
  container: {
    // borderWidth: 1,
    width: width * 0.9,
    // height: height * 0.15,
    marginBottom: 20,
    backgroundColor: 'black',
    borderRadius: 30,
    overflow: 'hidden',

    
  },
  shadow: {
    shadowColor: 'white',
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 3,
  },
  map: {
    width: width * 0.4,
    height: height * 0.15
  }, 
  rightBox: {
    justifyContent: 'center',
    alignItems: 'center',
    // borderWidth: 1,
    width: width * 0.5
  },
  bottomBox: {
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default Location
