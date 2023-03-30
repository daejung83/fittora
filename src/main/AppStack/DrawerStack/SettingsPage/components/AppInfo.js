import React from 'react'
import { 
  View, 
  Text, 
  StyleSheet,
  Dimensions,
  Platform,
} from 'react-native'

import {AppVersion, iosBuildNumber, buildNumber, live} from '../../../../../config/config'
import { material } from 'react-native-typography'

const AppInfo = () => {

  function testingVersion() {
    if(!live) {
      return (
        <View>
          <Text style={[material.display1, {color: 'red'}]}>TEST VERSION</Text>
        </View>
      )
    } else {
      return null
    }
  }
  return (
    <View style={styles.container}>
      <Text style={material.display1}>App Info</Text>
      <Text style={material.body2}>App Version: {AppVersion}.{Platform.OS === 'ios' ? iosBuildNumber : buildNumber}</Text>
      <Text style={material.body1}>Platform: {Platform.OS === 'ios' ? 'iOS' : 'Android'}</Text>
      {testingVersion()}
    </View>
  )
}

const {width, height} = Dimensions.get('screen')
const styles = StyleSheet.create({
  container: {
    // borderWidth: 1,
    width: width * 0.9,
    alignSelf: 'center',
    marginTop: 20,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#c1bfb5',
    borderRadius: 20,

    shadowColor: '#000',
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 3,
  }
});
export default AppInfo
