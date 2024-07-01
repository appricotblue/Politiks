import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  FlatList,
  TextInput,
  Alert,
  ActivityIndicator,
} from 'react-native';
import images from '../assets/Images';
import {getHeight, getWidth} from '../Theme/Constants';
const windowWidth = Dimensions.get('window').width;
import {useNavigation} from '@react-navigation/native';
import Modal from 'react-native-modal';
import local from '../Storage/Local';
import {
  CreateMessage,
  GetMessage,
  CreateSubMessage,
  Likecomment,
  UnLikecomment,
  LikSubecomment,
  UnLikeSubcomment,
  LikePostuselist,
  UpdateMessage
} from '../api';
import SwiperComponent from './SwiperComponent';
import Swiper from 'react-native-swiper';

const ListItem = ({Data, likePress}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [repost, setrepost] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likeduserList, setlikeduserList] = useState([]);
  const [commentliked, setcommentliked] = useState(false);
  const [subcommentliked, setsubcommentliked] = useState(false);
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
  const [shareModalVisible, setShareModalVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [selectedFollowers, setSelectedFollowers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [followers, setFollowers] = useState([
    // Sample data, replace with actual data
    {
      id: 1,
      name: 'Jane Smith',
      profile:
        'https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png',
    },
    {
      id: 2,
      name: 'Mike Johnson',
      profile:
        'https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png',
    },
  ]);

  const swiperimage = [
    'https://politiks.aindriya.co.uk/post/41/1719822943486.jpg',
    'https://politiks.aindriya.co.uk/post/41/1719822943620.jpg',
  ];

  const likedPersons = [
    {
      id: 1,
      name: 'Jane Smith',
      profile:
        'https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png',
    },
    {
      id: 2,
      name: 'Mike Johnson',
      profile:
        'https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png',
    },
  ];

  const getuser = async () => {
    const userId = await local.getUserId();
    console.log(userId, 'leaderdata he');
    setuserid(userId);
    console.group(Data[0]?.image, 'imagesss');
  };

  useEffect(() => {
    getuser();
  }, []);

  const handleSend = item => {
    console.log(itemdata, 'send item', replyingTo, 'kkkk');
    setpostid(itemdata?.id);
    if (newComment.trim()) {
      if (replyingTo) {
        handlesubcommant(replyingTo);
      } else {
        handledataRegister(item);
      }
      setReplyingTo(null);
    }
  };

  const Likesubcomments = async itemid => {
    try {
      // setIsLoading(true);
      const response = await LikSubecomment(itemid, userid);
      GetMessages(itemdata?.id);
      console.log(response, 'getallinterests API response');
    } catch (error) {
      // setIsLoading(false);
      console.error('Error fetching interests:', error);
      Alert.alert('Error', 'An error occurred while fetching interests.');
    }
  };

  const UNLikesubcomments = async itemid => {
    try {
      // setIsLoading(true);
      const response = await UnLikeSubcomment(itemid, userid);
      GetMessages(itemdata?.id);
      console.log(response, 'getallinterests API response');
    } catch (error) {
      // setIsLoading(false);
      console.error('Error fetching interests:', error);
      Alert.alert('Error', 'An error occurred while fetching interests.');
    }
  };

  const Likecomments = async itemid => {
    try {
      // setIsLoading(true);
      const response = await Likecomment(itemid, userid);
      GetMessages(itemdata?.id);
      console.log(response, 'getallinterests API response');
    } catch (error) {
      // setIsLoading(false);
      console.error('Error fetching interests:', error);
      Alert.alert('Error', 'An error occurred while fetching interests.');
    }
  };

  const UNLikecomments = async itemid => {
    try {
      // setIsLoading(true);
      const response = await UnLikecomment(itemid, userid);
      GetMessages(itemdata?.id);
      console.log(response, 'getallinterests API response');
    } catch (error) {
      // setIsLoading(false);
      console.error('Error fetching interests:', error);
      Alert.alert('Error', 'An error occurred while fetching interests.');
    }
  };

  const GetMessages = async itemid => {
    console.log(itemid, 'message id');
    try {
      setIsLoading(true);
      const response = await GetMessage(itemid);
      setIsLoading(false);
      setmessages(response?.comments);
      console.log(response, 'getmessager API response');
    } catch (error) {
      setIsLoading(false);
      console.error('Error fetching interests:', error);
      Alert.alert('Error', 'An error occurred while fetching interests.');
    }
  };

  const GetLikeduserlist = async itemid => {
    console.log(itemid, 'message id');
    try {
      setIsLoading(true);
      const response = await LikePostuselist(itemid, userid);
      setIsLoading(false);
      setlikeduserList(response);
      // setmessages(response?.comments);
      console.log(response, 'getmessager API response');
    } catch (error) {
      setIsLoading(false);
      console.error('Error fetching interests:', error);
      Alert.alert('Error', 'An error occurred while fetching interests.');
    }
  };
  const UpdateMessages = async itemid => {
    console.log(itemid, 'hereitem');
    setNewComment('');
    try {
      // setIsLoading(true);

      const response = await UpdateMessage(itemid, newComment, userid);
      console.log(response, 'login api response');
      GetMessages(itemdata?.id);
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

  const handledataRegister = async item => {
    console.log(item, 'hereitem');
    setNewComment('');
    try {
      // setIsLoading(true);

      const response = await CreateMessage(itemdata?.id, newComment, userid);
      console.log(response, 'login api response');
      GetMessages(itemdata?.id);
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

  const handlesubcommant = async item => {
    console.log(item, 'hereitem', postid);
    setNewComment('');
    try {
      // setIsLoading(true);

      const response = await CreateSubMessage(item?.id, newComment, userid);
      console.log(response, 'login api response');

      GetMessages(itemdata?.id);
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

  const toggleSubLikecomment = itemid => {
    setsubcommentliked(subcommentliked => {
      const newLikedsub = !subcommentliked;
      console.log(newLikedsub, 'like status');

      if (newLikedsub) {
        Likesubcomments(itemid);
      } else {
        UNLikesubcomments(itemid);
      }

      return newLikedsub;
    });
  };

  const toggleLikecomment = itemid => {
    setcommentliked(commentliked => {
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

  const openShareModal = () => {
    setShareModalVisible(true);
  };

  const handleSendToFollowers = () => {
    console.log('Send to:', selectedFollowers);
    // Add logic to send to selected followers
    closeShareModal();
  };

  const handleRepost = () => {
    console.log('Repost');
    navigation.navigate('RepostScreen', {repostydata: itemdata});
    // Add logic for reposting
    closeShareModal();
  };

  const handleCopyLink = () => {
    console.log('Copy link');
    // Add logic to copy link to clipboard
    closeShareModal();
  };

  const handleShareTo = () => {
    console.log('Share to');
    // Add logic for sharing to other platforms
    closeShareModal();
  };

  const closeShareModal = () => {
    setShareModalVisible(false);
  };

  const renderFollower = ({item}) => (
    <TouchableOpacity
      onPress={() => {
        if (selectedFollowers.includes(item)) {
          setSelectedFollowers(
            selectedFollowers.filter(follower => follower.id !== item.id),
          );
        } else {
          setSelectedFollowers([...selectedFollowers, item]);
        }
      }}
      style={[
        styles.followerItem,
        // selectedFollowers.includes(item) && styles.selectedFollowerItem,
      ]}>
      <Image
        source={{
          uri: 'https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png',
        }}
        style={styles.shareUserImage}
      />
      <Text style={styles.followerName}>{item.name}</Text>
      {selectedFollowers?.length > 0 && (
        <View style={{height: 40}}>
          {selectedFollowers.includes(item) && (
            <Image source={images.Done} style={styles.sharetickImage} />
          )}
        </View>
      )}
    </TouchableOpacity>
  );

  const renderLikedPerson = ({item}) => (
    <TouchableOpacity
      onPress={() => closeBottomModal()}
      style={styles.likedPersonContainer}>
      <Image
        source={{
          uri: item?.userProfile
            ? item?.userProfile
            : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
        }}
        style={styles.likedPersonImage}
      />
      <Text style={styles.likedPersonName}>{item?.userName}</Text>
    </TouchableOpacity>
  );

  const renderComment = ({item}) => (
    <View style={styles.commentContainer}>
      <View style={styles.commentHeader}>
        <Image
          source={{
            uri: item?.userDetails?.userProfile
              ? item?.userDetails?.userProfile
              : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
          }}
          style={styles.commentUserImage}
        />
        <Text style={styles.commentUserName}>
          {item?.userDetails?.userName}
        </Text>
        <View style={styles.commentLikeContainer}>
          <Text style={styles.commentLikeCount}>{item?.likeCount}</Text>
          <TouchableOpacity onPress={() => console.log(item?.id)}>
            <Image
              source={item?.liked ? images.Trash : images.Trash}
              style={styles.commentLikeIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => UpdateMessages(item?.id)}>
            <Image
              source={item?.liked ? images.PencilPNG : images.PencilPNG}
              style={styles.commentLikeIcon}
            />
          </TouchableOpacity>
        </View> 
        <View style={styles.commentLikeContainer}>
          <Text style={styles.commentLikeCount}>{item?.likeCount}</Text>
          <TouchableOpacity onPress={() => toggleLikecomment(item?.id)}>
            <Image
              source={item?.liked ? images.blueThumbsUp : images.ThumbsUp}
              style={styles.commentLikeIcon}
            />
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.commentText}>{item.content}</Text>
      <View style={styles.commentFooter}>
        <Text style={styles.commentTime}>{item?.userDetails?.commentedAt}</Text>
        {/* <TouchableOpacity onPress={() => handlesubcommant(item)}> */}
        <TouchableOpacity
          onPress={() => {
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
              source={{
                uri: reply?.userDetails?.userProfile
                  ? reply?.userDetails?.userProfile
                  : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
              }}
              style={styles.commentUserImage}
            />
            <Text style={styles.commentUserName}>{reply?.reply?.userName}</Text>
            <View style={styles.commentLikeContainer}>
              <Text style={styles.commentLikeCount}>{reply?.likeCount}</Text>
              <TouchableOpacity onPress={() => toggleSubLikecomment(reply?.id)}>
                <Image
                  source={reply?.liked ? images.blueThumbsUp : images.ThumbsUp}
                  style={styles.commentLikeIcon}
                />
              </TouchableOpacity>
            </View>
          </View>
          <Text style={styles.replyText}>{reply.subComment}</Text>
          <View style={styles.commentFooter}>
            <Text style={styles.commentTime}>
              {reply?.userDetails?.commentedAt}
            </Text>
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
            {item?.isRepost == true && (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: getWidth(1.13),
                  alignSelf: 'center',
                  marginTop: 10,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Image
                    source={{
                      uri: item?.repostDetails?.userDetails?.userProfile
                        ? item?.repostDetails?.userDetails?.userProfile
                        : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
                    }}
                    style={{width: 30, height: 30, borderRadius: 25}}
                  />
                  <Text
                    style={{
                      color: 'black',
                      fontSize: 19,
                      fontFamily: 'Jost-Bold',
                      marginLeft: 5,
                    }}>
                    {item?.repostDetails?.userDetails?.userName}
                  </Text>
                  <Text
                    style={{
                      color: 'black',
                      fontSize: 14,
                      fontFamily: 'Jost-Regular',
                      marginLeft: 5,
                    }}>
                    {'reposted this'}
                  </Text>
                </View>

                <TouchableOpacity
                  style={{
                    width: 35,
                    height: 45,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  onPress={() => {}}>
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
            )}
            <View style={{flexDirection: 'row', padding: 10}}>
              <TouchableOpacity
                onPress={() => navigation.navigate('OtherProfile')}>
                <Image
                  source={{
                    uri: item.userDetails.userProfile
                      ? item.userDetails.userProfile
                      : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
                  }}
                  style={styles.image}
                />
              </TouchableOpacity>

              <View style={styles.textContainer}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={styles.name}>{item?.userDetails?.userName}</Text>
                  {item.userDetails.role !== 'Follower' &&
                    item?.userDetails?.action == 'Approved' && (
                      <Image
                        style={{width: 20, height: 20, marginLeft: 6}}
                        source={images.VerifiedPNG}
                      />
                    )}
                </View>
                <Text style={styles.designation}>{item.location}</Text>
              </View>

              {item?.isRepost ? (
                <View
                  style={{
                    backgroundColor: '#3A7BD5',
                    padding: 7,
                    borderRadius: 10,
                    height: 30,
                    width: 50,
                  }}>
                  <Text
                    style={{
                      fontFamily: 'Jost-Regular',
                      color: 'white',
                      fontSize: 13,
                    }}>
                    Follow
                  </Text>
                </View>
              ) : (
                <TouchableOpacity
                  style={{
                    width: 35,
                    height: 45,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  onPress={() => {}}>
                  <Image
                    style={{
                      width: 3,
                      height: 16,
                      resizeMode: 'contain',
                    }}
                    source={images.Threedots}
                  />
                </TouchableOpacity>
              )}
            </View>

            <Text style={styles.description}>{item.caption}</Text>
            {item?.image?.length > 0 && (
              <Swiper style={{height: 400}} showsPagination={true}>
                {item?.image.map((image, index) => (
                  <View key={index} style={styles.slide}>
                    <Image
                      source={{
                        uri: image || 'https://example.com/default-image.jpg',
                      }}
                      style={styles.media}
                      onError={() => console.error('Image failed to load')}
                    />
                  </View>
                ))}
              </Swiper>
            )}
            {/* <SwiperComponent data={swiperimage} /> */}
            {/* <SwiperComponent data={item?.image} /> */}
            {/* <Image source={{ uri: item?.image[0] }} style={styles.media} /> */}

            <View onPress={toggleLike} style={styles.likeButton}>
              <View
                style={{
                  flexDirection: 'row',
                  width: 75,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <TouchableOpacity onPress={() => likePress(item)}>
                  <Image
                    source={
                      item?.liked == true
                        ? images.blueThumbsUp
                        : images.ThumbsUp
                    }
                    style={styles.likeIcon}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    openBottomModal(), GetLikeduserlist(item?.id);
                  }}>
                  <Text style={styles.liketext}>{item?.likeCount}</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  width: 75,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={() => {
                  GetMessages(item.id), openCommentsModal(), setitemdata(item);
                }}>
                <Image
                  source={liked ? images.Comment : images.Comment}
                  style={styles.likeIcon}
                />
                <Text style={styles.liketext}>{item?.commentCount}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  openShareModal(), setitemdata(item);
                }}
                style={{
                  flexDirection: 'row',
                  width: 75,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image source={images.Share} style={styles.likeIcon} />
                <Text style={styles.liketext}>251</Text>
              </TouchableOpacity>
              <Text style={{color: 'gray', fontSize: 12}}>
                {'12 minutes ago'}
              </Text>
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
                      <Image source={images.SaveIcon} style={styles.itemIcon} />
                      <Text style={styles.itemTitle}>Save Post</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.item}>
                      <Image source={images.Report} style={styles.itemIcon} />
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
              backdropOpacity={0.1}>
              <View style={[styles.modalContent, {paddingLeft: 10}]}>
                <Text style={{color: 'black', fontFamily: 'Jost-Bold',fontSize:19}}>
                  Likes
                </Text>

                <FlatList
                  data={likeduserList}
                  keyExtractor={item => item?.userId?.toString()}
                  renderItem={renderLikedPerson}
                />
              </View>
            </Modal>

            {/* Comments Modal */}
            <Modal
              isVisible={commentsModalVisible}
              onBackdropPress={closeCommentsModal}
              style={styles.bottomModal}
              backdropOpacity={0.1}>
              <View style={styles.modalContent}>
                <View style={{flexDirection: 'row'}}>
                  <Text
                    style={{
                      color: 'black',
                      fontFamily: 'Jost-Bold',
                      fontSize: 16,
                      margin: 10,
                    }}>
                    Comments
                  </Text>
                  <TouchableOpacity
                    style={styles.closeButton}
                    onPress={() => closeCommentsModal()}>
                    <Text style={styles.closeButtonText}>X</Text>
                  </TouchableOpacity>
                </View>

                <FlatList
                  data={messages}
                  keyExtractor={item => item?.id.toString()}
                  renderItem={renderComment}
                />
                <View style={styles.commentInputContainer}>
                  <Image
                    source={{
                      uri: 'https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png',
                    }}
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
                    <Image
                      source={images.Sendbtn}
                      style={styles.commentUserImage}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>

            {/* {share model} */}

            <Modal
              isVisible={shareModalVisible}
              backdropOpacity={0.1}
              onBackdropPress={closeShareModal}
              style={styles.bottomModal}>
              <View style={styles.shareContainer}>
                <TextInput
                  style={styles.searchInput}
                  placeholder="Search followers..."
                  placeholderTextColor={'gray'}
                  value={searchText}
                  onChangeText={setSearchText}
                />
                <Text
                  style={{
                    color: 'black',
                    fontFamily: 'Jost-Regular',
                    marginBottom: 5,
                  }}>
                  Select followers to share as message
                </Text>
                <FlatList
                  // data={followers.filter(follower => follower.name.toLowerCase().includes(searchText.toLowerCase()))}
                  data={followers}
                  renderItem={renderFollower}
                  horizontal
                  keyExtractor={item => item.id.toString()}
                />

                {selectedFollowers?.length > 0 ? (
                  <View style={styles.shareButtonsContainer}>
                    <TouchableOpacity
                      onPress={closeShareModal}
                      style={styles.cancelButton}>
                      <Text style={styles.cancelButtonText}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => handleSendToFollowers()}
                      style={styles.sendButton}>
                      <Text style={styles.sendButtonText}>Send</Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <View style={styles.repostContainer}>
                    <TouchableOpacity
                      onPress={() => handleRepost()}
                      style={styles.shareIconButton}>
                      <Image
                        source={images.ArrowBendUpRight}
                        style={styles.commentUserImage}
                      />
                      <Text style={styles.shareIconText}>Repost</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.shareIconButton}>
                      <Image
                        source={images.LinkSimple}
                        style={styles.commentUserImage}
                      />
                      <Text style={styles.shareIconText}>Copy link</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.shareIconButton}>
                      <Image
                        source={images.Export}
                        style={styles.commentUserImage}
                      />
                      <Text style={styles.shareIconText}>Share to</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </Modal>
            {isLoading && (
              <View style={styles.loader}>
                <ActivityIndicator size="large" color="white" />
              </View>
            )}
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
    // backgroundColor:'red'
  },
  likeButton: {
    // zIndex: 1,
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
    minHeight:150,
    width: '100%',
    maxHeight: getHeight(1.4),
    // backgroundColor:'red'
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
    marginBottom: 5,
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
    marginRight: 10,
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
    borderTopLeftRadius: 10,
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
    backgroundColor: '#F4F4F4',
  },
  sendText: {
    color: 'blue',
    fontSize: 16,
    fontWeight: 'bold',
  },
  closeButton2: {
    margin: 10,
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
  shareContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontSize: 16,
    marginBottom: 10,
    color: 'black',
  },
  shareButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#3A7BD5',
    padding: 10,
    borderRadius: 25,
    alignItems: 'center',
    marginRight: 10,
  },
  cancelButtonText: {
    fontSize: 16,
    color: '#3A7BD5',
  },
  repostContainer: {
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  repostButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  repostButtonText: {
    fontSize: 16,
    color: 'white',
  },
  shareIconButton: {
    // flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 2,
    // backgroundColor:'red'
  },
  shareIconText: {
    fontFamily: 'Jost-Bold',
    fontSize: 13,
    color: 'black',
  },
  sendButton: {
    flex: 1,
    backgroundColor: '#3A7BD5',
    padding: 10,
    borderRadius: 25,
    alignItems: 'center',
    marginRight: 10,
  },
  sendButtonText: {
    fontSize: 16,
    color: 'white',
  },
  followerItem: {
    padding: 10,
    // borderWidth: 1,
    // borderColor: 'red',
    borderRadius: 10,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedFollowerItem: {
    backgroundColor: '#007BFF',
    borderColor: '#007BFF',
  },
  followerName: {
    color: 'black',
  },
  shareUserImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  sharetickImage: {
    width: 20,
    height: 20,
    // borderRadius: 20,
    // marginRight: 10,
  },
  loader: {
    ...StyleSheet.absoluteFillObject, // Covers the entire screen
    height: getHeight(1),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  slide: {
    // width: 400,
    // flex:1,
    height: 400,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'red'
  },
});

export default ListItem;
