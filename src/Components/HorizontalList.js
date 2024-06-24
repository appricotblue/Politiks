import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import images from '../assets/Images';

const HorizontalList = ({data, onPressStatusUpload, profileImage}) => {
  const renderItem = ({item, index}) => (
    <View style={styles.itemContainer}>
      <Image source={item.imageUrl} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
      {index === 0 && (
        <TouchableOpacity style={styles.addStoryStyle}>
          <Image style={styles.logo} source={images.PlusCircle} />
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{paddingHorizontal: 10, paddingLeft: 10}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  itemContainer: {
    marginRight: 10,
    alignItems: 'center',
  },
  image: {
    width: 65,
    height: 65,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#3A7BD5',
  },
  title: {
    fontFamily:'Jost-Regular',
    marginTop: 5,
    textAlign: 'center',
    color: 'black',
    
  },
  statusUploadIcon: {
    position: 'absolute',
    left: 0,
    bottom: 2,
    backgroundColor: 'white',
  },
  statusUploadBackground: {
    height: 60,
    width: 60,

    borderRadius: 35, // half of height/width for perfect circle
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)', // Adjust opacity or color as needed
  },
  logo: {
    width: 30,
    height: 30,
  },
  outerview: {
    height: 65,
    width: 60,
    marginLeft: 5,
    borderRadius: 40, // half of height/width for perfect circle
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#7E65C0',
  },
  addStoryStyle: {
    width: 30,
    height: 30,
    position: 'absolute',
    top: 45,
    right: 17,
  },
});

export default HorizontalList;
