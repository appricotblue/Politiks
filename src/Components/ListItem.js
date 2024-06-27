import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  FlatList,
  TextInput,
  Alert
} from 'react-native';
import images from '../assets/Images';
import { getHeight, getWidth } from '../Theme/Constants';
const windowWidth = Dimensions.get('window').width;
import { useNavigation } from '@react-navigation/native';
import Modal from 'react-native-modal';
import local from '../Storage/Local';
import {
  CreateMessage,
  GetMessage,
  CreateSubMessage,
  Likecomment,
  UnLikecomment
} from '../api';

const ListItem = ({ Data }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [liked, setLiked] = useState(false);
  const [commentliked, setcommentliked] = useState(false);
  const navigation = useNavigation();
  const [bottomModalVisible, setBottomModalVisible] = useState(false);
  const [commentsModalVisible, setCommentsModalVisible] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState([]);
  const [replyingTo, setReplyingTo] = useState(null);
  const [userid, setuserid] = useState('');
  const [postid, setpostid] = useState('');
  const [messages, setmessages] = useState([]);
  const [itemdata, setitemdata] = useState([]);
  const commentInputRef = useRef(null);



  const likedPersons = [
    { id: 1, name: 'Jane Smith', profile: 'https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png' },
    { id: 2, name: 'Mike Johnson', profile: 'https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png' }
  ];

  const getuser = async () => {
    const userId = await local.getUserId();
    console.log(userId, 'leaderdata he');
    setuserid(userId);
  };

  useEffect(() => {
    getuser();

  }, []);

  const handleSend = (item) => {
    console.log(itemdata, 'send item', replyingTo, 'kkkk')
    setpostid(itemdata?.id)
    if (newComment.trim()) {
      if (replyingTo) {
        handlesubcommant(replyingTo);
      } else {
        handledataRegister(item);
      }
      setReplyingTo(null);
    }
  };


  const Likecomments = async (itemid) => {
    try {
      // setIsLoading(true);
      const response = await Likecomment(itemid, userid);
      GetMessages(itemdata?.id)
      console.log(response, 'getallinterests API response');
    } catch (error) {
      // setIsLoading(false);
      console.error('Error fetching interests:', error);
      Alert.alert('Error', 'An error occurred while fetching interests.');
    }
  };

  const UNLikecomments = async (itemid) => {
    try {
      // setIsLoading(true);
      const response = await UnLikecomment(itemid, userid);
      GetMessages(itemdata?.id)
      console.log(response, 'getallinterests API response');
    } catch (error) {
      // setIsLoading(false);
      console.error('Error fetching interests:', error);
      Alert.alert('Error', 'An error occurred while fetching interests.');
    }
  };




  const GetMessages = async (itemid) => {
    console.log(itemid, 'message id')
    try {
      // setIsLoading(true);
      const response = await GetMessage(itemid);
      // setIsLoading(false);
      setmessages(response);
      console.log(response, 'getmessager API response');
    } catch (error) {
      // setIsLoading(false);
      console.error('Error fetching interests:', error);
      Alert.alert('Error', 'An error occurred while fetching interests.');
    }
  };
  const handledataRegister = async (item) => {
    console.log(item, 'hereitem')
    setNewComment('')
    try {
      // setIsLoading(true);

      const response = await CreateMessage(
        itemdata?.id,
        newComment,
        userid,
      );
      console.log(response, 'login api response');
      GetMessages(itemdata?.id)

    } catch (error) {
      // setIsLoading(false);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        Alert.alert('Error', error.response.data.message);
      } else {
        Alert.alert('Error', 'An error occurred during login.');
      }
    }
  };


  const handlesubcommant = async (item) => {
    console.log(item, 'hereitem', postid)
    setNewComment('')
    try {
      // setIsLoading(true);

      const response = await CreateSubMessage(
        item?.id,
        newComment,
        userid,
      );
      console.log(response, 'login api response');


      GetMessages(itemdata?.id)

    } catch (error) {
      // setIsLoading(false);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        Alert.alert('Error', error.response.data.message);
      } else {
        Alert.alert('Error', 'An error occurred during login.');
      }
    }
  };

  const toggleLike = () => {
    setLiked(!liked);
  };

  // const toggleLikecomment = (itemid) => {
  //   setcommentliked(!commentliked);
  //   console.log(commentliked, 'like status')
  //   if (commentliked == true) {
  //     Likecomments(itemid)
  //   } else {
  //     UNLikecomments(itemid)
  //   }
  // };

  const toggleLikecomment = (itemid) => {
    setcommentliked((commentliked) => {
      const newLiked = !commentliked;
      console.log(newLiked, 'like status');
  
      if (newLiked) {
        Likecomments(itemid);
      } else {
        UNLikecomments(itemid);
      }
  
      return newLiked;
    });
  };

  const openBottomModal = () => {
    setBottomModalVisible(true);
  };

  const closeBottomModal = () => {
    setBottomModalVisible(false);
  };

  const openCommentsModal = () => {
    setCommentsModalVisible(true);
  };

  const closeCommentsModal = () => {
    setCommentsModalVisible(false);
  };



  const renderLikedPerson = ({ item }) => (
    <TouchableOpacity onPress={() => closeBottomModal()} style={styles.likedPersonContainer}>
      <Image source={{ uri: item.profile }} style={styles.likedPersonImage} />
      <Text style={styles.likedPersonName}>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderComment = ({ item }) => (
    <View style={styles.commentContainer}>
      <View style={styles.commentHeader}>
        <Image
          source={{ uri: 'https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png' }}
          style={styles.commentUserImage}
        />
        <Text style={styles.commentUserName}>User Name</Text>
        <View style={styles.commentLikeContainer}>
          <Text style={styles.commentLikeCount}>{item?.likeCount}</Text>
          <TouchableOpacity onPress={() => toggleLikecomment(item?.id)}>
            <Image source={ commentliked ? images.blueThumbsUp:images.ThumbsUp} style={styles.commentLikeIcon} />
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.commentText}>{item.content}</Text>
      <View style={styles.commentFooter}>
        <Text style={styles.commentTime}>2h ago</Text>
        {/* <TouchableOpacity onPress={() => handlesubcommant(item)}> */}
        <TouchableOpacity onPress={() => {
          setReplyingTo(item);
          commentInputRef.current.focus();
        }}>
          <Text style={styles.commentReplyButton}>Reply</Text>
        </TouchableOpacity>
      </View>
      {item?.subComments?.map(reply => (
        <View key={reply.id} style={styles.replyContainer}>
          <View style={styles.commentHeader}>
            <Image
              source={{ uri: 'https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png' }}
              style={styles.commentUserImage}
            />
            <Text style={styles.commentUserName}>User Name</Text>
            <View style={styles.commentLikeContainer}>
              <Text style={styles.commentLikeCount}>{reply?.likeCount}</Text>
              <TouchableOpacity>
                <Image source={images.ThumbsUp} style={styles.commentLikeIcon} />
              </TouchableOpacity>
            </View>
          </View>
          <Text style={styles.replyText}>{reply.subComment}</Text>
          <View style={styles.commentFooter}>
            <Text style={styles.commentTime}>2h ago</Text>
            <TouchableOpacity onPress={() => setReplyingTo(item.id)}>
              <Text style={styles.commentReplyButton}>Reply</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </View>
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
                  {item.userDetails.role !== 'Follower' && item?.userDetails?.action == 'Approved' && (
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
                }}
                onPress={() => { GetMessages(item.id), openCommentsModal(), setitemdata(item) }}>
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
                        source={images.SaveIcon}
                        style={styles.itemIcon}
                      />
                      <Text style={styles.itemTitle}>Save Post</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.item}>
                      <Image
                        source={images.Report}
                        style={styles.itemIcon}
                      />
                      <Text style={styles.itemTitle}>Report Post</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>

            {/* Bottom Modal */}
            <Modal
              isVisible={bottomModalVisible}
              onBackdropPress={closeBottomModal}
              style={styles.bottomModal}
              backdropOpacity={.1}
            >
              <View style={styles.modalContent}>
                <Text style={{ color: 'black', fontFamily: 'Jost-Bold' }}>Likes</Text>

                <FlatList
                  data={likedPersons}
                  keyExtractor={(item) => item.id.toString()}
                  renderItem={renderLikedPerson}
                />
              </View>
            </Modal>

            {/* Comments Modal */}
            <Modal
              isVisible={commentsModalVisible}
              onBackdropPress={closeCommentsModal}
              style={styles.bottomModal}
              backdropOpacity={.1}
            >
              <View style={styles.modalContent}>
                <View style={{ flexDirection: 'row' }} >
                  <Text style={{ color: 'black', fontFamily: 'Jost-Bold', fontSize: 16, margin: 10 }}>Comments</Text>
                  <TouchableOpacity
                    style={styles.closeButton}
                    onPress={() => closeCommentsModal()}>
                    <Text style={styles.closeButtonText}>X</Text>
                  </TouchableOpacity>
                </View>


                <FlatList
                  data={messages}
                  keyExtractor={(item) => item?.id.toString()}
                  renderItem={renderComment}
                />
                <View style={styles.commentInputContainer}>
                  <Image
                    source={{ uri: 'https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png' }}
                    style={styles.commentUserImage}
                  />
                  <TextInput
                    ref={commentInputRef}
                    value={newComment}
                    onChangeText={setNewComment}
                    placeholder="Write your comment..."
                    placeholderTextColor={'gray'}
                    style={styles.commentInput}
                  />
                  {/* <TouchableOpacity onPress={()=>handledataRegister(item)}> */}
                  <TouchableOpacity onPress={() => handleSend()}>
                    <Text style={styles.sendText}>Send</Text>
                  </TouchableOpacity>
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
    // padding: 20,
    borderRadius: 10,
    width: '100%',
    maxHeight: getHeight(1.4)
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
  commentContainer: {
    marginLeft: 10,
    marginRight: 10,
    padding: 10,
    // borderBottomWidth: 1,
    // borderColor: '#ccc',
    backgroundColor: '#FFFFFF',
    borderRadius: 19,
    marginBottom: 5
  },
  commentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  commentUserImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
  },
  commentUserName: {
    fontFamily: 'Jost-Bold',
    fontSize: 16,
    color: 'black',

  },
  commentLikeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 'auto',
  },
  commentLikeCount: {
    fontSize: 14,
    color: 'black',
    marginRight: 5,
  },
  commentLikeIcon: {
    width: 18,
    height: 18,
  },
  commentText: {
    fontFamily: 'Jost-Regular',
    fontSize: 16,
    color: 'black',
    marginTop: 5,
    marginLeft: 15,
    marginRight: 10
  },
  commentFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  commentTime: {
    fontFamily: 'Jost-Regular',
    fontSize: 12,
    color: 'grey',
    marginRight: 20,
    marginLeft: 15,
  },
  commentReplyButton: {
    fontSize: 12,
    color: 'blue',
  },
  replyInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: '#ccc',
    paddingTop: 10,
    marginTop: 10,
  },
  replyInput: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  replyContainer: {
    marginLeft: 40,
    marginTop: 10,
  },
  replyText: {
    fontSize: 14,
    color: 'black',
  },
  commentInputContainer: {
    width: getWidth(1),
    flexDirection: 'row',
    alignItems: 'center',
    // borderTopWidth: 1,
    // borderColor: '#ccc',
    paddingTop: 10,
    marginTop: 10,
    paddingTop: 23,
    paddingBottom: 23,
    padding: 5,
    backgroundColor: 'white',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10
  },
  commentInput: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    marginRight: 10,
    color: 'black',
    backgroundColor: '#F4F4F4'
  },
  sendText: {
    color: 'blue',
    fontSize: 16,
    fontWeight: 'bold',
  },
  closeButton2: {
    margin: 10
    // position: 'absolute',
    // top: 10,
    // right: 10,
    // backgroundColor: '#000',
    // borderRadius: 20,
    // padding: 10,
    // backgroundColor:'red'
  },
  closeButtonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default ListItem;
