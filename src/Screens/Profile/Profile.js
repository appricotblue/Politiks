import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, FlatList, StyleSheet, SafeAreaView, ImageBackground, ScrollView } from 'react-native';
import images from '../../assets/Images';
import { getHeight, getWidth } from '../../Theme/Constants';
import DiscoverItems from '../../Components/DiscoverItems';
import LinearGradient from 'react-native-linear-gradient';
import Header from '../../Components/Header';
import { useNavigation } from '@react-navigation/native';
import CommonStyles from '../../Theme/CommonStyles';

const Profile = () => {
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
        { id: '4', title: 'Item 2', imageUrl: images.Welcome_1 },
        { id: '5', title: 'Item 3', imageUrl: images.Welcome_2 },
        { id: '6', title: 'Item 2', imageUrl: images.Welcome_3 },
        { id: '7', title: 'Item 3', imageUrl: images.Welcome_3 },
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

    const renderItem = ({ item }) => (
        <View style={styles.itemContainer}>
            <Image source={item.imageUrl} style={styles.image} />
            <Text style={styles.title}>{item.title}</Text>
        </View>
    );

    return (
        <SafeAreaView style={{ flex: 1, }}>
            <Header title="Profile" />

            <ScrollView contentContainerStyle={styles.container}>

                <Image source={images.ProfileBanner} style={{ width: '100%', height: 150 }} />
                <View style={styles.tabs}>
                    <TouchableOpacity onPress={()=> navigation.navigate('Followers')} style={{ width: getWidth(4), justifyContent: 'center', alignItems: 'center', }}>
                        <Text style={{
                            fontSize: 18,
                            fontFamily: 'Jost',
                            fontWeight: '600', color: 'black'
                        }}>
                            565
                        </Text>
                        <Text style={{
                            fontSize: 14,
                            fontFamily: 'Jost',
                            fontWeight: '400', color: 'black'
                        }}>
                            Following
                        </Text>

                    </TouchableOpacity>
                    <View style={{ width: getWidth(4), justifyContent: 'center', alignItems: 'center', }}>
                        <TouchableOpacity style={styles.outerview}>
                            <ImageBackground source={images.Profile} resizeMode="cover" style={styles.statusUploadBackground}>
                                {/* <Image style={styles.logo} source={images.PlusCircle} /> */}
                                <View style={styles.logo}>
                                    <Text style={{ color: 'white', fontFamily: 'Jost', fontWeight: '600', fontSize: 15 }}>12</Text>
                                </View>
                            </ImageBackground>
                        </TouchableOpacity>
                    </View>
                     <TouchableOpacity onPress={()=> navigation.navigate('Followers')} style={{ width: getWidth(4), justifyContent: 'center', alignItems: 'center', }}>
                        <Text style={{
                            fontSize: 16,
                            fontFamily: 'Jost',
                            fontWeight: '600', color: 'black'
                        }}>
                            698
                        </Text>
                        <Text style={{
                            fontSize: 14,
                            fontFamily: 'Jost',
                            fontWeight: '400', color: 'black'
                        }}>
                            Followers
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={{ width: '90%', marginTop: 50, justifyContent: 'center', alignItems: 'center', marginBottom: 30 }}>
                    <Text style={styles.tabText}>Monty Mortell</Text>
                    <LinearGradient
                        colors={['#8360C3', '#2EBF91']}
                        style={{ width: '40%', height: 25, justifyContent: 'center', alignItems: 'center', borderRadius: 15, marginTop: 10 }}
                        start={{ x: 0, y: 0.5 }}
                        end={{ x: 1, y: 0.5 }}
                    >
                        <Text style={styles.activeTabText}>3546 Points</Text>
                    </LinearGradient>
                    <Text style={{ textAlign: 'center', marginTop: 10 }}>
                        Sed arcu dolor ante et pellentesque. Cras eget ornare enim penatibus. Ultricies proin dapibus risus.
                    </Text>
                </View>
                <View style={styles.tab}>

                    <View style={{ width: getWidth(5.5), marginLeft: -2 }}>
                        <TouchableOpacity style={styles.fanouterview}>
                            <ImageBackground source={images.ViratProfile} resizeMode="cover" style={styles.fanBackground}>
                                {/* <Image style={styles.logo} source={images.PlusCircle} /> */}

                            </ImageBackground>
                        </TouchableOpacity>
                    </View>
                    <View style={{ width: getWidth(3), }}>
                        <Text style={{ color: '#21A0E7', fontFamily: 'Jost', fontWeight: '400', fontSize: 14 }}>
                            Super Fan of
                        </Text>
                        <Text style={{ color: 'black', fontFamily: 'Jost', fontWeight: '600', fontSize: 16 }}>
                            Virat Kohli
                        </Text>

                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate('FanWall')} style={{ width: getWidth(4), }}>
                        <LinearGradient
                            colors={['#C84E89', '#F15F79']}
                            style={{ width: getWidth(4), height: '100%', justifyContent: 'center', alignItems: 'center', borderTopRightRadius: 15, borderBottomRightRadius: 15 }}
                            start={{ x: 0, y: 0.5 }}
                            end={{ x: 1, y: 0.5 }}
                        >
                            <Text style={{ color: 'white' }}>
                                {'Fan Wall >>'}
                            </Text>

                        </LinearGradient>
                    </TouchableOpacity>


                </View>
                {/* Tabs */}


                {/* Content */}

                <View style={{ width: getWidth(1), backgroundColor: 'white' }}>
                    {/* Horizontal FlatList */}
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 10 }}>
                        {data.map((item) => (
                            renderItem({ item }) // Assuming renderItem is a function that renders the item
                        ))}
                    </ScrollView>

                    {/* Grid FlatList */}
                    <ScrollView contentContainerStyle={styles.flatListContent}>
                        {chunkArray(imageData, 3).map((row, index) => (
                            <View style={styles.rowContainer} key={index}>
                                {row.map((item) => (
                                    renderImageItem({ item }) // Assuming renderImageItem is a function that renders the image item
                                ))}
                            </View>
                        ))}
                    </ScrollView>


                </View>


            </ScrollView>

            <TouchableOpacity
                style={styles.clickableGradient}
                onPress={() => {
                    // Handle onPress event
                    console.log('Gradient View Clicked');
                }}
            >
                <TouchableOpacity onPress={() => handleTabPress(0)} style={[styles.bottumtab, selectedTab === 0 && styles.activeTab]}>
                    {/* <Text style={selectedTab === 0 ? styles.activeTabText : styles.tabText}>Images</Text> */}
                    <LinearGradient
                        colors={selectedTab === 0 ? ['#8360C3', '#2EBF91'] : ['transparent', 'transparent']}
                        style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', borderTopLeftRadius: 15, borderBottomLeftRadius: 15 }}
                        start={{ x: 0, y: 0.5 }}
                        end={{ x: 1, y: 0.5 }}
                    >
                        <Image style={{ width: selectedTab === 0 ? 35 : 30, height: selectedTab === 0 ? 35 : 25 }} source={selectedTab === 0 ? images.Image : images.GrayImage} />
                    </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleTabPress(1)} style={[styles.bottumtab, selectedTab === 1 && styles.activeTab]}>
                    {/* <Text style={selectedTab === 1 ? styles.activeTabText : styles.tabText}>Items</Text> */}
                    <LinearGradient
                        colors={selectedTab === 1 ? ['#8360C3', '#2EBF91'] : ['transparent', 'transparent']}
                        style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', }}
                        start={{ x: 0, y: 0.5 }}
                        end={{ x: 1, y: 0.5 }}
                    >
                        <Image style={{ width: 35, height: 35 }} source={selectedTab === 1 ? images.WhiteReel : images.GrayReel} />
                    </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleTabPress(2)} style={[styles.bottumtab, selectedTab === 1 && styles.activeTab]}>
                    {/* <Text style={selectedTab === 1 ? styles.activeTabText : styles.tabText}>Items</Text> */}
                    <LinearGradient
                        colors={selectedTab === 2 ? ['#8360C3', '#2EBF91'] : ['transparent', 'transparent']}
                        style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', borderTopRightRadius: 15, borderBottomRightRadius: 15 }}
                        start={{ x: 0, y: 0.5 }}
                        end={{ x: 1, y: 0.5 }}
                    >
                        <Image style={{ width: 35, height: 35 }} source={selectedTab === 2 ? images.whiteBasket : images.Basket} />
                    </LinearGradient>
                </TouchableOpacity>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // backgroundColor: '#fff',
        justifyContent: 'center',
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
        width: getWidth(1.5),
        borderRadius: 15,
        height: 50,

        marginBottom: 15,
        position: 'absolute',
        top: 120
    },
    tab: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',

        backgroundColor: 'white',
        width: getWidth(1.3),
        marginBottom: 30,
        height: 50,
        borderRadius: 18
    },
    activeTab: {
        borderBottomColor: 'transparent',
    },
    tabText: {
        color: 'black',
        fontSize: 24,
        fontFamily: 'Jost-SemiBold',
        fontWeight: '600'
    },
    activeTabText: {
        // ...CommonStyles.appTitle,
        fontFamily: 'Jost-SemiBold',
        color: 'white',
        fontSize: 18,
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
        height: 80,
        width: 80,

        borderRadius: 45, // half of height/width for perfect circle
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
        top: 65,
        backgroundColor: '#00D2FF',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center'
        // right: 15,
    },
    outerview: {
        height: 85,
        width: 85,

        borderRadius: 45, // half of height/width for perfect circle
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
        backgroundColor: '#7E65C0'
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
});

export default Profile;
