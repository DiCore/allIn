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
      paused: this.props.navigation.state.params.videos.map((v) => {return true})
    }
  }
  renderVideos(){
    let videos = this.props.navigation.state.params.videos;
    return (
      <ScrollView>
        {videos.map((v, key) => {
          return (
            <View style={styles.videoWrap}>
              <Video
                key={key}
                paused={this.state.paused[key]}
                source={{uri: v.videoPath}}
                poster={v.imagePath}
                rate={1}
                volume={1.0}
                resizeMode="contain"
                ref={(ref) => {
                  this.players[key] = ref
                }}
                style={styles.video}
              />
              <TouchableOpacity onPress={() => {
                let newPlayings = this.state.paused.slice(0);
                newPlayings[key] = false;
                console.log("STYFF", key, this.players[key])
                this.setState({paused: newPlayings});
              }}> <Text>PLAY</Text> </TouchableOpacity>
            </View>
          );
        })}
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
