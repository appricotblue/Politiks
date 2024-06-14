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

const TellusAboutyou = props => {
    const navigation = useNavigation();
    const [email, changeemail] = useState('');
    const [checkemail, changecheckemail] = useState('');
    const [fullname, changefullname] = useState('');
    const [checkfullname, changecheckfullname] = useState('');
    const [phone, changephone] = useState('');
    const [checkphone, changecheckphone] = useState('');
    const [password, changepassword] = useState('');
    const [isLogin, changeIsLogin] = useState(false);
    const [selectedOption, setSelectedOption] = useState('Fan');

    const handleSelectOption = (option) => {
        setSelectedOption(option);
        // You can store the selected value in state or pass it to a function to store it elsewhere
        console.log('Selected Option:', option);
    }
    const getEmail = async () => {
        try {
            const value = await AsyncStorage.getItem('email');
            if (value !== null) {
                changeemail(value);
            }
            const paasword = await AsyncStorage.getItem('password');
            if (paasword !== null) {
                changepassword(paasword);
            }
        } catch (e) {
            return null;
            // error reading value
        }
    };

    const isvalidate = async () => {
        const emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneNumberRegex = /^\d{6,10}$/;

        if (fullname == '') {
            changecheckfullname('Please enter full name ');
        } else if (email == '') {
            changecheckemail('Please enter Email id');
        }
        else if (!emailFormat.test(email)) {
            changecheckemail('Please enter a valid email address'); // Set error message for invalid email format
            // alert('Please enter a valid email address'); // Set error message for invalid email format
        }
        else if (phone == '') {
            changecheckphone('Please enter phone number');
        }
        else if (!phoneNumberRegex.test(phone)) {
            changecheckphone('Please enter a valid phone number (6-10 digits)'); // Set error message for invalid phone number format
        }

        else {
            navigation.replace('OtpScreen')
            // local.storeLogin(true);
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
            {/* <ImageBackground source={images.Welcome_3} resizeMode="cover" style={styles.image}> */}
            <View style={styles.image}>
                <View style={{ width: getHeight(2.3), marginTop: 30, marginBottom: 40, }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image source={images.ArrowLeft} style={styles.arrowimg} />
                    </TouchableOpacity>
                    <Text style={styles.TileTxt}>{"Tell us about you"}</Text>
                    <Text style={styles.subTxt}>{"Enter your details"}</Text>
                </View>

                <TextInputBox
                    value={fullname}
                    titlecolour={'black'}
                    errorText={checkfullname}
                    onChangeText={text => {
                        changefullname(text);
                        changecheckfullname('')
                    }}
                    placeholder={'fullname'}
                    width={getHeight(2.3)}
                    title={'Fullname'}
                    color={'white'}
                />
                <TextInputBox
                    value={email}
                    titlecolour={'black'}
                    errorText={checkemail}
                    onChangeText={text => {
                        changeemail(text);
                        changecheckemail('')
                    }}
                    placeholder={'User Name'}
                    width={getHeight(2.3)}
                    title={'What’s your date of birth?'}
                    color={'white'}
                />
                <TextInputBox
                    value={phone}
                    titlecolour={'black'}
                    errorText={checkphone}
                    onChangeText={text => {
                        changephone(text);
                        changecheckphone('')
                    }}
                    placeholder={'Phone Number'}
                    width={getHeight(2.3)}
                    title={'Select your gender'}
                    color={'white'}
                />
                <TextInputBox
                    value={phone}
                    titlecolour={'black'}
                    errorText={checkphone}
                    onChangeText={text => {
                        changephone(text);
                        changecheckphone('')
                    }}
                    placeholder={'Phone Number'}
                    width={getHeight(2.3)}
                    title={'Choose your Country'}
                    color={'white'}
                />
                <TextInputBox
                    value={phone}
                    titlecolour={'black'}
                    errorText={checkphone}
                    onChangeText={text => {
                        changephone(text);
                        changecheckphone('')
                    }}
                    placeholder={'Phone Number'}
                    width={getHeight(2.3)}
                    title={'Choose your state'}
                    color={'white'}
                />


                <View style={{ justifyContent: 'flex-end', alignItems: 'baseline', height: getHeight(6.7) }}>

                    <CommonButton
                        // onPress={() => navigation.replace('LoginScreen')}
                        onPress={() => isvalidate()}
                        color={['black', 'black']}
                        title={'Continue'}
                        width={getHeight(2.3)}
                        texttitle={'#ffffff'}
                    />

                </View>

            </View>
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
        backgroundColor: 'white'


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
        fontSize: 28,
        color: 'black',
        fontFamily: 'Jost',
        fontWeight: '700',
        paddingBottom: 2

    },
    subTxt: {
        fontSize: getHeight(50),
        color: 'black',

        width: getHeight(2.6),
        fontFamily: 'Jost',
        fontWeight: '300',
        // alignSelf:'center'
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
        backgroundColor: 'blue', // Background color when option is selected
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
export default TellusAboutyou;

