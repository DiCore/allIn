import { StyleSheet, Platform, Dimensions } from 'react-native';
import EStyleSheet from "react-native-extended-stylesheet";
const {width, height} = Dimensions.get('window');

export default EStyleSheet.create({
  container: {
    // flex: 1,
    width: '50%',
    height: 250,
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 5,
  },
  itemWrap: {
    width: '95%',
    height: "95%",
    borderRadius: 5,
    overflow: 'hidden',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(50,50,50,0.3)'
  },
  video: {
    width: '100%',
    height: 110,
  }
})
