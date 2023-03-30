import functions from '@react-native-firebase/functions'
import {live} from '../../config/config'
import { showMessage } from 'react-native-flash-message'

export default function CancelSessionRequest(params, props, finishLoading, itIsCalScreen) {
  params['testing'] = !live

  const func = functions().httpsCallable('V2cancelSessionClient')

  func(params)
  .then((result) => {
    finishLoading()
    if(result.data.type === 'failed') {
      showMessage({
        duration: 5000,
        type: 'danger',
        icon: 'danger',
        message: 'Cancel Session Error',
        description: result.data.message,
      })
    } else {
      showMessage({
        duration: 3000,
        type: 'info',
        icon: 'info',
        message: 'Session Cancelled',
      })
      if(!itIsCalScreen) {
        props.navigation.navigate('App')
      } 
      
    }
  })
  .catch((e) => {
    finishLoading()
    showMessage({
      duration: 5000,
      type: 'danger',
      icon: 'danger',
      message: 'Cancel Session Error',
      description: e.message,
    })
  })
}