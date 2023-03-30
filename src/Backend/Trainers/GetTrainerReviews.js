import firestore from '@react-native-firebase/firestore'
import { showMessage } from 'react-native-flash-message'

export default function GetTrainerReviews (trainerUID, updateReviews) {

  const limit = 5
  
  firestore().collection('trainer').doc(trainerUID).collection('review')
  .orderBy('editedDate', 'desc').limit(limit).get()
  .then((query) => {
    const list = []

    query.forEach((review) => {
      list.push(review.data())
    })

    updateReviews(list)
  })
  .catch((e) => {
    showMessage({
      duration: 5000,
      type: 'danger',
      icon: 'danger',
      message: 'Error while getting reviews',
      description: e.message,
    })
  })
}