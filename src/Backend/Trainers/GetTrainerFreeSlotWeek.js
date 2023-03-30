import functions from '@react-native-firebase/functions'
import { showMessage } from 'react-native-flash-message'
import moment from 'moment'

export default function GetTrainerFreeSlotWeek(trainerUID, startOfWeek, updateData, finished) {

  const params = {
    trainerUID, startOfWeek: startOfWeek.format('MM-DD-YYYY')
  }
  
  console.log('startOfWeek: ', startOfWeek)
  
  const func = functions().httpsCallable('GetTrainerFreeSlotWeek')

  func(params)
  .then((result) => {
    
    if(result.data.type === 'failed') {
      showMessage({
        duration: 5000,
        type: 'danger',
        icon: 'danger',
        message: "Error Getting Trainer Free Slots",
        description: result.data.message,
      })
    } else {
      updateData(result.data.data)
    }
    finished()
  })
  .catch((e) => {
    finished()
    showMessage({
      duration: 5000,
      type: 'danger',
      icon: 'danger',
      message: 'Error Getting Trainer Free Slots',
      description: e.message,
    })
  })
}