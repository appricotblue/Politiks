import React, { useEffect } from 'react';
import { View, StyleSheet, Text, SafeAreaView, Dimensions, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Provider } from 'react-redux';
import reduxStore from './src/redux/store';
import Routes from './src/Routes';
import messaging from '@react-native-firebase/messaging';
import { requestUserPermission } from './src/services/notificationService';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const App = () => {
  useEffect(() => {
    requestUserPermission();

    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
      // Handle your message here
    });

    return unsubscribe;
  }, []);

  return (
    <Provider store={reduxStore}>
      <Routes />
    </Provider>
  );
};

export default App;
