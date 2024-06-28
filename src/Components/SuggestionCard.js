import {View, Text, StyleSheet, FlatList} from 'react-native';
import React from 'react';
import {height, width} from '../Theme/ConstantStyles';

const SuggestionCard = ({datas}) => {
  const renderItem = ({item}) => (
    <View style={styles.itemContainer}>
      <View></View>

      <Text>{item.name}</Text>
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
    height: height * 0.1,
    width: width * 0.2,
    backgroundColor: 'blue',
  },
});

export default SuggestionCard;
