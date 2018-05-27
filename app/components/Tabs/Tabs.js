import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './styles';

import { View, Text, Image, TouchableOpacity } from 'react-native';

class Tabs extends Component {

  getTabName(name){
    switch (name) {
      case "AllIn": return "all in";
      case "MyStage": return "my stage";
      case "Init": return "create";
      default: return "create";

    }
  }

  renderTabs(){
    let currentRoute = this.props.navigation.state.routes[this.props.navigation.state.index];
    let routes = this.props.navigation.state.routes;
    const textStyles = styles.tabText;
    return (
      <View style={styles.tabsWrap}>
        {routes.map((route, key) => {
          return (
            <TouchableOpacity onPress={() => {
              this.props.navigation.navigate(route.routeName);
            }} key={key} style={styles.tabEl}>
              {currentRoute !== route && (
                <Text style={[textStyles]}>{this.getTabName(route.routeName)}</Text>
              )}
              {currentRoute === route && (
                <Text style={[textStyles, {color: '#a40b09'}]}>{this.getTabName(route.routeName)}</Text>
              )}
            </TouchableOpacity>
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
