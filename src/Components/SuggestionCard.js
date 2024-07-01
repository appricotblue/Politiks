// import {
//   View,
//   Text,
//   StyleSheet,
//   FlatList,
//   Image,
//   TouchableOpacity,
// } from 'react-native';
// import React, {useState} from 'react';
// import {height, width} from '../Theme/ConstantStyles';

// const SuggestionCard = ({datas}) => {
//   const [follow, setFollow] = useState(false);

//   const renderItem = ({item,id}) => (
//     <View style={styles.itemContainer}>
//       <View></View>
//       <Image source={item.image} style={styles.itemImage} />

//       <Text style={styles.nameText} numberOfLines={2}>
//         {item.name}
//       </Text>
//       <TouchableOpacity
//         style={styles.notificationButton}
//         onPress={() => setFollow(!follow)}>
//         <Text style={styles.activeTabText}>
//           {follow ? 'Following' : 'Follow'}
//         </Text>
//       </TouchableOpacity>
//     </View>
//   );

//   return (
//     <View>
//       <FlatList
//         data={datas}
//         renderItem={renderItem}
//         horizontal={true}
//         keyExtractor={item => item.id.toString()}
//         showsHorizontalScrollIndicator={false}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   itemContainer: {
//     height: height * 0.16,
//     width: width * 0.35,
//     backgroundColor: '#F4F4F4',
//     margin: 3,
//     elevation: 5,
//     borderRadius: 8,
//     alignItems: 'center',
//     paddingVertical: 8,
//   },
//   itemImage: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//   },
//   nameText: {
//     color: 'black',
//     fontSize: 12,
//     fontWeight: '600',
//     marginVertical: 5,
//   },
//   activeTabText: {
//     fontFamily: 'Jost-SemiBold',
//     color: 'white',
//     fontSize: 13,
//     fontWeight: '800',
//   },
//   notificationButton: {
//     minWidth: 100,
//     height: 30,
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderRadius: 35,
//     marginTop: 10,
//     backgroundColor: '#3A7BD5',
//     padding: 5,
//     marginHorizontal: 7,
//   },
// });

// export default SuggestionCard;

import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {height, width} from '../Theme/ConstantStyles';
import {useNavigation} from '@react-navigation/native';

const SuggestionCard = ({datas, onViewAllPress}) => {
  const [selectedItems, setSelectedItems] = useState([]);

  const handleSelectItem = id => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter(item => item !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };
  console.log(selectedItems, 'SELECTEDDDDDD');

  const renderItem = ({item}) => {
    const isSelected = selectedItems.includes(item.id);
    return (
      <View style={styles.itemContainer}>
        <Image source={item.image} style={styles.itemImage} />

        <Text style={styles.nameText} numberOfLines={2}>
          {item.name}
        </Text>
        <TouchableOpacity
          style={styles.notificationButton}
          onPress={() => handleSelectItem(item.id)}>
          <Text style={styles.activeTabText}>
            {isSelected ? 'Following' : 'Follow'}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View>
      <View style={styles.headContainer}>
        <Text style={styles.headText}>Suggestions for you</Text>
        <TouchableOpacity onPress={onViewAllPress}>
          <Text style={styles.headText}>View All</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={datas}
        renderItem={renderItem}
        horizontal={true}
        keyExtractor={item => item.id.toString()}
        showsHorizontalScrollIndicator={false}
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
  notificationButton: {
    minWidth: 100,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 35,
    marginTop: 10,
    backgroundColor: '#3A7BD5',
    padding: 5,
    marginHorizontal: 7,
  },
  headContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: width * 0.95,
    justifyContent: 'space-between',
  },
  headText: {
    fontWeight: '600',
    color: 'black',
    marginVertical: 2,
  },
});

export default SuggestionCard;
