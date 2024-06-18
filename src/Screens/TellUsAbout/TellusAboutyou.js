import React, { useState, useEffect } from 'react';
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
    Modal
} from 'react-native';
import TextInputBox from '../../Components/TextInputBox';
import CommonButton from '../../Components/CommonButton';
import { connect } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { setName, setDarkmode } from '../../redux/action';
import AsyncStorage from '@react-native-async-storage/async-storage';
import local from '../../Storage/Local';
import images from '../../assets/Images';
import { getHeight, getWidth } from '../../Theme/Constants';
import CountryPicker from '../../Components/CountryPicker';
import DatePicker from 'react-native-date-picker';

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

    const countries = [
        { id: 1, name: "India", code: "+91" },
        { id: 2, name: "Canada", code: "+786" },
        { id: 3, name: "United Kingdom", code: "+67" },
        { id: 4, name: "Australia", code: "+76" },
        { id: 5, name: "Germany", code: "+90" },
        { id: 6, name: "United States", code: "+1" },
    ];

    const genderdata = [
        { id: 1, name: "Male", code: "+91" },
        { id: 2, name: "Female", code: "+786" },
        { id: 2, name: "Other", code: "+786" },

    ];
    const statedata = [
        { id: 1, name: "kerala", code: "+91" },
        { id: 2, name: "Texas", code: "+786" },
        { id: 3, name: "Karnataka ", code: "+67" },
        { id: 4, name: "California", code: "+76" },
        { id: 5, name: "Germany", code: "+90" },
        { id: 6, name: "United States", code: "+1" },
    ];



    const handleSelectCountry = (id) => {
        console.log("Selected country ID:", id);
    };


    const showDatePicker = () => {
        setShowPicker(true);
    };

    const handleFieldPress = (field) => {
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
    }

    const handleOptionSelect = (option) => {
        setModalVisible(false);
        if (currentField === 'gender') {
            changegender(option);
        } else if (currentField === 'country') {
            changecountry(option);
        } else if (currentField === 'state') {
            changestate(option);
        }
    }

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
        } else if (email == '') {
            changecheckemail('Please enter Email id');
        } else if (!emailFormat.test(email)) {
            changecheckemail('Please enter a valid email address');
        } else if (phone == '') {
            changecheckphone('Please enter phone number');
        } else if (!phoneNumberRegex.test(phone)) {
            changecheckphone('Please enter a valid phone number (6-10 digits)');
        } else {
            navigation.replace('InterestSelection')
        }
    };

    const handleDateChange = (selectedDate) => {
        if (selectedDate) {
            const currentDate = selectedDate || new Date();
            const formattedDate = currentDate.toISOString().split('T')[0]; // Format the date as YYYY-MM-DD
            setDateOfBirth(formattedDate);
            changesetDateOfBirth('')
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
        <View style={styles.container}>
            <View style={styles.image}>
                <View style={{ width: getHeight(2.3), marginTop: 30, marginBottom: 40, }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image source={images.ArrowLeft} style={styles.arrowimg} />
                    </TouchableOpacity>
                    <Text style={styles.TileTxt}>{"Tell us about you"}</Text>
                    <Text style={styles.subTxt}>{"Enter your details"}</Text>
                </View>
                <TextInputBox
                    value={fullname}
                    titlecolour={'black'}
                    errorText={checkfullname}
                    onChangeText={text => {
                        changefullname(text);
                        changecheckfullname('')
                    }}
                    placeholder={'fullname'}
                    width={getWidth(1.2)}
                    title={'Fullname'}
                    color={'white'}
                />
                <TouchableOpacity onPress={showDatePicker} style={styles.datePickerContainer}>
                    <TextInputBox
                        value={dateOfBirth}
                        isNumber={false}
                        errorText={checkdateOfBirth}
                        titlecolour={'black'}
                        editable={false}
                        placeholder={'DD/MM/YY'}
                        width={windowWidth / 1.2}
                        title={'Date of Birth'}
                        color={'white'}
                    />
                </TouchableOpacity>
                <CountryPicker
                    title="Select your country"
                    countries={countries}
                    onSelectCountry={handleSelectCountry}
                />
                <CountryPicker
                    title="Select your country"
                    countries={genderdata}
                    onSelectCountry={handleSelectCountry}
                />
                <CountryPicker
                    title="Select your country"
                    countries={statedata}
                    onSelectCountry={handleSelectCountry}
                />
                {/* <TextInputBox
                    value={fullname}
                    titlecolour={'black'}
                    errorText={checkfullname}
                    onChangeText={text => {
                        changefullname(text);
                        changecheckfullname('')
                    }}
                    placeholder={'fullname'}
                    width={getHeight(2.3)}
                    title={'Fullname'}
                    color={'white'}
                />
                <TextInputBox
                    value={email}
                    titlecolour={'black'}
                    errorText={checkemail}
                    onChangeText={text => {
                        changeemail(text);
                        changecheckemail('')
                    }}
                    placeholder={'User Name'}
                    width={getHeight(2.3)}
                    title={'What’s your date of birth?'}
                />
                <TouchableOpacity onPress={() => handleFieldPress('gender')}>
                    <TextInputBox
                        value={gender}
                        titlecolour={'black'}
                        placeholder={'Select your gender'}
                        width={getHeight(2.3)}
                        title={'Select your gender'}
                        editable={false}
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleFieldPress('country')}>
                    <TextInputBox
                        value={country}
                        titlecolour={'black'}
                        placeholder={'Choose your Country'}
                        width={getHeight(2.3)}
                        title={'Choose your Country'}
                        editable={false}
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleFieldPress('state')}>
                    <TextInputBox
                        value={state}
                        titlecolour={'black'}
                        placeholder={'Choose your state'}
                        width={getHeight(2.3)}
                        title={'Choose your state'}
                        editable={false}
                    />
                </TouchableOpacity> */}

                <View style={{ justifyContent: 'flex-end', alignItems: 'baseline', height: getHeight(6.7) }}>
                    <CommonButton
                        // onPress={() => isvalidate()}
                        onPress={() => navigation.replace('InterestSelection')}
                        color={['black', 'black']}
                        title={'Continue'}
                        width={getHeight(2.3)}
                        texttitle={'#ffffff'}
                    />
                </View>
            </View>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        {modalData.map((item, index) => (
                            <TouchableOpacity key={index} onPress={() => handleOptionSelect(item)}>
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
                    maximumDate={new Date(new Date().setFullYear(new Date().getFullYear() - 18))}
                    onConfirm={handleDateChange}
                    onCancel={() => setShowPicker(false)}
                />
            )}
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white'
    },
    text: {
        color: 'white',
        fontSize: 42,
        lineHeight: 84,
        fontWeight: 'bold',
        textAlign: 'center',
        backgroundColor: '#000000c0',
    },
    TileTxt: {
        fontSize: 28,
        color: 'black',
        fontFamily: 'Jost',
        fontWeight: '700',
        paddingBottom: 2
    },
    subTxt: {
        fontSize: getHeight(50),
        color: 'black',
        width: getHeight(2.6),
        fontFamily: 'Jost',
        fontWeight: '300',
    },
    subTxt2: {
        fontSize: getHeight(50),
        color: 'white',
        textAlign: 'center',
        width: getHeight(2.6),
        fontFamily: 'Jost',
        fontWeight: '300',
        alignSelf: 'center',
    },
    optionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        marginRight: 10
    },
    radioButton: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: 'white',
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
        backgroundColor: 'white',
    },
    optionText: {
        fontSize: 16,
        color: 'white',
        marginLeft: 10,
    },
    arrowimg: {
        width: 30,
        height: 20,
        marginBottom: 10
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
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
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
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
    },
    datePickerContainer: {
        width: '100%',
    },
});
export default TellusAboutyou;
