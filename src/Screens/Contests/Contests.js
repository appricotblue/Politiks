import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    SafeAreaView,
    Dimensions,
    FlatList,
    Image,
    ImageBackground,
    BackHandler,
} from 'react-native';
import { connect } from 'react-redux';
import { setApiData } from '../../redux/action';
import CommonButton from '../../Components/CommonButton';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../../Components/Header';
import HorizontalList from '../../Components/HorizontalList';
import images from '../../assets/Images';
import SwiperComponent from '../../Components/SwiperComponent';
import ListItem from '../../Components/ListItem';
import Footer from '../../Components/Footer';
import LinearGradient from 'react-native-linear-gradient';
import { getHeight, getWidth } from '../../Theme/Constants';

const axios = require('axios').default;
const height = Dimensions.get('window').height;


const Contests = props => {
    const navigation = useNavigation();
    const [ProfileData, setProfileData] = useState([]);
    const [selectedTab, setSelectedTab] = useState(0);
    const [selecteditem, setSelecteditem] = useState(0);

    const data = [
        { id: '1', title: 'Virat Kohli', imageUrl: images.Virat },
        { id: '2', title: 'Virat Kohli', imageUrl: images.Welcome_2 },
        { id: '3', title: 'Item 3', imageUrl: images.Welcome_3 },
        { id: '4', title: 'Item 2', imageUrl: images.Welcome_1 },
        { id: '5', title: 'Item 5', imageUrl: images.Welcome_2 },
        { id: '6', title: 'Item 8', imageUrl: images.Welcome_3 },
        { id: '7', title: 'Item 7', imageUrl: images.Welcome_3 },
        // Add more items as needed
    ];
    const swiperdata = [
        { id: '1', title: 'Item 1', imageUrl: images.ViratBanner },
        { id: '2', title: 'Item 2', imageUrl: images.ViratBanner },
        { id: '3', title: 'Item 4', imageUrl: images.ViratBanner },
        { id: '4', title: 'Item 6', imageUrl: images.Welcome_1 },

        // Add more items as needed
    ];
    const verticalListData = [
        { id: '1', name: 'Virat Kohli', type: 'image', media: 'https://i0.wp.com/www.rvcj.com/wp-content/uploads/2023/01/VIRAT-KOHLI-2.jpg?resize=600%2C451&ssl=1', designation: 'Bangalore', description: 'Stumptown brunch raw umami flannel dollar pour-over ipsum. Booth glossier squid craft kale.😍❤️❤️', image: images.ViratProfile },
        { id: '2', name: 'Jane Smith', type: 'image', media: 'https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w1200/2023/09/instagram-image-size.jpg', designation: 'Product Manager', description: 'Software fcrtdcvg ', image: images.Welcome_1 },
        { id: '3', name: 'Alice Johnson', type: 'video', media: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', designation: 'UI/UX Designer', description: 'Software vhgftrdfcgv bn dr', image: images.Welcome_1 },
        { id: '4', name: 'Virat Kohli', type: 'image', media: 'https://i0.wp.com/www.rvcj.com/wp-content/uploads/2023/01/VIRAT-KOHLI-2.jpg?resize=600%2C451&ssl=1', designation: 'Bangalore', description: 'Stumptown brunch raw umami flannel dollar pour-over ipsum. Booth glossier squid craft kale.😍❤️❤️', image: images.ViratProfile },
        { id: '5', name: 'Jane Smith', type: 'image', media: 'https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w1200/2023/09/instagram-image-size.jpg', designation: 'Product Manager', description: 'Software fcrtdcvg ', image: images.Welcome_1 },
        // Add more items as needed
    ];
    const handleTabPress = (tabIndex) => {
        setSelectedTab(tabIndex);
    };

    const handleItemPress = (tabIndex) => {
        setSelecteditem(tabIndex);
    };

    function chunkArray(array, chunkSize) {
        const chunks = [];
        for (let i = 0; i < array.length; i += chunkSize) {
            chunks.push(array.slice(i, i + chunkSize));
        }
        return chunks;
    };
    const handleImageBackgroundClick = () => {
        // Navigate to the next screen
       navigation.navigate('ContestDetails');
      };
    const renderItem = ({ item }) => (
        <View style={styles.itemContainer}>
            <Image source={item.imageUrl} style={styles.image} />

        </View>
    );

    const renderImageItem = ({ item }) => (
        <TouchableOpacity onPress={handleImageBackgroundClick}>
        <ImageBackground  source={item.imageUrl} resizeMode="stretch" imageStyle={styles.imageStyle} style={{ width: getWidth(2.2), padding: 10, height: 220, marginBottom: 15, justifyContent: 'space-between' }}>
            {/* <Image source={item.imageUrl} style={{ width: '100%', height: 120 }} /> */}
            <View style={{ width: 80, height: 20, backgroundColor: '#295265', borderRadius: 7, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: 'white', }}>2nd week</Text>
            </View>
            <View>
                <Text style={{ color: 'white' }}>Kohli Chronicles: Unleash Your Inner
                    Champion</Text>
                <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 15, marginTop: 5, width: getWidth(4.5) }}>
                        {swiperdata.map((item) => (
                            renderItem({ item }) // Assuming renderItem is a function that renders the item
                        ))}
                    </ScrollView>
                    <Text style={{ fontSize: 10, color: 'white' }}>15k+ Participants</Text>
                </View>

            </View>

        </ImageBackground>
        </TouchableOpacity>
    );

    useEffect(() => {
        // getDetails();
    }, []);
    onPressStatusUpload = () => {
        alert('upload')
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Header title="Contests" />
            <ScrollView style={{ backgroundColor: 'white' }}>
                <View style={{ marginTop: 15 }}>
                    <TouchableOpacity
                        style={styles.clickableGradient}
                        onPress={() => {
                            // Handle onPress event
                            console.log('Gradient View Clicked');
                        }}
                    >
                        <TouchableOpacity onPress={() => handleTabPress(0)} style={[styles.bottumtab, { borderTopLeftRadius: 15, borderBottomLeftRadius: 15 }, selectedTab === 0 && styles.activeTab]}>

                            <LinearGradient
                                colors={selectedTab === 0 ? ['#8360C3', '#2EBF91'] : ['transparent', 'transparent']}
                                style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', borderTopLeftRadius: 15, borderBottomLeftRadius: 15 }}
                                start={{ x: 0, y: 0.5 }}
                                end={{ x: 1, y: 0.5 }}
                            >
                                <Text style={selectedTab === 0 ? styles.activeTabText : styles.tabText}>Contests</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleTabPress(1)} style={[styles.bottumtab, selectedTab === 1 && styles.activeTab]}>

                            <LinearGradient
                                colors={selectedTab === 1 ? ['#8360C3', '#2EBF91'] : ['transparent', 'transparent']}
                                style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', }}
                                start={{ x: 0, y: 0.5 }}
                                end={{ x: 1, y: 0.5 }}
                            >
                                <Text style={selectedTab === 1 ? styles.activeTabText : styles.tabText}>Fan Festival</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleTabPress(2)} style={[styles.bottumtab, { borderTopRightRadius: 15, borderBottomRightRadius: 15 }, selectedTab === 1 && styles.activeTab]}>

                            <LinearGradient
                                colors={selectedTab === 2 ? ['#8360C3', '#2EBF91'] : ['transparent', 'transparent']}
                                style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', borderTopRightRadius: 15, borderBottomRightRadius: 15 }}
                                start={{ x: 0, y: 0.5 }}
                                end={{ x: 1, y: 0.5 }}
                            >
                                <Text style={selectedTab === 2 ? styles.activeTabText : styles.tabText}>Fan Awards</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </TouchableOpacity>
                </View>


                <View style={{ height: 200, marginTop: 10 }}>
                    <SwiperComponent data={swiperdata} />
                </View>
                <TouchableOpacity
                    style={styles.clickableItems}
                    onPress={() => {
                        // Handle onPress event
                        console.log('Gradient View Clicked');
                    }}
                >
                    <TouchableOpacity onPress={() => handleItemPress(0)} style={[styles.bottumitem, { borderTopLeftRadius: 15, borderBottomLeftRadius: 15 }, selecteditem === 0 && styles.activeTab]}>
                        <Text style={selecteditem === 0 ? styles.activeItemText : styles.tabText}>Active</Text>
                        <LinearGradient
                            colors={selecteditem === 0 ? ['#8360C3', '#2EBF91'] : ['transparent', 'transparent']}
                            style={{ width: '100%', height: '10%', justifyContent: 'center', alignItems: 'center', borderTopLeftRadius: 15, borderBottomLeftRadius: 15 }}
                            start={{ x: 0, y: 0.5 }}
                            end={{ x: 1, y: 0.5 }}
                        >

                        </LinearGradient>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleItemPress(1)} style={[styles.bottumitem, selecteditem === 1 && styles.activeTab]}>
                        <Text style={selecteditem === 1 ? styles.activeItemText : styles.tabText}>Upcoming</Text>
                        <LinearGradient
                            colors={selecteditem === 1 ? ['#8360C3', '#2EBF91'] : ['transparent', 'transparent']}
                            style={{ width: '100%', height: '10%', justifyContent: 'center', alignItems: 'center', }}
                            start={{ x: 0, y: 0.5 }}
                            end={{ x: 1, y: 0.5 }}
                        >

                        </LinearGradient>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleItemPress(2)} style={[styles.bottumitem, { borderTopRightRadius: 15, borderBottomRightRadius: 15 }, selecteditem === 1 && styles.activeTab]}>
                        <Text style={selecteditem === 2 ? styles.activeItemText : styles.tabText}>Completed</Text>
                        <LinearGradient
                            colors={selecteditem === 2 ? ['#8360C3', '#2EBF91'] : ['transparent', 'transparent']}
                            style={{ width: '100%', height: '10%', justifyContent: 'center', alignItems: 'center', borderTopRightRadius: 15, borderBottomRightRadius: 15 }}
                            start={{ x: 0, y: 0.5 }}
                            end={{ x: 1, y: 0.5 }}
                        >

                        </LinearGradient>
                    </TouchableOpacity>
                </TouchableOpacity>

                <ScrollView contentContainerStyle={styles.flatListContent}>
                    {chunkArray(data, 2).map((row, index) => (
                        <View style={styles.rowContainer} key={index}>
                            {row.map((item) => (
                                renderImageItem({ item }) // Assuming renderImageItem is a function that renders the image item
                            ))}
                        </View>
                    ))}
                </ScrollView>
            </ScrollView>
            <Footer title={'trophy'} />
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
        color: 'gray',
        fontSize: 18,
        fontFamily: 'Jost',
        fontWeight: '400'
    },
    activeTabText: {
        color: 'white',
        fontSize: 18,
        fontFamily: 'Jost',
        fontWeight: '400'
    },
    activeItemText: {
        color: '#6F76B7',
        fontSize: 18,
        fontFamily: 'Jost',
        fontWeight: '400',
        marginBottom: 10
    },
    flatListContent: {
        flexGrow: 1,


    },
    itemContainer: {
        width: 26,
        height: 26,
        borderRadius: 50,
        marginLeft: -12,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 1,
        marginBottom: 1,
        backgroundColor: '#6F76B7'
    },
    image: {
        width: 22,
        height: 22,
        borderRadius: 50,
        // margin: -8
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
        // position: 'absolute',

        height: 50, // Adjust height as needed

        width: getWidth(1.1),
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: 19,
        flexDirection: 'row',
        backgroundColor: 'white',
        // borderWidth:1,
        // borderColor:'gray',
        marginTop: 20,
        marginBottom: 20
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
        borderColor: 'gray',
        borderWidth: 1


    },

    clickableItems: {
        // position: 'absolute',

        height: 50, // Adjust height as needed

        width: getWidth(1.1),
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',

        flexDirection: 'row',
        // backgroundColor: 'white',
        // borderWidth:1,
        // borderColor:'gray',
        marginTop: 20,
        marginBottom: 20
    },
    bottumitem: {
        flex: 1,
        alignItems: 'center',
        // borderColor: 'gray',
        // borderWidth: 1


    },
    flatListContent: {
        flexGrow: 1,

    },
    imageStyle: {
        borderRadius: 20, // Set the same border radius as the background image
    },
});
export default Contests;
