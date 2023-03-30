import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { material } from 'react-native-typography';

const EmptyDate = () => {
  
  return (
    <View style={styles.container}>
      <Text style={material.subheading}>Empty</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 15,
    // borderWidth: 1,
  }
});

export default EmptyDate
