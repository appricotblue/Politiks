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

const CreatePasswordScreen = props => {
    const navigation = useNavigation();
    const [email, changeemail] = useState('');
    const [checkEmail, changecheckEmail] = useState('');
    const [checkPassword, changecheckPassword] = useState('');
    const [password, changepassword] = useState('');
    const [repassword, changerepassword] = useState('');
    const [checkrepassword, changecheckrepassword] = useState('');
    const [isLogin, changeIsLogin] = useState(false);



    const isvalidate = async () => {
        if (password == '') {
            changecheckPassword('Please enter password');
        }else if (password?.length < 6) {
            changecheckPassword('Password must be at least 6 characters long'); // Set error message
            // alert('Please enter password'); // Set error message
          }
         else if (repassword == '') {
            changecheckrepassword('Please re enter Password');
        } else if (password != repassword) {
            changecheckrepassword('Password Mismatch!');
        } else {
            navigation.replace('SignUpwithEmail')
        }
    };

    const clearAll = async () => {
        changecheckPassword('');
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
                <View style={{ width: getHeight(2.3), marginTop: 30, marginBottom: 40 }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image source={images.ArrowLeft} style={styles.arrowimg} />
                    </TouchableOpacity>
                    <Text style={styles.TileTxt}>{"Create a Password"}</Text>
                    <Text style={styles.subTxt}>{"Choose a strong password"}</Text>
                </View>
                <TextInputBox
                    value={password}
                    errorText={checkPassword}
                    onChangeText={text => {
                        changepassword(text);
                        changecheckPassword('');
                    }}
                    placeholder={'new password'}
                    width={getHeight(2.3)}
                    title={'New Password'}
                    borderColor={'white'}
                    valuecolor={'white'}
                    titlecolour={'white'}
                />
                <TextInputBox
                    value={repassword}
                    errorText={checkrepassword}
                    onChangeText={text => {
                        changerepassword(text)
                        changecheckrepassword('');
                    }}
                    placeholder={'password'}
                    width={getHeight(2.3)}
                    title={'Re-enter Password'}
                    borderColor={'white'}
                    valuecolor={'white'}
                    titlecolour={'white'}
                />

                <View style={{ justifyContent: 'flex-end', alignItems: 'baseline', height: getHeight(2.7) }}>

                    <CommonButton
                        onPress={() => isvalidate()}
                        color={['white', 'white']}
                        title={'Save'}
                        width={getHeight(2.3)}
                        texttitle={'black'}
                    />
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
    contentContainer: {
        flex: 1,
        justifyContent: 'center',
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
        fontSize: 28,
        color: 'white',
        fontFamily: 'Jost',
        fontWeight: '700',
        paddingBottom: 5

    },
    subTxt: {
        fontSize: getHeight(50),
        color: 'white',
        // textAlign: 'center',
        width: getHeight(2.6)
    },
    buttonContainer: {
        marginBottom: 20,

    },
    arrowimg: {
        width: 30,
        height: 20,
        marginBottom: 30
    },
});
export default CreatePasswordScreen;

