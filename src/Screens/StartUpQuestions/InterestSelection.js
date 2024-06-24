import React, { useState, useEffect, useCallback } from 'react';
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    ActivityIndicator,
    Alert,
    Dimensions,
} from 'react-native';

import CommonButton from '../../Components/CommonButton';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import local from '../../Storage/Local';
import { Createinterest, getallinterests } from '../../api';
import { getHeight } from '../../Theme/Constants';

const InterestSelection = () => {
    const navigation = useNavigation();
    const [error, changeerror] = useState('');
    const [interestdata, setinterestdata] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedInterests, setSelectedInterests] = useState([]);
    const [userid, setuserid] = useState('');

    const interests = [
        { "id": 1, "name": "Social Policies" },
        { "id": 2, "name": "Road Transport" },
        { "id": 3, "name": "Democracy" },
        { "id": 4, "name": "Federalism" },
        { "id": 5, "name": "Infrastructure Development" },
        { "id": 6, "name": "Law" },
        { "id": 7, "name": "Health Care" },
        { "id": 8, "name": "Agriculture" },
        { "id": 9, "name": "Foreign Policy" },
        { "id": 10, "name": "Globalization" },
        { "id": 11, "name": "Industry" }
    ];

    const toggleInterest = (interest) => {
        const index = selectedInterests.findIndex(item => item.id === interest.id);
        if (index !== -1) {
            setSelectedInterests(selectedInterests.filter(item => item.id !== interest.id));
        } else {
            setSelectedInterests([...selectedInterests, interest]);
        }
    };

    const isvalidate = async () => {
        if (selectedInterests.length < 4) {
            changeerror('*Please select at least four interests.');
        } else {
            handleinterest();
        }
    };

    const Getallinterest = async () => {
        try {
            setIsLoading(true);
            const response = await getallinterests();
            setIsLoading(false);
            setinterestdata(response);
            console.log(response, 'getallinterests API response');
        } catch (error) {
            setIsLoading(false);
            console.error('Error fetching interests:', error);
            Alert.alert('Error', 'An error occurred while fetching interests.');
        }
    };

    const handleinterest = async () => {
        try {
            setIsLoading(true);
            const selectedInterestIds = selectedInterests.map(interest => interest.id);
            const response = await Createinterest(selectedInterestIds, userid);
            setIsLoading(false);
            console.log(response, 'Createinterest API response');
            if (response.message === "User interests created successfully") {
                navigation.replace('FollowAccounts');
            } else {
                console.error('Error creating interests:', response.message);
            }
        } catch (error) {
            setIsLoading(false);
            console.error('Error creating interests:', error);
            Alert.alert('Error', 'An error occurred while creating interests.');
        }
    };

    const getuser = async () => {
        try {
            const userId = await local.getUserId();
            console.log(userId, 'User ID');
            setuserid(userId);
        } catch (error) {
            console.error('Error fetching user ID:', error);
        }
    };

    useEffect(() => {
        getuser();
    }, []);

    useFocusEffect(
        useCallback(() => {
            Getallinterest();
        }, [])
    );

    return (
        <View style={styles.container}>
            <View style={{ width: getHeight(2.3), marginTop: 30, marginBottom: 40 }}>
                <Text style={styles.TileTxt}>Tell us about you</Text>
                <Text style={styles.subTxt}>This will help us to serve you better</Text>
            </View>

            <View style={{ width: getHeight(2.2), height: getHeight(1.8), }}>
                <Text style={styles.gentertxt}>Select Your Interests</Text>
                <View style={styles.interestsContainer}>
                    {interestdata.map(interest => (
                        <TouchableOpacity
                            key={interest.id}
                            style={[
                                styles.interest,
                                selectedInterests.find(item => item.id === interest.id) && styles.selectedInterest
                            ]}
                            onPress={() => toggleInterest(interest)}
                        >
                            <Text style={[
                                styles.interestText,
                                selectedInterests.find(item => item.id === interest.id) ? styles.selectedInterestText : styles.unselectedInterestText
                            ]}>{interest.name}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
            <Text style={{ color: '#ff6666', marginTop: 40 }}>{error}</Text>
            <View style={{ height: getHeight(8), justifyContent: 'flex-end', marginTop: 10, alignSelf: 'center', }}>
                <CommonButton
                    onPress={isvalidate}
                    color={['black', 'black']}
                    title={'Next'}
                    width={getHeight(2.3)}
                    texttitle={'white'}
                />
            </View>
            {isLoading && (
                <View style={styles.loader}>
                    <ActivityIndicator size="large" color="white" />
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
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
        width: getHeight(2.6),
    },
    gentertxt: {
        fontFamily: 'Jost-Bold',
        fontSize: 20,
        color: 'black',
        paddingBottom: 5,
        marginBottom: 10,
    },
    interestsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    interest: {
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
        fontFamily: 'Jost-Regular',
        fontSize: 16,
        textAlign: 'center'
    },
    selectedInterestText: {
        fontFamily: 'Jost-Regular',
        color: 'white'
    },
    unselectedInterestText: {
        fontFamily: 'Jost-Regular',
        color: 'black'
    },
    loader: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
});

export default InterestSelection;
