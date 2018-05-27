import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './styles';
import { VideoHighlight } from '../../components';

import {
  View,
  Text,
  TouchableOpacity,
  Image
} from 'react-native';

class MyStage extends Component {
  render(){
    return (
      <View style={styles.container}>
        <View style={styles.innerWrap}>

          <View style={styles.headWrap}>
            <Image source={require('../../resources/my-stage.png')} style={styles.headerImage} resizeMode="contain" />
          </View>
          <View style={styles.videosWrap}>
            {this.props.videos.map((video, key) => {
              return (<VideoHighlight video={video} key={key} />)
            })}
          </View>
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  videos: state.videos.dataMe
})


export default connect(mapStateToProps)(MyStage);
