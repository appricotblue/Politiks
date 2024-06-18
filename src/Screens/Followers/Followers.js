import React, { useState ,useEffect} from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, FlatList, StyleSheet, SafeAreaView } from 'react-native';
import images from '../../assets/Images';
import { getHeight, getWidth } from '../../Theme/Constants';
import DiscoverItems from '../../Components/DiscoverItems';
import LinearGradient from 'react-native-linear-gradient';
import Header from '../../Components/Header';
import { ScrollView } from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import local from '../../Storage/Local';

const Followers = () => {
    const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTab, setSelectedTab] = useState(0); // 0 for images tab, 1 for items tab

  const imageData = [
    { id: 1, imageUrl: images.Welcome_1 },
    { id: 2, imageUrl: images.Welcome_2 },
    { id: 3, imageUrl: images.Welcome_3 },
    { id: 4, imageUrl: images.ViratBanner },
    { id: 5, imageUrl: images.Welcome_3 },
    { id: 6, imageUrl: images.Welcome_2 },
    // Add more image objects as needed
  ];

  const itemData = [
    { id: 1, name: 'Priyanka Chopra', followers: 1000, image: images.ViratBanner },
    { id: 2, name: 'Item Name 2', followers: 2000, image: images.Welcome_1 },
    { id: 3, name: 'Item Name 3', followers: 3000, image: images.Welcome_2 },
    { id: 4, name: 'Item Name 2', followers: 2000, image: images.Welcome_1 },
    { id: 5, name: 'Item Name 3', followers: 3000, image: images.Welcome_2 },
    { id: 6, name: 'Item Name 3', followers: 3000, image: images.Welcome_2 },
    { id: 7, name: 'Item Name 2', followers: 2000, image: images.Welcome_1 },
    { id: 8, name: 'Item Name 3', followers: 3000, image: images.Welcome_2 },
    { id: 9, name: 'Item Name 3', followers: 3000, image: images.Welcome_2 },
    // Add more item objects as needed
  ];

  const getuser = async()=>{
    const leaderdata = await local.getLeader();
    console.log(leaderdata, 'leaderdata he')
  }

  useEffect(()=>{

    getuser()

  },[])
  const handleTabPress = (tabIndex) => {
    setSelectedTab(tabIndex);
  };

  const renderImageItem = ({ item }) => (
    <View style={{ width: '33%', padding: 0 }}>
      <Image source={item.imageUrl} style={{ width: '100%', height: 120 }} />
    </View>
  );

  const filteredItems = itemData.filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()));

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.itemContainer}>
      <Image source={item.image} style={styles.itemImage} />
      <View style={{marginLeft:18}}>
      {/* <Text style={styles.itemName}>{item.name}</Text> */}
      <View style={{flexDirection:'row',justifyContent:'center',alignItems:'baseline'}}>
      <Text style={styles.itemName}>{item.name}</Text>
      <Image source={images.PurpleTick} style={{width:20,height:20,marginLeft:15}} />
      </View>
      <Text> {item.followers} Followers</Text>
      </View>
     
      {/* <TouchableOpacity style={styles.followButton}>
        <Text style={styles.followButtonText}>Follow</Text>
      </TouchableOpacity> */}
    </TouchableOpacity>
  );
  return (
    <SafeAreaView>
        <Header title="Follow" />
  
    <View style={styles.container}>
      {/* Search Bar */}
     
     
   
      {/* Tabs */}
      <View style={styles.tabs}>
        <TouchableOpacity onPress={() => handleTabPress(0)} style={[styles.tab, selectedTab === 0 && styles.activeTab]}>
          {/* <Text style={selectedTab === 0 ? styles.activeTabText : styles.tabText}>Images</Text> */}
          <LinearGradient
            colors={selectedTab === 0 ? ['#8360C3', '#2EBF91'] : ['transparent', 'transparent']}
            style={{width:'100%',height:40,justifyContent:'center',alignItems:'center',borderTopLeftRadius:15,borderBottomLeftRadius:15}}
            start={{x: 0, y: 0.5}} 
            end={{x: 1, y: 0.5}}
          >
            <Text style={selectedTab === 0 ? styles.activeTabText : styles.tabText}>Followers</Text>
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleTabPress(1)} style={[styles.tab, selectedTab === 1 && styles.activeTab]}>
          {/* <Text style={selectedTab === 1 ? styles.activeTabText : styles.tabText}>Items</Text> */}
          <LinearGradient
            colors={selectedTab === 1 ? ['#8360C3', '#2EBF91'] : ['transparent', 'transparent']}
            style={{ width:'100%',height:40,justifyContent:'center',alignItems:'center',borderTopRightRadius:15,borderBottomRightRadius:15}}
            start={{x: 0, y: 0.5}} 
            end={{x: 1, y: 0.5}}
          >
            <Text style={selectedTab === 1 ? styles.activeTabText : styles.tabText}>Following</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
      <View style={styles.searchBar}>
          <Image source={images.GraySearch} style={{ height: 30, width: 30, marginLeft: 10 }} />
          <TextInput
            style={styles.input}
            placeholder="Search"
            value={searchQuery}
            onChangeText={(text) => setSearchQuery(text)}
          />
          <TouchableOpacity onPress={()=>setSearchQuery('')}>
          <Image source={images.Cross} style={{ height: 30, width: 30, marginLeft: 10 }} />
          </TouchableOpacity>
        
        </View>
        <View style={{height:getHeight(1.5)}}>
        <FlatList
          data={filteredItems}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.flatListContent}
        />
        </View>
      
    </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    container: {
      justifyContent: 'center',
      alignItems: 'center'
    },
    searchBar: {
      flexDirection: 'row',
      width: getWidth(1.1),
      borderRadius: 10,
      backgroundColor: 'white',
      marginTop: 20,
      alignItems: 'center',
      marginBottom:30
    },
    input: {
      padding: 10,
      width:getWidth(1.5)
    },
    flatListContent: {
      flexGrow: 1,
    },
    itemContainer: {
    
      backgroundColor: '#fff',
      borderRadius: 10,
      padding: 10,
      marginBottom: 10,
      flex: 1,
      marginHorizontal: 5,
   
      width: getWidth(1.1),
      flexDirection: 'row'
    },
    itemImage: {
      width: 50,
      height: 50,
      borderRadius: 35,
    },
    itemName: {
      fontWeight: '600',
      marginTop: 5,
      // fontFamily:'Jost',
      fontFamily: 'Jost-Regular',
      fontSize:20,
      color:'black'
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
 
    backgroundColor:'white',
    width:getWidth(1.1),
    borderRadius:15,
    height:40,
    marginTop:20,
    marginBottom:15
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: 'transparent',
  },
  tabText: {
    color: 'black',
    fontSize:18,
    fontFamily:'Jost',
    fontWeight:'400'
  },
  activeTabText: {
    color: 'white',
    fontSize:18,
    fontFamily:'Jost',
    fontWeight:'400'
  }, tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
 
    backgroundColor:'white',
    width:getWidth(1.1),
    borderRadius:15,
    height:40,
    marginTop:20,
    marginBottom:15
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: 'transparent',
  },
  tabText: {
    color: 'black',
    fontSize:18,
    fontFamily:'Jost',
    fontWeight:'400'
  },
  activeTabText: {
    color: 'white',
    fontSize:18,
    fontFamily:'Jost',
    fontWeight:'400'
  },
  });
export default Followers;
