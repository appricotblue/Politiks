import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Modal,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native';

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

const CountryPicker = props => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCountryCode, setSelectedCountryCode] = useState(null);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const selectCountry = country => {
    setSelectedCountryCode(country.name);
    setModalVisible(false);
    if (props.onSelectCountry) {
      props.onSelectCountry(country); // Pass the selected country ID to the parent component
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{props?.title}</Text>
      <TouchableOpacity onPress={toggleModal} style={styles.dropdownButton}>
        <Text style={styles.buttonText}>
          {selectedCountryCode ? selectedCountryCode : 'Select'}
        </Text>
        <Text style={styles.arrow}>▼</Text>
      </TouchableOpacity>
      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}>
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.modalOverlay} />
        </TouchableWithoutFeedback>
        <View style={styles.modalContent}>
          <FlatList
            data={props.countries}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() => selectCountry(item)}
                style={styles.item}>
                <Text style={styles.itemText}>{item.name}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // margin: 20,
    marginTop:3,
    height: height / 8.5,
    width: width / 1.18,
    // backgroundColor: 'red',
  },
  title: {
    fontFamily: 'Jost-Regular',
    color: 'black',
    marginLeft: 5,
    marginBottom: 5,
    fontSize: 15,
  },
  dropdownButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 9,
    borderWidth: 1,
    borderColor: '#271926',
    borderRadius: 30,
    minHeight: 45,
    marginBottom: 7,
  },
  buttonText: {
    fontFamily: 'Jost-Regular',
    fontSize: 16,
    color: 'black',
  },
  arrow: {
    fontSize: 16,
    color: 'black',
  },
  modalOverlay: {
    flex: 1,
    // backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    // margin: 20,
    padding: 20,
    minHeight: height * 0.2,
    width: width * 1,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    borderColor: 'black',
    borderWidth: 0.5,
  },
  item: {
    padding: 10,
  },
  itemText: {
    fontFamily: 'Jost-Regular',
    fontSize: 16,
    color: 'black',
  },
});

export default CountryPicker;
