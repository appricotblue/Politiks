import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Modal,
  TouchableOpacity,
} from 'react-native';
import images from '../assets/Images';
import {width} from '../Theme/ConstantStyles';

const data = [
  {id: '1', title: 'Communism', imageUrl: images.ViratProfile},
  {id: '2', title: 'Evolutionary', imageUrl: images.Welcome_2},
  {id: '3', title: 'Socialism', imageUrl: images.Welcome_3},
  {id: '4', title: 'Marxism', imageUrl: images.Welcome_1},
  {id: '5', title: 'Democracy', imageUrl: images.Welcome_2},
];

const MyInterestModal = ({
  modalVisible,
  onClosePress,
  selectedItems,
  setSelectedItems,
}) => {
  const toggleSelection = (id, title) => {
    setSelectedItems(prevSelectedItems => {
      const itemIndex = prevSelectedItems.findIndex(item => item.id === id);
      if (itemIndex !== -1) {
        const updatedItems = [...prevSelectedItems];
        updatedItems.splice(itemIndex, 1);
        return updatedItems;
      } else {
        return [...prevSelectedItems, {id, title}];
      }
    });
  };

  console.log(selectedItems, 'selecteeeeeee');

  return (
    <View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={onClosePress}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.action}>
              <Text style={styles.containerText}>My Interests</Text>
            </View>
            <TouchableOpacity style={styles.closeButton} onPress={onClosePress}>
              <Image source={images.Cross} style={styles.closeIcon} />
            </TouchableOpacity>
            <View style={styles.itemList}>
              {data.map(item => (
                <View style={styles.item} key={item.id}>
                  <Text style={styles.itemTitle}>{item.title}</Text>
                  <TouchableOpacity
                    onPress={() => toggleSelection(item.id, item.title)}>
                    <Image
                      source={
                        selectedItems?.find(
                          selectedItem => selectedItem.id === item.id,
                        )
                          ? images.CheckBoxSelected
                          : images.CheckBoxUnSelected
                      }
                      style={styles.itemIcon}
                    />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#F4F4F4',
    padding: 15,
    borderRadius: 10,
    width: width * 0.85,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  closeIcon: {
    width: 26,
    height: 21,
    marginBottom: 25,
  },
  action: {
    position: 'absolute',
    top: 10,
    left: 15,
    bottom: 100,
    height: 50,
  },
  itemList: {
    marginTop: 20,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: 'white',
    height: 50,
    borderRadius: 10,
    justifyContent: 'space-between',
    paddingHorizontal: 5,
  },
  itemIcon: {
    width: 26,
    height: 21,
    marginRight: 10,
    marginLeft: 10,
  },
  itemTitle: {
    fontSize: 18,
    fontFamily: 'Jost',
    fontWeight: '400',
    color: 'black',
  },
  containerText: {
    fontFamily: 'Jost',
    fontWeight: '800',
    color: 'black',
    fontSize: 20,
    marginBottom: 20,
  },
});

export default MyInterestModal;

// import React, {useState} from 'react';
// import {
//   View,
//   Text,
//   Image,
//   StyleSheet,
//   Modal,
//   TouchableOpacity,
// } from 'react-native';
// import images from '../assets/Images';
// import {width} from '../Theme/ConstantStyles';

// const data = [
//   {id: '1', title: 'Communism', imageUrl: images.ViratProfile},
//   {id: '2', title: 'Evolutionary', imageUrl: images.Welcome_2},
//   {id: '3', title: 'Socialism', imageUrl: images.Welcome_3},
//   {id: '4', title: 'Marxism', imageUrl: images.Welcome_1},
//   {id: '5', title: 'Democracy', imageUrl: images.Welcome_2},
// ];

// const MyInterestModal = ({modalVisible, onClosePress}) => {
//   const [selectedItems, setSelectedItems] = useState({});

//   const toggleSelection = id => {
//     setSelectedItems(prevSelectedItems => ({
//       ...prevSelectedItems,
//       [id]: !prevSelectedItems[id],
//     }));
//   };

//   console.log(selectedItems, 'itemssssss');

//   return (
//     <View>
//       <Modal
//         animationType="fade"
//         transparent={true}
//         visible={modalVisible}
//         onRequestClose={onClosePress}>
//         <View style={styles.modalContainer}>
//           <View style={styles.modalContent}>
//             <View style={styles.action} onPress={onClosePress}>
//               <Text style={styles.containerText}>My Interests</Text>
//             </View>
//             <TouchableOpacity style={styles.closeButton} onPress={onClosePress}>
//               <Image source={images.Cross} style={styles.closeIcon} />
//             </TouchableOpacity>
//             <View style={styles.itemList}>
//               {data.map(item => (
//                 <View style={styles.item} key={item.id}>
//                   <Text style={styles.itemTitle}>{item.title}</Text>
//                   <TouchableOpacity onPress={() => toggleSelection(item.id)}>
//                     <Image
//                       source={
//                         selectedItems[item.id]
//                           ? images.CheckBoxSelected
//                           : images.CheckBoxUnSelected
//                       }
//                       style={styles.itemIcon}
//                     />
//                   </TouchableOpacity>
//                 </View>
//               ))}
//             </View>
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   modalContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//   },
//   modalContent: {
//     backgroundColor: '#F4F4F4',
//     padding: 15,
//     borderRadius: 10,
//     width: width * 0.85,
//   },
//   closeButton: {
//     position: 'absolute',
//     top: 10,
//     right: 10,
//   },
//   closeIcon: {
//     width: 26,
//     height: 21,
//     marginBottom: 25,
//   },
//   action: {
//     position: 'absolute',
//     top: 10,
//     left: 15,
//     bottom: 100,
//     height: 50,
//   },
//   itemList: {
//     marginTop: 20,
//   },
//   item: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 10,
//     backgroundColor: 'white',
//     height: 50,
//     borderRadius: 10,
//     justifyContent: 'space-between',
//     paddingHorizontal: 5,
//   },
//   itemIcon: {
//     width: 26,
//     height: 21,
//     marginRight: 10,
//     marginLeft: 10,
//   },
//   itemTitle: {
//     fontSize: 18,
//     fontFamily: 'Jost',
//     fontWeight: '400',
//     color: 'black',
//   },
//   containerText: {
//     fontFamily: 'Jost',
//     fontWeight: '800',
//     color: 'black',
//     fontSize: 20,
//     marginBottom: 20,
//   },
// });

// export default MyInterestModal;

// import React, {useState} from 'react';
// import {
//   View,
//   Text,
//   Image,
//   StyleSheet,
//   Modal,
//   TouchableOpacity,
// } from 'react-native';
// import images from '../assets/Images';
// import {width} from '../Theme/ConstantStyles';

// const data = [
//   {id: '1', title: 'Communism', imageUrl: images.ViratProfile},
//   {id: '2', title: 'Evolutionary', imageUrl: images.Welcome_2},
//   {id: '3', title: 'Socialism', imageUrl: images.Welcome_3},
//   {id: '4', title: 'Marxism', imageUrl: images.Welcome_1},
//   {id: '5', title: 'Democracy', imageUrl: images.Welcome_2},
// ];

// const MyInterestModal = ({
//   modalVisible,
//   onClosePress,
//   selectedItems,
//   setSelectedItems,
// }) => {
//   const selectItem = id => {
//     let updatedSelection = [...selectedItems];
//     const index = updatedSelection.indexOf(id);
//     if (index > -1) {
//       updatedSelection.splice(index, 1); // Remove item if already selected
//     } else {
//       updatedSelection.push(id); // Add item if not selected
//     }
//     setSelectedItems(updatedSelection);
//   };

//   const isSelected = id => {
//     return selectedItems;
//   };

//   return (
//     <View>
//       <Modal
//         animationType="fade"
//         transparent={true}
//         visible={modalVisible}
//         onRequestClose={onClosePress}>
//         <View style={styles.modalContainer}>
//           <View style={styles.modalContent}>
//             <TouchableOpacity style={styles.closeButton} onPress={onClosePress}>
//               <Image source={images.Cross} style={styles.closeIcon} />
//             </TouchableOpacity>
//             <Text style={styles.containerText}>My Interests</Text>
//             <View style={styles.itemList}>
//               {data.map(item => (
//                 <View style={styles.item} key={item.id}>
//                   <Text style={styles.itemTitle}>{item.title}</Text>
//                   <TouchableOpacity onPress={() => selectItem(item.id)}>
//                     <Image
//                       source={
//                         isSelected(item.id)
//                           ? images.CheckBoxSelected
//                           : images.CheckBoxUnSelected
//                       }
//                       style={styles.itemIcon}
//                     />
//                   </TouchableOpacity>
//                 </View>
//               ))}
//             </View>
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   modalContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//   },
//   modalContent: {
//     backgroundColor: '#F4F4F4',
//     padding: 15,
//     borderRadius: 10,
//     width: width * 0.85,
//   },
//   closeButton: {
//     position: 'absolute',
//     top: 10,
//     right: 10,
//   },
//   closeIcon: {
//     width: 26,
//     height: 21,
//   },
//   itemList: {
//     marginTop: 20,
//   },
//   item: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 10,
//     backgroundColor: 'white',
//     height: 50,
//     borderRadius: 10,
//     justifyContent: 'space-between',
//     paddingHorizontal: 5,
//   },
//   itemIcon: {
//     width: 26,
//     height: 21,
//     marginRight: 10,
//     marginLeft: 10,
//   },
//   itemTitle: {
//     fontSize: 18,
//     fontFamily: 'Jost',
//     fontWeight: '400',
//     color: 'black',
//   },
//   containerText: {
//     fontFamily: 'Jost',
//     fontWeight: '800',
//     color: 'black',
//     fontSize: 20,
//     marginBottom: 20,
//     textAlign: 'center',
//   },
// });

// export default MyInterestModal;

// import React, {useState} from 'react';
// import {
//   View,
//   Text,
//   Image,
//   StyleSheet,
//   Modal,
//   TouchableOpacity,
// } from 'react-native';
// import images from '../assets/Images';
// import {width} from '../Theme/ConstantStyles';

// const data = [
//   {id: '1', title: 'Communism', imageUrl: images.ViratProfile},
//   {id: '2', title: 'Evolutionary', imageUrl: images.Welcome_2},
//   {id: '3', title: 'Socialism', imageUrl: images.Welcome_3},
//   {id: '4', title: 'Marxism', imageUrl: images.Welcome_1},
//   {id: '5', title: 'Democracy', imageUrl: images.Welcome_2},
// ];

// const MyInterestModal = ({
//   modalVisible,
//   onClosePress,
//   selectedItems,
//   setSelectedItems,
// }) => {
//   const toggleItemSelection = id => {
//     const isSelected = selectedItems?.some(item => item.id === id);
//     if (isSelected) {
//       setSelectedItems(prevItems => prevItems.filter(item => item.id !== id));
//     } else {
//       const selectedItem = data.find(item => item.id === id);
//       setSelectedItems(prevItems => [...prevItems, selectedItem]);
//     }
//   };

//   return (
//     <View>
//       <Modal
//         animationType="fade"
//         transparent={true}
//         visible={modalVisible}
//         onRequestClose={onClosePress}>
//         <View style={styles.modalContainer}>
//           <View style={styles.modalContent}>
//             <TouchableOpacity style={styles.closeButton} onPress={onClosePress}>
//               <Image source={images.Cross} style={styles.closeIcon} />
//             </TouchableOpacity>
//             <Text style={styles.containerText}>My Interests</Text>
//             <View style={styles.itemList}>
//               {data.map(item => (
//                 <View style={styles.item} key={item.id}>
//                   <Text style={styles.itemTitle}>{item.title}</Text>
//                   <TouchableOpacity
//                     onPress={() => toggleItemSelection(item.id)}>
//                     <Image
//                       source={
//                         selectedItems.some(
//                           selectedItem => selectedItem.id === item.id,
//                         )
//                           ? images.CheckBoxSelected
//                           : images.CheckBoxUnSelected
//                       }
//                       style={styles.itemIcon}
//                     />
//                   </TouchableOpacity>
//                 </View>
//               ))}
//             </View>
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   modalContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//   },
//   modalContent: {
//     backgroundColor: '#F4F4F4',
//     padding: 15,
//     borderRadius: 10,
//     width: width * 0.85,
//   },
//   closeButton: {
//     position: 'absolute',
//     top: 10,
//     right: 10,
//   },
//   closeIcon: {
//     width: 26,
//     height: 21,
//   },
//   itemList: {
//     marginTop: 20,
//   },
//   item: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 10,
//     backgroundColor: 'white',
//     height: 50,
//     borderRadius: 10,
//     justifyContent: 'space-between',
//     paddingHorizontal: 5,
//   },
//   itemIcon: {
//     width: 26,
//     height: 21,
//     marginRight: 10,
//     marginLeft: 10,
//   },
//   itemTitle: {
//     fontSize: 18,
//     fontFamily: 'Jost',
//     fontWeight: '400',
//     color: 'black',
//   },
//   containerText: {
//     fontFamily: 'Jost',
//     fontWeight: '800',
//     color: 'black',
//     fontSize: 20,
//     marginBottom: 20,
//     textAlign: 'center',
//   },
// });

// export default MyInterestModal;
