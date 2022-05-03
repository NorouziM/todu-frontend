import React, { useMemo } from 'react';
// next
import Link from 'next/link';
// chakra
import {
  Box,
  CircularProgress,
  CircularProgressLabel,
  Stack,
  Text,
} from '@chakra-ui/react';
// moment
import moment from 'jalali-moment';
// hooks
import useCommonStyles from '@hooks/useCommonStyles';
import useLocales from '@hooks/useLocales';
// persian tools
import { digitsEnToFa } from '@persian-tools/persian-tools';
// utils
import { ICollectionData } from '@utils/interfaces';

interface IProps {
  data: ICollectionData;
}

const CollectionInfoBox = ({ data }: IProps) => {
  const { text, boxBg, navBg } = useCommonStyles();
  const { trans, currentLang } = useLocales();

  const dateAdded = useMemo(
    () =>
      moment(data.dateAdded)
        .locale(currentLang || 'fa')
        .format('YYYY/MM/DD'),
    [currentLang, data.dateAdded]
  );

  return (
    <Link href={`collections/${data._id}`} passHref>
      <Box
        cursor="pointer"
        borderWidth="2px"
        borderColor={navBg}
        bgColor={navBg}
        borderRadius="xl"
        boxShadow="md"
        justifyContent={'center'}
        display="flex"
        fontSize={'sm'}
        color={text}
        _focus={{
          boxShadow: '0 0 0 4px rgba(65, 64, 82, 0.4)',
        }}
        p={6}
        mr={2}
        my={2}
        h={200}
        minW={[40, '180px', '200px', '220px']}
        alignItems="center"
      >
        <Stack
          spacing={{ base: 5, md: 7 }}
          justifyContent={'space-between'}
          w={'full'}
        >
          <Stack
            direction={'row'}
            alignItems={'start'}
            justifyContent="space-between"
          >
            <Stack justify={'center'} alignItems="center">
              <CircularProgress
                value={data.doneTodosPercentage}
                size={20}
                color={'primary.main'}
                thickness="12px"
              >
                <CircularProgressLabel fontSize={'md'} fontWeight="400">
                  {currentLang === 'fa'
                    ? digitsEnToFa(data.doneTodosPercentage)
                    : data.doneTodosPercentage}
                  %
                </CircularProgressLabel>
              </CircularProgress>
            </Stack>
            <Stack spacing={1}>
              <Text fontSize={'xsm'} fontWeight="400" opacity={0.8}>
                {trans.dateCreation}:
              </Text>
              <Text fontSize={'xsm'}>
                {currentLang === 'fa' ? digitsEnToFa(dateAdded) : dateAdded}
              </Text>
            </Stack>
          </Stack>
          <Stack justifyContent={'start'}>
            <Text as="h2" size="2xl" fontWeight={'700'}>
              {data.title === 'noCollection' ? trans.noCollection : data.title}
            </Text>
            <Stack
              direction={'row'}
              opacity={0.7}
              alignItems="center"
              justifyContent={'space-between'}
            >
              <Text fontSize={'sm'} fontWeight="400">
                {data.totalTodos !== data.doneTodos
                  ? `${
                      currentLang === 'fa'
                        ? digitsEnToFa(data.totalTodos)
                        : data.totalTodos
                    }/${
                      currentLang === 'fa'
                        ? digitsEnToFa(data.doneTodos)
                        : data.doneTodos
                    } ${trans.done}`
                  : trans.allDone}
              </Text>
            </Stack>
          </Stack>
        </Stack>
      </Box>
    </Link>
  );
};

export default CollectionInfoBox;
