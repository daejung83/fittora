import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import {Button} from 'react-native-elements'

import RNRestart from 'react-native-restart'
import { material } from 'react-native-typography'


function SomethingWentWrong(props) {
  console.log('Something Props: ', props)
  const message = props.navigation.getParam('message', '')
  return (
    <View style={styles.container}>
      <Text style={[material.title, {color: 'red'}]}>Something Went Wrong</Text>
      {/* <Text>{message}</Text> */}
      <Text style={material.caption}>{message}</Text>
      <Button 
        title={'Restart'}
        raised
        containerStyle={{marginTop: 20}}
        onPress={() => RNRestart.Restart()}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SomethingWentWrong
