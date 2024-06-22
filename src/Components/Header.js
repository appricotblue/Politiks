import React from 'react';
import {View, Text, TouchableOpacity, Image, Alert} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
// import { Ionicons } from '@expo/vector-icons'; // Assuming you're using Ionicons for icons
import images from '../assets/Images';
import {useNavigation} from '@react-navigation/native';
import local from '../Storage/Local';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';

const Header = ({title}) => {
  const navigation = useNavigation();
  React.useEffect(() => {
    GoogleSignin.configure({
      webClientId: '792282806865-b24ig3hoaa51ioj91ttgerce3le6ao2m.apps.googleusercontent.com',
      offlineAccess: true,
    });
  }, []);

  const signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      console.log('User signed out');
    } catch (error) {
      console.error(error);
    }
  };

  const logOut = async () => {
    // await local.storEexistuser('existuser', '');
    // navigation.navigate('LoginScreen');
    Alert.alert(
      'Log Out',
      'Are you sure you want to log out?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Logout canceled'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: async () => {
            await local.storEexistuser('existuser', '');
            signOut();
            navigation.navigate('LoginScreen');
          },
        },
      ],
      {cancelable: false},
    );
  };
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
      {/* Back Arrow */}
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={() => navigation.goBack()}>
        <Image
          source={images.LeftBackPNG}
          style={{width: 32, height: 32, marginRight: 15}}
        />
        <Text style={{color: 'black', fontSize: 20, fontWeight: '700'}}>
          {title}
        </Text>
      </TouchableOpacity>

      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          style={{marginHorizontal: 10}}
          onPress={() => logOut()}>
          <Image style={{ width: 30, height: 30 }} source={images.LogOutPNG} />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

export default Header;
