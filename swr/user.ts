import useSWR from 'swr';
import fetcher from '@utils/fetcher';

export const useLogin = () => {
  const { data, error } = useSWR(`/api/v1/auth/login`, fetcher);

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
};
