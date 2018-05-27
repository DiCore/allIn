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

class Header extends Component {
  render(){
    return (
      <View style={styles.container}>
        <View style={styles.headerTextView}>
          <Text style={styles.headerText}>Game title</Text>
        </View>
        <TouchableOpacity onPress={this.props.onCancel} style={styles.cancelButton}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default Header
