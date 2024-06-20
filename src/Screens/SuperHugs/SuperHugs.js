import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, FlatList, StyleSheet, SafeAreaView, ImageBackground, ScrollView } from 'react-native';
import images from '../../assets/Images';
import { getHeight, getWidth } from '../../Theme/Constants';
import DiscoverItems from '../../Components/DiscoverItems';
import LinearGradient from 'react-native-linear-gradient';
import Header from '../../Components/Header';
import { useNavigation } from '@react-navigation/native';

const SuperHugs = () => {
    const navigation = useNavigation();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedTab, setSelectedTab] = useState(0); // 0 for images tab, 1 for items tab

    const imageData = [
        { id: 1, imageUrl: images.Welcome_1 },
        { id: 2, imageUrl: images.Welcome_2 },
        { id: 3, imageUrl: images.Welcome_3 },
        { id: 4, imageUrl: images.ViratBanner },
        { id: 5, imageUrl: images.Welcome_3 },
        { id: 6, imageUrl: images.Welcome_2 },
        // Add more image objects as needed
    ];


    const data = [
        { id: '1', title: 'Virat Kohli', imageUrl: images.ViratProfile },
        { id: '2', title: 'Virat Kohli', imageUrl: images.Welcome_2 },
        { id: '3', title: 'Item 3', imageUrl: images.Welcome_3 },
        { id: '4', title: 'Item 4', imageUrl: images.Welcome_1 },
        { id: '5', title: 'Item 5', imageUrl: images.Welcome_2 },
        { id: '6', title: 'Item 6', imageUrl: images.Welcome_3 },
        { id: '7', title: 'Item 7', imageUrl: images.Welcome_3 },
        // Add more items as needed
    ];
    const handleTabPress = (tabIndex) => {
        setSelectedTab(tabIndex);
    };
    function chunkArray(array, chunkSize) {
        const chunks = [];
        for (let i = 0; i < array.length; i += chunkSize) {
            chunks.push(array.slice(i, i + chunkSize));
        }
        return chunks;
    }
    const renderImageItem = ({ item }) => (
        <View style={{ width: '33%', padding: 0 }}>
            <Image source={item.imageUrl} style={{ width: '100%', height: 120 }} />
        </View>
    );

    const renderItem = ({ item, index }) => (
        <View style={[styles.tab, { width: index === 0 ? getWidth(2.5) : getWidth(2.5) }]}>
            <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', borderRadius: 15 }}>
               <View style={{ flexDirection: 'column', height: 60, marginBottom: 10, marginTop: 15 }}>
                    <TouchableOpacity style={{ width: 80, borderRadius: 10, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginRight: 3 }} onPress={() => navigation.navigate('DiscoverTrends')}>
                        <Text style={{ fontFamily: 'Jost', fontWeight: '500', color: '#6F76B7', fontSize: 22, marginRight: 5 }}>Get</Text>
                        <Image
                            style={{ width: 15, height: 18, marginRight: 6 }}
                            source={images.Pinkhug}                       />
                        <Text style={{ fontFamily: 'Jost', fontWeight: '400', color: '#6F76B7', fontSize: 22, marginRight: 2 }}>120</Text>
                   </TouchableOpacity>
                    <TouchableOpacity style={{ width: 80, borderRadius: 10, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }} onPress={() => navigation.navigate('DiscoverTrends')}>

                        <Text style={{ fontFamily: 'Jost', fontWeight: '400', color: 'black', fontSize: 12, marginRight: 3 }}>for</Text>
                        <Text style={{ fontFamily: 'Jost', fontWeight: '600', color: 'black', fontSize: 20 }}>₹80</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={{ flex: 1, }}>
            <Header title="Super Hugs" />
           <ScrollView contentContainerStyle={styles.container}>
             {/* <Image source={images.ProfileBanner} style={{ width: '100%', height: 150 }} /> */}
                <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', width: getWidth(2), marginTop: 30, height: 80, borderRadius: 15 }}>
                    <Text style={styles.activeTabText}>Hugs Balance </Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <Image
                            style={{ width: 13, height: 16, marginRight: 5 }}
                            source={images.Pinkhug}
                        />
                        <Text style={styles.activeTabText}>24 </Text>
                    </View>
               </View>
                <View style={{ width: getWidth(1), paddingLeft: 30 }}>
                    <Text style={styles.activeTabText}>Redeem</Text>
                </View>
                <View style={{ width: '90%', marginTop: 30, justifyContent: 'center', alignItems: 'center', marginBottom: 30, backgroundColor: 'white', borderRadius: 15 }}>
                    <Text style={styles.tabText}>Convert your Points to Hugs</Text>
                    <View style={{ flexDirection: 'row', marginBottom: 10, marginTop: 10 }}>
                        <View style={styles.viewtxt}>
                            <Text style={{ fontSize: 10 }}>Your Point Balance</Text>
                            <Text style={styles.activeTabText}>3546 </Text>
                        </View>
                        <View style={{ width: 30, height: 60, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={styles.activeTabText}>==</Text>

                        </View>
                        <View style={styles.viewtxt}>
                            <Text style={{ fontSize: 10 }}>Hugs</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                <Image
                                    style={{ width: 13, height: 16, marginRight: 5 }}
                                    source={images.Pinkhug}
                                />
                                <Text style={styles.activeTabText}>24 </Text>
                            </View>

                        </View>
                        <TouchableOpacity style={{ width: '30%', height: 40, justifyContent: 'center', alignItems: 'center', borderRadius: 15, marginTop: 10, flexDirection: 'row' }}
                        >
                            <LinearGradient
                                colors={['#8360C3', '#2EBF91']}
                                style={{ width: '100%', height: 40, justifyContent: 'center', alignItems: 'center', borderRadius: 15, marginTop: 10, flexDirection: 'row' }}
                                start={{ x: 0, y: 0.5 }}
                                end={{ x: 1, y: 0.5 }}
                            >
                                <Text style={{ fontSize: 15, color: 'white' }}>Redeem Now</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ width: getWidth(1), paddingLeft: 30 }}>
                    <Text style={styles.activeTabText}>Buy Hugs</Text>
                </View>
               <View>
                    <FlatList
                        data={data}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                        numColumns={2} // Display 2 columns
                        contentContainerStyle={{ paddingTop: 30 }} // Adjust spacing
                    />
                </View>
            </ScrollView>


        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // backgroundColor: '#fff',
        // justifyContent: 'center',
        alignItems: 'center'

    },
    searchBar: {
        flexDirection: 'row',
        width: getWidth(1.1),
        borderRadius: 10,
        backgroundColor: 'white',
        marginTop: 20,
        alignItems: 'center'
        // height:40
    },
    input: {
        // borderWidth: 1,
        // borderColor: 'gray',
        padding: 10,
    },
    tabs: {
        flexDirection: 'row',
        justifyContent: 'space-around',

        backgroundColor: 'white',
        width: getWidth(1.2),
        borderRadius: 15,
        height: 50,

        marginBottom: 15,
        marginTop: 50
        // position: 'absolute',
        // top: 120
    },
    tab: {
        // flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',

        backgroundColor: 'white',
        // width: getWidth(2.2),
        margin: 7,
        marginBottom: 15,
        // height: 50,
        borderRadius: 18
    },
    activeTab: {
        borderBottomColor: 'transparent',
    },
    tabText: {
        color: 'black',
        fontSize: 18,
        fontFamily: 'Jost',
        fontWeight: '400',
        marginTop: 8
    },
    activeTabText: {
        color: 'black',
        fontSize: 18,
        fontFamily: 'Jost',
        fontWeight: '400'
    },
    flatListContent: {
        flexGrow: 1,
    },
    itemContainer: {

        alignItems: 'center',
        marginTop: 10,
        marginBottom: 10
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 50,
        margin: 8
    },
    itemImage: {
        width: '100%',
        height: 100,
        borderRadius: 5,
    },
    itemName: {
        fontWeight: 'bold',
        marginTop: 5,
    },
    followButton: {
        backgroundColor: 'blue',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
        marginTop: 5,
    },
    followButtonText: {
        color: '#fff',
    },
    button: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 10,
        borderRadius: 5,
        marginHorizontal: 5,
    },
    statusUploadBackground: {
        height: 110,
        width: 110,

        borderRadius: 55, // half of height/width for perfect circle
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.3)', // Adjust opacity or color as needed
    },
    fanBackground: {
        height: 60,
        width: 60,

        borderRadius: 35, // half of height/width for perfect circle
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.3)', // Adjust opacity or color as needed
    },
    logo: {
        width: 30,
        height: 30,
        position: 'absolute',
        top: 95,
        backgroundColor: '#00D2FF',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center'
        // right: 15,
    },
    outerview: {
        height: 115,
        width: 115,

        borderRadius: 60, // half of height/width for perfect circle
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#7E65C0'
    },
    fanouterview: {
        height: 65,
        width: 65,

        borderRadius: 45, // half of height/width for perfect circle
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#7E65C0',

    },
    flatListContent: {
        flexGrow: 1,
    },
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
    },
    clickableGradient: {
        position: 'absolute',
        bottom: 10,
        left: 70,
        right: 0,
        height: 50, // Adjust height as needed

        width: getWidth(1.5),
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: 15,
        flexDirection: 'row',
        backgroundColor: 'white'
    },
    gradient: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 10,
        width: '20%',
        height: '100%',
        borderRadius: 15
    },
    bottumtab: {
        flex: 1,
        alignItems: 'center',


    },
    viewtxt: { width: getHeight(8), justifyContent: 'center', alignItems: 'center', }
});

export default SuperHugs;
