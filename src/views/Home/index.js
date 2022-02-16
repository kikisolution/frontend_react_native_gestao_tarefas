import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native'

import * as Application from 'expo-application';

import styles from './styles'

//COMPONENTS
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import TaskCard from '../../components/TaskCard'

import api from '../../services/api'

export default function Home({ navigation }){


  const [filter, setFilter] = useState('today')
  const [tasks, setTasks] = useState([])
  const [load, setLoad] = useState(false)
  const [lateCount, setLateCount] = useState()
  const [macaddress, setMacaddress] = useState()


  async function getMacAddress(){

    //Todo
    const id = Application.androidId
    setMacaddress(id)

  }

  async function loadTasks(){

    setLoad(true)

    await api.get(`/task/filter/${filter}/${macaddress}`).then(response => {

      setTasks(response.data)
      setLoad(false)

    })

  }

  async function lateVerify(){


    await api.get(`/task/filter/late/${macaddress}`).then(response => {

      setLateCount(response.data.length)

    })

  }

  function Notification(){

    setFilter('late')

  }

  function New(){

    navigation.navigate('Task')

  }

  function Show(id){

    navigation.navigate('Task', {idTask: id})

  }

  useEffect(() => {
    getMacAddress().then(() => {
      loadTasks()
    })
   
    lateVerify()

  }, [filter, macaddress])

  return (
    <View style={styles.container}>
      <Header showNotification={true} showBack={false} pressNotification={Notification} late={lateCount} navigation={navigation} />

      <View style={styles.filter}>

        <TouchableOpacity>
            <Text style={ filter == 'all' ? styles.filterTextActived :  styles.filterTextInative} onPress={ () => setFilter('all') } >Todos</Text>
        </TouchableOpacity>
        <TouchableOpacity>
            <Text style={ filter == 'today' ? styles.filterTextActived :  styles.filterTextInative} onPress={ () => setFilter('today') } >Hoje</Text>
        </TouchableOpacity>
        <TouchableOpacity>
            <Text style={ filter == 'week' ? styles.filterTextActived :  styles.filterTextInative} onPress={ () => setFilter('week') } >Semana</Text>
        </TouchableOpacity>
        <TouchableOpacity>
            <Text style={ filter == 'month' ? styles.filterTextActived :  styles.filterTextInative} onPress={ () => setFilter('month') } >Mês</Text>
        </TouchableOpacity>
        <TouchableOpacity>
            <Text style={ filter == 'year' ? styles.filterTextActived :  styles.filterTextInative} onPress={ () => setFilter('year') } >Ano</Text>
        </TouchableOpacity>

      </View>

      <View style={styles.title} >
        <Text style={styles.titleText} >TAREFAS {filter == 'late' && ' ATRAZADAS'} </Text>
      </View>

      

      <ScrollView style={styles.contentScroll} contentContainerStyle={ {alignItems: 'center',width: '100%',marginTop: 30,} }>
        {

          load ?
            <ActivityIndicator color={'#EE6B26'} size={50} />
          :      
        
          tasks.map( t => 
            (
              <TaskCard key={t._id} 
              done={t.done} 
              title={t.title} 
              when={t.when} 
              type={t.type} 
              onPress={() => Show(t._id)}
              
              />
            ))
          
        }

      </ScrollView>

      <Footer icon={'add'} onPress={New} />
    </View>
  )

}
