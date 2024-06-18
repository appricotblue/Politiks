import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import CommonButton from '../../Components/CommonButton';
import { useNavigation } from '@react-navigation/native';
import images from '../../assets/Images';
import { getHeight } from '../../Theme/Constants';
import LottieView from 'lottie-react-native';
import FastImage from 'react-native-fast-image';


const PendingScreen = props => {
    const navigation = useNavigation();

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            // Reset any necessary state
        });

        return unsubscribe;
    }, [navigation]);

    return (
        <View style={styles.container}>
            <View style={styles.contentContainer}>


                <FastImage
                    // source={require('../../assets/flightup.gif')} // replace with your gif path
                    source={images.pending} // replace with your gif path
                    style={styles.lottie}
                    resizeMode={FastImage.resizeMode.contain}
                />

                <Text style={styles.title}>Request Pending</Text>
                <Text style={styles.subTitle}>
                    We have received your request for leader profile. We will notify you when verification is completed. Till then you can use Politiks as a normal user.
                </Text>
            </View>
            <View style={styles.buttonContainer}>
                <CommonButton
                    onPress={() => navigation.replace('Home')}
                    color={['black', 'black']}
                    title={'Go to Home'}
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
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    logo: {
        width: 50,
        height: 50,
        marginBottom: 10
    },
    title: {
        fontSize: 28,
        color: 'black',
        fontFamily: 'Jost',
        fontWeight: '700',
        marginBottom: 10
    },
    subTitle: {
        fontSize: 16,
        color: 'black',
        textAlign: 'center',
        marginHorizontal: 20,
        fontFamily: 'Jost',
        fontWeight: '400',
    },
    buttonContainer: {
        marginBottom: 20
    },
    lottie: {
        width: 160,
        height: 200,
        // backgroundColor: 'red'
    },
});

export default PendingScreen;
