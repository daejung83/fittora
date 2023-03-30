import React from 'react'
import {
  View, 
  Text, 
  StyleSheet,
  Dimensions,
  Linking,
} from 'react-native'
import {Image} from 'react-native-elements'
import {Icon} from 'native-base'
import LinearGradient from 'react-native-linear-gradient'

import LOGO from '../../assets/fittora_1024_1024.png'
import { showMessage } from 'react-native-flash-message'
import { material } from 'react-native-typography'

function NotAvailableArea() {

  function clickLink (url) {
    Linking.canOpenURL(url)
    .then((supported) => {
      if(supported) {
        Linking.openURL(url)
      } else {
        showMessage({
          duration: 5000,
          type: 'danger',
          icon: 'danger',
          message: 'Link is currently not supported',
        })
      }
    })
    .catch((e) => {
      showMessage({
        duration: 5000,
        type: 'danger',
        icon: 'danger',
        message: 'Error on Link',
        description: e.message,
      })
    })
  }

  return (
    <LinearGradient 
      colors={['#16001e', '#f7717d']}
      style={styles.container}
    >
      <View style={styles.logoContainer}>
        <Image 
          source={LOGO}
          style={styles.logo}
        />
      </View>
      <View style={styles.infoContainer}>
        <Text style={[material.title, {color: 'red', marginBottom: 10}]}>Not Available Area</Text>
        <Text style={material.caption}>
          Fittora is not available in your area yet.  
          Please follow us Facebook/ Instagram to see when your area becomes available.
        </Text>
        <View style={styles.iconContainer}>
          <Icon 
            onPress={()=> clickLink('https://www.facebook.com/Fittora')} 
            style={styles.icon} 
            type='FontAwesome' 
            name='facebook-square' 
          />
          <Icon 
            onPress={() => clickLink('https://www.instagram.com/fittoraapp')} 
            style={styles.icon} 
            type='FontAwesome' 
            name='instagram' 
          />
        </View>
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
  logoContainer: {
    shadowColor: '#000',
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 2,
  },
  logo: {
    width: width * 0.5,
    height: width * 0.5,
  },
  infoContainer: {
    width: width * 0.8,
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 25,
    paddingTop: 15,
    paddingBottom: 15,
    borderRadius: 50,

    shadowColor: '#000',
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 2,
  },
  iconContainer: {
    flexDirection: 'row',
    // marginTop: 20,
    // justifyContent: 'space-between',
  },
  icon: {
    margin: 10,
    fontSize: 40,
  }
});

export default NotAvailableArea
