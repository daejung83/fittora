import React, {useState, useEffect} from 'react'
import { 
  View, 
  Text, 
  Dimensions,
  StyleSheet,
} from 'react-native'
import {Button} from 'react-native-elements'
import { Icon } from 'native-base'
import CheckIfMyTrainer from '../../../../../Backend/Trainers/CheckIfMyTrainer'

function MyTrainerOptions ({props, trainerInfo}) {

  const [isMyTrainer, setIsMyTrainer] = useState(false)

  useEffect(() => {
    const params = {
      trainerUID: trainerInfo.uid,
    }
    CheckIfMyTrainer(params, () => setIsMyTrainer(true))
  }, [])

  function handleReview () {
    props.navigation.navigate('RateTrainer', {trainerInfo: trainerInfo})
  }
  
  if(isMyTrainer) {

    return (
      <View style={styles.container}>
        <Button 
          title={'Rate My Trainer!'}
          containerStyle={styles.button}
          raised
          buttonStyle={{backgroundColor: '#FFA07AFF'}}
          icon={
            <Icon 
              type='MaterialIcons'
              name='rate-review'
              style={{fontSize: 20, marginRight: 10, color: 'white'}}
            />
          }
          onPress={handleReview}
        />
      </View>
    )
  } else {
    return null
  }
}

const {width, height} = Dimensions.get('screen')
const styles = StyleSheet.create({
  container: {
    // borderWidth: 1,
    width: width * 0.9,
    alignSelf: 'center',
    alignItems: 'center',
  },
  button: {
    width: width * 0.8,
  }
});

export default MyTrainerOptions;