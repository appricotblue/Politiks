import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
// import Video from 'react-native-video';
import Video from 'react-native-video-controls';
import images from '../assets/Images';
const windowWidth = Dimensions.get('window').width;
const ListItem = ({Data}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [liked, setLiked] = useState(false);

  const toggleLike = () => {
    setLiked(!liked);
  };

  return (
    <View>
      {Data?.map(item => {
        return (
          <View style={styles.container}>
            <View style={{flexDirection: 'row'}}>
              {/* <Image source={{ uri: item.userDetails.userProfile ? item.userDetails.userProfile : 'https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png' }} style={styles.image} /> */}
              <Image source={{ uri: 'https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png' }} style={styles.image} />
              <View style={styles.textContainer}>
                <View style={{flexDirection: 'row'}}>
                  <Text style={styles.name}>{item.userDetails.userName}</Text>
                  <Image
                    style={{width: 20, height: 20, marginLeft: 10}}
                    source={images.VerifiedPNG}
                  />
                </View>
                <Text style={styles.designation}>{item.location}</Text>
              </View>
              <TouchableOpacity
                style={{
                  width: 35,
                  height: 35,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={() => {}}>
                <Image
                  style={{width: 3, height: 16, marginBottom: 5}}
                  source={images.Threedots}
                />
              </TouchableOpacity>
            </View>

            <Text style={styles.description}>{item.caption}</Text>
            <Image source={{uri: item?.image}} style={styles.media} />

            {/* {item.type === 'image' ? (
      <>
        <Image source={{uri: item.image}} style={styles.media} />
      </>
    ) : (
      <Video
        source={{uri: item.media}}
        style={styles.media}
        paused={true} // Start the video in a paused state
        disableVolume={true} // Disable volume control if needed
      />
    )} */}
            <View onPress={toggleLike} style={styles.likeButton}>
              <View
                style={{
                  flexDirection: 'row',
                  width: 75,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  source={liked ? images.ThumbsUp : images.ThumbsUp}
                  style={styles.likeIcon}
                />
                <Text style={styles.liketext}>1.5 k</Text>
              </View>

              <View
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
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  width: 75,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  source={liked ? images.Union : images.Union}
                  style={styles.likeIcon}
                />
                <Text style={styles.liketext}>251</Text>
              </View>
            </View>
            {/* Modal */}
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => setModalVisible(false)}>
              <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                  {/* Close button */}
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

                  {/* List of items */}
                  <View style={styles.itemList}>
                    {/* Item 1 */}
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
                    {/* Add more items similarly */}
                  </View>
                </View>
              </View>
            </Modal>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // alignItems: 'center',
    padding: 10,
  },
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
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  designation: {
    fontSize: 14,
    color: '#888',
    color: 'black',
  },
  description: {
    fontSize: 14,
    color: '#555',
    marginTop: 5,
    color: 'black',
    lineHeight: 20,
  },
  media: {
    width: '100%',
    height: 400,
    marginTop: 10,
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
    width: '80%',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  actionList: {
    marginTop: 20,
  },
  action: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  actionText: {
    fontSize: 16,
    color: 'black',
  },
  likeButton: {
    position: 'absolute',
    bottom: 30,

    zIndex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    width: 300,
    alignSelf: 'center',
    height: 40,
    justifyContent: 'space-around',
    alignItems: 'center',
    borderRadius: 25,
    paddingLeft: 10,
    flexDirection: 'row',
    alignItems: '',
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
    width: '80%',
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
  liketext: {
    marginLeft: 10,
    color: 'white',
    fontFamily: 'Jost',
    fontWeight: '500',
    fontSize: 15,
  },
});

export default ListItem;
