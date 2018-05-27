import React, { Component } from 'react';
import { connect } from 'react-redux';
import Video from 'react-native-video';
import styles from './styles';

import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image
} from 'react-native';

import { ListItem } from '../../components';

class VideoItem extends Component {
  constructor(props){
    super(props);
    this.state = {
      pause: true,
      videoPath: {uri: this.props.videoPath || ''}
    }
  }

  playVideo(){
    this._video.presentFullscreenPlayer();
    this.setState({pause: false});
  }

  _onEndVideo(){
    this.setState({videoPath: require('../../resources/test.mov')});
    this.setState({pause: true}, () => {
      this.setState({pause: false});
    });
    // this._video.dismissFullscreenPlayer();
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.videoContainer}>
          <Video
            paused={this.state.pause}
            source={this.state.videoPath}
            rate={1}
            repeat
            volume={1.0}
            resizeMode="contain"
            ref={(ref) => {
              this._video = ref
            }}
            style={styles.video}
            onEnd={this._onEndVideo.bind(this)}
          />
          {this.state.pause && (
            <TouchableOpacity style={styles.playButton} onPress={this.playVideo.bind(this)}>
              <Image source={require('../../resources/play.png')} resizeMode={'contain'} style={styles.playButtonIcon}/>
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.socialButtons}>
          <TouchableOpacity style={styles.socialTouch}>
            <Image source={require('../../resources/liked.png')} resizeMode='contain' style={styles.socialIconImage} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialTouch}>
            <Image source={require('../../resources/share.png')} resizeMode='contain' style={styles.socialIconImage} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialTouch}>
            <Image source={require('../../resources/fav.png')} resizeMode='contain' style={styles.socialIconImage} />
          </TouchableOpacity>
        </View>
        <View style={styles.listItems}>
          <ListItem icon={require('../../resources/heart-rate.png')} title="Avg Heart Rate 62BPM" />
          <ListItem icon={require('../../resources/steps.png')} title="Steps per session 6,187" />
          <ListItem icon={require('../../resources/callories.png')} title="Callories 208" />
        </View>
      </View>
    );
  }
}

export default VideoItem;
