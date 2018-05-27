import { StyleSheet, Platform, Dimensions } from 'react-native';
import EStyleSheet from "react-native-extended-stylesheet";

const {width, height} = Dimensions.get('window');

export default EStyleSheet.create({
  container: {
    width: '100%',
    height: 60,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  headerTextView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  headerText: {
    fontSize: 18,
    color: 'black',
    fontFamily: "TeX Gyre Adventor",
  },
  cancelButton: {
    position: 'absolute',
    right: 20,
  },
  cancelText: {
    color: '#a40b09'
  },
})
