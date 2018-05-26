import React, { Component } from 'react';
import { connect } from 'react-redux';
import Video from 'react-native-video';
import styles from './styles';

import {
  View,
  Text,
  TouchableOpacity
} from 'react-native';

class Home extends Component {
  render(){
    return (
      <View style={styles.videoContainer}>
        <Video
          source={require('../../resources/Final.mp4')}
          rate={1.0}
          volume={1.0}
          muted={true}
          resizeMode="cover"
          repeat
          style={styles.video}
        />

        <TouchableOpacity onPress={() => {
          this.props.dispatch({type: "LOADING_START"})
        }}>
          <Text style={{color: 'white'}}>Some home view Here!</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

export default connect()(Home);
