import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './styles';

import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image
} from 'react-native';

class HighlightSession extends Component {
  render(){
    let videos = this.props.navigation.state.params.videos;
    return (
      <View style={styles.container}>
        <Text>VideoScreen</Text>
      </View>
    );
  }
}

export default HighlightSession;
