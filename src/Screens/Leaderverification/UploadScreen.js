import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Platform, PermissionsAndroid, Image } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Video from 'react-native-video';
import { getHeight, getWidth } from '../../Theme/Constants';
import images from '../../assets/Images';
import { useNavigation } from '@react-navigation/native';
import CommonButton from '../../Components/CommonButton';

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
                message: 'App needs access to your storage to read videos',
                buttonNeutral: 'Ask Me Later',
                buttonNegative: 'Cancel',
                buttonPositive: 'OK',
            }
        );
        const writeStoragePermission = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            {
                title: 'Write External Storage Permission',
                message: 'App needs access to your storage to save videos',
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
    const [document, setDocument] = useState(null);

    const handleVideoPicker = async () => {
        const hasPermission = await requestPermissions();
        if (!hasPermission) {
            Alert.alert('Permission not granted');
            return;
        }

        Alert.alert(
            'Upload Video',
            'Choose an option',
            [
                {
                    text: 'From Gallery',
                    onPress: () => launchImageLibrary({ mediaType: 'video', videoQuality: 'high' }, (response) => {
                        if (!response.didCancel && !response.error) {
                            setVideo(response.assets[0]);
                        }
                    }),
                },
                {
                    text: 'Record Video',
                    onPress: () => launchCamera({ mediaType: 'video', videoQuality: 'high', durationLimit: 30 }, (response) => {
                        if (!response.didCancel && !response.error) {
                            setVideo(response.assets[0]);
                        }
                    }),
                },
                { text: 'Cancel', style: 'cancel' },
            ],
            { cancelable: true }
        );
    };

    const handleDocumentPicker = async () => {
        try {
            const result = await DocumentPicker.pick({
                type: [DocumentPicker.types.allFiles],
            });
            setDocument(result[0]);
            console.log(result[0], 'result')
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                console.log('User cancelled the picker');
            } else {
                throw err;
            }
        }
    };

    return (
        <View style={styles.container}>
            <View style={{ width: getWidth(1.2), marginTop: 10, marginBottom: 40, }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={images.ArrowLeft} style={styles.arrowimg} />
                </TouchableOpacity>
                <Text style={styles.TileTxt}>{"Leader Verification"}</Text>
                <Text style={styles.subTxt}>{"To create a profile as leader, you need to verify your identity. This is a two step process that includes uploading a self explanatory video and a supporting document. "}</Text>
            </View>
            <Text style={styles.subTxt}>{"Upload Self explanatory video "}</Text>

            <TouchableOpacity style={styles.uploadBox} onPress={handleVideoPicker}>
                {video ? (
                    <Video
                        source={{ uri: video.uri }}
                        style={styles.video}
                        resizeMode="cover"
                        controls={true}
                    />
                ) : (
                    <Text style={styles.uploadText}>Upload Video</Text>
                )}
            </TouchableOpacity>
            {video && <Text style={styles.uploadedText}>Video Uploaded</Text>}
            <Text style={styles.subTxt}>{"Upload Supporting document"}</Text>


            <TouchableOpacity style={styles.uploadBox} onPress={handleDocumentPicker}>
                {document ? (
                    // <Text style={styles.documentText}>{document.name}</Text>
                    <Image source={{ uri: document.uri }} style={{ height: '100%', width: '100%' }} />
                ) : (
                    <Text style={styles.uploadText}>Upload Document</Text>
                )}
            </TouchableOpacity>
            {document && <Text style={styles.uploadedText}>Document Uploaded</Text>}
            <CommonButton
                // onPress={() => navigation.replace('LoginScreen')}
                // onPress={() => isvalidate()}
                onPress={() => ''}
                color={['black', 'black']}
                title={'Verify'}
                width={getWidth(1.2)}
                texttitle={'white'}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
    uploadBox: {
        width: 300,
        height: 150,
        borderWidth: 2,
        borderColor: '#d3d3d3',
        borderRadius: 5,
        borderStyle: 'dashed',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20,
    },
    uploadText: {
        fontSize: 18,
        color: '#808080',
    },
    video: {
        width: '100%',
        height: '100%',
    },
    documentText: {
        fontSize: 16,
        color: '#000',
        textAlign: 'center',
        paddingHorizontal: 10,
    },
    uploadedText: {
        fontSize: 16,
        color: 'green',
        marginTop: 10,
    },
    TileTxt: {
        fontSize: 28,
        color: 'black',
        fontFamily: 'Jost',
        fontWeight: '700',
        paddingBottom: 2

    },
    subTxt: {
        fontSize: getHeight(50),
        color: 'black',

        // width: getHeight(2.6),
        fontFamily: 'Jost',
        fontWeight: '300',
        // alignSelf:'center'
    },
    arrowimg: {
        width: 30,
        height: 20,
        marginBottom: 10,
        color: 'black'
    },
});

export default UploadScreen;
