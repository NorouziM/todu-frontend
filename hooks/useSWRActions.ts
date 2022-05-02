import useSWR from 'swr';

export const useCollections = () => {
  const { data, error, mutate } = useSWR(`api/v1/collection`);

  return {
    data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
};
