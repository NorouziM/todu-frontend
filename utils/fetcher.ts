import { Fetcher } from 'swr';
import axiosInstance from './axios';

const fetcher: Fetcher = (url: string) =>
  axiosInstance.get(url).then((res) => res.data);

export default fetcher;
