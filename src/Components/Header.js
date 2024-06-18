import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
// import { Ionicons } from '@expo/vector-icons'; // Assuming you're using Ionicons for icons
import images from '../assets/Images';
import {useNavigation} from '@react-navigation/native';

const Header = ({title}) => {
  const navigation = useNavigation();
  return (
    <LinearGradient
      colors={['white', 'white']}
      start={{x: 0, y: 0.5}}
      end={{x: 1, y: 0.5}}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
      }}>
      {/* Back Arrow */}
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={() => navigation.goBack()}>
        <Image
          source={images.LeftBackPNG}
          style={{width: 32, height: 32, marginRight: 15}}
        />
        <Text style={{color: 'black', fontSize: 20, fontWeight: '700'}}>
          {title}
        </Text>
      </TouchableOpacity>

      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          style={{marginHorizontal: 10}}
          onPress={() => navigation.navigate('DiscoverTrends')}>
          <Image style={{width: 30, height: 30}} source={images.GearPNG} />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

export default Header;
