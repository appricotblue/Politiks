import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import images from '../../assets/Images';
import {getHeight, getWidth} from '../../Theme/Constants';
import LinearGradient from 'react-native-linear-gradient';
import Header from '../../Components/Header';
import {ScrollView} from 'react-native-gesture-handler';

const Notifications = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTab, setSelectedTab] = useState(0);

  const imageData = [
    {id: 1, imageUrl: images.Welcome_1},
    {id: 2, imageUrl: images.Welcome_2},
    {id: 3, imageUrl: images.Welcome_3},
    {id: 4, imageUrl: images.ViratBanner},
    {id: 5, imageUrl: images.Welcome_3},
    {id: 6, imageUrl: images.Welcome_2},
  ];

  const itemData = [
    {
      id: 1,
      name: 'Alex Linderson',
      followers:
        'Commented on your flare : Thank you man❤️, Thanks for the support',
      image: images.ViratBanner,
    },
    {
      id: 2,
      name: 'Jacob Jones',
      followers: 'How are you today? Thank you man❤️, Thanks for the support',
      image: images.Welcome_1,
    },
    {
      id: 3,
      name: 'Item Name 3',
      followers: 'How are you today? Thank you man❤️, Thanks for the support',
      image: images.Welcome_2,
    },
    {
      id: 4,
      name: 'Item Name 2',
      followers:
        'Are you There? How are you today? Thank you man❤️, Thanks for the support',
      image: images.Welcome_1,
    },
    {
      id: 5,
      name: 'Item Name 3',
      followers:
        'jj haiHow are you today? Thank you man❤️, Thanks for the support,Thanks for the support,Thanks for the support',
      image: images.Welcome_2,
    },
    {
      id: 6,
      name: 'Item Name 3',
      followers:
        'test gg How are you today? Thank you man❤️, Thanks for the support',
      image: images.Welcome_2,
    },
    {
      id: 7,
      name: 'Item Name 2',
      followers:
        'Are you There? How are you today? Thank you man❤️, Thanks for the support',
      image: images.Welcome_1,
    },
    {id: 8, name: 'Item Name 3', followers: 'jj hai', image: images.Welcome_2},
    {id: 9, name: 'Item Name 3', followers: 'test gg', image: images.Welcome_2},
  ];

  const filteredItems = itemData.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const renderItem = ({item}) => (
    <TouchableOpacity style={styles.itemContainer}>
      <View style={{width: getWidth(8)}}>
        <Image source={item.image} style={styles.itemImage} />
      </View>
      <View style={{width: getWidth(2)}}>
        <Text style={{color: 'black', fontSize: 14, fontWeight: '500'}}>
          {item.name}
        </Text>

        <Text style={{color: 'black', fontSize: 12}}>{item.followers}</Text>
      </View>
      <View
        style={{
          width: getWidth(6),
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image source={item.image} style={styles.notImage} />
        {/* <Text style={{color: 'black'}}>2 hr ago</Text> */}
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView>
      <Header title="Notifications" />
      <View style={styles.container}>
        <FlatList
          data={filteredItems}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.flatListContent}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: getHeight(1.1),
    justifyContent: 'center',
    alignSelf: 'center',
  },
  searchBar: {
    flexDirection: 'row',
    width: getWidth(1.1),
    borderRadius: 10,
    backgroundColor: 'white',
    marginTop: 20,
    alignItems: 'center',
    marginBottom: 30,
  },
  input: {
    padding: 10,
    width: getWidth(1.5),
  },
  flatListContent: {
    flexGrow: 1,
    marginTop: 20,
    paddingBottom: 50,
  },
  itemContainer: {
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',

    width: getWidth(1.1),
    flexDirection: 'row',
  },
  itemImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  notImage: {
    width: 50,
    height: 50,
    borderRadius: 10,
  },
  itemName: {
    fontWeight: '600',
    marginTop: 5,
    fontFamily: 'Jost',
    fontSize: 20,
    color: 'black',
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

export default Notifications;
