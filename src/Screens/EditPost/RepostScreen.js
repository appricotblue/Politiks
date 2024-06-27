import {
    View,
    Text,
    StyleSheet,
    TextInput,
    KeyboardAvoidingView,
    Image,
    ScrollView,
    TouchableOpacity,
    Alert,
    Modal,
    TouchableWithoutFeedback,
    FlatList,
    ActivityIndicator,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import Header from '../../Components/Header';
import { height, width } from '../../Theme/ConstantStyles';
import images from '../../assets/Images';
import CommonButton from '../../Components/CommonButton';
import { getWidth } from '../../Theme/Constants';
import ImagePicker from 'react-native-image-crop-picker';
import { CreatePost, getCountries } from '../../api';
import local from '../../Storage/Local';
import CountryPicker from '../../Components/CountryPicker';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { useRoute } from '@react-navigation/native';
import { getAllPost, getAllUserPost } from '../../api';

const RepostScreen = ({ navigation }) => {
    const route = useRoute();
    const { repostydata } = route.params;
    const [text, setText] = useState('');
    const [image, setImage] = useState();
    const [userid, setuserid] = useState('');
    const [countrydata, setcountrydata] = useState([]);
    const [country, changecountry] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedCountryCode, setSelectedCountryCode] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [details, setDetails] = useState();


    const getAllUserPosts = async userId => {
        try {
            const res = await getAllUserPost(userId);
            const { data } = res;
            setDetails(res);
            console.log(res, 'Profileeeeeeeeeeeeoooooooooooooooo');
        } catch (error) {
            console.error('Error creating post:', error);
        }
    };

    const getuser = async () => {
        const userId = await local.getUserId();
        console.log(userId, 'leaderdata he');
        setuserid(userId);
        getAllUserPosts(userId)
        console.log(repostydata, 'repostdata')
    };

    useEffect(() => {
        getuser();
        // GetCountries();
    }, []);

    const validate = () => {
        console.log(image, 'imagee');
        if (image == null) {
            Alert.alert('Please add an image to continue');
        } else if (text == '') {
            Alert.alert('Please add an Content to continue');
        } else if (country == '') {
            Alert.alert('Please add an Country to continue');
        } else {
            createPosts();
        }
    };

    const createPosts = async () => {
        const formData = new FormData();
        formData.append('location', country);
        formData.append('tagUser', '2');
        formData.append('caption', text);
        formData.append('image', {
            uri: image.path,
            type: image.mime,
            name: image.path,
        });

        try {
            setIsLoading(true);
            const res = await CreatePost(formData, userid);
            setIsLoading(false);
            console.log(res?.data, '---------><><');
            navigation.navigate('Home');
        } catch (error) {
            setIsLoading(false);
            console.error('Error creating post:', error);
        }
    };

    const pickImageFromGallery = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true,
        })
            .then(image => {
                console.log(image);
                setImage(image);
            })
            .catch(error => {
                console.log('Error picking image from gallery: ', error);
            });
    };

    const takePhoto = () => {
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: true,
        })
            .then(image => {
                console.log(image);
                setImage(image);
            })
            .catch(error => {
                console.log('Error taking photo: ', error);
            });
    };

    const showImagePickerOptions = () => {
        Alert.alert(
            'Select Image',
            'Choose an option to select an image',
            [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Gallery', onPress: pickImageFromGallery },
                { text: 'Camera', onPress: takePhoto },
            ],
            { cancelable: true },
        );
    };

    return (
        <View style={styles.container}>
            <Header title="Repost this on your wall" />
            <ScrollView>
                <KeyboardAvoidingView>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: getWidth(1.13), alignSelf: 'center', marginTop: 10 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <Image
                                source={{ uri: details?.data?.userProfile ? details?.data?.userProfile : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png' }}
                                style={{ width: 50, height: 50, borderRadius: 25 }}
                            />
                            <Text style={{ color: 'black', fontSize: 19, fontFamily: 'Jost-Bold', marginLeft: 5 }}>
                                {details?.data?.fullName}
                            </Text>
                        </View>


                        <View style={{ backgroundColor: '#3A7BD5', padding: 7, borderRadius: 10 }}><Text style={{ fontFamily: 'Jost-Regular', color: 'white', fontSize: 13 }}>Post Now</Text></View>
                    </View>
                    <View style={styles.textInputContainer}>
                        <TextInput
                            style={styles.inputStyle}
                            onChangeText={setText}
                            value={text}
                            placeholder="Add Content"
                            placeholderTextColor={'grey'}
                            multiline={true}
                        />
                    </View>


                    <View style={{ flexDirection: 'row', padding: 10 }}>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('OtherProfile')}>
                            <Image
                                source={{

                                    uri:
                                        repostydata?.userDetails?.userProfile ?
                                            repostydata?.userDetails?.userProfile :
                                            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
                                }}
                                style={{ width: 50, height: 50, borderRadius: 25 }}
                            />
                        </TouchableOpacity>

                        <View style={styles.textContainer}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={styles.name}>{repostydata?.userDetails?.userName}</Text>

                                {repostydata?.userDetails.role !== 'Follower' && repostydata?.userDetails?.action == 'Approved' && (
                                    <Image
                                        style={{ width: 20, height: 20, marginLeft: 6 }}
                                        source={images.VerifiedPNG}
                                    />
                                )}
                            </View>
                            <Text style={styles.designation}>{repostydata?.location}</Text>

                        </View>

                    </View>
                    <Text style={styles.description}>{repostydata?.caption}</Text>

                    <Image source={{ uri: repostydata?.image }} style={styles.media} />

                </KeyboardAvoidingView>
            </ScrollView>
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
    },
    textInputContainer: {
        minHeight: height * 0.1,
        width: width * 0.9,
        backgroundColor: 'white',
        alignSelf: 'center',
        borderRadius: 10,
        padding: 10,
        elevation: 2,
        marginVertical: 10,
        alignItems: 'center',
    },
    locationContainer: {
        height: height * 0.06,
        width: width * 0.9,
        backgroundColor: 'white',
        alignSelf: 'center',
        borderRadius: 10,
        padding: 10,
        elevation: 2,
        marginVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    inputStyle: {
        width: width * 0.84,
        minHeight: height * 0.05,
        color: 'black',
    },

    image: {
        width: width * 0.8,
        height: height * 0.4,
        marginTop: 20,
        alignSelf: 'center',
        borderRadius: 10,
    },
    title: {
        fontFamily: 'Jost-Regular',
        color: 'black',
        marginLeft: 5,
        marginBottom: 5,
        fontSize: 15,
    },

    arrow: {
        fontSize: 16,
        color: 'black',
    },
    modalOverlay: {
        flex: 1,
        // backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        // margin: 20,
        padding: 20,
        maxHeight: height * 0.6,
        width: width * 1,
        borderTopLeftRadius: 35,
        borderTopRightRadius: 35,
        borderColor: 'black',
        borderWidth: 0.5,
    },
    item: {
        padding: 10,
    },
    itemText: {
        fontFamily: 'Jost-Regular',
        fontSize: 16,
        color: 'black',
    },
    loader: {
        ...StyleSheet.absoluteFillObject, // Covers the entire screen
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    },
    textContainer: {
        flex: 1,
        marginLeft: 10
    },
    name: {
        fontFamily: 'Jost-Bold',
        fontSize: 18,
        color: 'black',
    },
    designation: {
        fontFamily: 'Jost-Regular',
        fontSize: 14,
        color: 'black',
    },
    description: {
        fontFamily: 'Jost-Regular',
        fontSize: 14,
        color: 'black',
        marginTop: 5,
        lineHeight: 20,
        paddingHorizontal: 13,
    },
    media: {
        width: '90%',
        height: 290,
        marginTop: 10,
        alignSelf: 'center'
    },
});

export default RepostScreen;
