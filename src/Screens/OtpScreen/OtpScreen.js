import React, { useState, useEffect, useRef } from 'react';
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
    TextInput
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

const OtpScreen = props => {
    const navigation = useNavigation();
   
    const [otp_1, setotp_1] = useState('');
    const [otp_2, setotp_2] = useState('');
    const [otp_3, setotp_3] = useState('');
    const [otp_4, setotp_4] = useState('');
    const [otpError, setOtpError] = useState(false);
    const inputRefs = useRef([]);
   
    useEffect(() => {
        inputRefs.current[0]?.focus();
    }, []);

    const focusNextInput = (index) => {
        if (index < inputRefs.current.length - 1) {
            inputRefs.current[index + 1].focus();
        }
    };

    const handleKeyPress = (index, e) => {
        if (e.nativeEvent.key === 'Backspace' && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    };

    const isvalidate = async () => {
        if (otp_1 === '' || otp_2 === '' || otp_3 === '' || otp_4 === '') {
            setOtpError(true);
        } else {
            setOtpError(false);
            navigation.replace('CreatePasswordScreen');
        }
    };

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            // changeemail('');
            // changepassword('');
            //Put your Data loading function here instead of my loadData()
        });

        return unsubscribe;
    }, [navigation]);

    return (
        <View style={styles.container}>
            <ImageBackground source={images.Welcome_3} resizeMode="cover" style={styles.image}>
                <View style={{ width: getHeight(2.3), marginTop: 30, marginBottom: 40 }}>
                    <Image
                        style={{width:100,height:90,marginBottom:5}}
                        source={images.Faniverse_logo}
                    />
                    <Text style={styles.TileTxt}>{"Enter the OTP "}</Text>
                    <Text style={styles.subTxt}>{"Received on your number +91 98776 25663"}</Text>
                    <TouchableOpacity>
                        <Text style={styles.changeTxt}>{"Change Number"}</Text>
                    </TouchableOpacity>

                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: getHeight(2.3) }}>
                    {[otp_1, otp_2, otp_3, otp_4].map((value, index) => (
                        <View key={index} style={styles.inputContainer}>
                            <TextInput
                                ref={ref => inputRefs.current[index] = ref}
                                style={[styles.textInput, otpError && value === '' ? styles.errorInput : null]}
                                value={value}
                                onChangeText={(text) => {
                                    if (text.length === 1) {
                                        focusNextInput(index);
                                    }
                                    if (text.length === 0) {
                                        handleKeyPress(index, { nativeEvent: { key: 'Backspace' } });
                                    }
                                    switch (index) {
                                        case 0:
                                            setotp_1(text);
                                            break;
                                        case 1:
                                            setotp_2(text);
                                            break;
                                        case 2:
                                            setotp_3(text);
                                            break;
                                        case 3:
                                            setotp_4(text);
                                            break;
                                        default:
                                            break;
                                    }
                                }}
                                keyboardType="numeric"
                                maxLength={1}
                            />
                        </View>
                    ))}
                    {otpError && <Text style={styles.errorText}>Please enter OTP</Text>}
                </View>

                <TouchableOpacity style={{ alignSelf: 'center', width: getHeight(12), marginTop: 10 }}>
                    <Text style={styles.changeTxt}>{"Re-send"}</Text>
                </TouchableOpacity>

                <View style={{ justifyContent: 'flex-end', alignItems: 'baseline', height: getHeight(2) }}>
                    <CommonButton
                        onPress={() => isvalidate()}
                        color={['#8360C3', '#2EBF91']}
                        title={'Submit'}
                        width={getHeight(2.3)}
                        texttitle={'white'}
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
        alignItems: 'center',
    },
    TileTxt: {
        fontSize: 28,
        color: 'white',
        fontFamily: 'Jost',
        fontWeight: '700',
        paddingBottom: 5
    },
    subTxt: {
        fontSize: 16,
        color: 'white',
        fontFamily: 'Jost',
        fontWeight: '300',
        width: getHeight(2.3)
    },
    changeTxt: {
        fontSize: getHeight(50),
        color: '#5EFFCC',
        textDecorationLine: 'underline',
        width: getHeight(2.3),
        marginTop: 5,
        fontSize: 16,
        fontWeight: '300',
        fontFamily: 'Jost',
    },
    textInput: {
        width: getHeight(11),
        height: 50,
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 25,
        fontSize: 16,
        textAlign: 'center',
        marginHorizontal: 5,
        color: '#ffffff',
    },
    inputContainer: {
        position: 'relative',
    },
    errorText: {
        position: 'absolute',
        top: -20,
        left: 0,
        right: 0,
        color: '#ff6666',
        textAlign: 'center',
        fontSize: 12,
    },
    errorInput: {
        borderColor: '#ff6666',
    },
});

export default OtpScreen;
