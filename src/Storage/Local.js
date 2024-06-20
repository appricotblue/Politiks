
import AsyncStorage from '@react-native-async-storage/async-storage';

const storeLogin = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    console.error('Error storing login token:', error);
    // Handle error if necessary
  }
};
const getStoredToken = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    return token;
  } catch (error) {
    console.error('Error retrieving login token:', error);
    return null;
  }
};
const storeUserId = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    console.error('Error storing login token:', error);
    // Handle error if necessary
  }
};

const getUserId = async () => {
  try {
    const token = await AsyncStorage.getItem('UserId');
    return token;
  } catch (error) {
    console.error('Error retrieving login token:', error);
    return null;
  }
};

const storEexistuser = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    console.error('Error storing existuser:', error);
    // Handle error if necessary
  }
};

const getEexistuser = async () => {
  try {
    const existuser = await AsyncStorage.getItem('existuser');
    return existuser;
  } catch (error) {
    console.error('Error retrieving login token:', error);
    return null;
  }
};

const storLeader = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    console.error('Error storing existuser:', error);
    // Handle error if necessary
  }
};

const getLeader = async () => {
  try {
    const isleader = await AsyncStorage.getItem('isleader');
    return isleader;

  } catch (error) {
    console.error('Error retrieving login token:', error);
    return null;
  }
};

const Local = {
  storeLogin,
  getStoredToken,
  storeUserId,
  getUserId,
  storEexistuser,
  getEexistuser,
  storLeader,
  getLeader
};

export default Local;