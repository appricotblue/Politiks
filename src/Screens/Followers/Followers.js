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
import LinearGradient from 'react-native-linear-gradient';
import Header from '../../Components/Header';
import {useNavigation} from '@react-navigation/native';
import local from '../../Storage/Local';
import {height} from '../../Theme/ConstantStyles';
import {getFollowers, getFollowing} from '../../api';

const Followers = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTab, setSelectedTab] = useState(0);
  const [followers, setFollowers] = useState();
  const [followersCount, setFollowersCount] = useState();
  const [following, setFollowing] = useState();
  const [followingCount, setFollowingCount] = useState();

  const [userid, setuserid] = useState('');

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
  ];

  const getuser = async () => {
    const userId = await local.getUserId();
    setuserid(userId);
    getAllFollowers(userId);
    getAllFollowing(userId);
  };

  useEffect(() => {
    getuser();
  }, []);
  const handleTabPress = tabIndex => {
    setSelectedTab(tabIndex);
  };

  const filteredItems = followers?.filter(item =>
    item?.userName.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const getAllFollowers = async userId => {
    try {
      const res = await getFollowers(userId);
      // console.log(res.data, 'Follwers--------------------');
      setFollowers(res?.data?.followerDetails);
      setFollowersCount(res?.data);
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  const filteredItem = following?.filter(item =>
    item?.userName.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const getAllFollowing = async userId => {
    try {
      const res = await getFollowing(userId);
      // console.log(res.data, 'Follwing--------------------');
      setFollowing(res?.data?.followings);
      setFollowingCount(res?.data);
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  const renderItem = ({item}) => (
    <TouchableOpacity style={styles.itemContainer}>
      <Image
        source={{
          uri: item.userProfile
            ? item.userProfile
            : 'https://images.musicfy.lol/misc/dummy_background.png',
        }}
        style={styles.itemImage}
      />
      <View style={{marginLeft: 18}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={styles.itemName}>{item.userName}</Text>
          {item?.role === 'Leader' ? (
            <Image
              source={images.VerifiedPNG}
              style={{width: 18, height: 18, marginLeft: 15, marginTop: 5}}
            />
          ) : (
            ''
          )}
        </View>
        <Text style={styles.itemFollowers}> {item.followers} Followers</Text>
      </View>

      {/* <TouchableOpacity style={styles.followButton}>
        <Text style={styles.followButtonText}>Follow</Text>
      </TouchableOpacity> */}
    </TouchableOpacity>
  );
  return (
    <SafeAreaView style={{flex: 1}}>
      <KeyboardAvoidingView>
        <Header title="Follow" />

        <View style={styles.container}>
          <View style={styles.tabs}>
            <TouchableOpacity
              onPress={() => handleTabPress(0)}
              style={[styles.tab, selectedTab === 0 && styles.activeTab]}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text
                  style={
                    selectedTab === 0 ? styles.activeTabText : styles.tabText
                  }>
                  {followersCount?.followerCount}
                </Text>
                <Text
                  style={
                    selectedTab === 0 ? styles.activeTabText : styles.tabText
                  }>
                  {' Followers'}
                </Text>
              </View>
              <LinearGradient
                colors={
                  selectedTab === 0
                    ? ['#3A7BD5', '#3A7BD5']
                    : ['transparent', 'transparent']
                }
                style={{
                  width: '80%',
                  height: 5,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 15,
                }}></LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleTabPress(1)}
              style={[styles.tab, selectedTab === 1 && styles.activeTab]}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text
                  style={
                    selectedTab === 1 ? styles.activeTabText : styles.tabText
                  }>
                  {followingCount?.count}
                </Text>
                <Text
                  style={
                    selectedTab === 1 ? styles.activeTabText : styles.tabText
                  }>
                  {' Following'}
                </Text>
              </View>
              <LinearGradient
                colors={
                  selectedTab === 1
                    ? ['#3A7BD5', '#3A7BD5']
                    : ['transparent', 'transparent']
                }
                style={{
                  width: '80%',
                  height: 5,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 15,
                }}></LinearGradient>
            </TouchableOpacity>
          </View>
          <View style={styles.searchBar}>
            <Image
              source={images.GraySearch}
              style={{height: 30, width: 30, marginLeft: 10}}
            />
            <TextInput
              style={styles.input}
              placeholder="Search"
              placeholderTextColor={'grey'}
              value={searchQuery}
              onChangeText={text => setSearchQuery(text)}
            />
            <TouchableOpacity
              onPress={() => setSearchQuery('')}></TouchableOpacity>
          </View>
          <View style={{height: getHeight(1)}}>
            <FlatList
              data={selectedTab === 0 ? filteredItems : filteredItem}
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
    backgroundColor: 'blue',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginTop: 5,
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
export default Followers;
