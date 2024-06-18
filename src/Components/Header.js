import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
// import { Ionicons } from '@expo/vector-icons'; // Assuming you're using Ionicons for icons
import images from '../assets/Images';
import { useNavigation } from '@react-navigation/native';

const Header = ({ title }) => {
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
      }}
    >
      {/* Back Arrow */}
      <TouchableOpacity style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}} onPress={() => navigation.goBack()}>
      <Image source={ images.ArrowLeft}style={{width:32,height:32,marginRight:15}} />
     <Text style={{ color: 'white', fontSize: 20 }}>{title}</Text> 
      
      </TouchableOpacity>

      {/* Title */}
      {/* <Text style={{ color: 'white', fontSize: 20 }}>{title}</Text> */}

      {/* Search and Message Icons */}
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity style={{ marginHorizontal: 10 ,backgroundColor:'white',width:90,borderRadius:15,flexDirection:'row',justifyContent:'center',alignItems:'center'}} onPress={() =>navigation.navigate('SuperHugs') }>
        <Image
                         style={{width:18,height:23,marginRight:6}}
                        source={images.Pinkhug}
                    />
                    <Text style={{fontFamily:'Jost',fontWeight:'700',color:'black'}}>12563</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ marginHorizontal: 10 }} onPress={() => navigation.navigate('DiscoverTrends') }>
        <Image
                         style={{width:30,height:30,}}
                        source={images.Gear}
                    />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

export default Header;
