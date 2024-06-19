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

const HorizontalList = ({data, onPressStatusUpload}) => {
  const renderItem = ({item}) => (
    // <View style={styles.itemContainer}>
    //   <Image source={item.imageUrl} style={styles.image} />
    //   <Text style={styles.title}>{item.title}</Text>
    // </View>
    <View style={styles.itemContainer}>
      <Image source={item.imageUrl} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
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
      {/* Status Upload Icon */}
      {/* <View style={styles.statusUploadIcon} onPress={onPressStatusUpload}>
        <TouchableOpacity
          onPress={onPressStatusUpload}
          style={styles.outerview}>
          <ImageBackground
            source={images.Profile}
            resizeMode="cover"
            style={styles.statusUploadBackground}>
            <Image style={styles.logo} source={images.PlusCircle} />
          </ImageBackground>
        </TouchableOpacity>

        <Text style={styles.title}>My Story</Text>
      </View> */}
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
    borderColor: 'pink',
  },
  title: {
    marginTop: 5,
    textAlign: 'center',
    color: 'black',
    fontWeight: '600',
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
    position: 'absolute',
    top: 43,
    right: 14,
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
});

export default HorizontalList;
