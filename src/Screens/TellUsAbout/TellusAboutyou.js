import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  Dimensions,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  ImageBackground,
  Modal,
  Alert,
  ScrollView,
} from 'react-native';
import TextInputBox from '../../Components/TextInputBox';
import CommonButton from '../../Components/CommonButton';
import {connect} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {setName, setDarkmode} from '../../redux/action';
import AsyncStorage from '@react-native-async-storage/async-storage';
import local from '../../Storage/Local';
import images from '../../assets/Images';
import {getHeight, getWidth} from '../../Theme/Constants';
import CountryPicker from '../../Components/CountryPicker';
import DatePicker from 'react-native-date-picker';
import {CreateData, CheckuserAvailability} from '../../api';

var windowWidth = Dimensions.get('window').width; //full width
var windowHeight = Dimensions.get('window').height; //full height

const TellusAboutyou = props => {
  const navigation = useNavigation();
  const [email, changeemail] = useState('');
  const [checkemail, changecheckemail] = useState('');
  const [fullname, changefullname] = useState('');
  const [checkfullname, changecheckfullname] = useState('');
  const [phone, changephone] = useState('');
  const [checkphone, changecheckphone] = useState('');
  const [gender, changegender] = useState('');
  const [country, changecountry] = useState('');
  const [state, changestate] = useState('');
  const [password, changepassword] = useState('');
  const [isLogin, changeIsLogin] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState([]);
  const [currentField, setCurrentField] = useState('');
  const [selectedCountryId, setSelectedCountryId] = useState(null);
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [checkdateOfBirth, changesetDateOfBirth] = useState('');
  const [showPicker, setShowPicker] = useState(false);
  const [selectedOption, setSelectedOption] = useState('Follower');
  const [userid, setuserid] = useState('');
  const [usernameAvailable, setUsernameAvailable] = useState(null);
  const [usernameMessage, setUsernameMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false); 

  const handleSelectOption = option => {
    setSelectedOption(option);
    // You can store the selected value in state or pass it to a function to store it elsewhere
    console.log('Selected Option:', option);
  };
  const countries = [
    {id: 1, name: 'India', code: '+91'},
    {id: 2, name: 'Canada', code: '+786'},
    {id: 3, name: 'United Kingdom', code: '+67'},
    {id: 4, name: 'Australia', code: '+76'},
    {id: 5, name: 'Germany', code: '+90'},
    {id: 6, name: 'United States', code: '+1'},
  ];

  const genderdata = [
    {id: 1, name: 'Male', code: '+91'},
    {id: 2, name: 'Female', code: '+786'},
    {id: 3, name: 'Other', code: '+786'},
  ];
  const statedata = [
    {id: 1, name: 'kerala', code: '+91'},
    {id: 2, name: 'Texas', code: '+786'},
    {id: 3, name: 'Karnataka ', code: '+67'},
    {id: 4, name: 'California', code: '+76'},
    {id: 5, name: 'Germany', code: '+90'},
    {id: 6, name: 'United States', code: '+1'},
  ];

  const getuser = async () => {
    const userId = await local.getUserId();
    console.log(userId, 'leaderdata he');
    setuserid(userId);
  };

  useEffect(() => {
    getuser();
  }, []);

  const handleSelectCountry = item => {
    console.log('Selected country ID:', item.name);
    changecountry(item.name);
  };
  const handleSelectgender = item => {
    console.log('Selected country ID:', item.name);
    changegender(item.name);
  };
  const handleSelecstate = item => {
    console.log('Selected country ID:', item.name);
    changestate(item.name);
  };

  const handleFullnameChange = async text => {
    changefullname(text);
    changecheckfullname('');
    try {
      const response = await CheckuserAvailability(text);
      console.log(response);
      if (response.message === 'User name is available.') {
        setUsernameAvailable(true);
        setUsernameMessage('Username is available.');
      } else {
        setUsernameAvailable(false);
        setUsernameMessage('Username is already taken.');
      }
    } catch (error) {
      setUsernameAvailable(false);
      console.error('Error checking username availability:', error);
      setUsernameMessage('username not availabile');
    }
  };

  const showDatePicker = () => {
    setShowPicker(true);
  };

  const handleFieldPress = field => {
    let data = [];
    if (field === 'gender') {
      data = ['Male', 'Female', 'Other'];
    } else if (field === 'country') {
      data = ['USA', 'Canada', 'UK', 'India']; // Replace with your actual data
    } else if (field === 'state') {
      data = ['California', 'Texas', 'New York']; // Replace with your actual data
    }
    setModalData(data);
    setCurrentField(field);
    setModalVisible(true);
  };

  const handleOptionSelect = option => {
    setModalVisible(false);
    if (currentField === 'gender') {
      changegender(option);
    } else if (currentField === 'country') {
      changecountry(option);
    } else if (currentField === 'state') {
      changestate(option);
    }
  };

  // const handleSelectCountry = (countryId) => {
  //     setSelectedCountryId(countryId);
  // };

  const getEmail = async () => {
    try {
      const value = await AsyncStorage.getItem('email');
      if (value !== null) {
        changeemail(value);
      }
      const password = await AsyncStorage.getItem('password');
      if (password !== null) {
        changepassword(password);
      }
    } catch (e) {
      return null;
    }
  };

  const isvalidate = async () => {
    const emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneNumberRegex = /^\d{6,10}$/;

    if (fullname == '') {
      changecheckfullname('Please enter full name ');
    } else if (selectedOption == '') {
      Alert.alert('Please select Follower or Leader');
    } else if (dateOfBirth == '') {
      Alert.alert('Please enter  date of birth');
    } else if (country == '') {
      Alert.alert('Please select country');
    } else if (state == '') {
      Alert.alert('Please select state');
    } else if (gender == '') {
      Alert.alert('Please select gender');
    } else if (usernameAvailable != true) {
      Alert.alert('Please select  available user name to continue');
    }
    else {
      // navigation.replace('InterestSelection')
      handledataRegister();
    }
  };
  const handledataRegister = async () => {
    try {
      setIsLoading(true);
      const response = await CreateData(
        fullname,
        selectedOption,
        dateOfBirth,
        'Male',
        'India',
        'Kerala',
        userid,
      );
      console.log(response, 'login api response');
      setIsLoading(false);
      if ((response.message = 'User details created successfully')) {
        await local.storLeader('isleader', selectedOption);

        navigation.replace('InterestSelection');
      } else {
        console.log('Error during login:');
      }
    } catch (error) {
      setIsLoading(false);
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

  const handleDateChange = selectedDate => {
    if (selectedDate) {
      const currentDate = selectedDate || new Date();
      const formattedDate = currentDate.toISOString().split('T')[0]; // Format the date as YYYY-MM-DD
      setDateOfBirth(formattedDate);
      changesetDateOfBirth('');
      setShowPicker(false); // Hide the date picker after selection
    }
  };
  const clearAll = async () => {
    changeemail('');
    changepassword('');
  };

  useEffect(() => {
    AsyncStorage.getItem('isLogin', value => {
      if (value != null || value != undefined) {
        navigation.reset('Home');
      } else {
        changeIsLogin(false);
      }
    });
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      changeemail('');
      changepassword('');
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.image}>
        <View style={{ width: getHeight(2.3), marginTop: 0, marginBottom: 20 }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={images.ArrowLeft} style={styles.arrowimg} />
          </TouchableOpacity>
          <Text style={styles.TileTxt}>{'Tell us about you'}</Text>
          <Text style={styles.subTxt}>{'This will help us to serve you better'}</Text>
        </View>
        <TextInputBox
          value={fullname}
          titlecolour={'black'}
          valuecolor={'black'}
          errorText={checkfullname}
          onChangeText={handleFullnameChange}
          // onChangeText={text => {
          //     changefullname(text);
          //     changecheckfullname('')
          // }}
          placeholder={'fullname'}
          width={getWidth(1.2)}
          title={'Choose your unique username'}
          color={'white'}
        />
        {usernameMessage !== '' && (
          <Text
            style={[
              styles.usernameMessage,
              {color: usernameAvailable ? 'green' : 'red'},
            ]}>
            {usernameMessage}
          </Text>
        )}
        <View style={{width: getWidth(1.4), marginBottom: 0, marginTop: 7}}>
          <Text style={styles.subTxt}>
            {'I am a (select why are you here)'}
          </Text>
          <View style={{ flexDirection: 'row', marginTop: 10, marginLeft: 5, }}>
            <View style={styles.optionContainer}>
              <TouchableOpacity
                style={[
                  styles.radioButton,
                  selectedOption === 'Follower' && styles.selectedOption,
                ]}
                onPress={() => handleSelectOption('Follower')}>
                <View
                  style={
                    selectedOption === 'Follower' && styles.innerRadioButton
                  }
                />
              </TouchableOpacity>
              <Text style={styles.optionText}>Follower</Text>
            </View>
            <View style={styles.optionContainer}>
              <TouchableOpacity
                style={[
                  styles.radioButton,
                  selectedOption === 'Leader' && styles.selectedOption,
                ]}
                onPress={() => handleSelectOption('Leader')}>
                <View
                  style={selectedOption === 'Leader' && styles.innerRadioButton}
                />
              </TouchableOpacity>
              <Text style={styles.optionText}>Leader</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity
          onPress={showDatePicker}
          style={styles.datePickerContainer}>
          <TextInputBox
            value={dateOfBirth}
            isNumber={false}
            valuecolor={'black'}
            errorText={checkdateOfBirth}
            titlecolour={'black'}
            editable={false}
            placeholder={'DD/MM/YY'}
            width={windowWidth / 1.2}
            title={'What’s your date of birth?'}
            color={'white'}
          />
        </TouchableOpacity>
        <CountryPicker
          title="Select your gender"
          countries={genderdata}
          onSelectCountry={handleSelectgender}
        />
        <CountryPicker
          title="Select your country"
          countries={countries}
          onSelectCountry={handleSelectCountry}
        />

        <CountryPicker
          title="Select your state"
          countries={statedata}
          onSelectCountry={handleSelecstate}
        />

        <View
          style={{
            justifyContent: 'flex-end',
            alignItems: 'baseline',
            height: getHeight(7.7),
          }}>
          <CommonButton
            onPress={() => isvalidate()}
            color={['black', 'black']}
            title={'Continue'}
            width={getHeight(2.3)}
            texttitle={'#ffffff'}
          />
        </View>
      </View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButtonText}>X</Text>
            </TouchableOpacity>
            {modalData.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleOptionSelect(item)}>
                <Text style={styles.modalText}>{item}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {showPicker && (
        <DatePicker
          modal
          open={showPicker}
          date={new Date()}
          mode="date"
          maximumDate={
            new Date(new Date().setFullYear(new Date().getFullYear() - 18))
          }
          onConfirm={handleDateChange}
          onCancel={() => setShowPicker(false)}
        />
      )}
      {isLoading && (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="white" />
        </View>
      )}
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  TileTxt: {
    fontFamily:'Jost-Bold',
    fontSize: 28,
    color: 'black',
  
    // fontWeight: '700',
    paddingBottom: 2,
  },
  subTxt: {
    fontFamily: 'Jost-Regular',
    fontSize: 16,
    color: 'black',
    width: getHeight(2.6),
   
   
  },
  optionContainer: {
    flexDirection: 'row',
    // alignItems: 'center',
    marginBottom: 10,
    marginRight: 10,
    // backgroundColor: 'red'
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedOption: {
    backgroundColor: 'blue',
  },
  innerRadioButton: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: 'black',
  },
  optionText: {
    fontSize: 16,
    color: 'black',
    marginLeft: 10,
  },
  arrowimg: {
    width: 30,
    height: 20,
    marginBottom: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalView: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#000',
    borderRadius: 20,
    padding: 10,
  },
  closeButtonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 10,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontWeight: '800',
  },
  datePickerContainer: {
    width: '100%',
  },
  usernameMessage: {
    fontSize: 14,

    marginTop: 5,
  },
  loader: {
    ...StyleSheet.absoluteFillObject, // Covers the entire screen
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
});

export default TellusAboutyou;
