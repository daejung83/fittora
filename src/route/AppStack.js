import {createDrawerNavigator, DrawerItems} from 'react-navigation-drawer'
import {createStackNavigator} from 'react-navigation-stack'
import {withNavigation} from 'react-navigation'

import React from 'react'
import {
  View, 
  StyleSheet, 
  ScrollView, 
  SafeAreaView,
  Text,
  Linking,
} from 'react-native'
// import {Icon} from 'react-native-elements'
import {Icon} from 'native-base'


import Other from '../main/AppStack/Other'
import Home from '../main/AppStack/DrawerStack/Home/Home'
import Calendar from '../main/AppStack/DrawerStack/Calendar/Calendar'

import HeaderLeft from '../main/AppStack/Header/HeaderLeft'
import HeaderBackground from '../main/AppStack/Header/HeaderBackground'
import Settings from '../main/AppStack/DrawerStack/SettingsPage/Settings'
import EditMyGym from '../main/AppStack/Screens/EditMyGym/EditMyGym'
import TrainerProfile from '../main/AppStack/Screens/TrainerProfile/TrainerProfile'
import BookSessions from '../main/AppStack/Screens/BookSessions/BookSessions'
import Payment from '../main/AppStack/DrawerStack/Payment/Payment'
import BookingConfirmedPage from '../main/AppStack/Screens/BookSessions/BookingConfirmedPage'
import SessionDetail from '../main/AppStack/Screens/SessionDetail/SessionDetail'
import HeaderRight from '../main/AppStack/Header/HeaderRight'
import Chat from '../main/AppStack/Screens/Message/Chat'
import RateTrainer from '../main/AppStack/Screens/RateTrainer/RateMyTrainer/RateTrainer'

const DrawerStack = createDrawerNavigator({
  
  Home: {
    screen: Home,
    navigationOptions: {
      drawerLabel: 'Home',
      drawerIcon: ({ tintColor }) => (
        <Icon
          type='FontAwesome'
          name='home'
          style={[styles.icon, { color: tintColor }]}
        />
      ),
    },
  },
  Calendar: {
    screen: Calendar,
    navigationOptions: {
      drawerLabel: 'Calendar',
      drawerIcon: ({ tintColor }) => (
        <Icon
          type='FontAwesome'
          name='calendar'
          style={[styles.icon, { color: tintColor }]}
        />
      ),
    },
  },
  Payment: {
    screen: Payment,
    navigationOptions: {
      drawerLabel: 'Payment',
      drawerIcon: ({ tintColor }) => (
        <Icon
          type='MaterialIcons'
          name='payment'
          style={[styles.icon, { color: tintColor }]}
        />
      ),
    },
  },
  Settings: {
    screen: Settings,
    navigationOptions: {
      drawerLabel: 'About',
      drawerIcon: ({ tintColor }) => (
        <Icon
          type='MaterialCommunityIcons'
          name='information-outline'
          style={[styles.icon, { color: tintColor }]}
        />
      ),
    }
  }
}, {
  drawerBackgroundColor: 'grey',
  contentComponent: props => {
    return (
      <ScrollView>
        <SafeAreaView>
          <View style={{marginTop: 30}}>
            <DrawerItems {...props} />
          </View>
          <View style={styles.socialContainer}>
            <Icon 
              onPress={()=> clickLink('https://www.facebook.com/Fittora')} 
              style={styles.socialIcon} 
              type='FontAwesome' 
              name='facebook-square' 
            />
            <Icon 
              onPress={() => clickLink('https://www.instagram.com/fittoraapp')} 
              style={styles.socialIcon} 
              type='FontAwesome' 
              name='instagram' 
            />
          </View>
        </SafeAreaView>
      </ScrollView>
    )
  }
})

function clickLink (url) {
  Linking.canOpenURL(url)
  .then((supported) => {
    if(supported) {
      Linking.openURL(url)
    } else {
      showMessage({
        duration: 5000,
        type: 'danger',
        icon: 'danger',
        message: 'Link is currently not supported',
      })
    }
  })
  .catch((e) => {
    showMessage({
      duration: 5000,
      type: 'danger',
      icon: 'danger',
      message: 'Error on Link',
      description: e.message,
    })
  })
}


export default AppStack = createStackNavigator({
  App: {
    screen: DrawerStack,
  },
  EditMyGym: {
    screen: EditMyGym,
  },
  TrainerProfile: {
    screen: TrainerProfile,
  },
  BookSessions: {
    screen: BookSessions,
  },
  BookingConfirmedPage: {
    screen: BookingConfirmedPage,
  },
  SessionDetail: {
    screen: SessionDetail,
  },
  Chat: {
    screen: Chat,
  },
  RateTrainer: {
    screen: RateTrainer,
  }
}, {
  defaultNavigationOptions: {
    headerLeft: HeaderLeft,
    headerBackground: HeaderBackground,
    headerRight: <HeaderRight />,
    headerTransparent: true,
  },
  headerMode: 'screen',
})

const styles = StyleSheet.create({
  icon: {
    // width: 20,
    // height: 20,
    fontSize: 23,
  },
  socialContainer: {
    flexDirection: 'row',
    marginLeft: 20,
    // justifyContent: 'center',
  },
  socialIcon: {
    margin: 10,
    fontSize: 40,
  }
});