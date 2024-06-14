import React, { useEffect } from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';
import messaging from '@react-native-firebase/messaging';

const SplashScreen = ({ navigation }) => {

  const getFcmToken = async () => {
    console.log('hii token')
    const fcmToken = await messaging().getToken();
    if (fcmToken) {
      console.log('Your Firebase Token is:', fcmToken);
      // You can save this token in your database if you need
    } else {
      console.log('Failed to get FCM token');
    }
  }
  useEffect(() => {

    getFcmToken()
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('LoginScreen'); // Replace 'LoginScreen' with the actual name of your login screen
    }, 2000); // Adjust the time (in milliseconds) as needed

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 50, fontWeight: '700', color: 'black' }}>
        Politiks
      </Text>
      {/* <Image source={require('../../assets/Images/Splash.png')} style={styles.image} /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});

export default SplashScreen;
