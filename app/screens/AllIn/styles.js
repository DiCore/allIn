import { StyleSheet, Platform, Dimensions } from 'react-native';
import EStyleSheet from "react-native-extended-stylesheet";
const {width, height} = Dimensions.get('window');

export default EStyleSheet.create({
  container: {
    display: 'flex',
    width: '100%',
    height:'100%',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  innerWrap: {
    display: 'flex',
    width: '100%',
    height:height - 60,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  headWrap: {
    display: 'flex',
    height: 60,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  headerImage: {
    height: 30,
  },
  videosWrap: {
    width: '100%',
    height: height - 120,
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
})
