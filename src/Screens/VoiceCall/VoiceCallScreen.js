// Import React Hooks
import React, {useRef, useState, useEffect} from 'react';
// Import user interface elements
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
// Import components for obtaining Android device permissions
import {PermissionsAndroid, Platform} from 'react-native';
// Import Agora SDK
import {
  ClientRoleType,
  createAgoraRtcEngine,
  ChannelProfileType,
} from 'react-native-agora';
import {height, width} from '../../Theme/ConstantStyles';

// Define basic information
const appId = '2a501d37b13542aea209f6a418c0aa5f';
const token =
  '007eJxTYEhIY7gWw5ybKKOe2RVQ4GvYtFTLhW3zOr1vIbk3+dMkOhQYjBJNDQxTjM2TDI1NTYwSUxONDCzTzBJNDC2SDRITTdPq9malNQQyMmx5U8jACIUgPjdDSGpxiXNGYl5eag4DAwD2oB8Z';
const channelName = 'TestChannel';
const uid = 0; // Local user UID, no need to modify

const VoiceCallScreen = ({navigation}) => {
  const agoraEngineRef = useRef(null); // IRtcEngine instance
  const [isJoined, setIsJoined] = useState(false); // Whether the local user has joined the channel
  const [remoteUid, setRemoteUid] = useState(0); // Remote user UID
  const [message, setMessage] = useState(''); // User prompt message

  // Initialize the engine when starting the App
  useEffect(() => {
    setupVideoSDKEngine();
  }, []);

  const setupVideoSDKEngine = async () => {
    try {
      // Create RtcEngine after checking and obtaining device permissions
      if (Platform.OS === 'android') {
        await getPermission();
      }
      agoraEngineRef.current = createAgoraRtcEngine();
      const agoraEngine = agoraEngineRef.current;

      // Register event callbacks
      agoraEngine.registerEventHandler({
        onJoinChannelSuccess: () => {
          showMessage('Successfully joined the channel: ' + channelName);
          setIsJoined(true);
        },
        onUserJoined: (_connection, Uid) => {
          showMessage('Remote user ' + Uid + ' has joined');
          setRemoteUid(Uid);
        },
        onUserOffline: (_connection, Uid) => {
          showMessage('Remote user ' + Uid + ' has left the channel');
          setRemoteUid(0);
        },
      });
      // Initialize the engine
      agoraEngine.initialize({
        appId: appId,
      });
    } catch (e) {
      console.log(e);
    }
  };

  // Define the join method called after clicking the join channel button
  const join = async () => {
    if (isJoined) {
      return;
    }
    try {
      // Set the channel profile type to communication after joining the channel
      agoraEngineRef.current?.setChannelProfile(
        ChannelProfileType.ChannelProfileCommunication,
      );
      // Call the joinChannel method to join the channel
      agoraEngineRef.current?.joinChannel(token, channelName, uid, {
        // Set the user role to broadcaster
        clientRoleType: ClientRoleType.ClientRoleBroadcaster,
      });
    } catch (e) {
      console.log(e);
    }
  };

  // Define the leave method called after clicking the leave channel button
  const leave = () => {
    try {
      // Call the leaveChannel method to leave the channel
      agoraEngineRef.current?.leaveChannel();
      setRemoteUid(0);
      setIsJoined(false);
      showMessage('Left the channel');
      navigation.navigate('ChatScreen');
    } catch (e) {
      console.log(e);
    }
  };

  const getPermission = async () => {
    if (Platform.OS === 'android') {
      await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      ]);
    }
  };

  // Render the user interface
  return (
    <View style={styles.main}>
      <Text style={styles.head}>One vs One Call</Text>
      <View style={{height: 30}} />
      <View style={styles.joineContainer}>
        {/* <YouSVG /> */}
        {/* <RightArrowSVG /> */}
        {/* <ShryaSVG /> */}
      </View>
      <View style={{height: 30}} />

      {/* <View style={styles.iconContainer}>
        <YouSVG />
        <YouSVG />
      </View> */}
      <View>
        {isJoined && remoteUid !== 0 ? (
          // <Text>Local user UID: {uid}</Text>
          <Text style={styles.textStyle}> In Call With Shreya</Text>
        ) : (
          // <Text>Join a channel</Text>
          <Text style={styles.textStyle}>Waiting for Shreya to join</Text>
        )}
        {/* {isJoined && remoteUid !== 0 ? (
          // <Text>Remote user UID: {remoteUid}</Text>
          <Text style={styles.textStyle}> In Call With Shreya</Text>
        ) : (
          // <Text>Waiting for remote users to join</Text>
          // <Text style={styles.textStyle}>Waiting for Shreya to join</Text>
          <Text></Text>
        )} */}
        {/* <Text>{message}</Text> */}
      </View>
      <View style={{height: 30}} />

      <View style={styles.btnContainer}>
        <TouchableOpacity onPress={() => join()}>
          <Text style={styles.button}>Start Call</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => leave()}>
          <Text style={styles.button}>Leave Call</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  // Display message
  function showMessage(msg) {
    setMessage(msg);
  }
};

// Define user interface styles
const styles = StyleSheet.create({
  button: {
    width: width * 0.4,
    height: height * 0.05,
    fontWeight: 'bold',
    color: 'white',
    backgroundColor: '#BF5AE0',
    margin: 7,
    paddingHorizontal: 39,
    paddingVertical: 8,
    borderRadius: 15,
  },

  main: {flex: 1, alignItems: 'center', backgroundColor: '#10000E'},

  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 1,
    marginVertical: 40,
  },
  head: {fontSize: 20, color: 'white'},

  iconContainer: {
    height: height * 0.2,
    width: width * 1,
    backgroundColor: 'pink',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  joineContainer: {
    height: height * 0.14,
    minWidth: width * 0.9,
    marginTop: 80,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 30,
  },
  textStyle: {
    fontSize: 20,
    color: 'white',
    fontWeight: '600',
  },
});

export default VoiceCallScreen;
