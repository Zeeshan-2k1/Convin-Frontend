import axios from 'axios';
import { baseURL } from 'utils/constants';

export const axiosInstance = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
    timeout: 2000,
  },
});
