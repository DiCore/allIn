import { StyleSheet, Platform } from 'react-native';
import EStyleSheet from "react-native-extended-stylesheet";

export default EStyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  buttonItems: {
    width: '50%',
    height: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonsWrap: {
    display: 'flex',
    height: 50,
    backgroundColor: 'rgba(50, 50, 50, 0.5)',
    flexDirection: 'row',
  }
})
