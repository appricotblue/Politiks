import axios from 'axios';
import {env_dev} from '../env/Dev';

const BASE_URL = env_dev;

export const commonRequest = async (method, url, body, header, params) => {
  let config = {
    method,
    url: `${BASE_URL}${url}`,
    headers: header ? header : {'Content-Type': 'application/json'},
    data: body && body,
    params: params && params,
  };
  try {
    const response = await axios(config);
    return response;
  } catch (error) {
    return error.response ? error.response : error; // Provide more context if possible
  }
};
