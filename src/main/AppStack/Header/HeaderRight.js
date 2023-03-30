import React, {useState, useEffect} from 'react'
import { 
  View, 
  Text,
  Dimensions,
  StyleSheet,
  Modal,
  ScrollView,
} from 'react-native'
import {Button, Badge} from 'react-native-elements'
import LinearGradient from 'react-native-linear-gradient'
import {Icon} from 'native-base'
import { withNavigation } from 'react-navigation';

import Message from '../Screens/Message/Message'
import GetMessageBadge from '../../../Backend/Message/GetMessageBadge'
import { material } from 'react-native-typography'

const HeaderRight = (props) => {

  const [messageViewable, setMessageViewable] = useState(false)
  const [badge, setBadge] = useState(0)

  useEffect(() => {
    const sub = GetMessageBadge(updateBadge)

    return sub
  }, [])

  function updateBadge(num) {
    setBadge(num)
  }

  return (
    <View style={styles.container}>
      <Icon 
        type='MaterialCommunityIcons'
        name='message-outline'
        style={styles.icon}
        onPress={() => setMessageViewable(true)}
      />
      {badge ? 
        <Badge
          value={badge}
          containerStyle={styles.badge}
        />
      : null}

      <Modal
        animationType='slide'
        visible={messageViewable}
        transparent
      >
        <Message props={props} closeWindow={() => setMessageViewable(false)} />
      </Modal>

    </View>
  )
}

const {width, height} = Dimensions.get('screen')
const styles = StyleSheet.create({
  container: {
    marginRight: 15,
  },
  icon: {
    color: '#CFCFCF',
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
  }
});

export default withNavigation(HeaderRight)
