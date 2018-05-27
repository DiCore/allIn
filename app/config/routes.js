import {StatusBar, Platform} from 'react-native';
import {createStackNavigator, createTabNavigator} from 'react-navigation';

import { Tabs } from '../components';
import {Home, Highlight, AllIn, MyStage, HighlightSession} from '../screens';

const stackNavigator = createStackNavigator({
  Home: {
    screen: Home
  },
}, {
  headerMode: 'none',
  // cardStyle: { paddingTop: Platform.OS == 'ios' ? 15 : 0, backgroundColor: '#075394' },
});
const tabNavigator = createTabNavigator({
  AllIn: {
    screen: AllIn,
  },
  Init: {
    screen: stackNavigator,
  },
  MyStage: {
    screen: MyStage,
  }
}, {
  cardStyle: { paddingBottom: 60 },
  initialRouteName: 'Init',
  backBehavior: 'none',
  tabBarPosition: "bottom",
  swipeEnabled: true,
  tabBarComponent: Tabs,
  animationEnabled: true
});

const stackParentNavigator = createStackNavigator({
  TabInit: {
    screen: tabNavigator,
  },
  Highlight: {
    screen: Highlight,
  },
  HighlightSession: {
    screen: HighlightSession
  }
}, {
  headerMode: 'none',
  // cardStyle: { paddingTop: Platform.OS == 'ios' ? 15 : 0, backgroundColor: '#075394' },
});

export default stackParentNavigator
