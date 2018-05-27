import { StyleSheet, Platform, Dimensions } from 'react-native';
import EStyleSheet from "react-native-extended-stylesheet";

const {width, height} = Dimensions.get('window');

export default EStyleSheet.create({
  container: {
    width: '90%',
    height: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#696f7f',
    marginTop: 4
  },
})
