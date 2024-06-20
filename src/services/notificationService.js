import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
    getFcmToken();
  }
}

const getFcmToken = async () => {
  try {
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    console.log(fcmToken, 'oldFcmToken');
    if (!fcmToken) {
      fcmToken = await messaging().getToken();
      if (fcmToken) {
        console.log(fcmToken, 'new fcm token');
        await AsyncStorage.setItem('fcmToken', fcmToken);
      }
    }
  } catch (error) {
    console.log(error);
  }
};

export const notificationServices = () => {
  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log(
      remoteMessage.notification,
      'Notification caused app to open from background state',
    );
  });

  messaging().onMessage(async remoteMessage => {
    console.log(remoteMessage, 'Notification in Foreground');
  });

  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log(
          remoteMessage.notification,
          'Notification cased app to open from quict state',
        );
        setInitialRoute(remoteMessage.data.type);
      }
    });
};