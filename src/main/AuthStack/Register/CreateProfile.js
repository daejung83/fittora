import React, {useState} from 'react'
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  SafeAreaView,
} from 'react-native'
import {
  Button,
  Input,
  Image,
} from 'react-native-elements'
import LinearGradient from 'react-native-linear-gradient'
import { material } from 'react-native-typography'
import ProfileCreate from '../../../Backend/AuthStack/ProfileCreate'
/**
 * profilePics: []
 * stripeID
 * initSetupFinished: true
 * totalSessions: 0
 * scheduledSessions: 0
 * rank: 'Starter Flex'
 * languageSkills: []
 * testingAccount: !live
 * firstName
 * lastName
 */
function CreateProfile(props) {

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const [firstNameErrMsg, setFirstNameErrMsg] = useState('')
  const [lastNameErrMsg, setLastNameErrMsg] = useState('')

  function handleCreate() {
    // setIsLoading(false)
    
    if(isLoading) {
      //still pending request
    } else {
      setIsLoading(true)
      setFirstNameErrMsg('')
      setLastNameErrMsg('')
      if(!firstName) {
        console.log('no first name')
        setFirstNameErrMsg('first name is required')
      } else if(!lastName) {
        setLastNameErrMsg('last name is required')
      } else {
        //create profile
        const clientInfo = {
          firstName, lastName
        }
        ProfileCreate(props, clientInfo, () => setIsLoading(false))
      }
    }
  }

  return (
    <LinearGradient 
      colors={['#00FFFEFF', 'pink']}
      style={{flex: 1}}
    >
      <SafeAreaView style={styles.container}>
        <View>
        <Text style={[material.display1, {alignSelf: 'center', marginBottom: 10}]}>Profile</Text>
        </View>

        <View style={styles.bodyContainer}>
          
          <Input 
            label='First Name'
            placeholder='John'
            containerStyle={styles.inputContainer}
            value={firstName}
            onChangeText={setFirstName}
            errorMessage={firstNameErrMsg}
          />

          <Input 
            label='Last Name'
            placeholder='Smith'
            containerStyle={styles.inputContainer}
            value={lastName}
            onChangeText={setLastName}
            errorMessage={lastNameErrMsg}
          />
        </View>

        <View style={styles.footerContainer}>
          <Button 
            title={'Create'}
            ViewComponent={LinearGradient}
            linearGradientProps={{
              colors: ['black', 'grey'],
              start: { x: 0, y: 0.5 },
              end: { x: 1, y: 0.5 },
            }}
            onPress={handleCreate}
            loading={isLoading}
          />
        </View>
      </SafeAreaView>
    </LinearGradient>
  )
}

const {width, height} = Dimensions.get('screen')

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bodyContainer: {
    width: width * 0.8,
  },
  inputContainer: {
    borderWidth: 1, 
    paddingBottom: 10, 
    paddingTop: 5,
    // padding: 15,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 40,
    borderColor: 'grey',
    marginBottom: 5,

    shadowColor: 'white',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.6,
    shadowRadius: 2,
    elevation: 1,
  },

  footerContainer: {
    width: width * 0.8,
  }
});

export default CreateProfile
