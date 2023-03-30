import React, { Component } from 'react'
import { Text, View, StyleSheet, SafeAreaView, StatusBar } from 'react-native'
import FlashMessage from 'react-native-flash-message'

import MainStack from './route/MainStack';


const MyStatusBar = ({backgroundColor, ...props}) => (
  <View style={[{backgroundColor }]}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  </View>
);

export default class Index extends Component {
  render() {
  
    return (
      <>
        <MainStack />
        <FlashMessage position="top" />
      </>
    )
  }
}
