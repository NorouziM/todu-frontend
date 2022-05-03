import React, { useState } from 'react';
// swr
import { useSWRConfig } from 'swr';
// chakra
import { Badge, Checkbox, Stack, Text, useToast } from '@chakra-ui/react';
// moment
import moment from 'jalali-moment';
// network
import { updateTodo } from 'network/todo';
// utils
import { ITodo } from '@utils/interfaces';
import { mutatePartialKeys } from '@utils/helpers';
// hooks
import useCommonStyles from '@hooks/useCommonStyles';
import useLocales from '@hooks/useLocales';
import { useCollections } from '@hooks/useSWRActions';

interface IProps {
  data: ITodo;
}

const Todo = ({ data }: IProps) => {
  const { text, textLight } = useCommonStyles();
  const { trans, currentLang } = useLocales();
  const { mutate, cache } = useSWRConfig();

  const [isLoading, setisLoading] = useState(false);
  const toast = useToast();

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setisLoading(true);
    const error = await updateTodo(
      { isDone: (!data.isDone).toString() },
      data._id
    );
    setisLoading(false);
    if (!error) {
      mutatePartialKeys('api/v1/todos', cache, mutate);
      mutatePartialKeys('api/v1/collection', cache, mutate);

      toast({
        title: trans.operationnWasSuccessful,
        status: 'success',
        duration: 2000,
        isClosable: false,
      });
    } else {
      toast({
        title: error.message.toString(),
        status: 'error',
        duration: 2000,
        isClosable: false,
      });
    }
  };

  const isToday = data.dueDate
    ? moment(data.dueDate).isSame(moment(), 'day')
    : null;

  const getWeekDayWord = (date: Date) => {
    const weekDay = moment(date)
      .locale(currentLang || 'fa')
      .format('dddd');
    return weekDay;
  };

  const getColorScheme = React.useCallback(() => {
    if (data.dueDate) {
      if (isToday) return 'green';
      if (moment(data.dueDate).isBefore()) return 'primary';
      if (moment(data.dueDate).isAfter()) return 'blue';
    }
  }, [data.dueDate, isToday]);

  const getDateBadge = () => {
    if (isToday)
      return (
        <Badge
          colorScheme={getColorScheme()}
          borderRadius={'lg'}
          px={2.5}
          py={0.7}
        >
          {trans.today}
        </Badge>
      );
    if (data.dueDate) {
      if (moment(data.dueDate).isBefore())
        return (
          <Badge
            colorScheme={getColorScheme()}
            borderRadius={'lg'}
            px={2.5}
            py={0.7}
          >{`${getWeekDayWord(data.dueDate)} (${moment(data.dueDate)
            .locale(currentLang || 'fa')
            .format('YYYY/MM/DD')})`}</Badge>
        );
      else if (moment(data.dueDate).isAfter())
        return (
          <Badge
            colorScheme={getColorScheme()}
            borderRadius={'lg'}
            px={2.5}
            py={0.7}
          >
            {`${getWeekDayWord(data.dueDate)} (${moment(data.dueDate)
              .locale(currentLang || 'fa')
              .format('YYYY/MM/DD')})`}{' '}
          </Badge>
        );
    }
  };

  return (
    <Stack direction={'row'} zIndex={1}>
      <Checkbox
        colorScheme={data.dueDate ? getColorScheme() : 'primary'}
        alignItems={'start'}
        size="lg"
        spacing={5}
        value={data._id}
        borderRadius={'xl'}
        iconSize={100}
        isChecked={data.isDone}
        onChange={handleChange}
        _focus={{ boxShadow: 'none' }}
        disabled={isLoading}
        opacity={data.isDone ? 0.7 : 1}
      >
        <Stack direction={'column'} spacing={1}>
          <Stack direction={'row'} spacing={4} flexWrap="wrap">
            <Text
              as={data.isDone ? 'del' : 'p'}
              color={text}
              fontSize={'lg'}
              fontWeight={'700'}
            >
              {data.title}
            </Text>
            <Text color={textLight} opacity={0.8} fontWeight={'200'}>
              {data.content}
            </Text>
          </Stack>
          {data.dueDate && <Text>{getDateBadge()}</Text>}
        </Stack>
      </Checkbox>
    </Stack>
  );
};

export default Todo;
