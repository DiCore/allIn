import { StyleSheet, Platform, Dimensions } from 'react-native';
import EStyleSheet from "react-native-extended-stylesheet";

const {width, height} = Dimensions.get('window');

export default EStyleSheet.create({
  container: {
    display: 'flex',
    width: '100%',
    height:60,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
  tabsWrap: {
    display: 'flex',
    width: '100%',
    height:60,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  tabEl: {
    display: 'flex',
    width: width/3,
    height:60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabImage: {
    width: width/3 - 10,
    height: 30,
  }
})
