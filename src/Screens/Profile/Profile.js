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

const Profile = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTab, setSelectedTab] = useState(0);
  const [leader, setLeader] = useState(false);
  const [details, setDetails] = useState();
  const [image, setImage] = useState();
  const [userid, setuserid] = useState('');

  const imageData = [
    {id: 1, imageUrl: images.Welcome_1},
    {id: 2, imageUrl: images.Welcome_2},
    {id: 3, imageUrl: images.Welcome_3},
    {id: 4, imageUrl: images.ViratBanner},
    {id: 5, imageUrl: images.Welcome_3},
    {id: 6, imageUrl: images.Welcome_2},
    {id: 7, imageUrl: images.Welcome_1},
    {id: 8, imageUrl: images.Welcome_2},
    {id: 9, imageUrl: images.Welcome_3},
    {id: 10, imageUrl: images.ViratBanner},
    {id: 11, imageUrl: images.Welcome_3},
    {id: 12, imageUrl: images.Welcome_2},
  ];

  const data = [
    {id: '1', title: 'Campain', imageUrl: images.ViratProfile},
    {id: '2', title: 'Fundrasing', imageUrl: images.Welcome_2},
    {id: '3', title: 'In the News', imageUrl: images.Welcome_3},
    {id: '4', title: 'People', imageUrl: images.Welcome_1},
    {id: '5', title: 'White House', imageUrl: images.Welcome_2},
    {id: '6', title: 'Donation', imageUrl: images.Welcome_3},
    {id: '7', title: 'Supports', imageUrl: images.Welcome_3},
    // Add more items as needed
  ];

  const getuser = async () => {
    const userId = await local.getUserId();
    console.log(userId, 'leaderdata he');
    setuserid(userId);
    getAllUserPosts(userId);
    getAllPosts(userId);
  };

  useEffect(() => {
    getuser();
  }, []);

  const getAllUserPosts = async userId => {
    try {
      const res = await getAllUserPost(userId);
      const {data} = res;
      setDetails(data[0]);
      // console.log(res?.data, 'Profileeeeeeeeeeeeoooooooooooooooo');
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };
  const getAllPosts = async userId => {
    try {
      const res = await getAllUserImages(userId);
      setImage(res?.data);
      // console.log(res?.data, 'Profileeeeeeee--------------------');
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  const handleTabPress = tabIndex => {
    setSelectedTab(tabIndex);
  };
  function chunkArray(array, chunkSize) {
    const chunks = [];
    for (let i = 0; i < array?.length; i += chunkSize) {
      chunks.push(array.slice(i, i + chunkSize));
    }
    return chunks;
  }
  const renderImageItem = ({item}) => (
    <View style={{width: '33%', padding: 0.2}}>
      <Image source={{uri: item?.image}} style={{width: '100%', height: 120}} />
    </View>
  );

  const renderItem = ({item}) => (
    <View style={styles.itemContainer}>
      <Image source={item.imageUrl} style={styles.image} />
      <Text style={{color: 'black'}}>{item.title}</Text>
    </View>
  );

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
            onPress={() => {}}
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
              // onPress={() => {
              //   navigation.navigate('EditProfile');
              // }}
            >
              <ImageBackground
                source={images.Profile}
                resizeMode="cover"
                style={styles.statusUploadBackground}></ImageBackground>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => {}}
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
              <Text style={styles.idText}>{details?.userName}_official</Text>
            </View>
          )}

          {/* <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              style={{
                minWidth: 100,
                height: 30,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 35,
                marginTop: 10,
                backgroundColor: '#3A7BD5',
                padding: 5,
                marginHorizontal: 7,
              }}>
              <Text style={styles.activeTabText}>Follow</Text>
            </TouchableOpacity>
            {leader ? (
              <TouchableOpacity
                style={{
                  minWidth: 100,
                  height: 30,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 35,
                  marginTop: 10,
                  padding: 5,
                  borderWidth: 2,
                  borderColor: '#3A7BD5',
                  marginHorizontal: 7,
                }}>
                <Text
                  style={[
                    styles.activeTabText,
                    {color: '#3A7BD5', fontWeight: '800'},
                  ]}>
                  Cast your vote
                </Text>
              </TouchableOpacity>
            ) : (
              <></>
            )}

            <TouchableOpacity
              style={{
                minWidth: 100,
                height: 30,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 35,
                marginTop: 10,
                padding: 5,
                borderWidth: 2,
                borderColor: '#3A7BD5',
                marginHorizontal: 7,
              }}
              onPress={() => navigation.navigate('Messege')}>
              <Text
                style={[
                  styles.activeTabText,
                  {color: '#3A7BD5', fontWeight: '800'},
                ]}>
                Messege
              </Text>
            </TouchableOpacity>
          </View> */}
        </View>

        <View style={{width: getWidth(1)}}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{paddingHorizontal: 10}}>
            {data.map(
              item => renderItem({item}), // Assuming renderItem is a function that renders the item
            )}
          </ScrollView>

          {selectedTab === 0 ? (
            <View style={styles.selfView}>
              <Text style={styles.subHeadText}> My Self</Text>
              <View style={styles.selfContainer}>
                <Text style={styles.selfText}>
                  Joe Biden, the 46th President of the United States, has a
                  storied career in American politics spanning over five
                  decades. Born on November 20, 1942, in Scranton, Pennsylvania,
                  Biden overcame personal and professional challenges to become
                  one of the most enduring figures in modern political history
                </Text>
              </View>
              <Text style={styles.subHeadText}> My Party</Text>
              <View style={styles.partyContainer}>
                <Image
                  source={images.DemocraticPNG}
                  style={{width: 25, height: 25}}
                />
                <Text style={styles.democraticText}>Democratic</Text>
              </View>
              <Text style={styles.subHeadText}> My Interests</Text>
              <View style={styles.interestContainer}>
                <ScrollView horizontal>
                  <Text style={styles.interestText}>Communism,</Text>
                  <Text style={styles.interestText}>
                    Evolutionary Socialism,
                  </Text>
                  <Text style={styles.interestText}>Marxism</Text>
                </ScrollView>
              </View>
            </View>
          ) : (
            <></>
          )}
          {selectedTab === 1 ? (
            <ScrollView contentContainerStyle={styles.flatListContent}>
              {chunkArray(image, 3)?.map((row, index) => (
                <View style={styles.rowContainer} key={index}>
                  {row.map(
                    item => renderImageItem({item}), // Assuming renderImageItem is a function that renders the image item
                  )}
                </View>
              ))}
            </ScrollView>
          ) : (
            <></>
          )}
        </View>
        <View style={{height: getHeight(4.6)}} />
      </ScrollView>

      <TouchableOpacity
        style={styles.clickableGradient}
        onPress={() => {
          console.log('Gradient View Clicked');
        }}>
        <TouchableOpacity
          onPress={() => handleTabPress(0)}
          style={[styles.bottumtab, selectedTab === 0 && styles.activeTab]}>
          {/* <Text style={selectedTab === 1 ? styles.activeTabText : styles.tabText}>Items</Text> */}
          <LinearGradient
            colors={
              selectedTab === 0
                ? ['black', 'black']
                : ['transparent', 'transparent']
            }
            style={{
              width: '100%',
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              borderTopLeftRadius: 15,
              borderBottomLeftRadius: 15,
            }}>
            <Image
              style={{width: 35, height: 35}}
              source={
                selectedTab === 0 ? images.WhiteProfile : images.GreyProfile
              }
            />
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleTabPress(1)}
          style={[styles.bottumtab, selectedTab === 1 && styles.activeTab]}>
          {/* <Text style={selectedTab === 0 ? styles.activeTabText : styles.tabText}>Images</Text> */}
          <LinearGradient
            colors={
              selectedTab === 1
                ? ['black', 'black']
                : ['transparent', 'transparent']
            }
            style={{
              width: '100%',
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              style={{
                width: selectedTab === 1 ? 35 : 30,
                height: selectedTab === 1 ? 35 : 25,
              }}
              source={selectedTab === 1 ? images.Image : images.GrayImage}
            />
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleTabPress(1)}
          style={[styles.bottumtab, selectedTab === 2 && styles.activeTab]}>
          {/* <Text style={selectedTab === 1 ? styles.activeTabText : styles.tabText}>Items</Text> */}
          <LinearGradient
            colors={
              selectedTab === 2
                ? ['black', 'black']
                : ['transparent', 'transparent']
            }
            style={{
              width: '100%',
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              borderTopRightRadius: 15,
              borderBottomRightRadius: 15,
            }}>
            <Image
              style={{width: 35, height: 35}}
              source={selectedTab === 2 ? images.WhiteReel : images.GrayReel}
            />
          </LinearGradient>
        </TouchableOpacity>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'pink',
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
    alignSelf: 'center',
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
    bottom: 10,
    left: 70,
    right: 0,
    height: 50, // Adjust height as needed

    width: getWidth(1.5),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 15,
    flexDirection: 'row',
    backgroundColor: 'white',
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
});

export default Profile;
