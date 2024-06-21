import React, { useEffect } from 'react';
import { View, Image, StyleSheet, ImageBackground, Text } from 'react-native';
import images from '../../assets/Images';
import { getHeight, getWidth } from '../../Theme/Constants';
import CommonButton from '../../Components/CommonButton';

const GetStarted = ({ navigation }) => {
    useEffect(() => {
        // const timer = setTimeout(() => {
        //   navigation.replace('WelcomeScreen'); // Replace 'LoginScreen' with the actual name of your login screen
        // }, 2000); // Adjust the time (in milliseconds) as needed

        // return () => clearTimeout(timer);
    }, [navigation]);

    return (
        <View style={styles.container}>
            <ImageBackground source={images.Welcome_3} resizeMode="cover" style={styles.image}>
                <View style={styles.bottomContainer}>
                <Text style={styles.TileTxt}>{"Enter the Ultimate Fans Universe"}</Text>
                <Text style={styles.subTxt}>{"Dui nunc vel lorem ultrices arcu eu. Nibh mi porta fringilla congue massa."}</Text>

                <CommonButton
                    onPress={() => navigation.replace('LoginScreen')}
                    color={['#8360C3', '#2EBF91']}
                    title={'Login'}
                    width={getHeight(2.5)}
                    texttitle={'white'}
                />
                <CommonButton
                    onPress={() => navigation.replace('SignUpScreen')}
                    color={['#ffffff', '#ffffff']}
                    title={'Signup'}
                    width={getHeight(2.5)}
                    texttitle={'black'}
                />
                </View>
             
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        flex: 1,
        justifyContent: 'flex-end',
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
        fontFamily: 'Jost-Bold',
        fontSize: getHeight(40),
        color: 'white',
        
        fontWeight:'700',
        paddingBottom:10,
        alignSelf:'center',
        marginTop:15,
        fontSize:24
        
    },
    subTxt: {
        fontFamily: 'Jost-Bold',
        fontSize: getHeight(60),
        color: 'white',
        textAlign: 'center',
        width:getHeight(2.6),
        alignSelf:'center',
        
    fontWeight:'300'
    },
    bottomContainer: {
        height:250,
        position: 'absolute',
        bottom: 0,
        width: '100%',
       
        alignSelf: 'center',
        backgroundColor:'rgba(0, 0, 0, 0.5)'
      },
});

export default GetStarted;
