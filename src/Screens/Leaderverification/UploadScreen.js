import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Platform, PermissionsAndroid, Image, Modal } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Video from 'react-native-video';
import { getHeight, getWidth } from '../../Theme/Constants';
import images from '../../assets/Images';
import { useNavigation } from '@react-navigation/native';
import CommonButton from '../../Components/CommonButton';
import ImageResizer from 'react-native-image-resizer';
import local from '../../Storage/Local';

const requestPermissions = async () => {
    if (Platform.OS === 'android') {
        const cameraPermission = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            {
                title: 'Camera Permission',
                message: 'App needs camera permission',
                buttonNeutral: 'Ask Me Later',
                buttonNegative: 'Cancel',
                buttonPositive: 'OK',
            }
        );
        const readStoragePermission = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            {
                title: 'Read External Storage Permission',
                message: 'App needs access to your storage to read files',
                buttonNeutral: 'Ask Me Later',
                buttonNegative: 'Cancel',
                buttonPositive: 'OK',
            }
        );
        const writeStoragePermission = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            {
                title: 'Write External Storage Permission',
                message: 'App needs access to your storage to save files',
                buttonNeutral: 'Ask Me Later',
                buttonNegative: 'Cancel',
                buttonPositive: 'OK',
            }
        );

        return (
            cameraPermission === PermissionsAndroid.RESULTS.GRANTED &&
            readStoragePermission === PermissionsAndroid.RESULTS.GRANTED &&
            writeStoragePermission === PermissionsAndroid.RESULTS.GRANTED
        );
    }
    return true;
};

const UploadScreen = () => {
    const navigation = useNavigation();
    const [video, setVideo] = useState(null);
    const [image, setImage] = useState(null);
    const [videoModalVisible, setVideoModalVisible] = useState(false);
    const [imageModalVisible, setImageModalVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [userid, setuserid] = useState('');


    const getuser = async () => {
        const userId = await local.getUserId();
        console.log(userId, 'userid test')
        setuserid(userId)
    };

    useEffect(() => {

        getuser()

    }, [])
    const openCameraOrGallery = (mediaType, option) => {
        const hasPermission = requestPermissions();
        if (!hasPermission) {
            Alert.alert('Permission not granted');
            return;
        }

        if (option === 'gallery') {
            launchImageLibrary({ mediaType: mediaType, videoQuality: 'high' }, (response) => {
                if (!response.didCancel && !response.error) {
                    if (mediaType === 'video') {
                        setVideo(response.assets[0]);
                    } else {
                        setImage(response.assets[0]);
                    }
                }
            });
        } else if (option === 'camera') {
            launchCamera({ mediaType: mediaType, videoQuality: 'high', durationLimit: 30 }, (response) => {
                if (!response.didCancel && !response.error) {
                    if (mediaType === 'video') {
                        setVideo(response.assets[0]);
                    } else {
                        setImage(response.assets[0]);
                    }
                }
            });
        }
    };

    const handleVideoPicker = () => {
        setVideoModalVisible(true);
    };

    const handleImagePicker = () => {
        setImageModalVisible(true);
    };

    // const handleVerify = () => {
    //     if (!video || !image) {
    //         setErrorMessage('Both video and image files are required');
    //     } else {
    //         handledataVerify()
    //         // navigation.navigate('PendingScreen')
    //         // setErrorMessage('');
    //         // proceed with verification
    //     }
    // };

    const resizeImage = async (uri, width, height) => {
        try {
            const response = await ImageResizer.createResizedImage(uri, width, height, 'JPEG', 80);
            return response;
        } catch (err) {
            console.log(err);
            return null;
        }
    };
    const handleVerify = async () => {
        if (!video || !image) {
            setErrorMessage('Both video and image files are required');
            return;
        }
    
        const formData = new FormData();
        formData.append('verificationVideo', {
            uri: video.uri,
            type: video.type,
            name: video.fileName,
        });
        formData.append('verificationImage', {
            uri: image.uri,
            type: image.type,
            name: image.fileName,
        });
    
        // Custom fetch function with timeout
        const fetchWithTimeout = (url, options, timeout = 180000) => { // 180000 ms = 3 minutes
            return Promise.race([
                fetch(url, options),
                new Promise((_, reject) =>
                    setTimeout(() => reject(new Error('Request timed out')), timeout)
                ),
            ]);
        };
    
        try {
            console.log('Starting upload...');
    
            const response = await fetchWithTimeout(
                `https://politiks.aindriya.co.uk/user/uploadVerificationFiles/${userid}`,
                {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                },
                180000 // Timeout set to 3 minutes
            );
    console.log(response,'response')
            if (response.ok) {
                console.log('Upload successful');
                navigation.navigate('PendingScreen');
            } else {
                const responseBody = await response.text();
                console.log('Upload failed. Server response:', responseBody);
                setErrorMessage(`Upload failed. Server responded with: ${responseBody}`);
            }
        } catch (error) {
            console.error('An error occurred:', error);
            setErrorMessage(`An error occurred: ${error.message}`);
        }
    };
    

    // Use this function before appending the image to FormData
    // const handleImagePicker = async () => {
    //     setImageModalVisible(true);
    //     const response = await launchImageLibrary({ mediaType: 'photo', quality: 0.5 });
    //     if (!response.didCancel && !response.error) {
    //         const resizedImage = await resizeImage(response.assets[0].uri, 800, 600); // Adjust width and height as needed
    //         if (resizedImage) {
    //             setImage(resizedImage);
    //         } else {
    //             Alert.alert('Error', 'Failed to resize image.');
    //         }
    //     }
    // };


    // const handleVerify = async () => {
    //     if (!video || !image) {
    //         setErrorMessage('Both video and image files are required');
    //         return;
    //     }

    //     // Check file sizes (example size limit: 5MB for image and 20MB for video)
    //     // const imageSizeLimit = 5 * 1024 * 1024;
    //     // const videoSizeLimit = 20 * 1024 * 1024;

    //     // if (image.fileSize > imageSizeLimit) {
    //     //     setErrorMessage('Image file is too large. Maximum size is 5MB.');
    //     //     return;
    //     // }

    //     // if (video.fileSize > videoSizeLimit) {
    //     //     setErrorMessage('Video file is too large. Maximum size is 20MB.');
    //     //     return;
    //     // }

    //     const formData = new FormData();
    //     formData.append('verificationVideo', {
    //         uri: video.uri,
    //         type: video.type,
    //         name: video.fileName,
    //     });
    //     formData.append('verificationImage', {
    //         uri: image.uri,
    //         type: image.type,
    //         name: image.fileName,
    //     });

    //     // Custom fetch function with timeout
    //     const fetchWithTimeout = (url, options, timeout = 30000) => {
    //         return Promise.race([
    //             fetch(url, options),
    //             new Promise((_, reject) =>
    //                 setTimeout(() => reject(new Error('Request timed out')), timeout)
    //             ),
    //         ]);
    //     };

    //     try {
    //         const response = await fetchWithTimeout(
    //             `https://politiks.aindriya.co.uk/user/uploadVerificationFiles/${userid}`,
    //             {
    //                 method: 'POST',
    //                 body: formData,
    //                 headers: {
    //                     'Content-Type': 'multipart/form-data',
    //                 },
    //             },
    //             180000  // Timeout set to 60 seconds
    //         );
    //         console.log(response)
    //         if (response.ok) {
    //             navigation.navigate('PendingScreen');
    //         } else {
    //             const responseBody = await response.text();
    //             setErrorMessage(`Upload failed. Server responded with: ${responseBody}`);
    //         }
    //     } catch (error) {
    //         setErrorMessage(`An error occurred: ${error.message}`);
    //     }
    // };


    return (
        <View style={styles.container}>
            <View style={{ width: getWidth(1.2), marginTop: 10, marginBottom: 20, marginTop: 30, }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20, }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image source={images.ArrowLeftblack} style={styles.arrowimg} />
                    </TouchableOpacity>
                    <Text style={styles.TileTxt}>Leader Verification</Text>
                </View>

                <Text style={styles.subTxt}>
                    To create a profile as leader, you need to verify your identity. This is a two-step process that includes uploading a self-explanatory video and a supporting document.
                </Text>
            </View>
            <Text style={styles.subTxt}>Upload Self-explanatory video</Text>

            <TouchableOpacity style={styles.uploadBox} onPress={handleVideoPicker}>
                {video ? (
                    <Video
                        source={{ uri: video.uri }}
                        style={styles.video}
                        resizeMode="cover"
                        controls={true}
                    />
                ) : (
                    <Text style={styles.uploadText}>Upload</Text>
                )}
            </TouchableOpacity>
            {video && <Text style={styles.uploadedText}>Video Uploaded</Text>}
            {!video && errorMessage && <Text style={styles.errorText}>Video file is required</Text>}

            <Text style={styles.subTxt}>Upload Supporting Document</Text>

            <TouchableOpacity style={styles.uploadBox} onPress={handleImagePicker}>
                {image ? (
                    <Image source={{ uri: image.uri }} style={{ height: '100%', width: '100%', borderRadius: 16 }} />
                ) : (
                    <Text style={styles.uploadText}>Upload</Text>
                )}
            </TouchableOpacity>
            {image && <Text style={styles.uploadedText}>Image Uploaded</Text>}
            {!image && errorMessage && <Text style={styles.errorText}>Image file is required</Text>}

            <View style={styles.verifyButtonContainer}>
                <CommonButton
                    onPress={handleVerify}
                    color={['black', 'black']}
                    title={'Verify'}
                    width={getWidth(1.2)}
                    texttitle={'white'}
                />
            </View>

            {/* Video Modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={videoModalVisible}
                onRequestClose={() => setVideoModalVisible(false)}
            >
                <View style={styles.modalView}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <TouchableOpacity onPress={() => setVideoModalVisible(false)}>
                            <Image source={images.ArrowLeftblack} style={styles.arrowimg} />
                        </TouchableOpacity>
                        <Text style={styles.TileTxt}>Video Verification</Text>
                    </View>

                    <Image source={images.verification} style={styles.verification} />
                    <View style={{ height: getHeight(2.8), }}>
                        <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                            <Image source={images.starblue} style={styles.stardot} />
                            <Text style={styles.subTxt}>
                                Upload a self Introductory video
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                            <Image source={images.starblue} style={styles.stardot} />
                            <Text style={styles.subTxt}>
                                Ensure the video is no longer than 1 minute
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                            <Image source={images.starblue} style={styles.stardot} />
                            <Text style={styles.subTxt}>
                                Find a well-lit area to record your video.
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                            <Image source={images.starblue} style={styles.stardot} />
                            <Text style={styles.subTxt}>
                                Minimize background noise to capture clear audio.
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                            <Image source={images.starblue} style={styles.stardot} />
                            <Text style={styles.subTxt}>
                                Keep your device steady for a stable shot.
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                            <Image source={images.starblue} style={styles.stardot} />
                            <Text style={styles.subTxt}>
                                Click "Next" to be directed to your camera
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                            <Image source={images.starblue} style={styles.stardot} />
                            <Text style={styles.subTxt}>
                                Once recorded, Click on “Upload”
                            </Text>
                        </View>
                    </View>

                    <View style={{ height: getHeight(5), width: '100%', justifyContent: 'flex-end', alignItems: 'center', alignSelf: 'baseline' }}>
                        <CommonButton
                            onPress={() => {
                                setVideoModalVisible(false);
                                Alert.alert(
                                    'Upload Video',
                                    'Choose an option',
                                    [
                                        {
                                            text: 'From Gallery',
                                            onPress: () => openCameraOrGallery('video', 'gallery'),
                                        },
                                        {
                                            text: 'Record Video',
                                            onPress: () => openCameraOrGallery('video', 'camera'),
                                        },
                                        { text: 'Cancel', style: 'cancel' },
                                    ],
                                    { cancelable: true }
                                );
                            }}
                            color={['black', 'black']}
                            title={'Continue'}
                            width={getWidth(1.2)}
                            texttitle={'white'}
                        />
                        <Text style={styles.subTxt}>
                            Our team will review and verify your profile
                        </Text>
                        <Text style={styles.subTxt}>
                            within 48 hours
                        </Text>
                    </View>
                </View>
            </Modal>

            {/* Image Modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={imageModalVisible}
                onRequestClose={() => setImageModalVisible(false)}
            >
                <View style={styles.modalView}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                        <TouchableOpacity onPress={() => setImageModalVisible(false)}>
                            <Image source={images.ArrowLeftblack} style={styles.arrowimg} />
                        </TouchableOpacity>
                        <Text style={styles.TileTxt}>Image Verification</Text>
                    </View>

                    <Image source={images.verification} style={styles.verification} />
                    <View style={{ height: getHeight(2.8), }}>
                        <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                            <Image source={images.starblue} style={styles.stardot} />
                            <Text style={styles.subTxt}>
                                Upload a supporting document
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                            <Image source={images.starblue} style={styles.stardot} />
                            <Text style={styles.subTxt}>
                                Ensure the image is clear and readable
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                            <Image source={images.starblue} style={styles.stardot} />
                            <Text style={styles.subTxt}>
                                Find a well-lit area to take your photo.
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                            <Image source={images.starblue} style={styles.stardot} />
                            <Text style={styles.subTxt}>
                                Keep your device steady for a clear shot.
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                            <Image source={images.starblue} style={styles.stardot} />
                            <Text style={styles.subTxt}>
                                Click "Next" to be directed to your camera
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                            <Image source={images.starblue} style={styles.stardot} />
                            <Text style={styles.subTxt}>
                                Once captured, Click on “Upload”
                            </Text>
                        </View>
                    </View>

                    <View style={{ height: getHeight(5), width: '100%', justifyContent: 'flex-end', alignItems: 'center', alignSelf: 'baseline' }}>
                        <CommonButton
                            onPress={() => {
                                setImageModalVisible(false);
                                Alert.alert(
                                    'Upload Image',
                                    'Choose an option',
                                    [
                                        {
                                            text: 'From Gallery',
                                            onPress: () => openCameraOrGallery('photo', 'gallery'),
                                        },
                                        {
                                            text: 'Take Photo',
                                            onPress: () => openCameraOrGallery('photo', 'camera'),
                                        },
                                        { text: 'Cancel', style: 'cancel' },
                                    ],
                                    { cancelable: true }
                                );
                            }}
                            color={['black', 'black']}
                            title={'Continue'}
                            width={getWidth(1.2)}
                            texttitle={'white'}
                        />
                        <Text style={styles.subTxt}>
                            Our team will review and verify your profile
                        </Text>
                        <Text style={styles.subTxt}>
                            within 48 hours
                        </Text>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: getWidth(1.2),
        alignSelf: 'center',
        backgroundColor: '#f5f5f5',
    },
    uploadBox: {
        width: 130,
        height: 130,
        borderWidth: 2,
        borderColor: '#d3d3d3',
        borderRadius: 5,
        borderStyle: 'dashed',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20,
        borderRadius: 15,
    },
    uploadText: {
        fontSize: 14,
        color: '#808080',
    },
    video: {
        width: '100%',
        height: '100%',
    },
    documentText: {
        fontSize: 14,
        color: '#000',
        textAlign: 'center',
        paddingHorizontal: 10,
    },
    uploadedText: {
        fontSize: 14,
        color: 'green',
        marginTop: 2,
        marginBottom: 10
    },
    errorText: {
        fontSize: 14,
        color: 'red',
        marginTop: 2,
        marginBottom: 10
    },
    TileTxt: {
        fontSize: 23,
        color: 'black',
        fontFamily: 'Jost',
        fontWeight: '700',
        paddingBottom: 2,

    },
    subTxt: {
        fontSize: getHeight(50),
        color: 'black',
        fontFamily: 'Jost',
        fontWeight: '300',
    },
    arrowimg: {
        width: 30,
        height: 20,
        // color: 'black',
    },
    stardot: {
        width: 16,
        height: 16,
        marginRight: 5
    },
    verification: {
        width: 100,
        height: 100,
        alignSelf: 'center',
        marginTop: 50,
        marginBottom: 50
    },
    modalView: {
        height: getHeight(1),
        width: getWidth(1),
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalText: {
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 20,
    },
    verifyButtonContainer: {
        position: 'absolute',
        bottom: 20,
        width: '100%',
        alignItems: 'center',
    },
});

export default UploadScreen;
