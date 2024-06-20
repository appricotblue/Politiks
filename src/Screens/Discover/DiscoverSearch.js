import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, FlatList, StyleSheet, SafeAreaView } from 'react-native';
import images from '../../assets/Images';
import { getHeight, getWidth } from '../../Theme/Constants';
import LinearGradient from 'react-native-linear-gradient';
import Header from '../../Components/Header';
import { ScrollView } from 'react-native-gesture-handler';

const DiscoverSearch = () => {
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
    { id: 1, name: 'Priyanka Chopra', followers: '11.k', image: images.ViratBanner },
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

  // Filtered items based on search query
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
      <Header title="Discover" />
      <View style={styles.container}>
        {/* Search Bar */}
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
        {/* List of filtered items */}
        <FlatList
          data={filteredItems}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.flatListContent}
        />
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
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  itemName: {
    fontWeight: '600',
    marginTop: 5,
    fontFamily:'Jost',
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
});

export default DiscoverSearch;
