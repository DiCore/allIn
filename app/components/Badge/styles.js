import { StyleSheet, Platform, Dimensions } from 'react-native';
import EStyleSheet from "react-native-extended-stylesheet";

const {width, height} = Dimensions.get('window');

export default EStyleSheet.create({
  container: {
    width: 70,
    height: 70,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  badgeText: {
    fontFamily: "TeX Gyre Adventor",
    fontSize: 12,
  },
  imageIcon: {
    width: 50,
    height: 50,
  },
  textInImage: {
    position: 'absolute',
    fontSize: 7,
    paddingTop: 12,
  }
})
