import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './styles';

import {
  View,
  Text,
  TouchableOpacity
} from 'react-native';

class MyStage extends Component {
  render(){
    return (
      <View style={styles.container}>
        <View style={styles.innerWrap}>
          <Text>THIS IS My Stage</Text>
        </View>
      </View>
    )
  }
}

export default connect()(MyStage);
