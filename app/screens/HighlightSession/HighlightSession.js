import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './styles';
import Video from 'react-native-video';

import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image
} from 'react-native';

class HighlightSession extends Component {
  constructor(props){
    super(props);
    this.players = {};
    this.state = {
      // paused: this.props.navigation.state.params.videos.map((v) => {return true})
    }
  }
  renderVideos(){
    let videos = []//this.props.navigation.state.params.videos;
    return (
      <ScrollView>
        
      </ScrollView>
    );
  }

  render(){

    return (
      <View style={styles.container}>
        {this.renderVideos()}
      </View>
    );
  }
}

export default HighlightSession;
