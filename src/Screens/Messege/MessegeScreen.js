import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {signup} from '../../api';

const MessegeScreen = ({navigation}) => {
  return (
    <View
      style={{
        backgroundColor: 'black',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={{color: 'white', fontSize: 20, fontWeight: '700'}}>
          Updating Soon
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default MessegeScreen;
