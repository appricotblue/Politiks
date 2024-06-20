import {env_dev} from '../env/Dev';
import axios from 'axios';
import {commonRequest} from './CommonRequest';

const HTTP_REQUEST = axios.create({
  baseURL: env_dev,
});

export const register = async (userName, email, password) => {
  console.log(userName, email, password, env_dev + 'user/register');
  try {
    const response = await HTTP_REQUEST.post('user/register', {
      userName,
      email,
      password,
    });
    // const response = await HTTP_REQUEST.post(`users/createUser/665af7b8f324154d973d6a48`, { username, dateOfBirth, language, place, gender, avatar, });
    return response.data;
  } catch (error) {
    console.log(error, 'signup error');
    throw error;
  }
};

export const login = async (email, password) => {
  try {
    console.log(env_dev + 'user/login', email, password);
    const response = await HTTP_REQUEST.post('user/login', {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.log(error.message, 'login error');
    throw error;
  }
};

export const CreatePost = async data => {
  return commonRequest('POST', 'user/createPost/1', data, {
    'Content-Type': 'multipart/form-data',
  });
};

export const getAllPost = async () => {
  return commonRequest('GET', 'user/getAllpost');
};
export const getAllUserPost = async () => {
  return commonRequest('GET', 'user/getAllpost');
};
export const Createinterest = async (interestIds, userId) => {
  try {
    console.log(env_dev + 'user/createUserInterests', interestIds);
    const response = await HTTP_REQUEST.post(
      `user/createUserInterests/${userId}`,
      {
        interestIds,
      },
    );
    return response.data;
  } catch (error) {
    console.log(error.message, 'login error');
    throw error;
  }
};

export const CreateData = async (
  userName,
  role,
  dateOfBirth,
  gender,
  country,
  state,
  userid,
) => {
  console.log(userName, role, dateOfBirth, gender, country, state, userid);
  try {
    const response = await HTTP_REQUEST.post(
      `user/createUserDetails/${userid}`,
      {
        userName,
        role,
        dateOfBirth,
        gender,
        country,
        state,
      },
    );
    // const response = await HTTP_REQUEST.post(`users/createUser/665af7b8f324154d973d6a48`, { username, dateOfBirth, language, place, gender, avatar, });
    return response.data;
  } catch (error) {
    console.log(error, 'signup error');
    throw error;
  }
};
export const getallinterests = async () => {
  // https://politiks.aindriya.co.uk/user/getInterests
  try {
    const response = await HTTP_REQUEST.get('user/getInterests');
    return response.data;
  } catch (error) {
    console.log(error, 'user error');
    throw error;
  }
};

export const getfolowers = async userid => {
  try {
    const response = await HTTP_REQUEST.get(`user/getUserList/${userid}`);
    return response.data;
  } catch (error) {
    console.log(error, 'user error');
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

export const CreateFolowers = async (followerId, userId) => {
  try {
    console.log(env_dev + 'user/following', followerId);
    const response = await HTTP_REQUEST.post(`user/following/${userId}`, {
      followerId,
    });
    return response.data;
  } catch (error) {
    console.log(error.message, 'login error');
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
