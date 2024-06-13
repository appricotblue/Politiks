import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import {requestUserPermission} from './src/Utils/PushNotifications';

const App = () => {
  useEffect(() => {
    requestUserPermission();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'black',
      }}>
      <Text style={{color: 'white', fontSize: 20, fontWeight: '700'}}>
        Notification Test
      </Text>
    </View>
  );
};

export default App;
