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
  KeyboardAvoidingView,
} from 'react-native';
import images from '../../assets/Images';
import {getHeight, getWidth} from '../../Theme/Constants';
import DiscoverItems from '../../Components/DiscoverItems';
import LinearGradient from 'react-native-linear-gradient';
import Header from '../../Components/Header';
import {ScrollView} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import local from '../../Storage/Local';
import {height, width} from '../../Theme/ConstantStyles';

const SuggestionScreen = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTab, setSelectedTab] = useState(0); // 0 for images tab, 1 for items tab

  const imageData = [
    {id: 1, imageUrl: images.Welcome_1},
    {id: 2, imageUrl: images.Welcome_2},
    {id: 3, imageUrl: images.Welcome_3},
    {id: 4, imageUrl: images.ViratBanner},
    {id: 5, imageUrl: images.Welcome_3},
    {id: 6, imageUrl: images.Welcome_2},
    // Add more image objects as needed
  ];

  const itemData = [
    {
      id: 1,
      name: 'Priyanka Chopra',
      followers: 1000,
      image: images.ViratBanner,
    },
    {id: 2, name: 'Cody Fisher', followers: 2000, image: images.Welcome_1},
    {
      id: 3,
      name: 'Cameron Williamson',
      followers: 3000,
      image: images.Welcome_2,
    },
    {id: 4, name: 'Dianne Russell', followers: 2000, image: images.Welcome_1},
    {id: 5, name: 'Jane Cooper', followers: 3000, image: images.Welcome_2},
    {id: 6, name: 'Priyanka Chopra', followers: 3000, image: images.Welcome_2},
    {id: 7, name: 'Jane Cooper', followers: 2000, image: images.Welcome_1},
    {id: 8, name: 'Magno Savio', followers: 3000, image: images.Welcome_2},
    {id: 9, name: 'Chris Adams', followers: 3000, image: images.Welcome_2},
    // Add more item objects as needed
  ];

  const getuser = async () => {
    const leaderdata = await local.getLeader();
    console.log(leaderdata, 'leaderdata he');
  };

  useEffect(() => {
    getuser();
  }, []);
  const handleTabPress = tabIndex => {
    setSelectedTab(tabIndex);
  };

  const renderImageItem = ({item}) => (
    <View style={{width: '33%', padding: 0}}>
      <Image source={item.imageUrl} style={{width: '100%', height: 120}} />
    </View>
  );

  const filteredItems = itemData.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const renderItem = ({item}) => (
    <View style={styles.itemContainer}>
      <Image source={item.image} style={styles.itemImage} />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          width: width * 0.73,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View style={{marginLeft: 8}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Image
              source={images.VerifiedPNG}
              style={{width: 18, height: 18, marginLeft: 5, marginTop: 5}}
            />
          </View>
          <Text style={styles.itemFollowers}> {item.followers} Followers</Text>
        </View>

        <TouchableOpacity style={styles.followButton}>
          <Text style={styles.followButtonText}>Follow</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
  return (
    <SafeAreaView style={{flex: 1}}>
      <KeyboardAvoidingView>
        <Header title="Suggestions" />

        <View style={styles.container}>
          <View style={{height: getHeight(1)}}>
            <FlatList
              data={filteredItems}
              renderItem={renderItem}
              keyExtractor={item => item.id.toString()}
              contentContainerStyle={styles.flatListContent}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    // height: height * 0.95,
    // backgroundColor: 'pink',
  },
  searchBar: {
    flexDirection: 'row',
    width: getWidth(1.1),
    borderRadius: 10,
    backgroundColor: 'white',
    alignItems: 'center',
    marginBottom: 15,
  },
  input: {
    padding: 10,
    width: getWidth(1.5),
  },
  flatListContent: {
    // flexGrow: 1,
    paddingBottom: 180,
  },
  itemContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    margin: 5,
    width: getWidth(1.1),
    flexDirection: 'row',
    height: getHeight(11),
  },
  itemImage: {
    width: 50,
    height: 50,
    borderRadius: 35,
  },
  itemName: {
    fontFamily: 'Jost-Regular',
    fontWeight: '800',
    marginTop: 5,
    fontSize: 16,
    color: 'black',
  },
  itemFollowers: {
    fontFamily: 'Jost-Regular',
    fontWeight: '400',
    marginTop: 5,
    fontSize: 12,
    color: 'grey',
  },
  followButton: {
    backgroundColor: '#3A7BD5',
    height: height * 0.035,
    width: width * 0.17,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  followButtonText: {
    color: '#fff',
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    // backgroundColor: 'white',
    width: getWidth(1.1),
    borderRadius: 15,
    height: getHeight(18),
    marginTop: 5,
    marginBottom: 5,
  },
  tab: {
    // flex: 1,
    width: getHeight(5),
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
    height: height * 0.05,
  },
  activeTab: {
    borderBottomColor: 'transparent',
  },
  // tabText: {
  //   color: 'black',
  //   fontSize: 18,

  //   fontWeight: '400',
  // },
  activeTabText: {
    fontFamily: 'Jost-Bold',

    color: 'black',
    fontSize: 18,

    fontWeight: '400',
  },

  tabText: {
    fontFamily: 'Jost-Bold',
    fontWeight: '400',
    color: 'grey',
    fontSize: 18,
  },
});
export default SuggestionScreen;
