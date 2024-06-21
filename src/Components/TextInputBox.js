import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TextInput, TouchableOpacity, Image } from 'react-native';
import Feather from 'react-native-vector-icons/FontAwesome';
import images from '../assets/Images';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const TextInputBox = (props) => {
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!isPasswordVisible);
  };

  return (
    <>
      <View style={[style.mainConatiner, { width: props?.width }]}>
        <Text style={{ color: props.titlecolour, marginLeft: 15, marginBottom: 5, fontSize: 15, fontFamily: 'Jost-Regular', marginTop: 10 }}>
          {props?.title}
        </Text>
        <View style={[style.manageAddressItem, { width: '100%', paddingBottom: 2 }]}>
          <View style={[style.mainView, props?.errorText != '' && style.errorInput, { minHeight: props.multiline ? windowHeight / 5 : 20, justifyContent: props.multiline ? 'flex-start' : 'center', borderColor: props.borderColor, backgroundColor: props.color }]}>
            <TextInput
              keyboardType={props?.isNumber ? 'numeric' : 'default'}
              multiline={props?.multiline}
              value={props?.value}
              editable={props.editable}
              secureTextEntry={props.isPassword && !isPasswordVisible}
              onChangeText={(text) => props?.onChangeText(text)}
              placeholderTextColor={props?.errorText == '' ? 'gray' : 'red'}
              placeholder={props?.errorText != '' ? props?.errorText : props?.placeholder}
              style={{ left: 20, width: props.isPassword ? '85%' : '90%', height: 43, minHeight: 20, top: props?.multiline && 10, paddingBottom: props?.multiline && 20, color: props?.valuecolor }}
            />
            {props.isPassword && (
              <TouchableOpacity style={style.eyeIcon} onPress={togglePasswordVisibility}>
                <Image source={isPasswordVisible ? images.eye : images.eyeslash} style={{ width: 20, height: 20 }} />
              </TouchableOpacity>
            )}
          </View>
          {props.errorText != '' && props.value != '' ? (
            <Text style={{ top: 5, left: 10, color: '#ff6666' }}>
              * {props?.errorText}
            </Text>
          ) : null}
        </View>
      </View>
    </>
  );
};

const style = StyleSheet.create({
  mainConatiner: {
    alignSelf: 'center',
    minHeight: windowHeight / 20,
  },
  mainView: {
    width: '100%',
    minHeight: 20,
    borderWidth: 1,
    alignSelf: 'center',
    flexDirection: 'row',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 6,
    borderRadius: 26,
  },
  manageAddressItem: {
    width: '50%',
  },
  TextInputTitle: {
    fontFamily: 'Jost-Regular',
    minHeight: windowHeight / 18,
    width: '90%',
    alignSelf: 'center',
    flexDirection: 'column',
    top: 10,
  },
  normal: {
    shadowColor: '#000',
  },
  errorInput: {
    shadowColor: 'transparent',
    borderWidth: 1,
    borderColor: '#ff6666',
  },
  eyeIcon: {
    position: 'absolute',
    right: 20,
    top: '50%',
    transform: [{ translateY: -10 }],
  },
});

export default TextInputBox;
