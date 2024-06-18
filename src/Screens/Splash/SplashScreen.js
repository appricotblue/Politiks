import React, { useEffect } from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';
import messaging from '@react-native-firebase/messaging';

const SplashScreen = ({ navigation }) => {

  const getFcmToken = async () => {
    console.log('Attempting to get FCM token...');
    try {
      const fcmToken = await messaging().getToken();
      if (fcmToken) {
        console.log('Your Firebase Token is:', fcmToken);
        // Save the token in your database if necessary
      } else {
        console.log('Failed to get FCM token');
      }
    } catch (error) {
      console.error('Error getting FCM token:', error);
    }
  };

  useEffect(() => {
    const initializeFCM = async () => {
      console.log('Requesting user permission for notifications...');
      await requestUserPermission();
      console.log('User permission granted');
      getFcmToken();

      const unsubscribe = messaging().onMessage(async remoteMessage => {
        console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
        // Handle your message here
      });

      return unsubscribe;
    };

    initializeFCM();
  }, []);


  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('LoginScreen');
    }, 4000); 

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
