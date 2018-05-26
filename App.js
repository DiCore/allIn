/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity
} from 'react-native';
const window = Dimensions.get('window');
import {NativeModules, NativeEventEmitter} from 'react-native';
var CameraManager = NativeModules.CameraManager;

const calendarManagerEmitter = new NativeEventEmitter(CameraManager);

import CameraView from './screens/CameraView'

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {
  constructor(props){
    super(props);
    this.state = {
      width: window.width,
      height: window.height
    }
  }
  componentDidMount(){
    const subscription = calendarManagerEmitter.addListener(
      'EventResize',
      (event) => {
        this.setState({width: event.width, height: event.height})
      }
    );
  }
  render() {
    return (
      <View style={styles.container}>
        <CameraView style={{ width: this.state.width, height: this.state.height, position: 'absolute' }} />
        <TouchableOpacity onPress={() => {
          CameraManager.generateHighlight(20)
        }}>
          <Text>Button here</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
