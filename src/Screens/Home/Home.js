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
import {getAllPost, getAllUserPost} from '../../api';
import local from '../../Storage/Local';

const axios = require('axios').default;
const height = Dimensions.get('window').height;

const Home = props => {
  const navigation = useNavigation();
  const [ProfileData, setProfileData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [details, setDetails] = useState();
  const [userid, setuserid] = useState('');

  // const data = [
  //   {id: '1', title: 'My Story', imageUrl: images.Profile},
  //   {id: '2', title: 'Virat Kohli', imageUrl: images.ViratProfile},
  //   {id: '3', title: 'Virat Kohli', imageUrl: images.Welcome_2},
  //   {id: '4', title: 'Item 3', imageUrl: images.Welcome_1},
  //   {id: '5', title: 'Item 2', imageUrl: images.Welcome_1},
  //   {id: '6', title: 'Item 3', imageUrl: images.Welcome_2},
  //   {id: '7', title: 'Item 2', imageUrl: images.Welcome_3},
  //   {id: '8', title: 'Item 3', imageUrl: images.Welcome_3},
  //   // Add more items as needed
  // ];
  const data = [
    {id: '1', title: 'My Story', imageUrl: images.Profile},
    {id: '2', title: 'Joe Bidan', imageUrl: images.test1},
    {id: '3', title: 'Emilia', imageUrl: images.test2},
    {id: '4', title: 'Benedic', imageUrl: images.test3},
    {id: '5', title: 'Dr Robert', imageUrl: images.test4},

    // Add more items as needed
  ];
  const swiperdata = [
    {id: '1', title: 'Item 1', imageUrl: images.ViratBanner},
    {id: '2', title: 'Item 2', imageUrl: images.ViratBanner},
    {id: '3', title: 'Item 3', imageUrl: images.ViratBanner},
    {id: '4', title: 'Item 2', imageUrl: images.Welcome_1},

    // Add more items as needed
  ];
  const verticalListData = [
    {
      id: '1',
      name: 'Virat Kohli',
      type: 'image',
      media:
        'https://www.whitehouse.gov/wp-content/uploads/2021/01/Joe-Biden-3.jpg',
      designation: 'Bangalore',
      description:
        'Stumptown brunch raw umami flannel dollar pour-over ipsum. Booth glossier squid craft kale.😍❤️❤️',
      image: images.ViratProfile,
    },
    {
      id: '2',
      name: 'Jane Smith',
      type: 'image',
      media:
        'https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w1200/2023/09/instagram-image-size.jpg',
      designation: 'Product Manager',
      description: 'Software fcrtdcvg ',
      image: images.Welcome_1,
    },
    {
      id: '3',
      name: 'Alice Johnson',
      type: 'video',
      media:
        'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      designation: 'UI/UX Designer',
      description: 'Software vhgftrdfcgv bn dr',
      image: images.Welcome_1,
    },
    {
      id: '4',
      name: 'Virat Kohli',
      type: 'image',
      media:
        'https://i0.wp.com/www.rvcj.com/wp-content/uploads/2023/01/VIRAT-KOHLI-2.jpg?resize=600%2C451&ssl=1',
      designation: 'Bangalore',
      description:
        'Stumptown brunch raw umami flannel dollar pour-over ipsum. Booth glossier squid craft kale.😍❤️❤️',
      image: images.ViratProfile,
    },
    {
      id: '5',
      name: 'Jane Smith',
      type: 'image',
      media:
        'https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w1200/2023/09/instagram-image-size.jpg',
      designation: 'Product Manager',
      description: 'Software fcrtdcvg ',
      image: images.Welcome_1,
    },
    // Add more items as needed
  ];

  // useEffect(() => {
  //   getAllPosts();
  // }, []);

  const getuser = async () => {
    const userId = await local.getUserId();
    console.log(userId, 'leaderdata he');
    setuserid(userId);
    getAllUserPosts(userId);
    getAllPosts(userId);
  };

  useFocusEffect(
    React.useCallback(() => {
      getAllPosts();
      getAllUserPosts();
      getuser();
    }, []),
  );

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
      // console.log(res?.data, 'Profileeeeeeeeeeeeoooooooooooooooo');
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
      // console.log(res?.data, '-------ooooooo--GET ALL POST---------');
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
        <ListItem Data={ProfileData} />
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
