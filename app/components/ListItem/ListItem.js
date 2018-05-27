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

class ListItem extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image
          source={this.props.icon || require('../../resources/sport.png')}
          resizeMode="contain"
          style={styles.icon}
        />
        <Text style={styles.listText}>{this.props.title || `Football / Soccer`}</Text>
      </View>
    );
  }
}

export default ListItem;
