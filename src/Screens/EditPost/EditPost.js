import {
  View,
  Text,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import Header from '../../Components/Header';
import {height, width} from '../../Theme/ConstantStyles';
import images from '../../assets/Images';
import CommonButton from '../../Components/CommonButton';
import {getWidth} from '../../Theme/Constants';

const EditPost = () => {
  const [text, setText] = useState('');

  return (
    <View style={styles.container}>
      <Header title="Edit Post" />
      <KeyboardAvoidingView>
        <View style={styles.textInputContainer}>
          <TextInput
            style={styles.inputStyle}
            onChangeText={setText}
            value={text}
            placeholder="Add Content"
            placeholderTextColor={'grey'}
            multiline={true}
          />
        </View>
        <View style={styles.locationContainer}>
          <View style={styles.row1}>
            <Image
              source={images.LocationArrow}
              style={{width: 25, height: 25}}
            />
            <Text style={styles.locationText}>Add Location</Text>
          </View>
          <Image source={images.PlusIcon} style={{width: 25, height: 25}} />
        </View>
        <View style={styles.locationContainer}>
          <View style={styles.row1}>
            <Image source={images.ImagePNG} style={{width: 25, height: 25}} />
            <Text style={styles.locationText}>Add Image</Text>
          </View>
          <Image source={images.PlusIcon} style={{width: 25, height: 25}} />
        </View>
        <View style={styles.buttonView}></View>
      </KeyboardAvoidingView>
      <CommonButton
        onPress={() => ''}
        color={['#3A7BD5', '#3A7BD5']}
        title={'Publish'}
        width={getWidth(1.1)}
        texttitle={'white'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textInputContainer: {
    minHeight: height * 0.1,
    width: width * 0.9,
    backgroundColor: 'white',
    alignSelf: 'center',
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    marginVertical: 10,
    alignItems: 'center',
  },
  locationContainer: {
    height: height * 0.06,
    width: width * 0.9,
    backgroundColor: 'white',
    alignSelf: 'center',
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inputStyle: {
    width: width * 0.84,
    minHeight: height * 0.05,
    color: 'black',
  },
  locationText: {
    color: 'black',
    fontSize: 15,
    fontWeight: '400',
    marginLeft: 10,
  },
  row1: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonView: {
    position: 'absolute',
    width: width * 1,
    bottom: 1,
  },
});

export default EditPost;
