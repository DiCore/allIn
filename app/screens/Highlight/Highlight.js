import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  View,
  Text,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import {NativeModules, NativeEventEmitter} from 'react-native';
import CameraView from '../CameraView';
import styles from './styles'

const window = Dimensions.get('window');
const CameraManager = NativeModules.CameraManager;
const calendarManagerEmitter = new NativeEventEmitter(CameraManager);

class Highlight extends Component {
  constructor(props){
    super(props)
    this.state = {
      width: window.width,
      height: window.height
    }
  }
  componentDidMount(){
    // CameraManager.startSession();
    const subscription = calendarManagerEmitter.addListener(
      'EventResize',
      (event) => {
        this.setState({width: event.width, height: event.height})
      }
    );
  }
  render(){
    return (
      <View style={styles.container}>
        <CameraView style={{ width: this.state.width, height: this.state.height, position: 'absolute' }} />
        <View style={styles.buttonsWrap}>
          <TouchableOpacity style={styles.buttonItems} onPress={() => {
            CameraManager.generateHighlight(20)
          }}>
          <Text>GENERATE</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonItems} onPress={() => {
            CameraManager.stopSession()
          }}>
          <Text>STOP</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

export default connect()(Highlight)
