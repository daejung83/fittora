import functions from '@react-native-firebase/functions'
import { showMessage } from 'react-native-flash-message'

export default function GetCurrentRating(params, updateReview, finishLoading) {

  const func = functions().httpsCallable('GetCurrentRating')

  func(params)
  .then((result) => {
    finishLoading()
    console.log('result from get current rating: ', result)
    if(result.data.type === 'fail') {
      showMessage({
        duration: 5000,
        icon: 'danger',
        type: 'danger',
        message: 'Error getting current review',
        description: result.data.message,
      })
    } else {
      if(result.data.data) {
        const {rating, review} = result.data.data
        updateReview(rating, review)
      }
    }
  })
  .catch((e) => {
    finishLoading()
    showMessage({
      duration: 5000,
      type: 'danger',
      icon: 'danger',
      message: 'Error getting current review',
      description: e.message,
    })
  })
}