import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
  ScrollView,
  Alert,
} from 'react-native';
import images from '../../assets/Images';
import {getHeight, getWidth} from '../../Theme/Constants';
import DiscoverItems from '../../Components/DiscoverItems';
import LinearGradient from 'react-native-linear-gradient';
import Header from '../../Components/Header';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import CommonStyles from '../../Theme/CommonStyles';
import {getAllUserImages, getAllUserPost} from '../../api';
import local from '../../Storage/Local';
import {height, width} from '../../Theme/ConstantStyles';
import ProfileModal from '../../Components/ProfileModal';
import MyInterestModal from '../../Components/MyInterestModal';
import ImagePicker from 'react-native-image-crop-picker';

const EditProfile = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTab, setSelectedTab] = useState(0);
  const [leader, setLeader] = useState(false);
  const [details, setDetails] = useState();
  const [image, setImage] = useState(null);
  const [userid, setuserid] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [nameText, setNameText] = useState('');
  const [selfText, setSelfText] = useState('');

  const [interestModalVisible, setInterestModalVisible] = useState(false);

  const [selectedInterest, setSelectedInterests] = useState([]);

  const data = [
    {id: '1', title: 'Communism', imageUrl: images.ViratProfile},
    {id: '2', title: 'Evolutionary', imageUrl: images.Welcome_2},
    {id: '3', title: 'Socialism', imageUrl: images.Welcome_3},
    {id: '4', title: 'Marxism', imageUrl: images.Welcome_1},
    {id: '5', title: 'Democracy', imageUrl: images.Welcome_2},
  ];

  const getuser = async () => {
    const userId = await local.getUserId();
    console.log(userId, 'leaderdata he');
    setuserid(userId);
    getAllUserPosts(userId);
    getAllPosts(userId);
  };

  console.log(
    selectedInterest,
    '----------------------------------------------',
  );
  useEffect(() => {
    getuser();
  }, []);

  const getAllUserPosts = async userId => {
    try {
      const res = await getAllUserPost(userId);
      const {data} = res;
      setDetails(data[0]);
      //   console.log(res?.data, 'Profileeeeeeeeeeeeoooooooooooooooo');
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };
  const getAllPosts = async userId => {
    try {
      const res = await getAllUserImages(userId);
      setImage(res?.data);
      //   console.log(res?.data, 'Profileeeeeeee--------------------');
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const openInterestModal = () => {
    setInterestModalVisible(true);
  };

  const closeInterestModal = () => {
    setInterestModalVisible(false);
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
    <SafeAreaView style={{flex: 1}}>
      <Header title="Profile" />

      <ScrollView contentContainerStyle={styles.container}>
        <Image
          source={images.ProfileBanner}
          style={{width: '100%', height: 150}}
        />
        <View style={styles.tabs}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Followers')}
            style={{
              width: getWidth(4),
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: 18,
                fontFamily: 'Jost',
                fontWeight: '800',
                color: 'black',
              }}>
              565
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontFamily: 'Jost',
                fontWeight: '400',
                color: 'grey',
              }}>
              Following
            </Text>
          </TouchableOpacity>
          <View
            style={{
              width: getWidth(4),
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              style={styles.outerview}
              onPress={() => showImagePickerOptions()}>
              <ImageBackground
                source={{uri: image?.path}}
                resizeMode="cover"
                style={styles.statusUploadBackground}></ImageBackground>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('Followers')}
            style={{
              width: getWidth(4),
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: 16,
                fontFamily: 'Jost',
                fontWeight: '800',
                color: 'black',
              }}>
              698
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontFamily: 'Jost',
                fontWeight: '400',
                color: 'grey',
              }}>
              Followers
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            width: '90%',
            marginTop: 40,
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 20,
          }}>
          {leader ? (
            <View>
              <Text style={styles.tabText}>Joe Biden</Text>
              <Text style={styles.idText}>joe_biden_official</Text>
            </View>
          ) : (
            <View>
              <Text style={styles.tabText}>{details?.userName}</Text>
              <Text style={styles.idText}>monty_23mortell</Text>
            </View>
          )}
        </View>

        <View style={{width: getWidth(1)}}>
          {selectedTab === 0 ? (
            <View style={styles.selfView}>
              <View style={styles.row1}>
                <Text style={styles.subHeadText}> My Name</Text>
              </View>
              {/* <View style={styles.partyContainer}> */}
              <TextInput
                style={styles.partyContainer}
                onChangeText={setNameText}
                value={nameText}
                placeholder={details?.userName}
                keyboardType="default"
                placeholderTextColor={'grey'}
              />
              {/* <Text style={styles.democraticText}>
                  {details?.userName ? details?.userName : 'User Name'}
                </Text> */}
              {/* </View> */}
              <View style={styles.row1}>
                <Text style={styles.subHeadText}> My Self</Text>
              </View>
              {/* <View style={styles.selfContainer}> */}
              {/* <Text style={styles.selfText}>
                  Joe Biden, the 46th President of the United States, has a
                  storied career in American politics spanning over five
                  decades. Born on November 20, 1942, in Scranton, Pennsylvania,
                  Biden overcame personal and professional challenges to become
                  one of the most enduring figures in modern political history
                </Text> */}
              <TextInput
                style={styles.selfContainer}
                onChangeText={setSelfText}
                value={selfText}
                placeholder={
                  'Biden overcame personal and professional challenges to become one of the most enduring figures in modern political history'
                }
                keyboardType="default"
                placeholderTextColor={'grey'}
                multiline={true}
              />
              {/* </View> */}
              <View style={styles.row1}>
                <Text style={styles.subHeadText}> My Party</Text>

                <TouchableOpacity onPress={() => openModal()}>
                  <Image
                    source={images.PencilPNG}
                    style={{width: 25, height: 25}}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.partyContainer1}>
                <Image
                  source={images.DemocraticPNG}
                  style={{width: 25, height: 25}}
                />
                <Text style={styles.democraticText}>
                  {selectedItem?.title
                    ? selectedItem?.title
                    : 'Choose your Party'}
                </Text>
              </View>
              <View style={styles.row1}>
                <Text style={styles.subHeadText}> My Interests</Text>

                <TouchableOpacity onPress={() => openInterestModal()}>
                  <Image
                    source={images.PencilPNG}
                    style={{width: 25, height: 25}}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.interestContainer}>
                <ScrollView horizontal>
                  <Text style={styles.interestText}>
                    {selectedInterest?.map((item, ind) => (
                      <Text style={{color: 'grey'}} key={ind}>
                        {item.title ? item.title : 'Choose your Interest'},
                      </Text>
                    ))}
                  </Text>
                </ScrollView>
              </View>
            </View>
          ) : (
            <></>
          )}
        </View>
        <View style={{height: getHeight(2)}} />
      </ScrollView>
      <View style={styles.clickableGradient}>
        <TouchableOpacity style={styles.cancelButton}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.saveButton}>
          <Text style={styles.saveText}>Save</Text>
        </TouchableOpacity>
      </View>
      <ProfileModal
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
        modalVisible={modalVisible}
        onClosePress={closeModal}
      />
      <MyInterestModal
        selectedItems={selectedInterest}
        setSelectedItems={setSelectedInterests}
        modalVisible={interestModalVisible}
        onClosePress={closeInterestModal}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchBar: {
    flexDirection: 'row',
    width: getWidth(1.1),
    borderRadius: 10,
    backgroundColor: 'white',
    marginTop: 20,
    alignItems: 'center',
    // height:40
  },
  input: {
    // borderWidth: 1,
    // borderColor: 'gray',
    padding: 10,
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',

    backgroundColor: 'white',
    width: getWidth(1.5),
    borderRadius: 15,
    height: 50,

    marginBottom: 15,
    position: 'absolute',
    top: 120,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',

    backgroundColor: 'white',
    width: getWidth(1.3),
    marginBottom: 30,
    height: 50,
    borderRadius: 18,
  },
  activeTab: {
    borderBottomColor: 'transparent',
  },
  tabText: {
    color: 'black',
    fontSize: 24,
    fontFamily: 'Jost-SemiBold',
    fontWeight: '600',
  },
  idText: {
    color: 'grey',
    fontSize: 14,
    fontFamily: 'Jost-SemiBold',
    fontWeight: '600',
    alignSelf: 'center',
  },
  activeTabText: {
    fontFamily: 'Jost-SemiBold',
    color: 'white',
    fontSize: 13,
    fontWeight: '800',
  },
  flatListContent: {
    flexGrow: 1,
    marginBottom: 20,
  },
  itemContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 50,
    margin: 8,
  },
  itemImage: {
    width: '100%',
    height: 100,
    borderRadius: 5,
  },
  itemName: {
    fontWeight: 'bold',
    marginTop: 5,
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
  button: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  statusUploadBackground: {
    height: 80,
    width: 80,
    borderRadius: 45, // half of height/width for perfect circle
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)', // Adjust opacity or color as needed
  },
  fanBackground: {
    height: 60,
    width: 60,

    borderRadius: 35, // half of height/width for perfect circle
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)', // Adjust opacity or color as needed
  },
  logo: {
    width: 30,
    height: 30,
    position: 'absolute',
    top: 65,
    backgroundColor: '#00D2FF',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    // right: 15,
  },
  outerview: {
    height: 85,
    width: 85,

    borderRadius: 45, // half of height/width for perfect circle
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#7E65C0',
  },
  fanouterview: {
    height: 65,
    width: 65,

    borderRadius: 45, // half of height/width for perfect circle
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#7E65C0',
  },
  flatListContent: {
    flexGrow: 1,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  clickableGradient: {
    position: 'absolute',
    bottom: 0.5,
    // left: 70,
    right: 0,
    height: getHeight(13), // Adjust height as needed
    width: getWidth(1),
    justifyContent: 'space-around',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 15,
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingHorizontal: 20,
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 10,
    width: '20%',
    height: '100%',
    borderRadius: 15,
  },
  bottumtab: {
    flex: 1,
    alignItems: 'center',
  },
  selfView: {
    height: getHeight(2),
    width: getWidth(1),
    paddingHorizontal: 10,
  },
  selfContainer: {
    minHeight: getHeight(6),
    width: getWidth(1.06),
    borderColor: 'grey',
    borderWidth: 0.5,
    borderRadius: 15,
    padding: 15,
    color: 'grey',
    fontSize: 15,
  },
  partyContainer: {
    height: getHeight(15),
    width: getWidth(1.06),
    borderColor: 'grey',
    borderWidth: 0.5,
    borderRadius: 15,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    color: 'grey',
    fontSize: 15,
  },
  partyContainer1: {
    height: getHeight(15),
    width: getWidth(1.06),
    borderColor: 'grey',
    borderWidth: 0.5,
    borderRadius: 15,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  interestContainer: {
    minHeight: getHeight(15),
    width: getWidth(1.06),
    borderColor: 'grey',
    borderWidth: 0.5,
    borderRadius: 15,
    padding: 13,
    flexDirection: 'row',
    alignItems: 'center',
  },
  democraticText: {
    color: 'grey',
    marginHorizontal: 12,
    fontSize: 17,
  },
  interestText: {
    color: 'grey',
    marginHorizontal: 5,
    fontSize: 17,
  },
  selfText: {
    color: 'grey',
    fontSize: 17,
  },
  subHeadText: {
    color: 'black',
    fontSize: 20,
    fontWeight: '800',
    marginVertical: 15,
  },
  cancelButton: {
    height: height * 0.05,
    width: width * 0.4,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#3A7BD5',
  },
  saveButton: {
    height: height * 0.05,
    width: width * 0.4,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3A7BD5',
  },
  cancelText: {
    color: '#3A7BD5',
    fontWeight: '800',
  },
  saveText: {
    color: 'white',
    fontWeight: '800',
  },
  row1: {
    width: width * 0.9,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
});

export default EditProfile;
