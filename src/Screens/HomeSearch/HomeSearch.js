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
import {height} from '../../Theme/ConstantStyles';

const HomeSearch = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTab, setSelectedTab] = useState(0);

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
    <TouchableOpacity style={styles.itemContainer}>
      <Image source={item.image} style={styles.itemImage} />
      <View style={{marginLeft: 18}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={styles.itemName}>{item.name}</Text>
          <Image
            source={images.VerifiedPNG}
            style={{width: 18, height: 18, marginLeft: 15, marginTop: 5}}
          />
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
        <Header title="Search" />

        <View style={styles.container}>
          <View style={styles.tabs}>
            <TouchableOpacity
              onPress={() => handleTabPress(0)}
              style={[styles.tab, selectedTab === 0 && styles.activeTab]}>
              <LinearGradient
                colors={
                  selectedTab === 0
                    ? ['#000000', '#000000']
                    : ['#D3D3D3', '#D3D3D3']
                }
                style={{
                  width: '50%',
                  height: 35,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 8,
                }}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text
                    style={
                      selectedTab === 0 ? styles.activeTabText : styles.tabText
                    }>
                    People
                  </Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleTabPress(1)}
              style={[styles.tab, selectedTab === 1 && styles.activeTab]}>
              <LinearGradient
                colors={
                  selectedTab === 1
                    ? ['#000000', '#000000']
                    : ['#D3D3D3', '#D3D3D3']
                }
                style={{
                  width: '50%',
                  height: 35,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 8,
                }}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text
                    style={
                      selectedTab === 1 ? styles.activeTabText : styles.tabText
                    }>
                    Location
                  </Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => handleTabPress(2)}
              style={[styles.tab, selectedTab === 2 && styles.activeTab]}>
              <LinearGradient
                colors={
                  selectedTab === 2
                    ? ['#000000', '#000000']
                    : ['#D3D3D3', '#D3D3D3']
                }
                style={{
                  width: '50%',
                  height: 35,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 8,
                }}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text
                    style={
                      selectedTab === 2 ? styles.activeTabText : styles.tabText
                    }>
                    Hashtag
                  </Text>
                </View>
              </LinearGradient>
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
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              {/* <Image
                source={images.Cross}
                style={{height: 30, width: 30, marginLeft: 10}}
              /> */}
            </TouchableOpacity>
          </View>
          <View style={{height: getHeight(1)}}>
            <FlatList
              data={filteredItems}
              renderItem={renderItem}
              keyExtractor={item => item.id.toString()}
              contentContainerStyle={styles.flatListContent}
            />
          </View>
          {/* <View style={{height: 300}} /> */}
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
    paddingHorizontal: 30,
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

    color: 'white',
    fontSize: 12,

    fontWeight: '400',
  },

  tabText: {
    fontFamily: 'Jost-Bold',
    fontWeight: '400',
    color: 'grey',
    fontSize: 12,
  },
});
export default HomeSearch;
