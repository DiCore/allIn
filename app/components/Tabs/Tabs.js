import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './styles';

import { View, Text, Image, TouchableOpacity } from 'react-native';

const AllInImage = require('../../resources/all-in-white.png');

class Tabs extends Component {

  _getImage(name){
    switch (name) {
      case "AllIn":
        return AllInImage;
      default:
        return AllInImage;
    }
  }

  renderTabs(){
    let currentRoute = this.props.navigation.state.routes[this.props.navigation.state.index];
    let routes = this.props.navigation.state.routes;
    return (
      <View style={styles.tabsWrap}>
        {routes.map((route, key) => {
          return (
            <View key={key} style={styles.tabEl}>
              <Image source={this._getImage(route.routeName)} resizeMode='contain' style={styles.tabImage} />
            </View>
          )
        })}
      </View>
    )
  }

  render(){
    return (
      <View style={styles.container}>
        {this.renderTabs()}
      </View>
    );
  }
}

export default Tabs;
