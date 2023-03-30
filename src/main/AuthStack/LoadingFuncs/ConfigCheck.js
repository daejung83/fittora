import firestore from '@react-native-firebase/firestore'
import {AppVersion} from '../../../config/config'

export default async function ConfigCheck (props, callback) {
  // console.log('Getting Config')
  firestore().collection('settings').doc('configs').get()
  .then((result) => {
    if(!result.data().ServerOnline) {
      props.navigation.navigate('SomethingWentWrong', {message: 'Server is Offline'})
    } else if(result.data().clientLowestSupportVersion <= AppVersion) {
      // this.props.navigation.navigate('CheckAuth')
      // Call Back
      callback()
    } else {
      props.navigation.navigate('UpdateRequired')
    }
  })
  .catch((e) => {
    //something went wrong here
    props.navigation.navigate('SomethingWentWrong', {message: e.message})
  })
}