import React, {useState, useEffect} from 'react'
import { 
  Text, 
  View, 
  StyleSheet, 
  Dimensions,
  SafeAreaView,
  ScrollView,
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { Agenda } from 'react-native-calendars'
import Item from './components/Item'
import Day from './components/Day'
import EmptyDate from './components/EmptyDate'
import Knob from './components/Knob'
import EmptyData from './components/EmptyData'
import moment from 'moment'
import getMonthData from '../../../../Backend/Calendar/getMonthData'


function Calendar(props) {

  const [data, setData] = useState({})
  const [loadedMonths, setLoadedMonths] = useState({})
  const [list, setList] = useState({})
  const [isLoading, setIsLoading] = useState(false)


  useEffect(() => {
    const date = new Date()
    
    getMonthData(date.getFullYear(), date.getMonth() + 1, updateData)
  }, [])

  function updateData (monthData, month, year) {
    let newData = {}
    newData = data
    newData[year + '-' + month] = monthData

    console.log('updating month data')
    
    const newLoadedMonths = loadedMonths
    newLoadedMonths[year + '-' + month] = true

    const arr = Object.values(newData)
    let newList = {}

    arr.forEach((item) => {
      newList = {...newList, ...item}
    })

    console.log('newList: ', newList)
    setData(newData)
    setLoadedMonths(newLoadedMonths)
    setList(newList)
  }

  function loadItemsForMonth (month) {
    const monthIndex = month.year + '-' + month.month

    if(!loadedMonths[monthIndex]) {

      getMonthData(month.year, month.month, updateData)
    }
  }
  
  return (
    <LinearGradient 
      colors={['grey', 'black']}  
      start={{x: 0, y: 0.5}}
      end={{x: 1, y: 0.5}}
      style={{flex: 1}}
    >
      <SafeAreaView style={{flex: 1}}>
        <Agenda 
          // the list of items that have to be displayed in agenda. If you want to render item as empty date
          // the value of date key kas to be an empty array []. If there exists no value for date key it is
          // considered that the date in question is not yet loaded
          items={list}
          // callback that gets called when items for a certain month should be loaded (month became visible)
          loadItemsForMonth={loadItemsForMonth}
          // callback that fires when the calendar is opened or closed
          onCalendarToggled={(calendarOpened) => {console.log(calendarOpened)}}
          // callback that gets called on day press
          onDayPress={(day)=>{
            console.log('day pressed: ')}}
          // callback that gets called when day changes while scrolling agenda list
          onDayChange={(day)=>{console.log('day changed')}}
          // initially selected day
          selected={moment().format('YYYY-MM-DD')}
          // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
          minDate={moment().subtract(6, 'month').format('YYYY-MM-DD')}
          // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
          maxDate={moment().add(2, 'month').format('YYYY-MM-DD')}
          // Max amount of months allowed to scroll to the past. Default = 50
          pastScrollRange={6}
          // Max amount of months allowed to scroll to the future. Default = 50
          futureScrollRange={2}
          // specify how each item should be rendered in agenda
          renderItem={(item, firstItemInDay) => {
            return (
              <Item 
                item={item} 
                firstItemInDay={firstItemInDay} 
                props={props}
              />
            );}}
          // specify how each date should be rendered. day can be undefined if the item is not first in that day.
          renderDay={
            (day, item) => {
              return (
                <Day day={day} item={item} props={props} />
              );}}
          // specify how empty date content with no items should be rendered
          renderEmptyDate={() => {
            return (
              <EmptyDate />
            );}}
          // specify how agenda knob should look like
          renderKnob={() => {
            return (
              <Knob />
            );}}
          // specify what should be rendered instead of ActivityIndicator
          renderEmptyData = {() => {
              return (
                <EmptyData props={props} />
              );}}
          // specify your item comparison function for increased performance
          rowHasChanged={(r1, r2) => {return r1 !== r2}}
          // Hide knob button. Default = false
          hideKnob={false}
          // By default, agenda dates are marked if they have at least one item, but you can override this if needed
          // markedDates={{
          //   '2012-05-16': {selected: true, marked: true},
          //   '2012-05-17': {marked: true},
          //   '2012-05-18': {disabled: true}
          // }}
          // If provided, a standard RefreshControl will be added for "Pull to Refresh" functionality. Make sure to also set the refreshing prop correctly.
          onRefresh={() => console.log('refreshing...')}
          // Set this true while waiting for new data from a refresh
          refreshing={false}
          // Add a custom RefreshControl component, used to provide pull-to-refresh functionality for the ScrollView.
          refreshControl={null}
          // agenda theme
          theme={{
            // ...calendarTheme,
            backgroundColor: '#ffffff',
            calendarBackground: '#ffffff',
            textSectionTitleColor: '#2d4150',
            selectedDayBackgroundColor: '#2d4150',
            selectedDayTextColor: '#ffffff',
            todayTextColor: '#f08080',
            dayTextColor: '#2d4150',
            textDisabledColor: '#d9e1e8',
            dotColor: '#00adf5',
            selectedDotColor: '#ffffff',
            arrowColor: 'orange',
            monthTextColor: 'black',

            // backgroundColor: '#ffffff',
            // calendarBackground: '#ffffff',
            // textSectionTitleColor: '#b6c1cd',
            // selectedDayBackgroundColor: '#00adf5',
            // selectedDayTextColor: '#ffffff',
            // todayTextColor: '#00adf5',
            // dayTextColor: '#2d4150',
            // textDisabledColor: '#d9e1e8',
            // dotColor: '#00adf5',
            // selectedDotColor: '#ffffff',
            // arrowColor: 'orange',
            // monthTextColor: 'blue',
            indicatorColor: 'black',
            // textDayFontFamily: 'monospace',
            // textMonthFontFamily: 'monospace',
            // textDayHeaderFontFamily: 'monospace',
            textDayFontWeight: '300',
            textMonthFontWeight: 'bold',
            textDayHeaderFontWeight: '300',
            textDayFontSize: 16,
            textMonthFontSize: 16,
            textDayHeaderFontSize: 16,
            agendaDayTextColor: 'yellow',
            agendaDayNumColor: 'green',
            agendaTodayColor: 'red',
            agendaKnobColor: 'blue'
          }}
          // agenda container style
          style={styles.agendaContainer}
        />
      </SafeAreaView>
    </LinearGradient>
  )
}

const {width, height} = Dimensions.get('screen')

const styles = StyleSheet.create({
  agendaContainer: {
    marginTop: height * 0.05,
  }
});

export default Calendar