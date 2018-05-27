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

import { Header, Profiles, ListItem, Badge, Delimiter, VideoItem } from '../../components';

class HighlightSession extends Component {
  constructor(props){
    super(props);
    this.players = {};
    this.state = {
      // paused: this.props.navigation.state.params.videos.map((v) => {return true})
    }
  }

  componentDidMount(){
    this.props.dispatch({type: "SAVE_VIDEOS", payload: this.props.navigation.state.params.videos})
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

  renderProfile() {
    return (
      <View style={styles.profileWrap}>
        <Image source={require('../../resources/avatar.jpg')} resizeMode="contain" style={styles.avatar} />
        <Text style={styles.profileText}> Me </Text>
      </View>
    );
  }

  render(){

    return (
      <View style={styles.container}>
        <Header onCancel={() => {
          this.props.navigation.navigate('MyStage');
        }} />
        <ScrollView pagingEnabled={false}>
          <Profiles />
          <View style={styles.sessionParams}>
            <ListItem title="Football / Soccer"/>
            <ListItem icon={require('../../resources/location.png')} title="Casa del Lector, Iron Hack"/>
          </View>
          <View style={styles.sessionMetrics}>
            {this.renderProfile()}
            <View style={styles.sessionLeft}>
              <ListItem icon={require('../../resources/heart-rate.png')} title="Avg Heart Rate 62BPM" />
              <ListItem icon={require('../../resources/steps.png')} title="Steps per session 6,187" />
              <ListItem icon={require('../../resources/callories.png')} title="Callories 208" />
            </View>
          </View>
          <View style={styles.badgesWrap}>
            <Badge />
            <Badge
              image={require('../../resources/videos.png')}
              innterText="5 videos"
              points={5}
            />
            <Badge
              image={require('../../resources/like.png')}
              innterText="5 likes"
              points={5}
            />
            <Badge
              image={require('../../resources/all-in.png')}
              innterText="5 shares"
              points={5}
            />
            <Badge
              image={require('../../resources/instagram.png')}
              innterText="5 shares"
              points={5}
            />

          </View>
          <Delimiter />
          {this.props.navigation.state.params.videos.map((video, key) => {
            return (<VideoItem key={key} videoPath={video.videoPath} />)
          })}

        </ScrollView>
      </View>
    );
  }
}

export default connect()(HighlightSession);
