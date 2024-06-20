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
import GradientText from '../../Components/GradientText';

var windowWidth = Dimensions.get('window').width; //full width
var windowHeight = Dimensions.get('window').height; //full height

const DOBScreen = props => {
    const navigation = useNavigation();
    const [email, changeemail] = useState('');
    const [fullname, changefullname] = useState('');
    const [error, changeerror] = useState('');
    const [password, changepassword] = useState('');
    const [isLogin, changeIsLogin] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);

    const [day, setDay] = useState(1);
    const [month, setMonth] = useState('January');
    const [year, setYear] = useState(1990);

    const handleSelectOption = (option) => {
        setSelectedOption(option);
        // You can store the selected value in state or pass it to a function to store it elsewhere
        console.log('Selected Option:', option);
    }

    const incrementDate = (type) => {
        switch (type) {
            case 'day':
                setDay(day === 31 ? 1 : day + 1);
                break;
            case 'month':
                setMonth(nextMonth(month));
                break;
            case 'year':
                setYear(year + 1);
                break;
            default:
                break;
        }
    }

    const decrementDate = (type) => {
        switch (type) {
            case 'day':
                setDay(day === 1 ? 31 : day - 1);
                break;
            case 'month':
                setMonth(prevMonth(month));
                break;
            case 'year':
                setYear(year - 1);
                break;
            default:
                break;
        }
    }

    // Function to get next month name
    const nextMonth = (currentMonth) => {
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        const currentIndex = months.findIndex(m => m === currentMonth);
        return currentIndex === 11 ? months[0] : months[currentIndex + 1];
    }

    // Function to get previous month name
    const prevMonth = (currentMonth) => {
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        const currentIndex = months.findIndex(m => m === currentMonth);
        return currentIndex === 0 ? months[11] : months[currentIndex - 1];
    }



    const isvalidate = async () => {
        if (day === 1 && month === 'January' && year === 1990) {
            // alert('Please select your date of birth');
            changeerror('*Please select your date of birth');
        }  else {
            navigation.replace('InterestSelection')
            // navigation.navigate('Home');
            // local.storeLogin(true);
        }
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
            <View style={{ width: getHeight(2.3), marginTop: 30, marginBottom: 40, justifyContent: 'center', alignItems: 'center' }}>
                <Image
                    style={{ width: 50, height: 50, marginBottom: 5 }}
                    source={images.Faniverse_logo}
                />
                <Text style={styles.TileTxt}>Welcome to  Fan Island </Text>
                <Text style={styles.subTxt}>{"To make your feed optimized, Please select most appropriate options"}</Text>
            </View>

            <View style={{ width: getHeight(2.3) }}>
                <Text style={styles.gentertxt}>Choose Your Date of Birth</Text>

                <View style={{ marginTop: 10, justifyContent: 'center', alignItems: 'center' }}>
                    <View style={styles.optionContainer}>

                        <TouchableOpacity
                            style={[
                                styles.radioButton,
                            ]}
                        >
                            <View style={{ alignItems: 'flex-end', width: 70 }}>
                                <Text style={[styles.optionText, { color: 'black' }]}>{day}</Text>
                            </View>

                            <View style={{ alignItems: 'flex-end', width: 70, }}>

                                <TouchableOpacity
                                    style={{ width: 30, justifyContent: 'center', alignItems: 'center', marginBottom: 3 }}
                                    onPress={() => {incrementDate('day'),changeerror('')}}>
                                    <Image
                                        resizeMode='contain'
                                        style={styles.arrowimage}
                                        source={images.Uparrow}
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={{ width: 30, justifyContent: 'center', alignItems: 'center', }}
                                    onPress={() => {decrementDate('day'),changeerror('')}}>
                                    <Image
                                        resizeMode='contain'

                                        style={styles.arrowimage}
                                        source={images.Downarrow}
                                    />
                                </TouchableOpacity>
                            </View>

                        </TouchableOpacity>

                    </View>
                    <View style={styles.optionContainer}>

                        <TouchableOpacity
                            style={[
                                styles.radioButton,

                            ]}
                        >
                            {/* <Text style={[styles.optionText, { color: 'black' }]}>{month}</Text> */}
                            <View style={{ alignItems: 'flex-end', width: 90 }}>
                                <Text style={[styles.optionText, { color: 'black' }]}>{month}</Text>
                            </View>

                            <View style={{ alignItems: 'flex-end', width: 50, }}>

                                <TouchableOpacity
                                    style={{ width: 30, justifyContent: 'center', alignItems: 'center', marginBottom: 3 }}
                                    onPress={() => {incrementDate('month'),changeerror('')}}>
                                    <Image
                                        resizeMode='contain'
                                        style={styles.arrowimage}
                                        source={images.Uparrow}
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={{ width: 30, justifyContent: 'center', alignItems: 'center', }}
                                    onPress={() => {decrementDate('month'),changeerror('')}}>
                                    <Image
                                        resizeMode='contain'

                                        style={styles.arrowimage}
                                        source={images.Downarrow}
                                    />
                                </TouchableOpacity>
                            </View>
                        </TouchableOpacity>

                    </View>
                    <View style={styles.optionContainer}>

                        <TouchableOpacity
                            style={[
                                styles.radioButton,

                            ]}
                            onPress={() => handleSelectOption('Others')}>
                            {/* <Text style={[styles.optionText, { color: 'black' }]}>{year}</Text> */}
                            <View style={{ alignItems: 'flex-end', width: 90 }}>
                                <Text style={[styles.optionText, { color: 'black' }]}>{year}</Text>
                            </View>

                            <View style={{ alignItems: 'flex-end', width: 50, }}>

                                <TouchableOpacity
                                    style={{ width: 30, justifyContent: 'center', alignItems: 'center', marginBottom: 3 }}
                                    onPress={() => {incrementDate('year'),changeerror('')}}>
                                    <Image
                                        resizeMode='contain'
                                        style={styles.arrowimage}
                                        source={images.Uparrow}
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={{ width: 30, justifyContent: 'center', alignItems: 'center', }}
                                    onPress={() => {decrementDate('year'),changeerror('')}}>
                                    <Image
                                        resizeMode='contain'

                                        style={styles.arrowimage}
                                        source={images.Downarrow}
                                    />
                                </TouchableOpacity>
                            </View>
                        </TouchableOpacity>

                    </View>
                </View>
            </View>
            <Text style={{color:'#ff6666'}}> {error}</Text>
            <View style={{ height: getHeight(5), alignSelf: 'flex-end', marginTop: 50 }}>
                <CommonButton
                    // onPress={() => navigation.replace('InterestSelection')}
                    onPress={() => isvalidate()}
                    color={['#8360C3', '#2EBF91']}
                    title={'Next'}
                    width={getHeight(2.3)}
                    texttitle={'white'}
                />
                <TouchableOpacity
                    onPress={() => navigation.navigate('GenderScreen')}
                    style={{ width: windowWidth, height: 50, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{
                        textDecorationLine: 'underline', fontFamily: 'Jost',
                        fontWeight: '400',
                    }}>Previous</Text>
                </TouchableOpacity>



            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
    },
    arrowButton: {
        width: 30,
        height: 30,



        justifyContent: 'center',
        alignItems: 'center',

        // position: 'absolute',
        zIndex: 1,
        backgroundColor: 'transparent',
    },
    leftArrow: {
        left: 0,
    },
    rightArrow: {
        right: 0,
    },
    arrowButtonText: {
        fontSize: 20,
        color: '#2EBF91',
        fontWeight: 'bold',
    },
    TileTxt: {
        fontSize: 28,
        color: '#8360C3',
        fontFamily: 'Jost',
        fontWeight: '700',
        paddingBottom: 5
    },
    subTxt: {
        fontSize: 16,
        color: 'black',
        textAlign: 'center',
        width: getHeight(2.6),
        fontFamily: 'Jost',
        fontWeight: '300',
    },
    optionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        position: 'relative',
    },
    radioButton: {
        width: 160,
        height: 60,
        borderRadius: 70,
        borderWidth: 2,
        borderColor: '#2EBF91',
        flexDirection: 'row',
        marginBottom: 24,
        justifyContent: 'center',
        alignItems: 'center'
    },
    selectedOption: {
        backgroundColor: '#2EBF91'
    },
    optionText: {
        fontSize: 16,

    },
    gentertxt: {
        fontSize: 20,
        color: 'black',
        fontWeight: '700',
        paddingBottom: 5,
        alignSelf: 'center',
        marginBottom: 10,
        fontFamily: 'jost'
    },
    downArrow: {
        transform: [{ rotate: '180deg' }],
    },
    arrowimage: { width: 15, height: 14, }
});
export default DOBScreen;
