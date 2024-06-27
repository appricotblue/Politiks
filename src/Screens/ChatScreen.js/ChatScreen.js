import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {height, width} from '../../Theme/ConstantStyles';
import images from '../../assets/Images';
import AgoraUIKit from 'agora-rn-uikit';

const ChatScreen = ({navigation}) => {
  const [videoCall, setVideoCall] = useState(false);

  const connectionData = {
    appId: '834d9260395243e982c0df386e8284d8',
    channel: 'test',
  };
  const rtcCallbacks = {
    EndCall: () => setVideoCall(false),
  };

  return videoCall === false ? (
    <View style={styles.container}>
      <View style={styles.chatHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={images.LeftBackPNG}
            style={{width: 32, height: 32, marginRight: 15}}
          />
        </TouchableOpacity>

        <View
          style={{
            width: width * 0.14,
            marginLeft: -10,
          }}>
          <Image source={images.Welcome_1} style={styles.itemImage} />
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameText}>Alex Linderson</Text>
          <Text style={styles.activeText}>Active</Text>
        </View>
        <View style={styles.callContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('VoiceCall')}>
            <Image source={images.AudioCall} style={{width: 27, height: 27}} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setVideoCall(true)}>
            <Image source={images.VideoCall} style={{width: 27, height: 27}} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: 10,
              height: 25,
              justifyContent: 'center',
              alignItems: 'center',
              marginLeft: 8,
            }}>
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
      </View>
    </View>
  ) : (
    <AgoraUIKit connectionData={connectionData} rtcCallbacks={rtcCallbacks} />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  chatHeader: {
    height: height * 0.07,
    width: width * 0.95,
    alignSelf: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  itemImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  nameText: {
    fontFamily: 'Jost-Regular',
    fontSize: 15,
    fontWeight: '700',
    color: 'black',
  },
  activeText: {
    fontFamily: 'Jost-Regular',
    fontSize: 12,
    color: 'grey',
  },
  nameContainer: {
    marginLeft: 5,
    width: width * 0.4,
    height: height * 0.05,
  },
  callContainer: {
    width: width * 0.29,
    height: height * 0.05,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

export default ChatScreen;
