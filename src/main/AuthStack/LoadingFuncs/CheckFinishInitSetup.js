
export default function CheckFinishInitSetup (clientInfo, props) {

  console.log('clientDate: ', clientInfo)
  
  if(clientInfo) {
    const {initSetupFinished, TOSAgreed} = clientInfo
    if(initSetupFinished) {
      if(TOSAgreed) {
        props.navigation.navigate('App')
      } else {
        props.navigation.navigate('AgreeTermServices')
      }
    } else {
      props.navigation.navigate('CreateProfile')
    }
  } else {
    props.navigation.navigate('EmailValidate')
  }
}