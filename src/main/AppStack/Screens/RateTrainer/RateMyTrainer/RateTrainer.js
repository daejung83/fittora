import React, {useState, useEffect} from 'react'
import { 
  View, 
  Text, 
  Dimensions,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native'
import {Rating, Button} from 'react-native-elements'
import StepIndicator from 'react-native-step-indicator'
import LinearGradient from 'react-native-linear-gradient'
import { material } from 'react-native-typography'
import GetCurrentRating from '../../../../../Backend/Review/GetCurrentRating'
import OverlayLoading from '../../../../../components/OverlayLoading'
import SubmitReview from '../../../../../Backend/Review/SubmitReview'

const selectedColor = '#61c9a8'
const unselectedColor = 'grey'

const ratingLabel = ['Terrible', 'Bad', 'OK', 'Good', 'Great'];
const customStyles = {
  stepIndicatorSize: 25,
  currentStepIndicatorSize:30,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: selectedColor,
  stepStrokeWidth: 3,
  stepStrokeFinishedColor: selectedColor,
  stepStrokeUnFinishedColor: '#aaaaaa',
  separatorFinishedColor: selectedColor,
  separatorUnFinishedColor: '#aaaaaa',
  stepIndicatorFinishedColor: selectedColor,
  stepIndicatorUnFinishedColor: '#ffffff',
  stepIndicatorCurrentColor: '#ffffff',
  stepIndicatorLabelFontSize: 13,
  currentStepIndicatorLabelFontSize: 13,
  stepIndicatorLabelCurrentColor: selectedColor,
  stepIndicatorLabelFinishedColor: '#ffffff',
  stepIndicatorLabelUnFinishedColor: '#aaaaaa',
  labelColor: '#999999',
  labelSize: 13,
  currentStepLabelColor: selectedColor
}

const RateTrainer = (props) => {

  const [isLoading, setIsLoading] = useState(false)
  const [inputBackColor, setInputBackColor] = useState(unselectedColor)
  const [rating, setRating] = useState(5)
  const [review, setReview] = useState('')
  const [personalityRating, setPersonalityRating] = useState(5)
  const [knowledgeRating, setKnowledgeRating] = useState(5)

  const trainerInfo = props.navigation.getParam('trainerInfo', {})

  useEffect(() => {
    setIsLoading(true)
    const params = {
      trainerID: trainerInfo.uid
    }
    GetCurrentRating(params, updateReview, () => setIsLoading(false))
  }, [])

  function updateReview(rate, reviewMessage) {
    setRating(rate)
    setReview(reviewMessage)
  }

  function handleSubmit() {
    setIsLoading(true)
    const params = {
      trainerID: trainerInfo.uid,
      rating: rating,
      review: review,
    }
    SubmitReview(params, handleFinishSubmit)
  }

  function handleFinishSubmit(state) {
    setIsLoading(false)
    if(state) {
      props.navigation.navigate('Home')
    }
  }

  function _toggleInput () {
    setInputBackColor(inputBackColor === selectedColor ? unselectedColor: selectedColor)
  }

  return (
    <LinearGradient 
      colors={['#FFBD33BF', 'transparent']}
      style={styles.container}
    >
      <KeyboardAvoidingView 
        behavior={'height'}
        style={styles.container}
      >
      <View style={styles.infoContainer}>
        <Text style={[material.title, styles.textShadow]}>Rate Your Trainer!</Text>
        <Text style={[material.caption, {marginTop: 15, textAlign: 'center'}]}>Your review will help other users with their experience and keep quality of the trainers.</Text>
      </View>
      <View>
        <View style={[styles.inputContainer, {backgroundColor: inputBackColor}]}>
          <TextInput 
            style={styles.input}
            numberOfLines={5}
            multiline
            maxLength={500}
            placeholder={'write your first review!'}
            onFocus={_toggleInput}
            onBlur={_toggleInput}
            onChangeText={setReview}
            value={review}
          />
          <Text style={[material.caption, {alignSelf: 'flex-end', marginRight: 20, marginTop: 5,}]}>{review.length} / 500</Text>
        </View>
        <View style={styles.reviewListContainer}>
          <Text style={[ material.subheading, styles.rateTitle]}>Rating</Text>
        
          <View style={{width: width * 0.9}}>
            <StepIndicator 
              customStyles={customStyles}
              currentPosition={rating - 1}
              labels={ratingLabel}
              onPress={(position) => setRating(position + 1)}
            />
          </View>
        </View>
      </View>
      
      </KeyboardAvoidingView>
      <Button 
        title={'Submit'}
        buttonStyle={styles.submitButton}
        containerStyle={{marginBottom: 40}}
        raised
        onPress={handleSubmit}
        loading={isLoading}
      />
      <OverlayLoading isLoading={isLoading} />
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
  infoContainer: {
    width: width * 0.8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputContainer: {
    // borderWidth: 1,
    alignItems: 'center',
    padding: 10,
    borderRadius: 15,
    // backgroundColor: inputBackColor,
    shadowColor: 'black',
    shadowOffset: {width: 3, height: 3},
    shadowOpacity: 0.7,
    shadowRadius: 3,
    elevation: 3
  },
  input: {
    // borderWidth: 1,
    width: width * 0.8,
    minHeight: 120,
    backgroundColor: '#f8f3edff',
    padding: 5,
    
    // textShadowColor: 'black',
    // textShadowOffset: {width: 1, height: 1},
    // textShadowRadius: 2,
    // shadowOpacity: 0.7,
    // elevation: 1,
  },
  reviewListContainer: {
    // borderWidth: 1,
    // width: width * 0.8,
    marginTop: 20,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    padding: 15,
  },
  rateTitle: {
    alignSelf: 'flex-start', 
    marginLeft: 25, 
    marginBottom: 5,
    
    textShadowColor: 'black',
    textShadowOffset: {width: 2, height: 2},
    textShadowRadius: 3,
    shadowOpacity: 0.1,
    elevation: 1,
  }, 
  textShadow: {
    textShadowColor: 'black',
    textShadowOffset: {width: 2, height: 2},
    textShadowRadius: 3,
    shadowOpacity: 0.1,
    elevation: 1
  },
  submitButton: {
    width: width * 0.8,
    backgroundColor: selectedColor
  }
});

export default RateTrainer
