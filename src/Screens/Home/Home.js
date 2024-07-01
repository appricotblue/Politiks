import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  BackHandler,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {connect} from 'react-redux';
import {setApiData} from '../../redux/action';
import CommonButton from '../../Components/CommonButton';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HomeHeader from '../../Components/HomeHeader';
import HorizontalList from '../../Components/HorizontalList';
import images from '../../assets/Images';
import SwiperComponent from '../../Components/SwiperComponent';
import ListItem from '../../Components/ListItem';
import Footer from '../../Components/Footer';
import {getAllPost, getAllUserPost,LikePost} from '../../api';
import local from '../../Storage/Local';

const axios = require('axios').default;
const height = Dimensions.get('window').height;

const Home = props => {
  const navigation = useNavigation();
  const [ProfileData, setProfileData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [details, setDetails] = useState();
  const [userid, setuserid] = useState('');

  
  const data = [
    {id: '1', title: 'My Story', imageUrl: images.Profile},
    {id: '2', title: 'Joe Bidan', imageUrl: images.test1},
    {id: '3', title: 'Emilia', imageUrl: images.test2},
    {id: '4', title: 'Benedic', imageUrl: images.test3},
    {id: '5', title: 'Dr Robert', imageUrl: images.test4},

    // Add more items as needed
  ];

  const LikeMainPost = async (itemid) => {
    try {
      // setIsLoading(true);
      const response = await LikePost(itemid, userid);
      // GetMessages(itemdata?.id)
      getuser()
      console.log(response, 'getallinterests API response');
    } catch (error) {
      // setIsLoading(false);
      console.error('Error fetching interests:', error);
      Alert.alert('Error', 'An error occurred while fetching interests.');
    }
  };

  const getuser = async () => {
    const userId = await local.getUserId();
    console.log(userId, 'leaderdata he');
    setuserid(userId);
    getAllUserPosts(userId);
    getAllPosts(userId);
  };

  useFocusEffect(
    React.useCallback(() => {
      // getAllPosts(userId);
      // getAllUserPosts();
      getuser();
    }, []),
  );
 const likePress = (item) => {
  Alert.alert('Liked');
  LikeMainPost(item?.id)
  console.log(item, 'hereee');
};
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        // Prevent the back button from navigating back
        Alert.alert(
          'Exit App',
          'Do you want to exit the app?',
          [
            {text: 'Cancel', style: 'cancel'},
            {text: 'OK', onPress: () => BackHandler.exitApp()},
          ],
          {cancelable: false},
        );
        return true;
      };

      // Add event listener for back button
      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      // Cleanup the event listener on unmount
      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, []),
  );

  const getAllUserPosts = async userId => {
    try {
      const res = await getAllUserPost(userId);
      const {data} = res;
      setDetails(data);
      // console.log(res, 'Profileeeeeeeeeeeeoooooooooooooooo');
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  const getAllPosts = async () => {
    try {
      setIsLoading(true);
      const res = await getAllPost();
      setIsLoading(false);

      setProfileData(res?.data);
      console.log(res?.data, '-------ooooooo--GET ALL POST---------');
    } catch (error) {
      console.error('Error creating post:', error);
      setIsLoading(false);
    }
  };

  onPressStatusUpload = () => {
    console.log('upload');
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <HomeHeader title="Home" profileImage={details} />
      <ScrollView style={{backgroundColor: 'white'}}>
        <View style={{marginTop: 15}}>
          <HorizontalList
            profileImage={details}
            data={data}
            onPressStatusUpload={() => onPressStatusUpload()}
          />
        </View>

        {/* <View style={{height:200,marginTop:10}}>
          <SwiperComponent data={swiperdata} />
        </View> */}
        {/* {ProfileData?.map(item => (
          <ListItem key={item.id} item={item} />
        ))} */}

        <ListItem Data={ProfileData} likePress={likePress}/>
        {isLoading && (
          <View style={styles.loader}>
            <ActivityIndicator size="large" color="white" />
          </View>
        )}
      </ScrollView>
      <Footer title={'home'} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  loader: {
    ...StyleSheet.absoluteFillObject, // Covers the entire screen
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
});

export default Home;
