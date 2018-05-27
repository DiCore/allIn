import { StyleSheet, Platform, Dimensions } from 'react-native';
import EStyleSheet from "react-native-extended-stylesheet";
const {width, height} = Dimensions.get('window');

export default EStyleSheet.create({
  container: {
    display: 'flex',
    width: '100%',
    height:'100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  video: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    width: '100%',
    height: '100%',
  },
  videoWrap: {
    width: 200,
    height: 200,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }
})
