import React, {useEffect, useState} from 'react'
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native'
import {
  Button,
} from 'react-native-elements'
import {Icon} from 'native-base'
import LinearGradient from 'react-native-linear-gradient'
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps'
import mapStyle from '../../../../../config/mapStyle.json'
import { material } from 'react-native-typography'
import GetGymData from '../../../../../Backend/Gym/GetGymData.js'

function MyGym({gymID, props}) {

  console.log('MyGym: ', props)

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
    console.log('useEffect working')
    if(gymID) {
      setLoading(true)
      GetGymData(gymID, handleGymUpdate)
    }
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

  function handleGymEditPressed () {
    props.navigation.navigate('EditMyGym', {gymID})
  }

  function renderGymInfo () {
    if(Object.entries(gym).length > 0) {
      return (
        <View style={styles.leftRowBox}>
          <Text style={[material.body2]} numberOfLines={1}>{gym.name}</Text>
          <Text style={[material.body1]} numberOfLines={2}>{gym.address}</Text>
        </View>
      )
    } else {
      return (
        <View style={{justifyContent: 'center',}}>
          <Text style={material.headline}>Choose a Gym</Text>
        </View>
      )
    }
  }

  function Map () {
    if(loading) {
      return <View style={{marginTop: 100}} />
    }
    return (
      <View 
        // colors={['#C4FBFB', '#80BEFF']}
        // start={{x: 0.5, y: 0}}
        // end={{x: 1, y: 1}}
        style={[styles.container, styles.roundedCorders]}
      >
        <View style={[styles.mapContainer, styles.roundedCorders]} pointerEvents='none'>
          
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

          <Text style={[styles.mapOverlay, material.titleWhite]}>My Gym</Text>
        </View>
      </View>
    )
  }

  return (
    <View style={styles.mainContainer}>
      {Map()}
      <View style={[styles.bottomContentBox, styles.roundedCorders]}>
        <LinearGradient 
          colors={['white', 'grey']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          // style={[styles.bottomContentBox, styles.roundedCorders]}
          style={[styles.bottomGradientBox, styles.roundedCorders]}
        >
        <View style={styles.rowContainer}>
          {renderGymInfo()}

          <View style={{justifyContent: 'center'}}>
            <Button 
              icon={<Icon type={'MaterialIcons'} name={'edit'} style={{color: 'white'}} />}
              // style={{alignSelf: 'flex-end', marginRight: 40}} 
              onPress={handleGymEditPressed}
            />
          </View>
          
        </View>
        </LinearGradient>
      </View>
    </View>
  )
}

const {width, height} = Dimensions.get('screen')
const borderRadius = 20

const styles = StyleSheet.create({
  mainContainer: {
    overflow: 'visible',
    alignItems: 'center',
    marginBottom: 60,
  }, 
  container: {
    backgroundColor: 'white',
    marginTop: 50,
    height: 200,
    width: width * 0.9,
    alignItems: 'center',
    
    // overflow: 'visible',
    shadowColor: 'black',
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 3,
  },
  map: {
    height: 200,
    width: width * 0.9,
    opacity: 0.8,
  },
  mapContainer: {
    overflow: 'hidden',
  },
  mapOverlay: {
    position: 'absolute',
    left: 50,
    top: 10,
    textShadowColor: 'black',
    textShadowRadius: 3,
    textShadowOffset: {width: 3, height: 3},
  }, 
  bottomContentBox: {
    // backgroundColor: 'grey',
    alignItems: 'center',
    width: width * 0.7,
    height: 100,
    position: 'absolute',
    bottom: -40,
    shadowColor: 'black',
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 3,
  },
  bottomGradientBox: {
    width: width *0.7,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },  
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: width * 0.6,
    maxWidth: width * 0.6,
  },
  leftRowBox: {
    width: width * 0.4
  }, 
  roundedCorders: {
    borderTopRightRadius: borderRadius,
    borderTopLeftRadius: borderRadius,
    borderBottomLeftRadius: borderRadius,
    borderBottomRightRadius: borderRadius,
  },
});

export default MyGym
