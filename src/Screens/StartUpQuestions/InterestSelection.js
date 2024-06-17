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

const InterestSelection = props => {
    const navigation = useNavigation();
    const [email, changeemail] = useState('');
    const [fullname, changefullname] = useState('');
    const [error, changeerror] = useState('');
    const [password, changepassword] = useState('');

    const [selectedInterests, setSelectedInterests] = useState([]);
    const interests = ['Social Policies', 'Road Transport ', 'Democracy', 'Federalism', 'Infrastructure Development', 'Law', 'Health Care', 'Agriculture', 'Foreign Policy', 'Globalization', 'Industry',];


    const toggleInterest = (interest) => {
        if (selectedInterests.includes(interest)) {
            setSelectedInterests(selectedInterests.filter(item => item !== interest));
        } else {
            setSelectedInterests([...selectedInterests, interest]);
        }
    };

    const isvalidate = async () => {
        if (selectedInterests?.length < 4) {
            // alert('Please select at least four interests.');
            changeerror('*Please select at least four interests.')
        } else {
            // Proceed to the next screen
            // navigation.replace('SuccessScreen');
            navigation.replace('FollowAccounts');
        }
    };

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
            <View style={{ width: getHeight(2.3), marginTop: 30, marginBottom: 40, }}>

                <Text style={styles.TileTxt}>Tell us about you</Text>
                <Text style={styles.subTxt}>{"This will help us to serve you better"}</Text>
            </View>

            <View style={{ width: getHeight(2.3) }}>
                <Text style={styles.gentertxt}>Select Your Interests</Text>

                <View style={styles.interestsContainer}>
                    {interests.map(interest => (
                        <TouchableOpacity
                            key={interest}
                            style={[
                                styles.interest,
                                selectedInterests.includes(interest) && styles.selectedInterest
                            ]}
                            onPress={() => toggleInterest(interest)}>
                            <Text style={[
                                styles.interestText,
                                selectedInterests.includes(interest) ? styles.selectedInterestText : styles.unselectedInterestText
                            ]}>{interest}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
            <Text style={{ color: '#ff6666', marginTop: 40 }}> {error}</Text>
            <View style={{ height: getHeight(5), alignSelf: 'flex-end', marginTop: 10 }}>
                <CommonButton
                    onPress={isvalidate}
                    color={['black', 'black']}
                    title={'Next'}
                    width={getHeight(2.3)}
                    texttitle={'white'}
                />
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
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
        color: 'black',
        fontFamily: 'Jost',
        fontWeight: '700',
        paddingBottom: 5
    },
    subTxt: {
        fontSize: 16,
        color: 'black',
        // textAlign: 'center',
        width: getHeight(2.6),
        fontFamily: 'Jost',
        fontWeight: '400',
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
        backgroundColor: '#3A7BD5'
    },
    optionText: {
        fontSize: 16,
        fontFamily: 'Jost',
        fontWeight: '400',

    },
    gentertxt: {
        fontSize: 20,
        color: 'black',
        fontWeight: '800',
        paddingBottom: 5,
        // alignSelf: 'center',
        marginBottom: 10,
        fontFamily: 'jost'
    },
    downArrow: {
        transform: [{ rotate: '180deg' }],
    },
    arrowimage: { width: 15, height: 14, },
    interestsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        // justifyContent: 'center'
    },
    interest: {
        // width: '30%',
        paddingVertical: 10,
        paddingHorizontal: 10,
        margin: 5,
        borderWidth: 1,
        borderRadius: 30,
        borderColor: '#3A7BD5'
    },
    selectedInterest: {
        backgroundColor: '#3A7BD5',
        borderColor: '#3A7BD5'
    },
    interestText: {
        fontSize: 16,
        textAlign: 'center'
    },
    selectedInterestText: {
        color: 'white'
    },
    unselectedInterestText: {
        color: 'black'
    },
    selectedInterestsText: {
        marginTop: 20,
        fontSize: 16
    }
});
export default InterestSelection;
