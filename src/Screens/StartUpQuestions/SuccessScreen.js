import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import CommonButton from '../../Components/CommonButton';
import { useNavigation } from '@react-navigation/native';
import images from '../../assets/Images';
import { getHeight } from '../../Theme/Constants';

const SuccessScreen = props => {
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
                <Image
                    style={styles.logo}
                    source={images.Faniverse_logo}
                />
                <Text style={styles.title}>All Set!</Text>
                <Text style={styles.subTitle}>
                    You are all set to explore Fan Island.
                    Enjoy the thrilling and fascinating experience.
                </Text>
            </View>
            <View style={styles.buttonContainer}>
                <CommonButton
                    onPress={() => navigation.replace('Home')}
                    color={['#8360C3', '#2EBF91']}
                    title={'Take Me In'}
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
        color: '#8360C3',
        fontFamily:'Jost',
        fontWeight:'700',
        marginBottom: 10
    },
    subTitle: {
        fontSize: 16,
        color: 'black',
        textAlign: 'center',
        marginHorizontal: 20,
        fontFamily:'Jost',
        fontWeight:'400',
    },
    buttonContainer: {
        marginBottom: 20
    }
});

export default SuccessScreen;
