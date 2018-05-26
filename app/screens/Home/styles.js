import { StyleSheet, Platform } from 'react-native';
import EStyleSheet from "react-native-extended-stylesheet";

export default EStyleSheet.create({
  videoContainer: {
    display: 'flex',
    width: '100%',
    height:'100%'
  },
  video: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    width: '100%',
    height: '100%',
  }
})
