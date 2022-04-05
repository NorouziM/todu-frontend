import axios from 'axios';
import { Fetcher } from 'swr';

const axiosInstance = axios.create({
  baseURL: process.env.HOST_API_KEY || '',
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) =>
    Promise.reject(
      (error.response && error.response.data) || 'Something went wrong'
    )
);

const fetcher: Fetcher = (url: string) =>
  axiosInstance.get(url).then((res) => res.data);

export default fetcher;
