import React, { useState, useEffect, useRef } from 'react';
import { View, Text ,Image,StyleSheet} from 'react-native';
import Swiper from 'react-native-swiper';

const SwiperComponent = ({ data }) => {

  useEffect(() => {
    console.log(data, 'heredata')
  }, [])
  return (
    <Swiper>
      {data?.map((item, index) => (
        <View key={index} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Image source={{ uri: item }} style={styles.image} />
          {/* <Text>{item?.description}</Text> */}
          {/* Add any other content you want to display for each slide */}
        </View>
      ))}
    </Swiper>
  );
};
const styles = StyleSheet.create({
    itemContainer: {
      marginRight: 10,
      marginLeft: 10,
      alignItems: 'center',
    },
    image: {
      width: '100%',
      height: 200,
    
    },
    title: {
      marginTop: 5,
      textAlign: 'center',
    },
  });
export default SwiperComponent;
