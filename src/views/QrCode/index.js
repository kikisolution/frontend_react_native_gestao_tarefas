import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native'

import { BarCodeScanner } from 'expo-barcode-scanner'
import * as Application from 'expo-application';

import styles from './styles'

export default function QrCode( { navigation } ){

  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  async function getMacAddress(){

    //Todo
    const id = Application.androidId
    Alert.alert("Sei id é: "+id)

  }

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);

    if(data === 'http://www.kikisolution.com.br') 
      getMacAddress() 
    else  
      Alert.alert(`CÓDIGO INVÁLIDO!: ${data} `);  

  };

  if (hasPermission === null) {

    return (<View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text>Solicitando permissão de câmera</Text>
           </View>)

  }
  if (hasPermission === false) {

    return (<View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text>Sem acesso à câmera</Text>
           </View>)

  }

  return (

    <View style={styles.container}>

      <BarCodeScanner 
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned} 
        style={StyleSheet.absoluteFillObject}
        />

        <View style={styles.header}>

          <Text style={styles.headerText} >Conectar com minha conta na web</Text>

        </View>

        <View style={styles.containerButtons}>

          <TouchableOpacity style={styles.buttonBack} onPress={() => navigation.navigate('Home')}>
            <Text style={styles.textButton}>VOLTAR</Text>
          </TouchableOpacity>
          <TouchableOpacity style={ scanned ? styles.buttonScanActive : styles.buttonScanInative} onPress={() => setScanned(false)}>
            <Text style={styles.textButton}>SCAN NOVAMENTE</Text>
          </TouchableOpacity>

        </View>

    </View>

  )

}