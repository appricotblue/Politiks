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
import {height, width} from '../Theme/ConstantStyles';

const data = [
  {id: '1', title: 'Democratic', imageUrl: images.ViratProfile},
  {id: '2', title: 'Republican', imageUrl: images.Welcome_2},
  {id: '3', title: 'Libertarian', imageUrl: images.Welcome_3},
];

const ProfileModal = ({
  modalVisible,
  onClosePress,
  selectedItem,
  setSelectedItem,
}) => {
  const selectItem = id => {
    const item = data.find(item => item.id === id);
    setSelectedItem(item);
    console.log(`Selected Item: ${item.title}`);
  };

  return (
    <View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={onClosePress}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {/* <TouchableOpacity style={styles.closeButton} onPress={onClosePress}>
              <Image source={images.Cross} style={styles.closeIcon} />
            </TouchableOpacity>
            <Text style={styles.containerText}>My Party</Text> */}
            <View style={{height: 50}}>
              <View style={styles.action}>
                <Text style={styles.containerText}>My Interests</Text>
              </View>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={onClosePress}>
                <Image source={images.Cross} style={styles.closeIcon} />
              </TouchableOpacity>
            </View>
            <View style={styles.itemList}>
              {data.map(item => (
                <View style={styles.item} key={item.id}>
                  <Text style={styles.itemTitle}>{item.title}</Text>
                  <TouchableOpacity onPress={() => selectItem(item.id)}>
                    <Image
                      source={
                        selectedItem && selectedItem.id === item.id
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
    height: height * 0.4,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  closeIcon: {
    width: 26,
    height: 21,
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
    textAlign: 'center',
  },
  action: {
    position: 'absolute',
    top: 10,
    left: 15,
    bottom: 100,
    height: 50,
    width: width * 0.4,
    // backgroundColor: 'pink',
  },
});

export default ProfileModal;
