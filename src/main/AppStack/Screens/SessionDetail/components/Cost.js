import React from 'react'
import { 
  View, 
  Text, 
  StyleSheet,
  Dimensions,
} from 'react-native'
import {Divider} from 'react-native-elements'
import { material } from 'react-native-typography'

const Cost = ({rate, gymFee, trainerRate}) => {
  const gymCost = gymFee ? gymFee : 0
  const platformFee = rate - gymCost - trainerRate

  function _renderMoneyCost(cost) {
    return cost.toFixed(2)
  }

  function _renderItem(title, cost) {
    return (
      <>
        <Divider />
        <View style={styles.itemContainer}>
          
          <Text style={material.captionWhite}>{title}</Text>
          <Text style={material.captionWhite}>${_renderMoneyCost(cost)}</Text>
        </View>
      </>
    )
  }

  function _renderTotal(title, cost) {
    return (
      <>
        <Divider />
        <View style={styles.itemContainer}>
          
          <Text style={material.titleWhite}>{title}</Text>
          <Text style={material.body1White}>${_renderMoneyCost(cost)}</Text>
        </View>
      </>
    )
  }

  return (
    <View style={styles.container}>
      <Text style={material.headlineWhite}>Rate detail</Text>
      {_renderItem('trainer rate', trainerRate)}
      {_renderItem('gym fee', gymCost)}
      {_renderItem('platform fee', platformFee)}
      {_renderTotal('rate', rate)}
    </View>
  )
}

const {width, height} = Dimensions.get('screen')
const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    width: width * 0.9,
    // height: 200,
    padding: 20,
    borderRadius: 30,
    backgroundColor: 'black',

    shadowColor: 'white',
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.7,
    shadowRadius: 2,
    elevation: 3,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default Cost
