import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Image
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height
import images from '../assets/Images';

const CommonButton = props => {
  const buttonColors = props?.color ? props?.color : ['blue'];
  return (
    <TouchableOpacity
      // style={[styles.saveButton, {backgroundColor: props?.color}]}
      onPress={() => props?.onPress()}>
        <LinearGradient   start={{x: 0, y: 0.5}} 
        end={{x: 1, y: 0.5}} colors={buttonColors} style={[styles.saveButton, { width: props?.width }]}>
        {props.icon &&
          <Image source={props.icon} style={styles.avatar} />
        }
        <Text style={{ fontWeight: 'bold', color: props?.texttitle, justifyContent: 'center', alignItems: 'center', fontSize: 16 }}>
        {props?.title}
      </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({

  saveButton: {
    fontFamily: 'Jost-Bold',
    flexDirection:'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    height: 44,
    borderRadius: 26,
    marginTop: height / 50,
    marginBottom: height / 50,

    // fontWeight:'500'
  },
  avatar: {
    width: 18,
    height: 21,
    marginRight:5
  // borderRadius:45
  },
});
export default CommonButton;
