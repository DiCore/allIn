import { StyleSheet, Platform, Dimensions } from 'react-native';
import EStyleSheet from "react-native-extended-stylesheet";

const {width, height} = Dimensions.get('window');

export default EStyleSheet.create({
  container: {
    display: 'flex',
    width: '100%',
    height:'100%',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
})
