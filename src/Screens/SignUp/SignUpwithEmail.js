import React, { useState, useEffect } from 'react';
import {
    View,
    StyleSheet,
    Text,
    SafeAreaView,
    Dimensions,
    Image,
    TouchableOpacity,
    ActivityIndicator,
    ImageBackground
} from 'react-native';

import TextInputBox from '../../Components/TextInputBox';
import CommonButton from '../../Components/CommonButton';
import { connect } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { setName, setDarkmode } from '../../redux/action';
import AsyncStorage from '@react-native-async-storage/async-storage';
import local from '../../Storage/Local';
import images from '../../assets/Images';
import { getHeight, getWidth } from '../../Theme/Constants';

var windowWidth = Dimensions.get('window').width; //full width
var windowHeight = Dimensions.get('window').height; //full height

const SignUpwithEmail = props => {
    const navigation = useNavigation();
    const [email, changeemail] = useState('');
    const [checkEmail, changecheckEmail] = useState('');
    const [checkPassword, changecheckPassword] = useState('');
    const [password, changepassword] = useState('');
    const [isLogin, changeIsLogin] = useState(false);

    const getEmail = async () => {
        try {
            const value = await AsyncStorage.getItem('email');
            if (value !== null) {
                changecheckEmail(value);
            }
            const paasword = await AsyncStorage.getItem('password');
            if (paasword !== null) {
                changecheckPassword(paasword);
            }
        } catch (e) {
            return null;
            // error reading value
        }
    };

    // const isvalidate = async () => {
    //   if (email == '') {
    //     alert('Please enter Email id');
    //   } else if (password == '') {
    //     alert('Please enter password');
    //   }  else {
    //     navigation.replace('Home')
    //     // local.storeLogin(true);
    //   }
    // };

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
        }
        else if (password?.length < 6) {
            changecheckPassword('Password must be at least 6 characters long'); // Set error message
            // alert('Please enter password'); // Set error message
        }
        else {
            navigation.replace('Home');
            // local.storeLogin(true);
        }
    };


    const clearAll = async () => {
        changeemail('');
        changepassword('');
    };
    useEffect(() => {
        AsyncStorage.getItem('isLogin', value => {
            if (value != null || value != undefined) {
                navigation.reset('Home');
            } else {
                changeIsLogin(false);
            }
        });
    }, []);
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
            <ImageBackground source={images.Welcome_3} resizeMode="cover" style={styles.image}>
                <View style={{ width: getHeight(2.3), marginTop: 30, marginBottom: 40, }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image source={images.ArrowLeft} style={styles.arrowimg} />
                    </TouchableOpacity>
                    <Text style={styles.TileTxt}>{"Sign-in with email"}</Text>
                    <Text style={styles.subTxt}>{"Enter your details"}</Text>
                </View>

                <TextInputBox
                    value={email}
                    titlecolour={'white'}
                    errorText={checkEmail}
                    onChangeText={text => {
                        changeemail(text);
                        changecheckEmail('')
                    }}
                    placeholder={'User Name'}
                    width={getHeight(2.3)}
                    title={'Email ID'}
                    borderColor={'white'}
                    // color={'#ff6666'}
                />
                <TextInputBox
                    value={password}
                    titlecolour={'white'}
                    errorText={checkPassword}
                    onChangeText={text => {
                        changepassword(text);
                        changecheckPassword('')
                    }}
                    placeholder={'Password'}
                    width={getHeight(2.3)}
                    title={'Password'}
                    borderColor={'white'}
                />


                <Text style={[styles.subTxt, { textAlign: 'right' }]}>{"Forgot Password ?"}</Text>
                <View style={{ justifyContent: 'flex-end', alignItems: 'baseline', height: getHeight(3.5) }}>
                    <Text style={[styles.subTxt, { textAlign: 'center' }]}>{" By continuing, you agree to our Terms of use and privacy policies"}</Text>

                    <CommonButton
                        onPress={() => navigation.replace('TellusAboutyou')}
                        color={['#ffffff', '#ffffff']}

                        title={'Sign-in'}
                        width={getHeight(2.3)}
                        texttitle={'black'}
                    />


                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center', alignSelf: 'center', }}>
                    <Text style={[styles.subTxt, { textAlign: 'center' }]}>{"New to Politics?"}</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('SignUpScreen')}>
                        <Text style={[styles.subTxt, { textDecorationLine: 'underline', textAlign: 'center' }]}>{"Sign-up Now"}</Text>

                    </TouchableOpacity>
                </View>

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
        // justifyContent: 'flex-end',
        alignItems: 'center',


    },

    arrowimg: {
        width: 30,
        height: 20,
        marginBottom: 30
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
        fontSize: getHeight(30),
        color: 'white',
        fontFamily: 'Jost',
        fontWeight: '700',
        paddingBottom: 5

    },
    subTxt: {
        fontSize: getHeight(50),
        color: 'white',
        // textAlign: 'center',
        width: getHeight(2.6),
        fontFamily: 'Jost',
        fontWeight: '300',
        // alignSelf: 'center'
    },
});
export default SignUpwithEmail;

