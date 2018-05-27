import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './styles';
import Video from 'react-native-video';
import { ListItem } from '../../components';

import {
  View,
  Text,
  TouchableOpacity,
  Image
} from 'react-native';

class VideoHighlight extends Component {
  render(){
    return (
      <View style={styles.container}>
        <View style={styles.itemWrap}>
          <Video
            paused={false}
            source={this.props.video.video}
            rate={1}
            repeat
            volume={1.0}
            resizeMode="contain"
            style={styles.video}
          />
          <View style={{flex: 1}}>
            <ListItem icon={require('../../resources/sport.png')} title={this.props.video.type} />
            <ListItem icon={require('../../resources/location.png')} title={this.props.video.location} />
            <ListItem icon={require('../../resources/heart-rate.png')} title={this.props.video.heart_rate} />
            <ListItem icon={require('../../resources/steps.png')} title={this.props.video.steps} />
            <ListItem icon={require('../../resources/callories.png')} title={this.props.video.callories} />
          </View>
        </View>
      </View>
    )
  }
}

export default connect()(VideoHighlight);
