import React, {useState, useEffect} from 'react'
import { 
  View, 
  Text, 
  Dimensions,
  StyleSheet,
} from 'react-native'
import {GiftedChat} from 'react-native-gifted-chat'
import SendMessage from '../../../../Backend/Message/SendChat'
import GetMessages from '../../../../Backend/Message/GetMessages'

const Chat = (props) => {
  console.log('Chat: ', props)

  const [messages, setMessages] = useState([])

  const item = props.navigation.getParam('item', {})
  const {chatID,
  clientAvatar, clientFirstName, clientLastName,
  trainerAvatar, trainerFirstName, trainerLastName,
  clientUID, trainerUID} = item

  useEffect(() => {
    // setMessages([])
    const sub = GetMessages(item, updateMessages)

    return sub
  }, [])

  function updateMessages(msg) {
    setMessages(GiftedChat.append(messages, msg))
  }

  function onSend(msg) {
    console.log('msg: ', msg)

    setMessages(GiftedChat.append(messages, msg))

    const params = {
      chatID: chatID,
      message: msg,
      trainerUID: trainerUID,
    }
    SendMessage(params)
  }
  
  return (
    <View style={styles.container}>
      <GiftedChat 
        messages={messages}
        onSend={onSend}
        user={{
          _id: clientUID,
          name: clientFirstName + ' ' + clientLastName,
          avatar: clientAvatar,
        }}
      />
    </View>
  )
}

const {width, height} = Dimensions.get('screen')
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  }
});

export default Chat
