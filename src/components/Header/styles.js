import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 100,
    backgroundColor: '#20295F',
    borderBottomWidth: 5,
    borderColor: '#EE6B26',
    alignItems: 'center',
    justifyContent: 'center'
  },
  logo: {
    position: 'absolute',    
    width: 100,
    height:  30,
    bottom: 20
  }, 
  notification: {
    position: 'absolute', 
    right: 20,
    bottom: 20
  },
  notificationImage: {
    width: 30,
    height: 35
  }, 
  notificationText: {
    fontWeight: 'bold',
    color: '#EE6B26'
  },
  circle: {
    width: 25,
    height: 25,
    backgroundColor: '#FFF',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left: 13,
    bottom: 13
  },
  leftIcon: {
    position: 'absolute',
    left: 20,
    bottom: 20
  },
  leftIconImage: {
    width: 30,
    height: 30
  }
})

export default styles