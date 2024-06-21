import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, Dimensions } from 'react-native';
import images from '../../assets/Images';
import { getHeight, getWidth } from '../../Theme/Constants';
import Footer from '../../Components/Footer';

const Reels = () => {
  const data = [
    { id: '1', imageUrl: images.Welcome_1 },
    { id: '2', imageUrl: images.Welcome_1 },
    { id: '3', imageUrl: images.Welcome_1 },
    // Add more data as needed
  ];
  const [liked, setLiked] = useState(false);

  const toggleLike = () => {
    setLiked(!liked);
  };
  const renderItem = ({ item }) => (
    <View style={styles.reelItem}>
      <Image source={item.imageUrl} style={styles.image} />
      <View onPress={toggleLike} style={styles.likeButton}>
    <View style={{flexDirection:'column',width:50 ,justifyContent:'center', alignItems:'center'}}>
    <Image
          source={liked ? images.ThumbsUp : images.ThumbsUp}
          style={styles.likeIcon}
        />
        <Text style={styles.liketext} >1.5 k</Text>
    </View>
       
    <View style={{flexDirection:'column',width:50 ,justifyContent:'center', alignItems:'center'}}>
    <Image
          source={liked ? images.Comment : images.Comment}
          style={styles.likeIcon}
        />
        <Text style={styles.liketext}  >386</Text>
    </View>
    <View style={{flexDirection:'column',width:50 ,justifyContent:'center', alignItems:'center'}}>
    <Image
          source={liked ? images.Union : images.Union}
          style={styles.likeIcon}
        />
        <Text style={styles.liketext}  >251</Text>
    </View>
    <View style={{flexDirection:'column',width:50 ,justifyContent:'center', alignItems:'center'}}>
    <Image
          source={liked ? images.Whiteshare : images.Whiteshare}
          style={styles.likeIcon}
        />
        <Text style={styles.liketext}  >251</Text>
    </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        // horizontal
        pagingEnabled
      />
       <Footer title={'reel'} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  reelItem: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    width: null,
    height: null,
  },
  likeButton: {
    position: 'absolute',
    right:10,
  bottom:155,
   
    zIndex: 1,
    backgroundColor:'rgba(0, 0, 0, 0.5)',
    height:300,
    alignSelf:'center',
    width:48,
    justifyContent: 'space-around',
    alignItems: 'center',
    borderRadius:25,

    // flexDirection:'row',
    alignItems:''
  },
  likeIcon: {
    width: 26,
    height: 27,
  },
  liketext: { color: 'white', fontFamily: 'Jost-Bold', fontWeight: '500', fontSize: 15 }
});

export default Reels;
