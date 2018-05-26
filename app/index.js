import React, { Component } from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import Navigator from './config/routes';
import { Provider } from 'react-redux';
import store from './config/store';


import {
  View,
  Text
} from 'react-native';


EStyleSheet.build({
  $background: '#00A2E2',
  $headerBlue: '#075394',
  $primaryBlue: '#093697',
  $primaryBlueSelected: 'rgba(9,54,151, 0.3)',
  $whiteButton: '#ffffff',
  $whiteText: '#ffffff',
  $disabledText: "#adbbc4",
});

export default () => (
  <Provider store={store}>
    <Navigator />
  </Provider>
);
