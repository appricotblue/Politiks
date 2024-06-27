import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import LoginScreen from '../Screens/Login/LoginScreen';
import Home from '../Screens/Home/Home';
import SplashScreen from '../Screens/Splash/SplashScreen';
import WelcomeScreen from '../Screens/WelcomScreen/WelcomeScreen';
import GetStarted from '../Screens/GetStarted/GetStarted';
import SignUpScreen from '../Screens/SignUp/SignUpScreen';
import OtpScreen from '../Screens/OtpScreen/OtpScreen';
import CreatePasswordScreen from '../Screens/CreatePassword/CreatePasswordScreen';
import GenderScreen from '../Screens/StartUpQuestions/GenderScreen';
import DOBScreen from '../Screens/StartUpQuestions/DOBScreen';
import InterestSelection from '../Screens/StartUpQuestions/InterestSelection';
import SuccessScreen from '../Screens/StartUpQuestions/SuccessScreen';
import DiscoverTrends from '../Screens/Discover/DiscoverTrends';
import DiscoverSearch from '../Screens/Discover/DiscoverSearch';
import Inbox from '../Screens/Inbox/Inbox';
import Profile from '../Screens/Profile/Profile';
import FanWall from '../Screens/FanWall/FanWall';
import Followers from '../Screens/Followers/Followers';
import Notifications from '../Screens/Notifications/Notifications';
import Contests from '../Screens/Contests/Contests';
import ContestDetails from '../Screens/Contests/ContestDetails';
import LeaderBoard from '../Screens/Contests/LeaderBoard';
import Reels from '../Screens/Reels/Reels';
import SuperHugs from '../Screens/SuperHugs/SuperHugs';
import ContestDetailsWeek1 from '../Screens/Contests/ContestDetailsWeek1';
import SignUpwithEmail from '../Screens/SignUp/SignUpwithEmail';
import TellusAboutyou from '../Screens/TellUsAbout/TellusAboutyou';
import FollowAccounts from '../Screens/TellUsAbout/FollowAccounts';
import Forgotpassword from '../Screens/CreatePassword/Forgotpassword';
import UploadScreen from '../Screens/Leaderverification/UploadScreen';
import EditPost from '../Screens/EditPost/EditPost';
import PendingScreen from '../Screens/Leaderverification/PendingScreen';
import MessegeScreen from '../Screens/Messege/MessegeScreen';
import EditProfile from '../Screens/Profile/EditProfile';
import OtherProfileScreen from '../Screens/Profile/OtherProfileScreen';
import SuggestionScreen from '../Screens/Suggestion/SuggestionScreen';
import HomeSearch from '../Screens/HomeSearch/HomeSearch';
import ChatScreen from '../Screens/ChatScreen.js/ChatScreen';
import VoiceCallScreen from '../Screens/VoiceCall/VoiceCallScreen';
import RepostScreen from '../Screens/EditPost/RepostScreen';

const Stack = createStackNavigator();
if (!__DEV__) {
  console.log = () => null;
}
const index = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
        <Stack.Screen name="GetStarted" component={GetStarted} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="OtpScreen" component={OtpScreen} />
        <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
        <Stack.Screen
          name="CreatePasswordScreen"
          component={CreatePasswordScreen}
        />
        <Stack.Screen name="GenderScreen" component={GenderScreen} />
        <Stack.Screen name="DOBScreen" component={DOBScreen} />
        <Stack.Screen name="InterestSelection" component={InterestSelection} />
        <Stack.Screen name="SuccessScreen" component={SuccessScreen} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="DiscoverTrends" component={DiscoverTrends} />
        <Stack.Screen name="DiscoverSearch" component={DiscoverSearch} />
        <Stack.Screen name="Inbox" component={Inbox} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="EditProfile" component={EditProfile} />
        <Stack.Screen name="FanWall" component={FanWall} />
        <Stack.Screen name="Followers" component={Followers} />
        <Stack.Screen name="Notifications" component={Notifications} />
        <Stack.Screen name="Contests" component={Contests} />
        <Stack.Screen name="ContestDetails" component={ContestDetails} />
        <Stack.Screen name="LeaderBoard" component={LeaderBoard} />
        <Stack.Screen name="Reels" component={Reels} />
        <Stack.Screen name="SuperHugs" component={SuperHugs} />
        <Stack.Screen
          name="ContestDetailsWeek1"
          component={ContestDetailsWeek1}
        />
        <Stack.Screen name="SignUpwithEmail" component={SignUpwithEmail} />
        <Stack.Screen name="TellusAboutyou" component={TellusAboutyou} />
        <Stack.Screen name="FollowAccounts" component={FollowAccounts} />
        <Stack.Screen name="Forgotpassword" component={Forgotpassword} />
        <Stack.Screen name="UploadScreen" component={UploadScreen} />
        <Stack.Screen name="PendingScreen" component={PendingScreen} />
        <Stack.Screen name="EditPost" component={EditPost} />
        <Stack.Screen name="Messege" component={MessegeScreen} />
        <Stack.Screen name="OtherProfile" component={OtherProfileScreen} />
        <Stack.Screen name="Suggestion" component={SuggestionScreen} />
        <Stack.Screen name="HomeSearch" component={HomeSearch} />
        <Stack.Screen name="ChatScreen" component={ChatScreen} />
        <Stack.Screen name="VoiceCall" component={VoiceCallScreen} />
        <Stack.Screen name="RepostScreen" component={RepostScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default index;
