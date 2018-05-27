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

class Badge extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            source={this.props.image || require('../../resources/adidas.png')}
            style={styles.imageIcon}
          />
          <Text style={styles.textInImage}>{this.props.innterText || 'equipment'}</Text>
        </View>
        <Text style={styles.badgeText}>+{this.props.points || 50} points</Text>
      </View>
    );
  }
}

export default Badge;
