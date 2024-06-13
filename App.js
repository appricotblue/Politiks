import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  Dimensions,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Provider } from 'react-redux';
import reduxStore from './src/redux/store';
import Routes from './src/Routes';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const App = () => {
  return (
    <Provider store={reduxStore}>
      <Routes />
    </Provider>
  );
};

export default App;
