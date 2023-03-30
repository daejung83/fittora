import React, { Component } from 'react'
import { View } from 'react-native'
import { withNavigation } from 'react-navigation';

import {Icon} from 'native-base'

class HeaderLeft extends Component {
  render() {
    if(this.props.navigation.toggleDrawer) {
      return (
            // <Button 
            //   onPress={() => {
            //     this.props.navigation.toggleDrawer()
            //   }}
            //   transparent
            // >
              // <Text>Menu</Text>
            // {/* </Button> */}
            <View style={{zIndex: 5}}>
            <Icon 
              style={{color: '#CFCFCF', marginLeft: 15, zIndex: 0,}}  
              type='MaterialCommunityIcons'
              name='menu'
              onPress={() => {
                this.props.navigation.toggleDrawer()
              }}
            />
            </View>
      )
    } else {
      return (
        <Icon 
          style={{color: '#CFCFCF', marginLeft: 15}}  
          type='MaterialIcons'
          name='keyboard-arrow-left'
          onPress={() => {
            this.props.navigation.goBack()
          }}
        />
      )
    }
  }
}

export default withNavigation(HeaderLeft)
// export default HeaderLeft
