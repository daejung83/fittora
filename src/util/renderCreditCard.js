import React from 'react'
import {Image, Text, StyleSheet, Dimensions} from 'react-native'
import Visa from '../assets/creditcards/visa.png'
import AmericanExpress from '../assets/creditcards/amex.png'
import DinersClub from '../assets/creditcards/diners.png'
import Discover from '../assets/creditcards/discover.png'
import JCB from '../assets/creditcards/jcb.png'
import MasterCard from '../assets/creditcards/mastercard.png'
import { material } from 'react-native-typography'

export default function renderCreditCard(card) {
  if(card === 'Visa') {
    return <Image style={styles.cardImage} source={Visa} />
  } else if(card === 'American Express') {
    return <Image style={styles.cardImage} source={AmericanExpress} />
  } else if(card === 'Diners Club') {
    return <Image style={styles.cardImage} source={DinersClub} />
  } else if(card === 'Discover') {
    return <Image style={styles.cardImage} source={Discover} />
  } else if(card === 'JCB') {
    return <Image style={styles.cardImage} source={JCB} />
  } else if(card === 'MasterCard') {
    return <Image style={styles.cardImage} source={MasterCard} />
  } else {
    return <Text style={material.body1White}>{card}</Text>
  } 
}

const {width, height} = Dimensions.get('screen')

const styles = StyleSheet.create({
  cardImage: {
    width: width * 0.12,
    height: height * 0.03,
  }  
});