import React, {useState, useEffect} from 'react'
import { 
  View, 
  Text,
  StyleSheet,
  Dimensions,
  ScrollView, 
  ActivityIndicator,
} from 'react-native'
import {Icon} from 'native-base'
import {Divider, Button, Image} from 'react-native-elements'
import { material } from 'react-native-typography'
import Spinner from 'react-native-spinkit'

import StartNewChat from '../../../../../Backend/Message/StartNewChat'
import GetAddChatList from '../../../../../Backend/Message/GetAddChatList'

const AddChatRoom = ({closeWindow, props}) => {

  const [AddChatList, setAddChatList] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    GetAddChatList(updateChatList, () => setIsLoading(false))
  }, [])

  function updateChatList(list) {
    setAddChatList(list)
  }

  function handleAddChat(item) {
    //TODO: Connect Adding
    console.log('item: ', item)
    const {uid} = item
    const params = {trainerUID: uid}
    isSet
    StartNewChat(params, () => setIsLoading(false))
  }

  function _renderAddChatList () {
    if(isLoading) { 
      return (
        <View style={[styles.itemContainer, {justifyContent: 'center', marginTop: 50}]}>
          <Spinner type='FadingCircleAlt' />
          {/* <Text>Hello</Text> */}
        </View>
      )
    } else if(AddChatList.length > 0) {
      return (
        <>
          {AddChatList.map((item, i) => {

            const pics = item.profilePics
            const thumb = pics && pics[0] ? {url: pics[0].downloadURL} : default_profile

            return (
              <View style={styles.shadow} key={i}>
                <View style={styles.itemContainer}>
                  <View style={styles.imageContainer}>
                    <Image 
                      source={thumb}
                      PlaceholderContent={<ActivityIndicator />}
                      style={styles.image}
                    />
                  </View>
                  <View style={styles.body}>
                    <Text>{item.firstName}</Text>
                    <Text >{item.lastName}</Text>
                  </View>
                  <View style={styles.buttonContainer}>
                    <Button 
                      title={'add'}
                      titleStyle={[material.button, {color: 'white'}]}
                      onPress={() => handleAddChat(item)}
                    />
                  </View>
                </View>
              </View>
            )
          })}
        </>
      )
    } else {
      return (
        <View style={[styles.itemContainer, {justifyContent: 'center',}]}>
          <Text>Empty, once session is book you can start a chat here.</Text>
        </View>
      )
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.addChatContainer}>
        <View style={styles.header}>
          <Text style={material.title}>Start Chat</Text>
          <Icon 
            type='MaterialIcons'
            name='cancel'
            onPress={closeWindow}
          />
        </View>
        <Divider style={{width: width * 0.7, marginBottom: 10,}} />
        <ScrollView style={{flex: 1}}>
          {_renderAddChatList()}
        </ScrollView>
      </View>
    </View>
  )
}

const {width, height} = Dimensions.get('screen')
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addChatContainer: {
    alignItems: 'center',
    backgroundColor: 'white',
    width: width * 0.7,
    height: height * 0.5,
    borderRadius: 30,
    padding: 15,
  },
  header: {
    // marginTop: 10,
    width: width * 0.6,
    flexDirection: 'row', 
    justifyContent: 'space-between',
  },
  itemContainer: {
    // borderWidth: 1,
    width: width * 0.6,
    // padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',

    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 2,
  },
  shadow: {
    backgroundColor: '#DCDCDCFF',
    marginBottom: 10,
    borderRadius: 20,
    // overflow: 'hidden',

    shadowColor: '#000',
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 3,
  },
  image: {
    width: width * 0.2,
    height: width * 0.2,
  },
  imageContainer: {
    // borderRadius: 20,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    overflow: 'hidden',
  },
  body: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    justifyContent: 'center',
    marginRight: 10,
  }
});

export default AddChatRoom
