import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, Alert } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    Alert.alert(`Código de barras com tipo ${type} e dados ${data} foi verificado!`);
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
      {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
});
