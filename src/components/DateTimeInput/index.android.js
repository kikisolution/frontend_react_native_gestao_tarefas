import React, { useState, useEffect } from 'react'
import {
  TextInput, 
  Image, 
  TouchableOpacity, 
  Alert } from 'react-native'

import DateTimePicker from '@react-native-community/datetimepicker';

import { format, isPast, endOfDay } from 'date-fns'

import styles from './styles'

import iconCalendar from '../../assets/calendar.png'
import iconClock from '../../assets/clock.png'

export default function DateTimeInputAndroid({ type, save, dateHour }){

  const [dateTime, setDateTime] = useState()
  const [dateDt, setDate] = useState(new Date());
  const [modeDt, setMode] = useState()
  const [showDt, setShow] = useState(false)

  useEffect(() => { 
    
    if(type == 'date' && dateHour){

      setDateTime(format(new Date(dateHour), 'dd-MM-yyyy'))
      save(format(new Date(dateHour), 'yyyy-MM-dd'))

    }

    if(type == 'hour' && dateHour){

      setDateTime(format(new Date(dateHour), 'HH:mm'))
      save(format(new Date(dateHour), 'HH:mm:ss'))

    }

  },[])

  const showDatepicker = () => {
    showMode('date');
  }

  const showTimepicker = () => {
    showMode('time');
  }

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || dateTime;
    setShow(Platform.OS === 'ios')

      if(type == 'date'){

        if(isPast(new Date(endOfDay(currentDate)))){
         
          return Alert.alert('Você não pode escolher uma data passada')

        }else{

          setDateTime(format(currentDate, 'dd-MM-yyyy'))
          save(format(currentDate, 'yyyy-MM-dd'))

        }

        setDateTime(format(currentDate, 'dd-MM-yyyy'))
        save(format(currentDate, 'yyyy-MM-dd'))

      }else{
        setDateTime(format(currentDate, 'HH:mm'))
        save(format(currentDate, 'HH:mm:ss'))
      } 

  };

    return (

      <TouchableOpacity onPress={ type == 'date' ? showDatepicker : showTimepicker}>

        <TextInput 
          style={styles.input}
          placeholder={type == 'date' ? 'Clique aqui para definir a data...' : 'Clique aqui para definir a hora...'}
          editable={false}
          value={dateTime}
        />

        <Image 
          style={styles.iconTextInput}
          source={ type == 'date' ? iconCalendar : iconClock } /> 


          {showDt && (
            <DateTimePicker
              testID="dateTimePicker"
              value={dateDt}
              mode={modeDt}
              is24Hour={true}
              display="default"
              onChange={onChange}
            />
          )}

      </TouchableOpacity>

    )
  

}
