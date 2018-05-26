import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './styles';

import {
  View,
  Text,
  TouchableOpacity
} from 'react-native';

class Feed extends Component {
  render(){
    return (
      <View style={styles.container}>
        <Text>THIS IS THE FEED</Text>
      </View>
    )
  }
}

export default connect()(Feed);
