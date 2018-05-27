import { StyleSheet, Platform, Dimensions } from 'react-native';
import EStyleSheet from "react-native-extended-stylesheet";

const {width, height} = Dimensions.get('window');

export default EStyleSheet.create({
  container: {
    flex: 1,
    height: 40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 3,
    flexDirection: 'row',
  },
  icon: {
    width: 15,
    height: 15,
    marginRight: 5
  },
  listText: {
    fontFamily: "TeX Gyre Adventor",
    fontSize: 12
  },
})
