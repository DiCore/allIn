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

import { Header, Profiles } from '../../components';

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
      <View>
        {videos.map((v, key) => {
          return (
            <View style={styles.videoWrap}>
              <Video
                key={key}
                paused={this.state.paused[key]}
                source={{uri: v.videoPath}}
                poster={v.imagePath}
                rate={1}
                repeat
                volume={1.0}
                resizeMode="contain"
                ref={(ref) => {
                  this.players[key] = ref
                }}
                style={styles.video}
                onEnd={() => {
                  let newPlayings = this.state.paused.slice(0);
                  newPlayings[key] = true;
                  this.setState({paused: newPlayings});
                }}
              />
              <TouchableOpacity onPress={() => {
                let newPlayings = this.state.paused.slice(0);
                newPlayings[key] = false;
                this.setState({paused: newPlayings});
              }}> <Text>PLAY</Text> </TouchableOpacity>
            </View>
          );
        })}
      </View>
    )
  }

  render(){

    return (
      <View style={styles.container}>
        <Header />
        <Profiles />
        {this.renderVideos()}
      </View>
    );
  }
}

export default HighlightSession;
