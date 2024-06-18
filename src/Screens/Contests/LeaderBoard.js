import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, FlatList, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import images from '../../assets/Images';
import { getHeight, getWidth } from '../../Theme/Constants';
import LinearGradient from 'react-native-linear-gradient';
import Header from '../../Components/Header';
// import CustomFonts from '../../assets/fonts';


const LeaderBoard = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedTab, setSelectedTab] = useState(0);

    const imageData = [
        { id: 1, imageUrl: images.Welcome_1 },
        { id: 2, imageUrl: images.Welcome_2 },
        { id: 3, imageUrl: images.Welcome_3 },
       
    ];
    const CustomFonts = {
        // 'CustomFont-Regular': require('../../assets/fonts/Jost/Jost-Regular.ttf'),
        // 'CustomFont-Bold': require('../fonts/CustomFont-Bold.ttf'),
        // 'CustomFont-Italic': require('../fonts/CustomFont-Italic.ttf'),
      };
    const itemData = [
        { id: 1, name: 'Alex Linderson', followers: 'Mariya Jacob', image: images.ViratBanner },
        { id: 2, name: 'Jacob Jones', followers: 'Mariya tacob' , image: images.Welcome_1 },
        { id: 3, name: 'Item Name 3', followers: ' Mariya Jacob', image: images.Welcome_2 },
        { id: 4, name: 'Item Name 2', followers: 'Mariya Jacob', image: images.Welcome_1 },
        { id: 5, name: 'Item Name 3', followers: 'Mariya Jacob', image: images.Welcome_2 },
        { id: 6, name: 'Item Name 3', followers: 'Mariya Jacob', image: images.Welcome_2 },
        { id: 7, name: 'Item Name 2', followers: 'Mariya Jacob', image: images.Welcome_1 },
        { id: 8, name: 'Item Name 3', followers: 'Mariya Jacob', image: images.Welcome_2 },
        { id: 9, name: 'Item Name 3', followers: 'Mariya Jacob', image: images.Welcome_2 },
    ];

    // Filtered items based on search query
    const filteredItems = itemData.filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()));

    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.itemContainer}>
            <View style={{ width: getWidth(8), flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ marginRight: 15, marginLeft: 6 }}>{item.id}</Text>
                <Image source={item.image} style={styles.itemImage} />
            </View>
            <View style={{ width: getWidth(2.5), justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontWeight: '500', fontFamily: 'Jost', fontSize: 14, color: 'black' }}> {item.followers}</Text>
            </View>
            <View style={{ width: getWidth(5), justifyContent: 'center', alignItems: 'center' }}>
                <Text>1888 Points</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={{ flex: 1 }}>
        <Header title="Leader Board" />
        <View style={styles.container}>
            <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',width:getWidth(1.1),alignSelf:'center'}}>
            <View style={{ width: getWidth(4),  justifyContent: 'center', alignItems: 'center', marginTop: 45 }}>
                <Text style={styles.ranktext}>2</Text>
                <Image source={images.UpPinkarrow} resizeMode="cover" style={styles.rankimage} />
                <TouchableOpacity style={styles.fanouterview}>

                    <Image source={images.Srk} resizeMode="cover" style={styles.fanBackground}>


                    </Image>
                </TouchableOpacity>
                <Text style={styles.namestyle}> {'Joseph'}</Text>
                <Text style={{ fontWeight: '500', fontFamily: 'Jost', fontSize: 14, color: 'black' }}>{'2300 Points'}</Text>
            </View>
            <View style={{ width: getWidth(4),  justifyContent: 'center', alignItems: 'center', marginTop: 45,    marginBottom:50 }}>
                <Text style={styles.ranktext}>1</Text>
                <Image source={images.Crown} resizeMode="cover" style={styles.rankimage} />
                <TouchableOpacity style={styles.ctrouterview}>

                    <Image source={images.Virat} resizeMode="cover" style={styles.ctrBackground}>


                    </Image>
                </TouchableOpacity>
                <Text style={styles.namestyle}> {'Martin'}</Text>
                <Text style={{ fontWeight: '500', fontFamily: 'Jost', fontSize: 14, color: 'black' }}>{'2300 Points'}</Text>
            </View>
            <View style={{ width: getWidth(4),  justifyContent: 'center', alignItems: 'center', marginTop: 45 }}>
                <Text style={styles.ranktext}>3</Text>
                <Image source={images.UpPinkarrow} resizeMode="cover" style={styles.rankimage} />
                <TouchableOpacity style={styles.fanouterview}>

                    <Image source={images.Profile} resizeMode="cover" style={styles.fanBackground}>


                    </Image>
                </TouchableOpacity>
                <Text style={styles.namestyle}> {'Joseph'}</Text>
                <Text style={{ fontWeight: '500', fontFamily: 'Jost', fontSize: 14, color: 'black' }}>{'2300 Points'}</Text>
            </View>
            </View>
            <FlatList
                data={filteredItems}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.flatListContent}
            />
        </View>
    </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        height: getHeight(1.1),
        justifyContent: 'center',
        alignSelf: 'center'
    },
    imageContainer: {
        flexDirection: 'row',
        paddingVertical: 10,
        paddingHorizontal: 5,
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 10,
        marginRight: 10,
    },
    searchBar: {
        flexDirection: 'row',
        width: getWidth(1.1),
        borderRadius: 10,
        backgroundColor: 'white',
        marginTop: 20,
        alignItems: 'center',
        marginBottom: 30
    },
    input: {
        padding: 10,
        width: getWidth(1.5)
    },
    flatListContent: {
        marginTop: 20,
        paddingBottom: 50
    },
    itemContainer: {
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
        flex: 1,
        marginHorizontal: 5,
        width: getWidth(1.1),
        flexDirection: 'row'
    },
    itemImage: {
        width: 40,
        height: 40,
        borderRadius: 35,
    },
    itemName: {
        fontWeight: '600',
        marginTop: 5,
        fontFamily: 'Jost',
        fontSize: 20,
        color: 'black'
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
    fanBackground: {
        height: 90,
        width: 90,

        borderRadius: 45, // half of height/width for perfect circle
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.3)', // Adjust opacity or color as needed
    },
    rankimage: {
        height: 17,
        width: 30,
marginBottom:10,
    // half of height/width for perfect circle
        justifyContent: 'center',
        alignItems: 'center',
       // Adjust opacity or color as needed
    },
    ctrBackground: {
        height: 140,
        width: 140,

        borderRadius: 70, // half of height/width for perfect circle
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.3)', // Adjust opacity or color as needed
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
        height: 95,
        width:95,

        borderRadius: 50, // half of height/width for perfect circle
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F15F79',

    },
    ctrouterview: {
        height: 150,
        width:150,

        borderRadius: 80, // half of height/width for perfect circle
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F15F79',
        marginBottom:0

    },
    ranktext:{ fontSize: 20,  fontWeight: '800', color: 'black',marginBottom:10 },
    namestyle:{ fontWeight: '800', fontFamily: 'Jost', fontSize: 16, color: 'black' ,marginTop:15}

});

export default LeaderBoard;
