import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
// import { Ionicons } from '@expo/vector-icons'; // Assuming you're using Ionicons for icons
import images from '../assets/Images';
import {useNavigation} from '@react-navigation/native';

const HomeHeader = ({title, profileImage}) => {
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
        borderBottomWidth: 0.4,
        borderColor: 'grey',
        elevation: 5,
      }}>
      <TouchableOpacity
        style={{flexDirection: 'row'}}
        onPress={() => navigation.navigate('Profile')}>
        <Image
          source={{
            uri: profileImage?.userProfile
              ? profileImage?.userProfile
              : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
          }}
          style={{width: 44, height: 44, marginRight: 15, borderRadius: 22}}
        />
        <Text
          style={{
            fontFamily:'Jost-Bold',
            fontSize: 19,
          
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
          // onPress={() => navigation.navigate('DiscoverTrends')}
        >
          <Image style={{width: 30, height: 30}} source={images.Search} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{marginHorizontal: 10}}
          // onPress={() => navigation.navigate('Inbox')}
        >
          <Image style={{width: 30, height: 30}} source={images.Chat} />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

export default HomeHeader;
