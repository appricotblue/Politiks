import React, {useState} from 'react';
import {
  View,
  TouchableOpacity,
  Modal,
  Image,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native';
import images from '../assets/Images';
import {useNavigation} from '@react-navigation/native';
const windowWidth = Dimensions.get('window').width;

const Footer = ({title}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [footer, setFooter] = useState('');
  const numSegments = 8; // Number of segments
  const segmentAngle = 360 / numSegments;
  const navigation = useNavigation();

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={() => {
          setFooter('home'), navigation.navigate('Home');
        }}>
        <Image
          source={title === 'home' ? images.HomeFilled : images.Home}
          style={styles.icon}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={() => {
          // setFooter('reel'), navigation.navigate('Reels');
        }}>
        <Image
          source={title === 'reel' ? images.ReelFilled : images.Reel}
          style={styles.icon}
        />
      </TouchableOpacity>
      <View style={styles.centralIconContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('EditPost')}>
          <Image
            source={title === 'faniverse' ? images.AppIcon : images.AppIcon}
            style={styles.centralIcon}
          />
        </TouchableOpacity>
        <View style={styles.curve}></View>
      </View>
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={() => {
          // setFooter('trophy'), navigation.navigate('Contests');
        }}>
        <Image
          source={title === 'trophy' ? images.TrophyFilled : images.Tropy}
          style={styles.icon}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={() => {
          // setFooter('contest'), navigation.navigate('Notifications');
        }}>
        <Image
          source={title === 'contest' ? images.ContestFilled : images.Contest}
          style={styles.icon}
        />
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={toggleModal}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {/* <View style={{height:110,width:180,backgroundColor:'#8360C3',borderTopLeftRadius:80,borderTopRightRadius:80,justifyContent:'flex-end',alignItems:'center'}}>
            <View style={{height:50,width:80,backgroundColor: 'rgba(0, 0, 0, 0.5)',borderTopLeftRadius:50,borderTopRightRadius:50}}>
              </View>
              </View> */}
            {/* <View style={{height:110,width:180,backgroundColor:'#8360C3',borderTopLeftRadius:80,borderTopRightRadius:80,justifyContent:'flex-end',alignItems:'center'}}> */}
            {/* <View style={{height:50,width:80,backgroundColor: 'rgba(0, 0, 0, 0.5)',borderTopLeftRadius:50,borderTopRightRadius:50}}> */}
            {/* </View> */}
            {/* </View> */}
            <TouchableOpacity onPress={toggleModal}>
              <Text>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingVertical: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: 60,
  },
  iconContainer: {
    alignItems: 'center',
  },
  icon: {
    width: 40,
    height: 40,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  centralIconContainer: {
    position: 'relative',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    bottom: 38,
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 45,
    overflow: 'hidden',
  },
  centralIcon: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  curve: {
    position: 'absolute',
    top: -10,
    left: '50%',
    width: 100,
    height: 20,
    backgroundColor: 'trasparant',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    transform: [{translateX: -50}],
  },
});

export default Footer;
