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
} from 'react-native';
import {connect} from 'react-redux';
import {setApiData} from '../../redux/action';
import CommonButton from '../../Components/CommonButton';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HomeHeader from '../../Components/HomeHeader';
import HorizontalList from '../../Components/HorizontalList';
import images from '../../assets/Images';
import SwiperComponent from '../../Components/SwiperComponent';
import ListItem from '../../Components/ListItem';
import Footer from '../../Components/Footer';

const axios = require('axios').default;
const height = Dimensions.get('window').height;

const Home = props => {
  const navigation = useNavigation();
  const [ProfileData, setProfileData] = useState([]);
  const data = [
    { id: '1', title: 'Virat Kohli', imageUrl: images.ViratProfile },
    { id: '2', title: 'Virat Kohli', imageUrl: images.Welcome_2  },
    { id: '3', title: 'Item 3', imageUrl: images.Welcome_3  },
    { id: '4', title: 'Item 2', imageUrl: images.Welcome_1  },
    { id: '5', title: 'Item 3', imageUrl: images.Welcome_2  },
    { id: '6', title: 'Item 2', imageUrl: images.Welcome_3 },
    { id: '7', title: 'Item 3', imageUrl: images.Welcome_3 },
    // Add more items as needed
  ];
  const swiperdata = [
    { id: '1', title: 'Item 1', imageUrl: images.ViratBanner },
    { id: '2', title: 'Item 2', imageUrl: images.ViratBanner  },
    { id: '3', title: 'Item 3', imageUrl: images.ViratBanner  },
    { id: '4', title: 'Item 2', imageUrl: images.Welcome_1  },
   
    // Add more items as needed
  ];
  const verticalListData = [
    { id: '1', name: 'Virat Kohli',type:'image' ,media:'https://i0.wp.com/www.rvcj.com/wp-content/uploads/2023/01/VIRAT-KOHLI-2.jpg?resize=600%2C451&ssl=1',designation: 'Bangalore',description:'Stumptown brunch raw umami flannel dollar pour-over ipsum. Booth glossier squid craft kale.😍❤️❤️' ,image: images.ViratProfile },
    { id: '2', name: 'Jane Smith',type:'image',media:'https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w1200/2023/09/instagram-image-size.jpg', designation: 'Product Manager',description:'Software fcrtdcvg ', image: images.Welcome_1},
    { id: '3', name: 'Alice Johnson',type:'video',media:'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', designation: 'UI/UX Designer',description:'Software vhgftrdfcgv bn dr', image: images.Welcome_1 },

    { id: '4', name: 'Virat Kohli',type:'image' ,media:'https://i0.wp.com/www.rvcj.com/wp-content/uploads/2023/01/VIRAT-KOHLI-2.jpg?resize=600%2C451&ssl=1',designation: 'Bangalore',description:'Stumptown brunch raw umami flannel dollar pour-over ipsum. Booth glossier squid craft kale.😍❤️❤️' ,image: images.ViratProfile },
    { id: '5', name: 'Jane Smith',type:'image',media:'https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w1200/2023/09/instagram-image-size.jpg', designation: 'Product Manager',description:'Software fcrtdcvg ', image: images.Welcome_1},
    // Add more items as needed
  ];

  useEffect(() => {
    // getDetails();
  }, []);
  onPressStatusUpload=()=>{
    alert('upload')
  }
  return (
    <SafeAreaView style={{flex: 1}}>
      <HomeHeader title="Home" />
      <ScrollView style={{backgroundColor:'white'}}>
        <View style={{marginTop:15}}>
          <HorizontalList data={data} onPressStatusUpload={()=> onPressStatusUpload()} />
        </View>
        <View style={{height:200,marginTop:10}}>
          <SwiperComponent data={swiperdata} />
        </View>
        {verticalListData.map(item => (
          <ListItem key={item.id} item={item} />
        ))} 
      </ScrollView>
      <Footer title={'home'} />
    </SafeAreaView>
  );
};

export default Home;
