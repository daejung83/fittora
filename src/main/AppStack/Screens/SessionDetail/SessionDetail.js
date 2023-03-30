import React, {useState} from 'react'
import { 
  View, 
  Text, 
  StyleSheet,
  Dimensions,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native'
import {Button} from 'react-native-elements'
import moment from 'moment'
import LinearGradient from 'react-native-linear-gradient'
import { material } from 'react-native-typography'
import Location from './components/Location'
import Time from './components/Time'
import Trainer from './components/Trainer'
import Cost from './components/Cost'
import CancelSessionRequest from '../../../../Backend/Sessions/CancelSessionRequest'
import OverlayLoading from '../../../../components/OverlayLoading'

const SessionDetail = (props) => {

  const session = props.navigation.getParam('session', {})
  const [isLoading, setIsLoading] = useState(false)

  const {clientInfo, clientUID, gymID, rate, gymFee, trainerRate, sessionID, status, timestamp, trainerInfo} = session

  function confirmCancelSession() {
    setIsLoading(true)
    CancelSessionRequest(session, props, () => setIsLoading(false))
  }

  function handleCancelSession() {
    Alert.alert(
      'Cancel Session',
      'Proceed with cancellation',
      [
        {text: 'OK', onPress: confirmCancelSession},
        {text: 'CANCEL', onPress: () => console.log('nothing todo')}
      ],
      {cancelable: true}
    )
  }

  console.log('session: ', session)
  return (
    <LinearGradient 
      colors={['orange', 'grey']}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      style={styles.container}
    >
      <SafeAreaView style={{flex: 1}}>
        <ScrollView style={{flex: 1}}>
          <Text style={[material.display1, styles.title]}>Session Detail</Text>

          <Trainer trainerInfo={trainerInfo} />
          <Time timestamp={timestamp} status={status} />
          <Location gymID={gymID} />

          <Cost rate={rate} gymFee={gymFee} trainerRate={trainerRate} />
        </ScrollView>
        <View style={{marginTop: 10, marginBottom: 20}}>
          <Button 
            title={'CANCEL SESSION'}
            buttonStyle={{backgroundColor: '#FB3C3CFF'}}
            raised
            onPress={handleCancelSession}
            loading={isLoading}
          />
        </View>
      </SafeAreaView>
      
      <OverlayLoading isLoading={isLoading} />
    </LinearGradient>
  )
}

const {width, height} = Dimensions.get('screen')
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    alignSelf: 'center',
    width: width,
    // width: width * 0.9,
    // padding: width * 0.1,
    overflow: 'visible'
  },
  title: {
    alignSelf: 'center',
    marginBottom: 20,
    color: 'white',
  },
});

export default SessionDetail
