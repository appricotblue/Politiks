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
} from 'react-native';
import React, { useState, useEffect } from 'react';
import Header from '../../Components/Header';
import {height, width} from '../../Theme/ConstantStyles';
import images from '../../assets/Images';
import CommonButton from '../../Components/CommonButton';
import {getWidth} from '../../Theme/Constants';
import ImagePicker from 'react-native-image-crop-picker';
import {CreatePost} from '../../api';
import local from '../../Storage/Local';

const EditPost = ({navigation}) => {
  const [text, setText] = useState('');
  const [image, setImage] = useState(null);
  const [userid, setuserid] = useState('');


  const getuser = async () => {
    const userId = await local.getUserId();
    console.log(userId, 'leaderdata he');
    setuserid(userId);
  };

  useEffect(() => {
    getuser();
  }, []);

  const validate = () => {
    console.log(image, 'imagee')
    if (image == null) {
      Alert.alert('Please add an image to continue')

    } else if (text == '') {
      Alert.alert('Please add an Content to continue')
    } else {
      createPosts()
    }
  }


  const createPosts = async () => {
    const formData = new FormData();
    formData.append('location', 'kochi');
    formData.append('tagUser', '2');
    formData.append('caption', text);
    formData.append('image', {
      uri: image.path,
      type: image.mime,
      name: image.path,
    });

    try {
      const res = await CreatePost(formData, userid);
      // console.log(res?.data, '---------><><');
      navigation.navigate('Home');
    } catch (error) {
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
        {text: 'Cancel', style: 'cancel'},
        {text: 'Gallery', onPress: pickImageFromGallery},
        {text: 'Camera', onPress: takePhoto},
      ],
      {cancelable: true},
    );
  };

  return (
    <View style={styles.container}>
      <Header title="Edit Post" />
      <ScrollView>
        <KeyboardAvoidingView>
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
          <View style={styles.locationContainer}>
            <View style={styles.row1}>
              <Image
                source={images.LocationArrow}
                style={{width: 25, height: 25}}
              />
              <Text style={styles.locationText}>Add Location</Text>
            </View>
            <Image source={images.PlusIcon} style={{width: 25, height: 25}} />
          </View>
          {image?.length !== 0 ? (
            <View style={styles.locationContainer}>
              <View style={styles.row1}>
                <Image
                  source={images.ImagePNG}
                  style={{width: 25, height: 25}}
                />
                <Text style={styles.locationText}>Add Image</Text>
              </View>
              <TouchableOpacity onPress={() => showImagePickerOptions()}>
                <Image
                  source={images.PlusIcon}
                  style={{width: 25, height: 25}}
                />
              </TouchableOpacity>
            </View>
          ) : (
            <></>
          )}
          {image?.length !== 0 ? (
            <View>
              {image && (
                <Image source={{uri: image.path}} style={styles.image} />
              )}
            </View>
          ) : (
            <></>
          )}

          <View style={styles.buttonView}></View>
        </KeyboardAvoidingView>
        <CommonButton
          onPress={() => validate()}
          color={['#3A7BD5', '#3A7BD5']}
          title={'Publish'}
          width={getWidth(1.1)}
          texttitle={'white'}
        />
      </ScrollView>
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
  locationText: {
    color: 'black',
    fontSize: 15,
    fontWeight: '400',
    marginLeft: 10,
  },
  row1: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonView: {
    position: 'absolute',
    width: width * 1,
    bottom: 1,
  },
  image: {
    width: width * 0.8,
    height: height * 0.4,
    marginTop: 20,
    alignSelf: 'center',
    borderRadius: 10,
  },
});

export default EditPost;
