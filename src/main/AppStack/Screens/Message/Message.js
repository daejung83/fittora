import React, {useState, useEffect} from 'react'
import { 
  View, 
  Text, 
  StyleSheet,
  Dimensions,
  Modal,
  ScrollView,
} from 'react-native'
import {Icon} from 'native-base'
import AddChatRoom from './components/AddChatRoom'
import { material } from 'react-native-typography'
import { Divider, Button } from 'react-native-elements'

import GetChatRooms from '../../../../Backend/Message/GetChatRooms'
import ChatItem from './components/ChatItem'


const Message = ({closeWindow, props}) => {

  const [addChatView, setAddChatView] = useState(false)
  const [chatRoomList, setChatRoomList] = useState([])

  console.log('props', props)

  useEffect(() => {
    const sub = GetChatRooms(UpdateChatRoomList)

    return sub
  }, [])

  function UpdateChatRoomList(list) {
    console.log('list chat: ', list)
    setChatRoomList(list)
  }
  
  function _renderList() {
    if(chatRoomList.length > 0) {
      return (
        <View>
          {chatRoomList.map((item, i) => {
            return <ChatItem key={i} item={item} props={props} closeWindow={closeWindow} />
          })}
        </View>
      )
    } else {
      return (
        <View style={styles.emptyChatContainer}>
          <Icon 
            type='MaterialCommunityIcons' 
            name='message-text' 
            style={{fontSize: 150}}  
          />
          <Text style={material.display1}>Empty</Text>
        </View>
      )
    }
  }

  return (
    
    <View style={styles.modalContainer}>
      <View style={styles.contentContainer}>
        <View style={styles.headerContainer}>
          <Text style={material.title}>Messages</Text>
          <Icon 
            type='MaterialIcons'
            name='cancel'
            onPress={closeWindow}
            // style={{marginTop: 20,}}
          />
        </View>
        <Divider />
        <ScrollView>
          {_renderList()}
        </ScrollView>

        <Button 
          title={'start new chat'}
          onPress={() => setAddChatView(true)}
          containerStyle={{marginBottom: 30,}}
          raised
        />
      </View>
      
      

      <Modal
        visible={addChatView}
        animationType={'slide'}
        transparent
      >
        <AddChatRoom props={props} closeWindow={() => setAddChatView(false)} />
      </Modal>
    </View>
  )
}

const {width, height} = Dimensions.get('screen')
const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    // borderWidth: 1,
    marginTop: height * 0.05,
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
    backgroundColor: 'grey',

    shadowColor: 'white',
    shadowOffset: { width: 1.5, height: -2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 2,
  },
  contentContainer: {
    // borderWidth: 1,
    // marginTop: 200,
  },
  headerContainer: {
    width: width * 0.9,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 10,
    // alignItems: 'flex-start',
  },
  content: {
    marginTop: 20,
  },
  emptyChatContainer: {
    width: width * 0.9,
    height: height * 0.7,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default Message
