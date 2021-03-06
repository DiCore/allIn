import { StyleSheet, Platform, Dimensions } from 'react-native';
import EStyleSheet from "react-native-extended-stylesheet";
const {width, height} = Dimensions.get('window');

export default EStyleSheet.create({
  videoContainer: {
    display: 'flex',
    width: '100%',
    height:'100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  imageButton: {
    width: 80,
    height: 80,
  },
  textImage: {
    position: 'absolute',
    top: 30,
    width: '100%',
    height: 60,
  },
  innerWrap: {
    display: 'flex',
    width: '100%',
    height:height - 80,
    alignItems: 'center',
    justifyContent: 'flex-end',
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
  createButton:{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }
})
