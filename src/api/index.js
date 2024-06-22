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

export const googleregister = async (userName, email, googleId) => {
  console.log(userName, email, googleId, env_dev + 'user/register');
  try {
    const response = await HTTP_REQUEST.post('user/register', {
      userName,
      email,
      googleId,
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

export const CreatePost = (async = (data, userId) => {
  return commonRequest('POST', `user/createPost/${userId}`, data, {
    'Content-Type': 'multipart/form-data',
  });
});

export const getAllPost = async () => {
  return commonRequest('GET', 'user/getAllpost');
};
export const getAllUserPost = async userId => {
  console.log(userId);
  return commonRequest('GET', `user/getUserDetails/${userId}`);
};

export const getAllUserImages = async userId => {
  return commonRequest('GET', `user/getUserAllPostsByUserId/${userId}`);
};

export const getProfileInterests = async () => {
  return commonRequest('GET', `user/getInterests`);
};

export const setUserDetails = async (data, userId) => {
  return commonRequest('PUT', `user/updateUserDetails/${userId}`, data, {
    'Content-Type': 'multipart/form-data',
  });
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

export const CheckuserAvailability = async (userName, userId) => {
  try {
    console.log(env_dev + 'user/checkUsername', userName);
    const response = await HTTP_REQUEST.post(`user/checkUsername`, {
      userName,
    });
    return response.data;
  } catch (error) {
    console.log(error.message, 'login error');
    throw error;
  }
};

export const forgotPassword = async email => {
  try {
    console.log('https://politiks.aindriya.co.uk/user/forgetPassword', email);
    const response = await HTTP_REQUEST.post(`user/forgetPassword`, {
      email,
    });
    return response.data;
  } catch (error) {
    console.log(error.message, 'login error');
    throw error;
  }
};
export const verifyOtp = async (email, otp) => {
  console.log(email, otp);
  try {
    console.log(email, otp);
    const response = await HTTP_REQUEST.post(`user/verifyOtp`, {
      email,
      otp,
    });
    return response.data;
  } catch (error) {
    console.log(error.message, 'login error');
    throw error;
  }
};
export const createpassword = async (email, password) => {
  console.log(email, password);
  try {
    const response = await HTTP_REQUEST.post(`user/createPassword`, {
      email,
      password,
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
