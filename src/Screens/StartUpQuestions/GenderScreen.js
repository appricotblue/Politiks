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
    ImageBackground
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
import GradientText from '../../Components/GradientText';

var windowWidth = Dimensions.get('window').width; //full width
var windowHeight = Dimensions.get('window').height; //full height

const GenderScreen = props => {
    const navigation = useNavigation();
    const [email, changeemail] = useState('');
    const [fullname, changefullname] = useState('');
    const [error, changeerror] = useState('');
    const [password, changepassword] = useState('');
    const [isLogin, changeIsLogin] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);

    const handleSelectOption = (option) => {
        setSelectedOption(option);
        // You can store the selected value in state or pass it to a function to store it elsewhere
        console.log('Selected Option:', option);
    }
    const getEmail = async () => {
        try {
            const value = await AsyncStorage.getItem('email');
            if (value !== null) {
                changeemail(value);
            }
            const paasword = await AsyncStorage.getItem('password');
            if (paasword !== null) {
                changepassword(paasword);
            }
        } catch (e) {
            return null;
            // error reading value
        }
    };

    const isvalidate = async () => {
        if (selectedOption == null) {
            // alert('Please select gender to continue');
            changeerror('*Please select gender to continue')
        } else {
            navigation.replace('DOBScreen')
            // navigation.navigate('Home');
            // local.storeLogin(true);
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
            //Put your Data loading function here instead of my loadData()
        });

        return unsubscribe;
    }, [navigation]);



    return (
        <View style={styles.container}>
          
                <View style={{ width: getHeight(2.3), marginTop: 30, marginBottom: 40,justifyContent:'center',alignItems:'center'}}>
                    <Image
                        style={{ width: 50, height: 50, marginBottom: 5 }}
                        source={images.Faniverse_logo}
                    />
                    <Text style={styles.TileTxt}>Welcome to  Fan Island </Text>
       

                    <Text style={styles.subTxt}>{"To make your feed optimized, Please select most appropriate options"}</Text>
                </View>

                <View style={{ width: getHeight(2.3) }}>
                <Text style={styles.gentertxt}>Select Your Gender</Text>
                   
                    <View style={{  marginTop: 10,justifyContent:'center',alignItems:'center'}}>
                        <View style={styles.optionContainer}>
                            <TouchableOpacity
                                style={[
                                    styles.radioButton,{borderColor: error == '' ?'#2EBF91':'#ff6666',},
                                    selectedOption === 'Male' && styles.selectedOption
                                ]}
                                onPress={() => {handleSelectOption('Male'),changeerror('')}}>
                                <Text style={[styles.optionText,{ color:  selectedOption === 'Male' ? 'white' : 'black'}]}>Male</Text>
                            </TouchableOpacity>
                           
                        </View>
                        <View style={styles.optionContainer}>
                            <TouchableOpacity
                                style={[
                                    styles.radioButton,{borderColor: error == '' ?'#2EBF91':'#ff6666',},
                                    selectedOption === 'Female' && styles.selectedOption
                                ]}
                                onPress={() => {handleSelectOption('Female'),changeerror('')}}>
                               <Text style={[styles.optionText,{ color:  selectedOption === 'Female' ? 'white' : 'black'}]}>Female</Text>
                            </TouchableOpacity>
                          
                        </View>
                        <View style={styles.optionContainer}>
                            <TouchableOpacity
                                style={[
                                    styles.radioButton,{borderColor: error == '' ?'#2EBF91':'#ff6666',},
                                    selectedOption === 'Others' && styles.selectedOption
                                ]}
                                onPress={() => {handleSelectOption('Others'),changeerror('')}}>
                               <Text style={[styles.optionText,{ color:  selectedOption === 'Others' ? 'white' : 'black'}]}>Others</Text>
                            </TouchableOpacity>
                           
                        </View>
                     
                    </View>




                </View>
           <Text style={{color:'#ff6666'}}> {error}</Text>
              <View style={{ justifyContent: 'flex-end', alignItems: 'baseline', height: getHeight(5) }}>
                  
                    <CommonButton
                        // onPress={() => navigation.replace('DOBScreen')}
                        onPress={() => isvalidate()}
                        color={['#8360C3', '#2EBF91']}
                        title={'Next'}
                        width={getHeight(2.3)}
                        texttitle={'white'}
                    />

                </View>

         
        </View>

    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'white',
        alignItems: 'center',
    },
    image: {
        flex: 1,
        // justifyContent: 'flex-end',
        alignItems: 'center',


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
       color:'#8360C3',
        fontFamily: 'Jost-Bold',
       fontWeight:'700',
        paddingBottom: 5

    },
    subTxt: {
        fontSize:16,
        color: 'black',
        textAlign: 'center',
        width: getHeight(2.6),
        fontFamily: 'Jost-Bold',
        fontWeight:'300',
    },
    optionContainer: {
     
        alignItems: 'center',
        marginBottom: 10,
      
    },
    radioButton: {
        width: 160,
        height: 60,
        borderRadius: 70,
        borderWidth: 2,
        
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:24,
    },
    selectedOption: {
        backgroundColor: '#2EBF91'
       
    },
    innerRadioButton: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: 'white',
    },
    optionText: {
        fontSize: 16,
        fontFamily: 'Jost-Bold',
        fontWeight:'300',
       
      
    },
    gentertxt:{
        fontSize: 20,
        color:'black',
        
         paddingBottom: 5,
         alignSelf:'center',
         marginBottom:10,
        fontFamily: 'Jost-Bold',
    fontWeight:'700',
    }
});
export default GenderScreen;

