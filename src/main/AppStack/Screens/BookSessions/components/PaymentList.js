import React, {useEffect, useState} from 'react'
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableHighlight,
  Modal,
  Alert,
} from 'react-native'
import {
  Image,
  Button,
} from 'react-native-elements'
import {Icon} from 'native-base'
import LinearGradient from 'react-native-linear-gradient'
import Carousel from 'react-native-snap-carousel'
import { material } from 'react-native-typography'
import Spinner from 'react-native-spinkit'

import CHIP from '../../../../../assets/credit_card_chip.png'

import GetClientStripeData from '../../../../../Backend/Payment/GetClientStripeData'
import renderCreditCard from '../../../../../util/renderCreditCard'
import UpdateDefaultCard from '../../../../../Backend/Payment/UpdateDefaultCard'
import AddCardPayment from '../../../../../Backend/Payment/AddCardPayment'
import GetClientData from '../../../../../Backend/ClientData/GetClientData'

import { showMessage } from 'react-native-flash-message'
import OverlayLoading from '../../../../../components/OverlayLoading'
import randomColorGen from '../../../../../util/randomColorGen'

function PaymentList() {

  let _carousel = {}

  const [cards, setCards] = useState([])
  const [defaultCard, setDefaultCard] = useState('')  
  const [clientStripeID, setClientStripeID] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    GetClientStripeData(handleSetDefault, setCards, setClientStripeID)
  }, [])

  function handleItemDefault(id) {
    if(id && id !== defaultCard) {
      // alert('need to update')
      Alert.alert(
        'Set to Default',
        'Would you like to set this card to default payment?',
        [
          {text: 'YES', onPress: () => confirmItemDefault(id)},
          {text: 'NO', onPress: () => console.log('cancelled by user')}
        ],
        {cancelable: true}
      )
    }
  }

  function confirmItemDefault(id) {
    setIsLoading(true)
    UpdateDefaultCard(id, clientStripeID, handleSetDefault)
  }

  function handleSetDefault(card) {
    setIsLoading(false)
    if(card) {
      setDefaultCard(card)
    }
  }

  function handleAddCard(card) {
    setCards([card, ...cards])
    handleSetDefault(card.id)
  }

  function handleAddPayment() {
    // setIsLoading(true)
    GetClientData()
    .then((doc) => {
      AddCardPayment({}, doc.data(), handleAddCard)
    })
    .catch((e) => {
      showMessage({
        duration: 5000,
        type: 'danger',
        icon: 'danger',
        message: 'Error Getting Client Info',
        description: e.message,
      })
    })
    
  }

  function _renderCard ({item, index}) {

    // var ColorCode = 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')'
    const ColorCode = randomColorGen()

    // console.log('renderCard Item: ', item)
    const {brand, last4, id, exp_month, exp_year} = item

    return (
      <TouchableHighlight
        onPress={() => handleItemDefault(id)}
      >
        <LinearGradient 
          colors={[ColorCode, 'black']}
          start={{x: 0, y: 0}}
          end={{x: 0.5, y: 1}}
          style={styles.cardContainer}
        >
          {id === defaultCard ?
            <View style={styles.defaultIcon}>
              <Text style={[material.body1White]}>default</Text>
            </View>
          : null}
            <View style={styles.chipContainer}>
              <Image source={CHIP} style={styles.chip} />
            </View>
            <View style={styles.cardInfo}>
              <Text style={[material.body1White, {fontWeight: 'bold', marginBottom: 10}]}>...{last4}</Text>
              {renderCreditCard(brand)}
              <Text style={material.body1White}>{exp_month}/{exp_year}</Text>
            </View>
          
        </LinearGradient>
      </TouchableHighlight>
    )
  }

  return (
    <View style={styles.container}>
      {/* <Text>{defaultCard}</Text> */}
      <Text style={[material.headlineWhite, {alignSelf: 'flex-start'}]}>Payment List</Text>
      <Text style={[material.captionWhite, {alignSelf: 'flex-start', marginBottom: 15}]}>payment will run on default card</Text>
      <Carousel 
        ref={(c) => { _carousel = c; }}
        data={cards}
        renderItem={_renderCard}
        sliderWidth={width}
        itemWidth={CARD_WIDTH}
        // offs
        // loop
        inactiveSlideOpacity={0.5}
        inactiveSlideScale={0.75}
        layout='stack'
      />
      <Button 
        title={'Add Payment'}
        // style={{marginTop: 15}}
        icon={<Icon type='MaterialCommunityIcons' name='credit-card' style={{fontSize: 20, color: 'white', marginRight: 10}} />}
        containerStyle={[{marginTop: 15}, styles.shadow]}
        style={{color: 'black'}}
        buttonStyle={{backgroundColor: 'grey'}}
        onPress={handleAddPayment}
      />
      
      <OverlayLoading isLoading={isLoading} />
    </View>
  )
}

const {width, height} = Dimensions.get('screen')
const CARD_WIDTH = width * 0.8
const CARD_HEIGHT = width * 0.45

const styles = StyleSheet.create({
  container: {
    width: width * 0.8,
    alignItems: 'center',
    marginTop: 20,
    // height: height * 0.5,
  },
  cardContainer: {
    height: CARD_HEIGHT,
    // width: width * 0.75,
    // backgroundColor: 'grey',
    // borderWidth: 1,
    // borderColor: 'white',
    borderRadius: 10,
  },
  cardInfo: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    margin: 15,
  },
  chip: {
    width: 55,
    height: 30,
  },
  chipContainer: {
    position: 'absolute',
    left: 20,
    top: CARD_HEIGHT * 0.5,
  },
  defaultIcon: {
    // borderWidth: 1,
    width: 55,
    margin: 15,
    backgroundColor: 'green',
    padding: 5,
    borderRadius: 10,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 3,
  }
});

export default PaymentList
