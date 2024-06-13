import React from 'react';
import { View, Text, FlatList, Image ,TouchableOpacity, StyleSheet} from 'react-native';
import { getHeight, getWidth } from '../Theme/Constants';
import LinearGradient from 'react-native-linear-gradient';
import CommonButton from './CommonButton';
import images from '../assets/Images';

const DiscoverItems = ({ data }) => {
  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.itemContainer}>
      {/* Image */}
     
      <Image source={item.image} style={styles.image} />
      <View style={styles.avatarContainer}>
        <Image source={item.image} style={styles.avatar} />
      </View>
      {/* Name */}
      <View style={{flexDirection:'row',justifyContent:'center',alignItems:'baseline'}}>
      <Text style={styles.name}>{item.name}</Text>
      <Image source={images.PurpleTick} style={{width:20,height:20,marginLeft:15}} />
      </View>
      
      {/* Followers */}
      <Text>{item.followers} Followers</Text>
      {/* Follow Button */}
      <TouchableOpacity style={styles.followButton}>
        <LinearGradient   
          start={{x: 0, y: 0.5}} 
          end={{x: 1, y: 0.5}} 
          colors={['#8360C3', '#2EBF91']} 
          style={{width:100,borderRadius: 20,justifyContent:'center',alignItems:'center',height:30}}>
          <Text style={{fontWeight: 'bold', color: 'white', justifyContent:'center',alignItems:'center',fontSize:18}}>
            Follow
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      numColumns={2}
      contentContainerStyle={styles.flatlistContainer}
    />
  );
};

const styles = StyleSheet.create({
  flatlistContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    // backgroundColor:'green',
    width:getWidth(1.1),
    alignItems:'center'

  },
  itemContainer: {
    alignItems: 'center',
    // justifyContent: 'center',
    width: getWidth(2.3),
    height: getHeight(3.8),
    backgroundColor: 'white',
   // Add margin for spacing between items
    marginBottom: 20, // Add margin below each item
    borderRadius:15,
    marginleft:7,
    marginRight:7
  },
  image: {
    width: '100%',
    height: '38%',
    borderTopLeftRadius:15,
    borderTopRightRadius:15
  },
  avatarContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    overflow: 'hidden',
    position: 'absolute',
    top:40,
    backgroundColor:'pink',
    justifyContent:'center',
    alignItems:'center'
  },
  avatar: {
    width: '90%',
    height: '90%',
    borderRadius:45
  },
  name: {
    fontFamily:'Jost',
    fontWeight: '500', 
    fontSize:18,
    marginTop:30,
    color:'black'
  },
  followButton: {
    padding: 10,
    borderRadius: 20,
    marginTop: 5,
  },
});

export default DiscoverItems;
