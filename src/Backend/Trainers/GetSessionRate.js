import functions from '@react-native-firebase/functions'
import { showMessage } from 'react-native-flash-message'

export default function GetSessionRate (params, updateRate) {
  const func = functions().httpsCallable('V2GetSessionCost')

  func(params) 
  .then((result) => {
    console.log('getSession result: ', result)
    if(result.data.type === 'failed') {
      showMessage({
        duration: 5000,
        type: 'danger',
        icon: 'danger',
        message: 'Error Getting Rate',
        description: result.data.message,
      })
      updateRate(false)
    } else {
      updateRate(true, result.data)
    }
  })
  .catch((e) => {
    showMessage({
      duration: 5000,
      type: 'danger',
      icon: 'danger',
      message: 'Error Getting Rate',
      description: e.message,
    })
    updateRate(false)
  })
}