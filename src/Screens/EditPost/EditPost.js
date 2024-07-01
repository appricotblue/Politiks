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
import React, {useState, useEffect} from 'react';
import Header from '../../Components/Header';
import {height, width} from '../../Theme/ConstantStyles';
import images from '../../assets/Images';
import CommonButton from '../../Components/CommonButton';
import {getWidth} from '../../Theme/Constants';
import ImagePicker from 'react-native-image-crop-picker';
import {CreatePost, getCountries} from '../../api';
import local from '../../Storage/Local';
import CountryPicker from '../../Components/CountryPicker';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';

const EditPost = ({navigation}) => {
  const [text, setText] = useState('');
  const [imagesArray, setImagesArray] = useState([]);
  const [userid, setuserid] = useState('');
  const [countrydata, setcountrydata] = useState([]);
  const [country, changecountry] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCountryCode, setSelectedCountryCode] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const GetCountries = async () => {
    try {
      const response = await getCountries();
      setcountrydata(response);
      console.log(response, 'getallinterests API response---------');
    } catch (error) {
      console.error('Error fetching interests:', error);
    }
  };

  const toggleModal = () => {
    console.log('==================');
    setModalVisible(!modalVisible);
  };

  const selectCountry = country => {
    setSelectedCountryCode(country.name);
    setModalVisible(false);
    if (handleSelectCountry) {
      handleSelectCountry(country); // Pass the selected country ID to the parent component
    }
  };

  const handleSelectCountry = item => {
    console.log('Selected country ID:', item?.id, item?.name);
    changecountry(item.name);
  };

  const getuser = async () => {
    const userId = await local.getUserId();
    console.log(userId, 'leaderdata he');
    setuserid(userId);
  };

  useEffect(() => {
    getuser();
    GetCountries();
  }, []);

  const validate = () => {
    console.log(imagesArray, 'imagesArray');
    if (imagesArray?.length === 0) {
      Alert.alert('Please add at least one image to continue');
    } else if (text === '') {
      Alert.alert('Please add some content to continue');
    } else if (country === '') {
      Alert.alert('Please add a country to continue');
    } else {
      createPosts();
    }
  };

  const createPosts = async () => {
    const formData = new FormData();
    formData.append('location', country);
    formData.append('tagUser', '2');
    formData.append('caption', text);
    imagesArray.forEach((imageUri, index) => {
      const imageFile = {
        uri: imageUri.path,
        type: imageUri.mime,
        name: imageUri.path,
      };
      formData.append(`image`, imageFile);
      console.log(imageFile, 'test', imageUri, 'imagefile')
  });

    console.log(formData, 'sending data')
    try {
      setIsLoading(true);
      const res = await CreatePost(formData, userid);
      setIsLoading(false);
      console.log(res, '---------><><');
      navigation.navigate('Home');
    } catch (error) {
      setIsLoading(false);
      console.error('Error creating post:', error);
    }
  };

  const pickImageFromGallery = () => {
    ImagePicker.openPicker({
      multiple: true,
      mediaType: 'photo',
    })
      .then(selectedImages => {
        console.log(selectedImages);
        setImagesArray([...imagesArray, ...selectedImages]);
      })
      .catch(error => {
        console.log('Error picking images from gallery: ', error);
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
        setImagesArray([...imagesArray, image]);
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

  const renderItem = ({item}) => (
    <Image source={{uri: item.path}} style={styles.image} />
  );

  return (
    <View style={styles.container}>
      <Header title="Create Post" />
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
              <Text style={styles.locationText}>
                {country ? country : 'Select Location'}
              </Text>
            </View>
            <TouchableOpacity onPress={toggleModal}>
              <Image source={images.PlusIcon} style={{width: 25, height: 25}} />
            </TouchableOpacity>
          </View>
          <GooglePlacesAutocomplete
            placeholder="Search"
            styles={{
              textInput: {
                height: height * 0.06,
                width: width * 0.6,
                color: '#5d5d5d',
                fontSize: 16,
              },

              description: {
                color: 'black',
              },
              row: {
                width: width * 0.9,
                alignSelf: 'center',
              },
            }}
            onPress={(data, details = null) => {
              console.log(details, '---------');
              console.log(data, '================');
            }}
            query={{
              // key: 'AIzaSyA6sfxAGWorlekK-rkolU152WkN5mzn76A',
              language: 'en',
            }}
          />
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
          <FlatList
            data={imagesArray}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            horizontal
            contentContainerStyle={styles.imageList}
          />
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
      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}>
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.modalOverlay} />
        </TouchableWithoutFeedback>
        <View style={styles.modalContent}>
          <FlatList
            data={countrydata}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() => selectCountry(item)}
                style={styles.item}>
                <Text style={styles.itemText}>{item.name}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </Modal>
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
  imageList: {
    paddingVertical: 10,
  },
  title: {
    fontFamily: 'Jost-Regular',
    color: 'black',
    marginLeft: 5,
    marginBottom: 5,
    fontSize: 15,
  },
  dropdownButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 9,
    borderWidth: 1,
    borderColor: '#271926',
    borderRadius: 30,
    minHeight: 45,
    marginBottom: 7,
  },
  buttonText: {
    fontFamily: 'Jost-Regular',
    fontSize: 16,
    color: 'black',
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
});

export default EditPost;
