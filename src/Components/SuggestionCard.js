import {View, Text, StyleSheet, FlatList, Image} from 'react-native';
import React, {useState} from 'react';
import {height, width} from '../Theme/ConstantStyles';

const SuggestionCard = ({datas}) => {
  const [follow, setFollow] = useState(false);

  const renderItem = ({item}) => (
    <View style={styles.itemContainer}>
      <View></View>
      <Image source={item.image} style={styles.itemImage} />

      <Text style={styles.nameText} numberOfLines={2}>
        {item.name}
      </Text>
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
    </View>
  );

  return (
    <View>
      <FlatList
        data={datas}
        renderItem={renderItem}
        horizontal={true}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    height: height * 0.16,
    width: width * 0.35,
    backgroundColor: '#F4F4F4',
    margin: 3,
    elevation: 5,
    borderRadius: 8,
    alignItems: 'center',
    paddingVertical: 8,
  },
  itemImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  nameText: {
    color: 'black',
    fontSize: 12,
    fontWeight: '600',
    marginVertical: 5,
  },
  activeTabText: {
    fontFamily: 'Jost-SemiBold',
    color: 'white',
    fontSize: 13,
    fontWeight: '800',
  },
});

export default SuggestionCard;
