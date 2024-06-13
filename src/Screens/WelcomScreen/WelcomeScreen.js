import React, { useState, useRef } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import PagerView from 'react-native-pager-view';
import images from '../../assets/Images';
import { getHeight, getWidth } from '../../Theme/Constants';
import Colors from '../../Theme/Colors';
import CommonButton from '../../Components/CommonButton';

const WelcomeScreen = ({ navigation }) => {
  const [index, setIndex] = useState(0);

  const onNextPress = () => {
    if (index < 2) {
      pagerRef.current.setPage(index + 1); // Increment index to show the next image
      setIndex(index + 1); // Update the index state
    }
  };

  const pagerRef = useRef(null);
  
  const [Title, setTitle] = useState([
    "Connect with your Fav Celebrity",
    "Win Exciting Prizes",
    "Be famous like your favorite ones"
  ]);
  const [SubTitle, setSubTitle] = useState([
    "Dui nunc vel lorem ultrices arcu eu. Nibh mi porta fringilla congue massa.",
    "Dui nunc vel lorem ultrices arcu eu. Nibh mi porta fringilla congue massa.",
    "Dui nunc vel lorem ultrices arcu eu. Nibh mi porta fringilla congue massa."
  ]);

 

  return (
    <>
      <PagerView
        ref={pagerRef} // Pass the ref to PagerView
        onPageSelected={(e) => {
          setIndex(e.nativeEvent.position); // Update the index when page changes
        }}
        style={styles.pagerView}
        initialPage={0}>
        <Image
          key={1}
          resizeMode="cover"
          style={styles.container}
          source={images.Welcome_1}
        />
        <Image
          key={2}
          resizeMode="cover"
          style={styles.container}
          source={images.Welcome_2}
        />
        <Image
          key={3}
          resizeMode="cover"
          style={styles.container}
          source={images.Welcome_3}
        />
      </PagerView>
      <View style={styles.bottomContainer}>
        <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 50 ,marginTop:50}}>
          <Text style={styles.TileTxt}>{Title[index]}</Text>
          <Text style={styles.subTxt}>{SubTitle[index]}</Text>
          {index === 2 &&
            <CommonButton
              onPress={() => navigation.replace('GetStarted')}
              color={['#8360C3', '#2EBF91']}
              title={'Get Started'}
              texttitle={'white'}
              width={getHeight(5)}
            />}
        </View>

        <View style={styles.tabIndex}>
          <View
            style={[
              styles.indexIcon,
              {
                backgroundColor: index === 0 ? Colors.white : Colors.black,
                borderColor: 'white',
                borderWidth: 1
              },
            ]}
          />
          <View
            style={[
              styles.indexIcon,
              {
                backgroundColor: index === 1 ? Colors.white : Colors.black,
                marginLeft: getWidth(55),
                borderColor: 'white',
                borderWidth: 1
              },
            ]}
          />
          <View
            style={[
              styles.indexIcon,
              {
                backgroundColor: index === 2 ? Colors.white : Colors.black,
                marginLeft: getWidth(55),
                borderColor: 'white',
                borderWidth: 1
              },
            ]}
          />
        </View>
        <View style={styles.skipContainer}>
          {index !== 2 &&
            <>
              <TouchableOpacity
                onPress={() => navigation.replace('LoginScreen')}
                style={styles.skipBtn}>
                <Text style={styles.skipTxt}>Skip</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={onNextPress}
                style={styles.skipBtn}>
                <Text style={styles.skipTxt}>Next</Text>
              </TouchableOpacity>
            </>
          }
        </View>

      </View>
    </>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  pagerView: {
    flex: 1,
  },
  container: {
    flex: 1,
    height: getHeight(1),
    width: '100%',
  },
  bottomContainer: {
    height:250,
    position: 'absolute',
    bottom: 0,
    width: '100%',
    alignSelf: 'center',
    backgroundColor:'rgba(0, 0, 0, 0.5)'
  },
  tabIndex: {
    flex: 1,
    flexDirection: 'row',
    paddingLeft: getWidth(15),
    alignSelf: 'center'
  },
  indexIcon: {
    height: getHeight(70),
    width: getHeight(70),
    backgroundColor: 'white',
    borderRadius: 100,
  },
  skipContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingBottom:15
  },
  skipBtn: {
    width: getWidth(4),
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  skipTxt: {
    fontSize: getHeight(50),
    color: 'white',
    textDecorationLine: 'underline',
    fontFamily:'Jost',
    fontWeight:'400'
  },
  nextTxt: {
    fontSize: getHeight(50),
    color: 'white',
    textDecorationLine: 'underline',
    fontFamily: 'Jost-Regular',
    fontWeight:'400'
  },
  TileTxt: {
    fontSize: getHeight(40),
    color: 'white',
    fontWeight: '700',
    fontSize:24,
    marginBottom:5,
    fontFamily: 'Jost-Regular',
  },
  subTxt: {
    fontSize: getHeight(60),
    color: 'white',
    textAlign: 'center',
    width: getHeight(2.6),
    fontFamily:'Jost',
    fontWeight:'300'
  },
});
