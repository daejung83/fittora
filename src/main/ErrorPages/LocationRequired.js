import React, {useState} from 'react'
import {
  View, 
  Text, 
  StyleSheet,
  Dimensions,
} from 'react-native'
import {Button} from 'react-native-elements'
import {request, PERMISSIONS, openSettings} from 'react-native-permissions'
import LinearGradient from 'react-native-linear-gradient'
import { material } from 'react-native-typography'
import { Icon } from 'native-base'
import { showMessage } from 'react-native-flash-message'
import RNRestart from 'react-native-restart'


function LocationRequired(props) {

  const [isLoading, setIsLoading] = useState(false)

  function RequestLocation () {

    setIsLoading(true)

    const Rationale = {
      title: 'Location Request',
      message: 'Location is Required',
      buttonPositive: 'Yes',
      buttonNegative: 'No',
      buttonNeutral: 'Maybe'
    }

    request(PERMISSIONS.IOS.LOCATION_ALWAYS)
    .then((result) => {
      console.log('result: ', result)
      setIsLoading(false)
      RNRestart.Restart()
    })
    .catch((e) => {
      setIsLoading(false)
      console.log('Error: ', e.message)
      showMessage({
        duration: 5000,
        type: 'danger',
        icon: 'danger',
        message: 'Error Checking Permissions',
        description: e.message,
      })
    })
    // openSettings().catch((e) => console.log('Error: ', e.message))
  }

  return (
    <LinearGradient 
      colors={['#FFA720', '#605441']}
      style={styles.container}
    >
      <View style={styles.textContainer}>
        <Text style={[material.subheading, styles.textHeader]}>Location Permission Required</Text>
        <Text style={[material.caption]}>
          Fittora App requires your location because service is only 
          available in authorized locations. App also use your location 
          to find trainers/ gym round your location
        </Text>
      </View>
      <View style={{width: width * 0.7, padding: 20, borderRadius: 50, backgroundColor: '#FFC0CB80'}}>
        <Text style={[material.body1]}>Please open your settings and allow location services always for best result</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button 
          title={'Open Settings'}
          onPress={() => openSettings().catch(e => console.log('Error: ', e.message))}
          icon={<Icon type={'MaterialCommunityIcons'} name={'settings'} style={styles.icon} />}
          containerStyle={{marginBottom: 50,}}
          buttonStyle={{backgroundColor: 'grey'}}
          // style={{marginBottom: 50}}
          raised
          loading={isLoading}
        />

        <Button 
          title={'Check Location'}
          onPress={RequestLocation}
          raised
          containerStyle={{width: width * 0.8}}
          buttonStyle={{backgroundColor: 'orange'}}
          icon={<Icon type={'MaterialIcons'} name={'my-location'} style={styles.icon} />}
          loading={isLoading}
        />
        
      </View>
        
    </LinearGradient>
  )
}

const {width, height} = Dimensions.get('screen')
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  textContainer: {
    width: width * 0.8,
    alignItems: 'center',
    // borderWidth: 1,
    padding: 20,
    borderRadius: 30,
    backgroundColor: 'white',

    shadowColor: '#000',
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.6,
    shadowRadius: 2,
    elevation: 2,
  },
  textHeader: {
    marginBottom: 10, 
    color: 'red',
    
    textShadowColor: '#919191FF',
    textShadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.3,
    textShadowRadius: 0,
    elevation: 1,
  },
  buttonContainer: {

  },
  icon: {
    color: 'white',
    fontSize: 20,
    marginRight: 5,
  }
});

export default LocationRequired
