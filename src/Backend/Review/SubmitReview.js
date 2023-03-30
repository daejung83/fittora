import functions from '@react-native-firebase/functions'
import { showMessage } from 'react-native-flash-message'

export default function SubmitReview(params, finishedUpdating) {
  const func = functions().httpsCallable('SubmitRating')

  func(params)
  .then((result) => {
    if(result.data.type === 'failed') {
      finishedUpdating(false)
      showMessage({
        duration: 5000,
        type: 'danger',
        icon: 'danger',
        message: 'Error Submitting Review',
        description: result.data.message,
      })
    } else {
      finishedUpdating(true)
      showMessage({
        duration: 3000,
        type: 'info',
        icon: 'info',
        message: 'Thank you for reviewing your trainer!',
      })
    }
  })
  .catch((e) => {
    finishedUpdating(false)
    showMessage({
      duration: 5000,
      type: 'danger',
      icon: 'danger',
      message: 'Error Submitting Review',
      description: e.message,
    })
  })
}