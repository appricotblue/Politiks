import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
// import { Ionicons } from '@expo/vector-icons'; // Assuming you're using Ionicons for icons
import images from '../assets/Images';
import {useNavigation} from '@react-navigation/native';

const HomeHeader = ({title}) => {
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
        style={{flexDirection: 'row'}}
        onPress={() => navigation.navigate('Profile')}>
        <Image
          source={images.Profile}
          style={{width: 44, height: 44, marginRight: 15}}
        />
        <Text
          style={{
            fontSize: 19,
            fontWeight: '700',
            color: 'black',
            marginTop: 10,
          }}>
          Politiks
        </Text>
        {/* <Image
                       style={{width:40,height:40,}}
                        source={images.Logo}
                    /> */}
        {/* <Ionicons name="arrow-back" size={24} color="white" /> */}
      </TouchableOpacity>

      {/* Title */}
      {/* <Text style={{ color: 'white', fontSize: 20 }}>{title}</Text> */}

      {/* Search and Message Icons */}
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          style={{marginHorizontal: 10}}
          onPress={() => navigation.navigate('DiscoverTrends')}>
          <Image style={{width: 30, height: 30}} source={images.Search} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{marginHorizontal: 10}}
          onPress={() => navigation.navigate('Inbox')}>
          <Image style={{width: 30, height: 30}} source={images.Chat} />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

export default HomeHeader;
