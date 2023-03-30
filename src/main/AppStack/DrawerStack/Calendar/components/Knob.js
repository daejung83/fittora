import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { material } from 'react-native-typography';

const Knob = () => {
  return (
    <View style={styles.container}>
      <Text style={[material.caption, {fontSize: 10}]}>Full Calendar</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    // borderWidth: 1,
    // padding: ,
    paddingLeft: 5,
    paddingRight: 5,
    borderRadius: 10,
    backgroundColor: '#CBE1FCFF',
    marginTop: 2,

    shadowColor: 'black',
    shadowOffset: { width: 1.5, height: 1.5 },
    shadowOpacity: 0.7,
    shadowRadius: 2,
    elevation: 2,
  }
});

export default Knob