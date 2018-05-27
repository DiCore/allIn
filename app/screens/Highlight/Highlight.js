import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Image
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
      height: window.height,
      displayHighlights: false,
      selectedTime: 10,
      displayTime: false,
      images: [],
    }
  }
  componentDidMount(){
    CameraManager.startSession();
    const subscription = calendarManagerEmitter.addListener(
      'EventResize',
      (event) => {
        this.setState({width: event.width, height: event.height})
      }
    );
    calendarManagerEmitter.addListener(
      'EventHighlightGenerated',
      (event) => {
        let newImages = this.state.images.slice(0);
        newImages.push(event.imagePath);
        this.setState({images: newImages});
      }
    );
    calendarManagerEmitter.addListener(
      'EventHighlightsFinished',
      (event) => {
        this.props.navigation.navigate('HighlightSession', {videos: event})
      }
    );
  }

  renderImages(){
    if(!this.state.displayHighlights) return null;
    return (
      <View style={styles.gallery}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {this.state.images.map((img, key) => {
            return (<Image key={key} source={{uri: img}} resizeMode={'cover'} style={styles.repeatImages} />)
          })}
        </ScrollView>
      </View>
    );
  }

  selectTime(time){
    this.setState({selectedTime: time});
  }

  renderTimer(){
    if(!this.state.displayTime) return null;
    return (
      <View style={styles.timer}>
        <ScrollView
          contentContainerStyle={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          pagingEnabled={true}
          snapToInterval={40}
          decelerationRate="fast"
          snapToAlignment={'center'}
        >
          <TouchableOpacity onPress={this.selectTime.bind(this, 5)}>
            <Text style={[styles.pickTime, {color: this.state.selectedTime === 5 ? 'white' : "#34495e"}]}>5 sec</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.selectTime.bind(this, 10)}>
            <Text style={[styles.pickTime, {color: this.state.selectedTime === 10 ? 'white' : "#34495e"}]}>10 sec</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.selectTime.bind(this, 15)}>
            <Text style={[styles.pickTime, {color: this.state.selectedTime === 15 ? 'white' : "#34495e"}]}>15 sec</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }

  render(){
    return (
      <View style={styles.container}>
        <CameraView style={{ width: this.state.width, height: this.state.height, position: 'absolute' }} />
        <View style={[styles.wholeWrap, {width: this.state.width, height: this.state.height}]}>
          <TouchableOpacity style={styles.endButton} onPress={() => {
            CameraManager.stopSession();
          }}>
            <Text style={styles.endButtonText}>end</Text>
          </TouchableOpacity>
          <View style={styles.mainButtons}>
            <TouchableOpacity style={styles.createButton} onPress={() => {
              // this.props.dispatch({type: "LOADING_START"})
              this.setState({displayTime: !this.state.displayTime})
            }}>
              <Image source={require('../../resources/timer.png')} defaultSource={require('../../resources/timer.png')} style={styles.imageButtonSmall} resizeMode="contain" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.createButton} onPress={() => {
              // this.props.dispatch({type: "LOADING_START"})
              CameraManager.generateHighlight(this.state.selectedTime)
            }}>
              <Image source={require('../../resources/red-button.png')} defaultSource={require('../../resources/red-button.png')} style={styles.imageButton} resizeMode="contain" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.createButton} onPress={() => {
              // this.props.dispatch({type: "LOADING_START"})
              this.setState({displayHighlights: !this.state.displayHighlights});
            }}>
              <Image source={require('../../resources/gallery.png')} defaultSource={require('../../resources/gallery.png')} style={styles.imageButtonSmall} resizeMode="contain" />
            </TouchableOpacity>
          </View>
          {this.renderImages()}
          {this.renderTimer()}
        </View>
      </View>
    )
  }
}

export default connect()(Highlight)
