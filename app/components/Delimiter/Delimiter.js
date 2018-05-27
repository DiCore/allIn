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

class Delimeter extends Component {
  render() {
    return (
      <View style={styles.container}></View>
    );
  }
}

export default Delimeter;
