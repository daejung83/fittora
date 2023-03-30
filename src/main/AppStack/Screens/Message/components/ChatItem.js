import React from 'react'
import { 
  View, 
  Text, 
  Dimensions,
  StyleSheet,
  ActivityIndicator,
  TouchableHighlight,
} from 'react-native'
import { Image, Button, Badge } from 'react-native-elements'
import { SwipeRow } from 'react-native-swipe-list-view'
import { material } from 'react-native-typography'
import { Icon } from 'native-base'
import moment from 'moment'
import ResetBadge from '../../../../../Backend/Message/ResetBadge'

const ChatItem = ({item, props, closeWindow}) => {
  const {chatID, trainerFirstName, trainerLastName, trainerAvatar, trainerUID, clientChatBadge, lastChat, lastChatTime} = item
  const source = {uri: trainerAvatar}

  const prevChat = lastChat ? lastChat : '...'
  const time = lastChatTime ? moment(lastChatTime).fromNow() : 'none'
  const badge = clientChatBadge ? clientChatBadge : 0

  function handleChat () {
    ResetBadge(chatID)
    closeWindow()
    props.navigation.navigate('Chat', {item})
  }

  function handleGoToTrainer() {
    closeWindow()
    props.navigation.navigate('TrainerProfile', {trainerUID: trainerUID})
  }

  return (
    <SwipeRow 
      leftOpenValue={width * 0.35}
      style={styles.container}
      disableLeftSwipe
    >
      <View style={styles.buttonContainer}>
        <Button 
          title={'msg'}
          titleStyle={material.buttonWhite}
          style={[styles.buttonSize]}
          raised
          onPress={handleChat}
        />
        <Button 
          title={'profile'}
          titleStyle={material.buttonWhite}
          style={[styles.buttonSize]}
          buttonStyle={{backgroundColor: 'red'}}
          raised
          onPress={handleGoToTrainer}
        />
      </View>

      <TouchableHighlight 
        onPress={handleChat}
        style={styles.backgroundColor}
      >
        <View style={styles.shadow}>
          <View style={styles.imageContainer}>
            <Image 
              source={source}
              PlaceholderContent={<ActivityIndicator />}
              style={styles.image}
            />
            
          </View>
          <View style={styles.textContainer}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between',}}>
              <View>
                <Text style={material.title}>{trainerFirstName}</Text>
                <Text style={material.body1}>{trainerLastName}</Text>
              </View>
              <View>
                <Text style={material.caption}>{time}</Text>
                <Icon style={{alignSelf: 'flex-end',}} type='MaterialCommunityIcons' name='menu-right' />
              </View>
            </View>
            <Text numberOfLines={1} style={material.caption}>{prevChat}</Text>
          </View>
          {badge ? 
          <Badge 
            status='error'
            value={badge}
            containerStyle={styles.badge}
          />
          : null}
        </View>
      </TouchableHighlight>
    </SwipeRow>
  )
}

const {width, height} = Dimensions.get('screen')
const styles = StyleSheet.create({
  container: {
    // borderWidth: 1,
    width: width * 0.9,
    marginTop: 10,
  },
  backgroundColor: {
    backgroundColor: 'white',
    borderRadius: 15,
  },
  shadow: {
    flexDirection: 'row',
    shadowColor: 'black',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 2,
  },
  image: {
    width: width * 0.23,
    height: width * 0.23,
  },
  imageContainer: {
    borderRadius: 15,
    overflow: 'hidden',
  },
  textContainer: {
    padding: 10,
    paddingLeft: 20,
    width: width * 0.67,
    justifyContent: 'center',
    alignContent: 'center',
  },
  buttonContainer: {
    // borderWidth: 1,
    height: width * 0.23,
    marginLeft: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonSize: {
    width: width * 0.15,
  },
  badge: {
    position: 'absolute',
    bottom: 10,
    right: 10,
  }
});

export default ChatItem
