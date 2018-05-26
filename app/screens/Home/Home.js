import React, { Component } from 'react';
import { connect } from 'react-redux';
import Video from 'react-native-video';
import styles from './styles';

import {
  Container,
  Tabs
} from '../../components';

import {
  View,
  Text,
  TouchableOpacity,
  Image
} from 'react-native';

class Home extends Component {
  render(){
    return (
      <Container>
        <View style={styles.videoContainer}>
          {/*<Video
            source={require('../../resources/test.mp4')}
            rate={1}
            volume={1.0}
            muted={true}
            resizeMode="cover"
            repeat
            style={styles.video}
          />*/}
          <Image source={require('../../resources/back_main.png')} resizeMode='cover' style={styles.video} />
          <View style={styles.innerWrap}>
            <TouchableOpacity style={styles.createButton} onPress={() => {
              // this.props.dispatch({type: "LOADING_START"})
              this.props.navigation.navigate('Highlight');
            }}>
            <Text style={{color: 'white'}}>CREATE</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Container>
    )
  }
}

export default connect()(Home);
