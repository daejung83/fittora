import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  Modal,
} from 'react-native'
import Spinner from 'react-native-spinkit'
import { material } from 'react-native-typography'

function OverlayLoading({isLoading}) {
  return (
    <Modal
      visible={isLoading}
      animationType={'fade'}
      transparent={true}
    >
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FEA82F33'}}>
        <Spinner 
          type='ArcAlt'
          color='black'
        />
        <Text style={[material.button, {marginTop: 40}]}>Loading....</Text>
      </View>
    </Modal>
  )
}

export default OverlayLoading
