import CollectionBox from '@components/CollectionBox';
import fetcher from '@utils/fetcher';
import { PAGE_SIZE } from '@utils/helpers';
import React, { useState } from 'react';
import useSWR from 'swr';

const TodayTodos = () => {
  const [page, setPage] = useState(1);
  const { data: todos, error } = useSWR(`api/v1/todos/user?page=${page}`);
  return <CollectionBox />;
};

export default TodayTodos;
