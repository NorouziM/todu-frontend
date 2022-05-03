import { useRouter } from 'next/router';
// chakra
import { Box, Divider, Stack, Text } from '@chakra-ui/react';
// swr
import useSWR, { SWRResponse } from 'swr';
// components
import NoData from '@components/NoData';
import Todo from '@components/Todo';
// hooks
import useCommonStyles from '@hooks/useCommonStyles';
import useLocales from '@hooks/useLocales';
// layouts
import DashboardLayout from '@layouts/DashboardLayout';
import Layout from '@layouts/Layout';
// utils
import { ICollectionSWR } from '@utils/interfaces';

const App = () => {
  const { query } = useRouter();
  const { data: collection } = useSWR<SWRResponse<ICollectionSWR>>(
    `api/v1/collection/${query.id}`
  );
  const { trans } = useLocales();
  const { text } = useCommonStyles();

  return (
    <Layout>
      {collection && collection.data ? (
        <DashboardLayout
          title={
            collection.data.collection.title === 'noCollection'
              ? trans.noCollection
              : collection.data.collection.title
          }
          hasGreeting={false}
        >
          <Text fontSize={'lg'} fontWeight="600" color={text}>
            {trans.tasks} -{' '}
            {collection.data.collection.totalTodos -
              collection.data.collection.doneTodos}
          </Text>
          <Stack spacing={4}>
            {collection.data.collection.todos.length ? (
              collection.data.collection.todos
                .filter((todo) => todo.isDone !== true)
                .map((todo) => (
                  <TodoBox key={todo._id}>
                    <Todo data={todo} />
                  </TodoBox>
                ))
            ) : (
              <NoData />
            )}
          </Stack>
          <Divider />
          <Text fontSize={'lg'} fontWeight="600" color={text}>
            {trans.completed} - {collection.data.collection.doneTodos}
          </Text>
          <Stack spacing={4}>
            {collection.data.collection.todos.length ? (
              collection.data.collection.todos
                .filter((todo) => todo.isDone === true)
                .map((todo) => (
                  <TodoBox key={todo._id}>
                    <Todo data={todo} />
                  </TodoBox>
                ))
            ) : (
              <NoData />
            )}
          </Stack>
        </DashboardLayout>
      ) : (
        <DashboardLayout isLoading hasGreeting={false}>
          <div></div>
        </DashboardLayout>
      )}
    </Layout>
  );
};

const TodoBox = ({ children, ...rest }: { children: React.ReactNode }) => {
  const { lighterBg } = useCommonStyles();

  return (
    <Box
      display={'flex'}
      alignItems={'center'}
      bgColor={lighterBg}
      p={3}
      py={5}
      boxShadow="md"
      borderRadius="lg"
      {...rest}
    >
      {children}
    </Box>
  );
};

export default App;
