import { StyleSheet, Platform, Dimensions } from 'react-native';
import EStyleSheet from "react-native-extended-stylesheet";
const {width, height} = Dimensions.get('window');

export default EStyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: 'transparent',
  },
  endButton: {
    position: 'absolute',
    top: 40,
    right: 40,
    width: 50,
    backgroundColor: '#a40b09',
    borderRadius: 15,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  endButtonText: {
    color: 'white',
    fontFamily: "TeX Gyre Adventor",
  },
  timer: {
    display: 'flex',
    width: '100%',
    height: 50,
    paddingBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: 'rgba(50,50,50,0.3)',
  },
  pickTime: {
    color: 'white',
    fontSize: 14,
    fontFamily: "TeX Gyre Adventor",
    color: '#34495e',
    width: width/3,
    textAlign: 'center',
  },
  badge: {
    color: '#a40b09',
    fontSize: 11,
    position: 'absolute',
    top: 0,
    right: 0,
  },
  gallery: {
    display: 'flex',
    width: '100%',
    height: 70,
    paddingBottom: 10,
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: 'transparent',
  },
  wholeWrap: {
    display: 'flex',
    width: '100%',
    height: height,
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: 'transparent',
  },
  mainButtons: {
    display: 'flex',
    width: '100%',
    height: 100,
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: 'transparent',
    paddingBottom: 10,
    flexDirection: 'row'
  },
  imageButton: {
    width: 90,
    height: 90,
  },
  imageButtonSmall: {
    width: 30,
    height: 30,
  },
  repeatImages: {
    marginHorizontal: 10,
    marginVertical: 5,
    width: 60,
  },
})
