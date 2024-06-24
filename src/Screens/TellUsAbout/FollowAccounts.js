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
    FlatList,
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
import { CreateFolowers ,getfolowers} from '../../api';
// import Icon from 'react-native-vector-icons/MaterialIcons'; // Add this line for icons

var windowWidth = Dimensions.get('window').width; //full width
var windowHeight = Dimensions.get('window').height; //full height

const FollowAccounts = props => {
    const navigation = useNavigation();
    const [email, changeemail] = useState('');
    const [fullname, changefullname] = useState('');
    const [error, changeerror] = useState('');
    const [password, changepassword] = useState('');
    const [folowerdata, setfolowerdata] = useState([]);

    const [selectedInterests, setSelectedInterests] = useState([]);

    const [selectedAccounts, setSelectedAccounts] = useState([]);
    const [userid, setuserid] = useState('')
    const [isLoading, setIsLoading] = useState(false); 

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


    const getuser = async () => {
        const leaderdata = await local.getLeader();
        console.log(leaderdata, 'leaderdata he')
        const userId = await local.getUserId();
        console.log(userId, 'leaderdata he')
        setuserid(userId)
        Getfollowers(userId)
    }
    getfolowers
    useEffect(() => {

        getuser()

    }, [])

    const Getfollowers = async (userid) => {
       
        try {
            // const response = await Createinterest(selectedInterests,userid);
            const response = await getfolowers(userid);
            console.log(response, 'login api response')
            setfolowerdata(response)
            if (response.message = "User interests created successfully") {

                // await local.storeUserId('UserId', response?.user?.id.toString());

                // navigation.replace('FollowAccounts');
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

    const handlefolowers = async (itemid) => {
      
            console.log('called',itemid)
            try {
                setIsLoading(true);
                // const response = await Createinterest(selectedInterests,userid);
                const response = await CreateFolowers(itemid, userid);
                console.log(response, 'login api response')
                setIsLoading(false);
                if (response.message = "User interests created successfully") {
    
                    // await local.storeUserId('UserId', response?.user?.id.toString());
    
                    // navigation.replace('FollowAccounts');
                } else {
                    console.log('Error during login:',);
                }
            } catch (error) {
                setIsLoading(false);
                if (error.response && error.response.data && error.response.data.message) {
                    Alert.alert('Error', error.response.data.message);
                } else {
                    Alert.alert('Error', 'An error occurred');
                }
    
            }
       
      
    };

    const renderItem = ({ item }) => {
        const isSelected = selectedAccounts.includes(item?.userId);
        return (
            <TouchableOpacity
                style={[styles.itemContainer, isSelected && styles.selectedItemContainer]}
              

            >
                <View style={{ width: getWidth(8), }}>
                    <Image source={{uri:item.userProfile ?item.userProfile :'https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png'}} style={styles.itemImage} />
                </View>
                <View style={{ width: getWidth(2), marginLeft: 5 }}>
                    <Text style={styles.itemName}>{item?.userName}</Text>
                    <Text style={{color:'black',fontSize:10}}> {item?.country}</Text>
                </View>
                <View  onPress={()=>handlefolowers(item?.userId)} style={{ width: getWidth(6), justifyContent: 'center', alignItems: 'center', }}>
                    <TouchableOpacity onPress={() => {toggleAccountSelection(item?.userId),handlefolowers(item?.userId)}} style={[styles.checkbox, isSelected && styles.selectedCheckbox]}>
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
        // if(selectedAccounts?.length >= 1){
        const leaderdata = await local.getLeader();
        console.log(leaderdata, 'leaderdata he')
        if (leaderdata == 'Follower') {
            navigation.replace('SuccessScreen');
         } else {
             navigation.replace('UploadScreen');
         }
        // }else{
        //     Alert.alert('Please Select atleast one account to continue')
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

            <View style={{ width: getWidth(1.1), height: getHeight(1.57), }}>
                <FlatList
                    data={folowerdata}
                    renderItem={renderItem}
                    keyExtractor={(item) => item?.userId?.toString()}
                    contentContainerStyle={styles.flatListContent}
                />
            </View>

            <View style={{ height: getHeight(10), alignSelf: 'center',  justifyContent: 'flex-end', }}>
                <CommonButton
                    onPress={isvalidate}
                    color={['black', 'black']}
                    title={'Continue'}
                    width={getHeight(2.3)}
                    texttitle={'white'}
                />
                {/* <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={{ width: windowWidth,  justifyContent: 'center', alignItems: 'center' }}>
                     <Text style={{
                        textDecorationLine: 'underline', fontFamily: 'Jost',
                        fontWeight: '400',
                    }}>Previous</Text>
                </TouchableOpacity>  */}
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
        fontFamily:'Jost-Bold',
        fontSize: 25,
        color: 'black',
      
        // paddingBottom: 5
    },
    subTxt: {
        fontFamily:'Jost-Regular',
        fontSize: 14,
        color: 'black',
        // width: getHeight(2.6),
       
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
       fontFamily:'Jost-Bold', 
        marginTop: 2,
      
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
    loader: {
        ...StyleSheet.absoluteFillObject, // Covers the entire screen
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    },
});
export default FollowAccounts;
