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
    ImageBackground,
    Alert,
    ScrollView,
    Keyboard,
    TouchableWithoutFeedback
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
import { register } from '../../api';

var windowWidth = Dimensions.get('window').width; //full width
var windowHeight = Dimensions.get('window').height; //full height

const SignUpScreen = props => {
    const navigation = useNavigation();
    const [email, changeemail] = useState('');
    const [checkemail, changecheckemail] = useState('');
    const [fullname, changefullname] = useState('');
    const [checkfullname, changecheckfullname] = useState('');
    const [phone, changephone] = useState('');
    const [checkphone, changecheckphone] = useState('');
    const [password, changepassword] = useState('');
    const [checkpassword, changechangepassword] = useState('');
    const [repassword, changerepassword] = useState('');
    const [checkrepassword, changechangerepassword] = useState('');
    const [isLogin, changeIsLogin] = useState(false);
    const [selectedOption, setSelectedOption] = useState('Follower');

    const isvalidate = async () => {
        const emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneNumberRegex = /^\d{6,10}$/;

        if (fullname == '') {
            changecheckfullname('Please enter full name ');
        } else if (email == '') {
            changecheckemail('Please enter Email id');
        } else if (!emailFormat.test(email)) {
            changecheckemail('Please enter a valid email address');
        } else if (password == '') {
            changechangepassword('Please enter password')
        } else if (repassword == '') {
            changechangepassword('Please re-enter password')
        }
        else if (password?.length < 6) {
            changechangepassword('Password must be at least 6 characters long');
        }

        else if (repassword != password) {
            changechangepassword('Please enter same password')
        } else {
            handleRegister();
            await local.storLeader('isleader', selectedOption == 'Leader' ? 'Leader' : 'Follower');
        }
    };

    const handleRegister = async () => {
        try {
            const response = await register(fullname, email, password);
            console.log(response, 'login api response')
            if (response.message === "User registered successfully") {
                await local.storeUserId('UserId', response?.user?.id.toString());
                navigation.replace('TellusAboutyou');
            } else {
                console.log('Error during login:',);
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                Alert.alert('Error', error.response.data.message);
            } else {
                Alert.alert('Error', 'An error occurred during login.');
            }
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
        });

        return unsubscribe;
    }, [navigation]);

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView contentContainerStyle={styles.container}>
                <ImageBackground source={images.Welcome_3} resizeMode="cover" style={styles.image}>
                    <View style={{ width: getHeight(2.3), marginTop: 30, marginBottom: 40 }}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Image source={images.ArrowLeft} style={styles.arrowimg} />
                        </TouchableOpacity>
                        <Text style={styles.TileTxt}>{"Let’s get you onboard"}</Text>
                        <Text style={styles.subTxt}>{"Enter your details"}</Text>
                    </View>

                    <TextInputBox
                        value={fullname}
                        titlecolour={'white'}
                        errorText={checkfullname}
                        onChangeText={text => {
                            changefullname(text);
                            changecheckfullname('')
                        }}
                        placeholder={'Fullname'}
                        width={getHeight(2.3)}
                        title={'Fullname'}
                        borderColor={'white'}
                        valuecolor={'white'}
                    />
                    <TextInputBox
                        value={email}
                        titlecolour={'white'}
                        errorText={checkemail}
                        onChangeText={text => {
                            changeemail(text);
                            changecheckemail('')
                        }}
                        placeholder={'User Name'}
                        width={getHeight(2.3)}
                        title={'Email ID'}
                        borderColor={'white'}
                        valuecolor={'white'}
                    />
                    <TextInputBox
                        value={password}
                        titlecolour={'white'}
                        errorText={checkphone}
                        onChangeText={text => {
                            changepassword(text);
                            changechangepassword('')
                        }}
                        placeholder={'Password'}
                        width={getHeight(2.3)}
                        title={'New Password'}
                        borderColor={'white'}
                        valuecolor={'white'}
                    />
                    <TextInputBox
                        value={repassword}
                        titlecolour={'white'}
                        errorText={checkphone}
                        onChangeText={text => {
                            changerepassword(text);
                            changechangerepassword('')
                        }}
                        placeholder={'Re-enter Password'}
                        width={getHeight(2.3)}
                        title={'Re-enter Password'}
                        borderColor={'white'}
                        valuecolor={'white'}
                    />

                    <View style={{ justifyContent: 'flex-end', alignItems: 'baseline', height: getHeight(4) }}>
                        <Text style={[styles.subTxt, { textAlign: 'center' }]}> By continuing, you agree to our Terms of use and privacy policies</Text>

                        <CommonButton
                            onPress={() => isvalidate()}
                            color={['#ffffff', '#ffffff']}
                            title={'Continue'}
                            width={getHeight(2.3)}
                            texttitle={'black'}
                        />
                        <Text style={styles.subTxt2}>{"Already have an account?"}</Text>
                        <TouchableOpacity style={{alignSelf:'center',}} onPress={() => navigation.navigate('LoginScreen')}>
                            <Text style={[styles.subTxt, { textDecorationLine: 'underline', textAlign: 'center', marginTop: 24 }]}>{"Sign-in Now"}</Text>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
            </ScrollView>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        flex: 1,
        alignItems: 'center',
        width: windowWidth,
        height: windowHeight,
    },
    TileTxt: {
        fontSize: 28,
        color: 'white',
        fontFamily: 'Jost',
        fontWeight: '700',
        paddingBottom: 2
    },
    subTxt: {
        fontSize: getHeight(50),
        color: 'white',
        width: getHeight(2.6),
        fontFamily: 'Jost',
        fontWeight: '300',
    },
    subTxt2: {
        fontSize: getHeight(50),
        color: 'white',
        textAlign: 'center',
        width: getHeight(2.6),
        fontFamily: 'Jost',
        fontWeight: '300',
        alignSelf: 'center',
    },
    optionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        marginRight: 10
    },
    radioButton: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    selectedOption: {
        backgroundColor: 'blue',
    },
    innerRadioButton: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: 'white',
    },
    optionText: {
        fontSize: 16,
        color: 'white',
        marginLeft: 10,
    },
    arrowimg: {
        width: 30,
        height: 20,
        marginBottom: 10
    },
});

export default SignUpScreen;
