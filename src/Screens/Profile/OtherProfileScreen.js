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
import {height, width} from '../../Theme/ConstantStyles';

const OtherProfileScreen = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTab, setSelectedTab] = useState(0);
  const [leader, setLeader] = useState(false);
  const [details, setDetails] = useState();
  const [interestdata, setinterestdata] = useState();
  const [image, setImage] = useState();
  const [userid, setuserid] = useState('');
  const [follow, setFollow] = useState(false);

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
    {id: '1', title: 'Campain', imageUrl: images.CampaignPNG},
    {id: '2', title: 'Fundrasing', imageUrl: images.FundrasingPNG},
    {id: '3', title: 'In the News', imageUrl: images.InNewsPNG},
    {id: '4', title: 'People', imageUrl: images.PeoplePNG},
    {id: '5', title: 'White House', imageUrl: images.Welcome_2},
    {id: '6', title: 'Donation', imageUrl: images.Welcome_3},
    {id: '7', title: 'Supports', imageUrl: images.Welcome_3},
  ];

  const getuser = async () => {
    const userId = await local.getUserId();
    console.log(userId, 'leaderdata he');
    setuserid(userId);
    getAllUserPosts(userId);
    getAllPosts(userId);
  };

  // useEffect(() => {
  //   getuser();
  // }, []);

  useFocusEffect(
    React.useCallback(() => {
      getuser();
    }, []),
  );

  const getAllUserPosts = async userId => {
    try {
      const res = await getAllUserPost(userId);
      const {data} = res;
      setDetails(data);
      console.log(res?.data, 'Profileeeeeeeeeeeeoooooooooooooooo');
      setinterestdata(res?.data?.myInterestField);
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
          source={{
            uri: details?.userBannerProfile
              ? details?.userBannerProfile
              : 'https://images.musicfy.lol/misc/dummy_background.png',
          }}
          style={{
            width: width * 1,
            height: height * 0.2,
            backgroundColor: 'white',
          }}
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
            <View style={styles.outerview}>
              <Image
                source={{
                  uri: details?.userProfile
                    ? details?.userProfile
                    : 'https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png',
                }}
                resizeMode="cover"
                style={styles.statusUploadBackground}></Image>
            </View>
            <TouchableOpacity
              style={{
                width: 96,
                height: 30,
                borderRadius: 10,
                backgroundColor: '#3A7BD5',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => {
                navigation.navigate('EditProfile');
              }}>
              <Text
                style={{
                  color: 'white',
                  fontSize: 14,
                  fontFamily: 'Jost-Regular',
                }}>
                Edit Profile
              </Text>
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
              <Text style={styles.idText}>{details?.userName}_official</Text>
            </View>
          )}

          <View style={{flexDirection: 'row'}}>
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
              }}
              onPress={() => setFollow(!follow)}>
              <Text style={styles.activeTabText}>
                {follow ? 'Following' : 'Follow'}
              </Text>
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
          </View>
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
                  {details?.mySelf ? details?.mySelf : 'Update Self details'}
                </Text>
              </View>
              <Text style={styles.subHeadText}> My Party</Text>
              <View style={styles.partyContainer}>
                {/* <Image
                  source={images.DemocraticPNG}
                  style={{width: 25, height: 25}}
                /> */}
                <Image
                  // source={images.DemocraticPNG}
                  source={
                    details?.myParty === 'Democratic'
                      ? images.DemocraticPNG
                      : details?.myParty === 'Republican'
                      ? images.RepublicanPNG
                      : details?.myParty === 'Republican'
                      ? images.LibertarianPNG
                      : images.PartyPNG
                  }
                  style={{width: 25, height: 25}}
                />
                <Text style={styles.democraticText}>
                  {details?.myParty ? details?.myParty : 'Update your party'}
                </Text>
              </View>
              <Text style={styles.subHeadText}> My Interests</Text>
              <View style={styles.interestContainer}>
                <ScrollView horizontal>
                  <Text style={styles.interestText}>
                    {interestdata?.map(item => (
                      <Text style={{color: 'grey'}}>
                        {item ? item : 'Choose your Interest'},
                      </Text>
                    ))}
                  </Text>
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
    marginTop: 14,
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
    backgroundColor: 'white',
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
    minHeight: getHeight(15),
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
    height: 23,
  },
  interestText: {
    color: 'grey',
    marginHorizontal: 5,
    fontSize: 17,
  },
  selfText: {
    color: 'grey',
    fontSize: 17,
    marginTop: 5,
  },
  subHeadText: {
    color: 'black',
    fontSize: 20,
    fontWeight: '800',
    marginVertical: 15,
  },
});

export default OtherProfileScreen;