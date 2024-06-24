import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  Dimensions,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  ImageBackground,
  Alert,
} from 'react-native';

import TextInputBox from '../../Components/TextInputBox';
import CommonButton from '../../Components/CommonButton';
import {connect} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {setName, setDarkmode} from '../../redux/action';
import AsyncStorage from '@react-native-async-storage/async-storage';
import local from '../../Storage/Local';
import images from '../../assets/Images';
import {getHeight, getWidth} from '../../Theme/Constants';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {googleregister} from '../../api';
// GoogleSignin.configure({
//   // webClientId: '299321119503-rigbrd2tgj9sr1ka0eleoskt2orvpnps.apps.googleusercontent.com',
//   webClientId: '299321119503-k2vd3046eqvod4ssacjpl6jvd1ttfufl.apps.googleusercontent.com',

// });

var windowWidth = Dimensions.get('window').width; //full width
var windowHeight = Dimensions.get('window').height; //full height

const LoginScreen = props => {
  const navigation = useNavigation();
  const [email, changeemail] = useState('');
  const [checkEmail, changecheckEmail] = useState('');
  const [checkPassword, changecheckPassword] = useState('');
  const [password, changepassword] = useState('');
  const [isLogin, changeIsLogin] = useState(false);
  const [googledata, changegoogledata] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // const handleGoogleSignIn = async () => {
  //   try {
  //     await GoogleSignin.hasPlayServices();
  //     const userInfo = await GoogleSignin.signIn();
  //     console.log(userInfo, 'userinfo');
  //     Alert.alert(userInfo)
  //     navigation.replace('Home');
  //   } catch (error) {
  //     console.error('Error in Google login:', error);
  //     console.error('Error in Google login:', error.code, error.message);
  //   }
  // };

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log(userInfo);
      changegoogledata(userInfo);
      handleGoogleRegister(userInfo);
    } catch (error) {
      console.log(error);
      console.error('Error in Google login:', error.code, error.message);
    }
  };

  const handleGoogleRegister = async userInfo => {
    console.log(userInfo?.user?.id, 'tdat');
    try {
      setIsLoading(true);
      const response = await googleregister(
        userInfo?.user?.name,
        userInfo?.user?.email,
        userInfo?.user?.id,
      );
      setIsLoading(false);
      console.log(response, 'login api response');
      if (response.message === 'User registered successfully') {
        await local.storeUserId('UserId', response?.user?.id.toString());
        await local.storEexistuser('existuser', 'newuser');
        navigation.replace('TellusAboutyou');
      } else {
        setIsLoading(false);
        await local.storeUserId('UserId', response?.user?.id.toString());
        await local.storEexistuser('existuser', 'existuser');
        navigation.replace('Home');
      }
    } catch (error) {
      setIsLoading(false);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        Alert.alert('Error', error.response.data.message);
      } else {
        Alert.alert('Error', 'An error occurred during login.');
      }
    }
  };

  const isValidate = async () => {
    const emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regular expression for email format

    if (email === '') {
      changecheckEmail('Please enter Email id'); // Set error message
      // alert('Please enter Email id'); // Set error message
    } else if (!emailFormat.test(email)) {
      changecheckEmail('Please enter a valid email address'); // Set error message for invalid email format
      // alert('Please enter a valid email address'); // Set error message for invalid email format
    } else if (password == '') {
      changecheckPassword('Please enter password'); // Set error message
      // alert('Please enter password'); // Set error message
    } else if (password?.length < 6) {
      changecheckPassword('Password must be at least 6 characters long'); // Set error message
      // alert('Please enter password'); // Set error message
    } else {
      navigation.replace('Home');
      // local.storeLogin(true);
    }
  };
  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '792282806865-b24ig3hoaa51ioj91ttgerce3le6ao2m.apps.googleusercontent.com',
      offlineAccess: true,
    });
  }, []);
  // useEffect(() => {
  //   GoogleSignin.configure({
  //     webClientId: '299321119503-rigbrd2tgj9sr1ka0eleoskt2orvpnps.apps.googleusercontent.com',
  //     // webClientId: '299321119503-k2vd3046eqvod4ssacjpl6jvd1ttfufl.apps.googleusercontent.com',
  //     offlineAccess: true,
  //     hostedDomain: '',
  //     forceCodeForRefreshToken: true,
  //   });
  // }, []);
  const clearAll = async () => {
    changeemail('');
    changepassword('');
  };
  // useEffect(() => {
  //   AsyncStorage.getItem('isLogin', value => {
  //     if (value != null || value != undefined) {
  //       navigation.reset('Home');
  //     } else {
  //       changeIsLogin(false);
  //     }
  //   });
  // }, []);
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      changeemail('');
      changepassword('');
      //Put your Data loading function here instead of my loadData()
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={images.Welcome_3}
        resizeMode="cover"
        style={styles.image}>
        <View
          style={{
            width: getWidth(1),
            marginTop: 160,
            marginBottom: 40,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={styles.TileTxt}>{'Welcome to Politiks'}</Text>
          <Text style={styles.subTxt}>{'A Community for Everyone.'}</Text>
        </View>

        <CommonButton
          onPress={() => signIn()}
          // onPress={() => handleGoogleSignIn()}
          // onPress={() => navigation.replace('Home')}
          color={['white', 'white']}
          title={'Sign-up/Sign-in with Google'}
          width={getHeight(2.3)}
          texttitle={'black'}
          icon={images.googleicone}
        />
        {/* <CommonButton
          onPress={() => isValidate()}
          // onPress={() => navigation.replace('Home')}
          color={['white', 'white']}
          title={'Sign-up/Sign-in with Apple'}
          width={getHeight(2.3)}
          texttitle={'black'}
          icon={images.apple}
        /> */}
        <CommonButton
          onPress={() => navigation.navigate('SignUpwithEmail')}
          // onPress={() => navigation.replace('Home')}
          color={['white', 'white']}
          title={'Sign-up/Sign-in with Email'}
          width={getHeight(2.3)}
          texttitle={'black'}
          icon={images.Envelope}
        />
        {/* <View style={{justifyContent:'flex-end',alignItems:'baseline',height:getHeight(3.5)}}>
        <Text style={styles.subTxt}>{"New to Faniverse?"}</Text>
        <CommonButton
          onPress={() => navigation.replace('SignUpScreen')}
          color={['#ffffff', '#ffffff']}

          title={'Signup'}
          width={getHeight(2.3)}
          texttitle={'black'}
        />
        </View> */}
        {isLoading && (
          <View style={styles.loader}>
            <ActivityIndicator size="large" color="white" />
          </View>
        )}
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 42,
    lineHeight: 84,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#000000c0',
  },
  TileTxt: {
    fontFamily: 'Jost-Bold',
    fontSize: 35,
    color: 'white',
    // fontWeight:'700',
    paddingBottom: 5,
  },
  subTxt: {
    fontSize: getHeight(50),
    color: 'white',
    textAlign: 'center',
    width: getHeight(2.6),
    fontFamily: 'Jost-Regular',
    fontWeight: '300',
    alignSelf: 'center',
  },
});
export default LoginScreen;
