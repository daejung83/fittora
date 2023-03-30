import React from 'react'
import { 
  View, 
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native'
import { Button } from 'react-native-elements'
import { material } from 'react-native-typography'
import email from 'react-native-email'
import { showMessage } from 'react-native-flash-message'

const ContactFittora = () => {

  function handleReportBug () {
    const to = ['reportbug@fittora.com'] // string or array of email addresses
        email(to, {
            // Optional additional arguments
            // cc: ['bazzy@moo.com', 'doooo@daaa.com'], // string or array of email addresses
            // bcc: 'mee@mee.com', // string or array of email addresses
            subject: 'BUG REPORT',
            body: ''
        }).catch((e) => {
          showMessage({
            duration: 5000,
            type: 'danger',
            icon: 'danger',
            message: 'Error sending email',
            description: e.message,
          })
        })
  }

  function handleSuggestions () {
    const to = ['contact@fittora.com'] // string or array of email addresses
        email(to, {
            // Optional additional arguments
            // cc: ['bazzy@moo.com', 'doooo@daaa.com'], // string or array of email addresses
            // bcc: 'mee@mee.com', // string or array of email addresses
            subject: 'SUGGESTION',
            body: ''
        }).catch((e) => {
          showMessage({
            duration: 5000,
            type: 'danger',
            icon: 'danger',
            message: 'Error sending email',
            description: e.message,
          })
        })
  }

  return (
    <View style={styles.container}>
      <Text style={material.display1}>Contact Fittora</Text>

      <Button 
        title='Report Bug'
        onPress={handleReportBug}
        containerStyle={styles.buttonContainer}
        buttonStyle={{backgroundColor: '#F4DD79FF'}}
        raised
      />
      <Button 
        title='Suggestions'
        onPress={handleSuggestions}
        containerStyle={styles.buttonContainer}
        raised
      />
    </View>
  )
}

const {width, height} = Dimensions.get('screen')
const styles = StyleSheet.create({
  container: {
    // borderWidth: 1,
    width: width * 0.9,
    alignSelf: 'center',
    marginTop: 20,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#c1bfb5',
    borderRadius: 20,

    shadowColor: '#000',
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 3,
  },
  buttonContainer: {
    width: width  * 0.8,
    marginTop: 15,
  }
});
export default ContactFittora
