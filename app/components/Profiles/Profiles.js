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

class Profiles extends Component {

  renderProfiles(){
    return this.props.profiles.map((p, key) => {
      return (
        <View style={styles.profileWrap}>
          <Image source={p.avatar} resizeMode="contain" style={styles.avatar} />
          <Text style={styles.profileText}> {p.name} </Text>
        </View>
      );
    })
  }

  render(){
    return (
      <View style={styles.container}>
        <ScrollView horizontal={true}>
          {this.renderProfiles()}
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  profiles: state.profiles.data
})

export default connect(mapStateToProps)(Profiles);
