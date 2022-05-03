import useSWR from 'swr';

export const getCollectionsKey = `api/v1/collection`;

export const useCollections = () => {
  const { data, error, mutate } = useSWR(getCollectionsKey);

  return {
    data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
};
