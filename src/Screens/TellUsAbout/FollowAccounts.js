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
    FlatList
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
// import Icon from 'react-native-vector-icons/MaterialIcons'; // Add this line for icons

var windowWidth = Dimensions.get('window').width; //full width
var windowHeight = Dimensions.get('window').height; //full height

const FollowAccounts = props => {
    const navigation = useNavigation();
    const [email, changeemail] = useState('');
    const [fullname, changefullname] = useState('');
    const [error, changeerror] = useState('');
    const [password, changepassword] = useState('');

    const [selectedInterests, setSelectedInterests] = useState([]);
    const interests = ['Social Policies', 'Road Transport ', 'Democracy', 'Federalism', 'Infrastructure Development', 'Law', 'Health Care', 'Agriculture', 'Foreign Policy', 'Globalization', 'Industry'];

    const [selectedAccounts, setSelectedAccounts] = useState([]);

    const itemData = [
        { id: 1, name: 'Joe Biden', followers: 'United States of America', image: images.ViratBanner },
        { id: 2, name: 'Donald Trump', followers: 'United States of America', image: images.Welcome_1 },
        { id: 3, name: 'Rahul Gandhi', followers: ' India', image: images.Welcome_1 },
        { id: 4, name: 'Putin', followers: 'Russia ', image: images.Welcome_1 },
        { id: 5, name: 'Item Name 3', followers: 'jj hai', image: images.Welcome_2 },
        { id: 6, name: 'Item Name 3', followers: 'test gg', image: images.Welcome_2 },
        { id: 7, name: 'Item Name 2', followers: 'Are you There? ', image: images.Welcome_1 },
        { id: 8, name: 'Item Name 3', followers: 'jj hai', image: images.Welcome_2 },
        { id: 9, name: 'Item Name 3', followers: 'test gg', image: images.Welcome_2 },
    ];

    const renderItem = ({ item }) => {
        const isSelected = selectedAccounts.includes(item.id);
        return (
            <TouchableOpacity
                style={[styles.itemContainer, isSelected && styles.selectedItemContainer]}

            >
                <View style={{ width: getWidth(8), }}>
                    <Image source={item.image} style={styles.itemImage} />
                </View>
                <View style={{ width: getWidth(2), marginLeft: 5 }}>
                    <Text style={styles.itemName}>{item.name}</Text>
                    <Text> {item.followers}</Text>
                </View>
                <View style={{ width: getWidth(6), justifyContent: 'center', alignItems: 'center', }}>
                    <TouchableOpacity onPress={() => toggleAccountSelection(item.id)} style={[styles.checkbox, isSelected && styles.selectedCheckbox]}>
                        {isSelected &&
                            <Image source={images.Greentick} style={styles.checkbox} />
                            // <Icon name="check" size={20} color="white" />
                        }
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        );
    };

    const toggleAccountSelection = (id) => {
        if (selectedAccounts.includes(id)) {
            setSelectedAccounts(selectedAccounts.filter(item => item !== id));
        } else {
            setSelectedAccounts([...selectedAccounts, id]);
        }
    };

    const toggleInterest = (interest) => {
        if (selectedInterests.includes(interest)) {
            setSelectedInterests(selectedInterests.filter(item => item !== interest));
        } else {
            setSelectedInterests([...selectedInterests, interest]);
        }
    };

    const isvalidate = async () => {
        // if (selectedInterests?.length < 4) {
        //     changeerror('*Please select at least four interests.')
        // } else {
        navigation.replace('SuccessScreen');
        // }
    };

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            changeemail('');
            changepassword('');
        });

        return unsubscribe;
    }, [navigation]);

    return (
        <View style={styles.container}>
            <View style={{ width: getWidth(1.1), marginTop: 20, marginBottom: 26, }}>
                <Text style={styles.TileTxt}>Select at least one of </Text>
                <Text style={styles.TileTxt}>below accounts to follow</Text>
                <Text style={styles.subTxt}>{"This will help us to show you only what "}</Text>
                <Text style={styles.subTxt}>{" you like to see. You can change this later"}</Text>
            </View>

            <View style={{ width: getWidth(1.1), height: getHeight(1.7), }}>
                <FlatList
                    data={itemData}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()}
                    contentContainerStyle={styles.flatListContent}
                />
            </View>

            <View style={{ height: getHeight(5), alignSelf: 'flex-end', marginTop: 10 }}>
                <CommonButton
                    onPress={isvalidate}
                    color={['black', 'black']}
                    title={'Continue'}
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
    TileTxt: {
        fontSize: 25,
        color: 'black',
        fontFamily: 'Jost',
        fontWeight: '700',
        // paddingBottom: 5
    },
    subTxt: {
        fontSize: 14,
        color: 'black',
        // width: getHeight(2.6),
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
        marginBottom: 10,
        fontFamily: 'jost'
    },
    interestsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: getWidth(1.2),
        height: getHeight(1.5),
        overflow: 'hidden'
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
    },
    input: {
        padding: 10,
        width: getWidth(1.5)
    },
    flatListContent: {
        flexGrow: 1,
        paddingBottom: 50
    },
    itemContainer: {
        justifyContent: 'space-between',
        backgroundColor: '#F9F9F9',
        borderRadius: 10,
        padding: 5,
        marginBottom: 10,
        flex: 1,
        width: getWidth(1.1),
        flexDirection: 'row'
    },
    selectedItemContainer: {
        backgroundColor: '#E6F7FF',
    },
    itemImage: {
        width: 40,
        height: 40,
        borderRadius: 35,
    },
    itemName: {
        fontWeight: '600',
        marginTop: 5,
        fontFamily: 'Jost',
        fontSize: 15,
        color: 'black'
    },
    checkbox: {
        width: 20,
        height: 20,
        borderRadius: 5,
        borderWidth: 2,
        borderColor: 'gray',
        justifyContent: 'center',
        alignItems: 'center',
    },
    selectedCheckbox: {
        backgroundColor: 'white',
        borderColor: 'white',
    },
    followButton: {
        backgroundColor: 'blue',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
        marginTop: 5,
    },
    followButtonText: {
        color: '#fff',
    },
});
export default FollowAccounts;
