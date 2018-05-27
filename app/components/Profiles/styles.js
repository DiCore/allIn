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
    flexDirection: 'row',
  },
  profileWrap: {
    width: 50,
    height: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  profileText: {
    fontSize: 7,
    fontFamily: "TeX Gyre Adventor",
  },
})
