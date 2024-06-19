import {env_dev} from '../env/Dev';
import axios from 'axios';

const HTTP_REQUEST = axios.create({
  baseURL: env_dev,
});

export const login = async mobileNumber => {
  try {
    console.log(env_dev + 'users/userRequestOTP');
    const response = await HTTP_REQUEST.post('users/userRequestOTP', {
      mobileNumber,
    });
    return response.data;
  } catch (error) {
    console.log(error, 'login error');
    throw error;
  }
};

export const signup = async (
  username,
  dateOfBirth,
  language,
  place,
  gender,
  avatar,
  userid,
) => {
  console.log(username, dateOfBirth, language, place, gender, avatar, userid);
  try {
    const response = await HTTP_REQUEST.post(`users/createUser/${userid}`, {
      username,
      dateOfBirth,
      language,
      place,
      gender,
      avatar,
    });
    // const response = await HTTP_REQUEST.post(`users/createUser/665af7b8f324154d973d6a48`, { username, dateOfBirth, language, place, gender, avatar, });
    return response.data;
  } catch (error) {
    console.log(error, 'signup error');
    throw error;
  }
};

export const getusers = async () => {
  try {
    const response = await HTTP_REQUEST.get('users/getUsers');
    return response.data;
  } catch (error) {
    console.log(error, 'user error');
    throw error;
  }
};

export const updateProfile = async (
  username,
  dateOfBirth,
  language,
  place,
  gender,
  avatar,
  userid,
) => {
  console.log(userid, 'here profile id ');
  try {
    const response = await HTTP_REQUEST.put(`users/updateUser/${userid}`, {
      username,
      dateOfBirth,
      language,
      place,
      gender,
      avatar,
    });
    return response.data;
  } catch (error) {
    console.log(error, 'user error');
    throw error;
  }
};

export const trial = async PAYLOAD =>
  HTTP_REQUEST.post('/user-home-screen/', PAYLOAD);
