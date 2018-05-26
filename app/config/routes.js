import {StatusBar, Platform} from 'react-native';
import {createStackNavigator} from 'react-navigation';

import {Home, Highlight} from '../screens';

export default createStackNavigator({
  Home: {
    screen: Home, // Вход
  },
  Highlight: {
    screen: Highlight,
  },
}, {
  headerMode: 'none',
  // cardStyle: { paddingTop: Platform.OS == 'ios' ? 15 : 0, backgroundColor: '#075394' },
})
