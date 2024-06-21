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
    Alert
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
import { Createinterest, getallinterests } from '../../api';

var windowWidth = Dimensions.get('window').width; //full width
var windowHeight = Dimensions.get('window').height; //full height

const InterestSelection = props => {
    const navigation = useNavigation();
    const [email, changeemail] = useState('');
    const [fullname, changefullname] = useState('');
    const [error, changeerror] = useState('');
    const [password, changepassword] = useState('');
    const [interestdata, setinterestdata] = useState([]);

    const [selectedInterests, setSelectedInterests] = useState([]);
    // const interests = ['Social Policies', 'Road Transport ', 'Democracy', 'Federalism', 'Infrastructure Development', 'Law', 'Health Care', 'Agriculture', 'Foreign Policy', 'Globalization', 'Industry',];
    const interests =
        [{ "createdAt": "2024-06-19T13:56:54.541Z", "id": 1, "name": "Social Policies", "status": true, "updatedAt": "2024-06-19T13:56:54.541Z" }, { "createdAt": "2024-06-19T13:57:32.886Z", "id": 2, "name": "Road Transport", "status": true, "updatedAt": "2024-06-19T13:57:32.886Z" }, { "createdAt": "2024-06-19T13:58:22.336Z", "id": 3, "name": "Democracy", "status": true, "updatedAt": "2024-06-19T13:58:22.336Z" }, { "createdAt": "2024-06-19T13:58:50.154Z", "id": 4, "name": "Federalism", "status": true, "updatedAt": "2024-06-19T13:58:50.154Z" }, { "createdAt": "2024-06-19T13:59:24.038Z", "id": 5, "name": "Infrastructure Development", "status": true, "updatedAt": "2024-06-19T13:59:24.038Z" }, { "createdAt": "2024-06-19T13:59:38.618Z", "id": 6, "name": "Law", "status": true, "updatedAt": "2024-06-19T13:59:38.618Z" }, { "createdAt": "2024-06-19T13:59:54.002Z", "id": 7, "name": "Health Care", "status": true, "updatedAt": "2024-06-19T13:59:54.002Z" }, { "createdAt": "2024-06-19T14:00:14.409Z", "id": 8, "name": "Agriculture", "status": true, "updatedAt": "2024-06-19T14:00:14.409Z" }, { "createdAt": "2024-06-19T14:00:33.917Z", "id": 9, "name": "Foreign Policy", "status": true, "updatedAt": "2024-06-19T14:00:33.917Z" }, { "createdAt": "2024-06-19T14:01:08.861Z", "id": 10, "name": "GlobaliZation", "status": true, "updatedAt": "2024-06-19T14:01:08.861Z" }, { "createdAt": "2024-06-19T14:01:28.424Z", "id": 11, "name": "Industry", "status": true, "updatedAt": "2024-06-19T14:01:28.424Z" }];
    const [userid, setuserid] = useState('');

    // const toggleInterest = (interest) => {
    //     if (selectedInterests.includes(interest)) {
    //         setSelectedInterests(selectedInterests.filter(item => item !== interest));
    //     } else {
    //         setSelectedInterests([...selectedInterests, interest]);
    //     }
    // };
    const toggleInterest = (interest) => {
        const index = selectedInterests.findIndex(item => item.id === interest.id);
        if (index !== -1) {
            setSelectedInterests(selectedInterests.filter(item => item.id !== interest.id));
        } else {
            setSelectedInterests([...selectedInterests, interest]);
        }
    };


    const isvalidate = async () => {
        if (selectedInterests?.length < 4) {
            // alert('Please select at least four interests.');
            changeerror('*Please select at least four interests.')
        } else {
            handleinterest()
            // navigation.replace('FollowAccounts');
        }
    };

    const Getallinterest = async () => {
        try {
            // const response = await Createinterest(selectedInterests,userid);
            const response = await getallinterests();
            setinterestdata(response)
            console.log(response, 'login api response')
            if (response.message = "User details created successfully") {

                // await local.storeUserId('UserId', response?.user?.id.toString());

                navigation.replace('InterestSelection');
            } else {
                console.log('Error during login:',);
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                Alert.alert('Error', error.response.data.message);
            } else {
                Alert.alert('Error', 'An error occurred');
            }

        }
    };


    const handleinterest = async () => {
        try {
            const selectedInterestIds = selectedInterests.map(interest => interest.id);
            const response = await Createinterest(selectedInterestIds, userid);
            console.log(response, 'login api response');
            if (response.message === "User interests created successfully") {
                navigation.replace('FollowAccounts');
            } else {
                console.log('Error during login:',);
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                Alert.alert('Error', error.response.data.message);
            } else {
                Alert.alert('Error', 'An error occurred');
            }
        }
    };

    // const handleinterest = async () => {
    //     try {
    //         // const response = await Createinterest(selectedInterests,userid);
    //         const response = await Createinterest([1, 2, 3], userid);
    //         console.log(response, 'login api response')
    //         if (response.message = "User interests created successfully") {

    //             // await local.storeUserId('UserId', response?.user?.id.toString());

    //             navigation.replace('FollowAccounts');
    //         } else {
    //             console.log('Error during login:',);
    //         }
    //     } catch (error) {
    //         if (error.response && error.response.data && error.response.data.message) {
    //             Alert.alert('Error', error.response.data.message);
    //         } else {
    //             Alert.alert('Error', 'An error occurred');
    //         }

    //     }
    // };

    useEffect(() => {
        // Getallinterest()
    }, [userid])

    const getuser = async () => {
        const userId = await local.getUserId();
        console.log(userId, 'leaderdata he')
        setuserid(userId)
        // Getallinterest()
    };

    useEffect(() => {

        getuser()

    }, [])


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
                            key={interest.id}
                            style={[
                                styles.interest,
                                selectedInterests.find(item => item.id === interest.id) && styles.selectedInterest
                            ]}
                            onPress={() => toggleInterest(interest)}>
                            <Text style={[
                                styles.interestText,
                                selectedInterests.find(item => item.id === interest.id) ? styles.selectedInterestText : styles.unselectedInterestText
                            ]}>{interest.name}</Text>
                        </TouchableOpacity>
                    ))}
                </View>


                {/* <View style={styles.interestsContainer}>
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
                </View> */}
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
                    onPress={() => navigation.navigate('TellusAboutyou')}
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
        fontFamily: 'Jost-Bold',
        fontSize: 28,
        color: 'black',
        
        paddingBottom: 5
    },
    subTxt: {
        fontFamily: 'Jost-Bold',
        fontSize: 16,
        color: 'black',
        // textAlign: 'center',
        width: getHeight(2.6),
      
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
        fontFamily: 'Jost-Regular',
        fontSize: 16,
        

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
