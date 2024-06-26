import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  FlatList
} from 'react-native';
import Video from 'react-native-video-controls';
import images from '../assets/Images';
import { getWidth } from '../Theme/Constants';
const windowWidth = Dimensions.get('window').width;
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Modal from 'react-native-modal';

const ListItem = ({ Data }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [liked, setLiked] = useState(false);
  const navigation = useNavigation();
  const [bottomModalVisible, setBottomModalVisible] = useState(false);
  const likedPersons = [
    { id: 1, name: 'Jane Smith', profile: 'https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png' },
    { id: 2, name: 'Mike Johnson', profile: 'https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png' }
  ];

  const toggleLike = () => {
    setLiked(!liked);
  };

  const openBottomModal = () => {
    console.log('test');
    setBottomModalVisible(true);
  };

  const closeBottomModal = () => {
    setBottomModalVisible(false);
  };

  const renderLikedPerson = ({ item }) => (
    <TouchableOpacity onPress={() => closeBottomModal()} style={styles.likedPersonContainer}>
      <Image source={{ uri: item.profile }} style={styles.likedPersonImage} />
      <Text style={styles.likedPersonName}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View>
      {Data?.map(item => {
        return (
          <View style={styles.container} key={item.id}>
            <View style={{ flexDirection: 'row', padding: 10 }}>
              <TouchableOpacity
                onPress={() => navigation.navigate('OtherProfile')}>
                <Image
                  source={{
                    uri: item.userDetails.userProfile
                      ? item.userDetails.userProfile
                      : 'https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png',
                  }}
                  style={styles.image}
                />
              </TouchableOpacity>

              <View style={styles.textContainer}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={styles.name}>{item.userDetails.userName}</Text>
                  {item.userDetails.role !== 'Follower' && (
                    <Image
                      style={{ width: 20, height: 20, marginLeft: 6 }}
                      source={images.VerifiedPNG}
                    />
                  )}
                </View>
                <Text style={styles.designation}>{item.location}</Text>
              </View>
              <TouchableOpacity
                style={{
                  width: 35,
                  height: 45,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={() => { }}>
                <Image
                  style={{
                    width: 3,
                    height: 16,
                    resizeMode: 'contain',
                  }}
                  source={images.Threedots}
                />
              </TouchableOpacity>
            </View>

            <Text style={styles.description}>{item.caption}</Text>
            <Image source={{ uri: item?.image }} style={styles.media} />

            <View onPress={toggleLike} style={styles.likeButton}>
              <View
                style={{
                  flexDirection: 'row',
                  width: 75,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <TouchableOpacity>
                  <Image
                    source={liked ? images.ThumbsUp : images.ThumbsUp}
                    style={styles.likeIcon}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => openBottomModal()}>
                  <Text style={styles.liketext}>1.5 k</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  width: 75,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  source={liked ? images.Comment : images.Comment}
                  style={styles.likeIcon}
                />
                <Text style={styles.liketext}>386</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  width: 75,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  source={images.Share}
                  style={styles.likeIcon}
                />
                <Text style={styles.liketext}>251</Text>
              </TouchableOpacity>
            </View>

            {/* Modal */}
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => setModalVisible(false)}>
              <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                  <View
                    style={styles.action}
                    onPress={() => setModalVisible(false)}>
                    <Text
                      style={{
                        fontFamily: 'Jost',
                        fontWeight: '800',
                        color: 'black',
                        fontSize: 20,
                        marginLeft: 10,
                        marginBottom: 20,
                      }}>
                      Actions
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={styles.closeButton}
                    onPress={() => setModalVisible(false)}>
                    <Image source={images.Cross} style={styles.closeIcon} />
                  </TouchableOpacity>

                  <View style={styles.itemList}>
                    <TouchableOpacity style={styles.item}>
                      <Image source={images.Share} style={styles.itemIcon} />
                      <Text style={styles.itemTitle}>Share Post</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.item}>
                      <Image
                        source={images.UserMinus}
                        style={styles.itemIcon}
                      />
                      <Text style={styles.itemTitle}>
                        Unfollow this account
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.item}>
                      <Image source={images.Block} style={styles.itemIcon} />
                      <Text style={styles.itemTitle}>Block this account</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.item}>
                      <Image
                        source={images.WarningCircle}
                        style={styles.itemIcon}
                      />
                      <Text style={styles.itemTitle}>Report this post</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>

            {/* Bottom Modal */}
            <Modal
              isVisible={bottomModalVisible}
              onSwipeComplete={closeBottomModal}
              swipeDirection="down"
              style={styles.bottomModal}
              backdropOpacity={.1}
            >
              <View style={styles.modalContent}>
                <Text style={{ color: 'black', fontFamily: 'Jost-Bold' }}>Likes</Text>
                <FlatList
                  data={likedPersons}
                  renderItem={renderLikedPerson}
                  keyExtractor={(item) => item.id.toString()}
                />
              </View>
            </Modal>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontFamily: 'Jost-Bold',
    fontSize: 18,
    color: 'black',
  },
  designation: {
    fontFamily: 'Jost-Regular',
    fontSize: 14,
    color: 'black',
  },
  description: {
    fontFamily: 'Jost-Regular',
    fontSize: 14,
    color: 'black',
    marginTop: 5,
    lineHeight: 20,
    paddingHorizontal: 13,
  },
  media: {
    width: '100%',
    height: 400,
    marginTop: 10,
  },
  likeButton: {
    zIndex: 1,
    width: getWidth(1),
    alignSelf: 'center',
    height: 40,
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingLeft: 10,
    flexDirection: 'row',
  },
  likeIcon: {
    width: 22,
    height: 22,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#F4F4F4',
    padding: 20,
    borderRadius: 10,
    width: '100%',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    marginBottom: 10,
  },
  action: {
    position: 'absolute',
    top: 10,
    left: 15,
    bottom: 100,
    height: 50,
  },
  closeIcon: {
    width: 26,
    height: 21,
    marginBottom: 25,
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
  bottomModal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  likedPersonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  likedPersonImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  likedPersonName: {
    fontSize: 16,
    color: 'black',
  },
  liketext: {
    marginLeft: 10,
    color: 'black',
    fontFamily: 'Jost',
    fontWeight: '500',
    fontSize: 15,
  },
});

export default ListItem;
