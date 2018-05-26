import {StatusBar, Platform} from 'react-native';
import {createStackNavigator, createTabNavigator} from 'react-navigation';

import {Home, Highlight, Feed} from '../screens';

const stackNavigator = createStackNavigator({
  Home: {
    screen: Home
  },
}, {
  headerMode: 'none',
  // cardStyle: { paddingTop: Platform.OS == 'ios' ? 15 : 0, backgroundColor: '#075394' },
});
//
// stackNavigator.navigationOptions = (nav) => {
//   let tabBarVisible = true;
//   console.log(nav);
//   let navigation = nav.navigation;
//   if (navigation.state.index > 0) {
//     tabBarVisible = false;
//   }
//
//   return {
//     tabBarVisible,
//   };
// }

const tabNavigator = createTabNavigator({
  Feeded: {
    screen: Feed,
  },
  Init: {
    screen: stackNavigator
  },
  Feed: {
    screen: Feed
  }
}, {
  initialRouteName: 'Init',
  backBehavior: 'none',
  tabBarPosition: "bottom",
  swipeEnabled: true,
});

const stackParentNavigator = createStackNavigator({
  TabInit: {
    screen: tabNavigator,
  },
  Highlight: {
    screen: Highlight,
  },
}, {
  headerMode: 'none',
  // cardStyle: { paddingTop: Platform.OS == 'ios' ? 15 : 0, backgroundColor: '#075394' },
});

export default stackParentNavigator
