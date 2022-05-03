import React from 'react';
// next
import Link from 'next/link';
// chakra
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Text,
  Skeleton,
  Flex,
  Icon,
  Divider,
  Stack,
  Box,
} from '@chakra-ui/react';
// swr
import useSWR, { SWRResponse } from 'swr';
// icons
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
// components
import NoData from './NoData';
import Todo from './Todo';
// hooks
import useCommonStyles from '@hooks/useCommonStyles';
import useLocales from '@hooks/useLocales';
// uti;s
import { ICollectionData } from '@utils/interfaces';

interface IProps {
  dateType: 'today' | 'next7Days' | 'inbox';
  collection: ICollectionData;
  collectionIndexes: Array<number> | null;
}

const CollectionBox = ({ dateType, collection, collectionIndexes }: IProps) => {
  const { data: todos } = useSWR<SWRResponse<ICollectionData>>(
    `api/v1/todos/${collection._id}?type=${dateType}`
  );

  const { trans, currentLang } = useLocales();
  const { boxBg, navBg, darkBoxBg, textDark } = useCommonStyles();
  return (
    <>
      {!collectionIndexes && (
        <Accordion
          defaultIndex={collectionIndexes ?? [0]}
          allowMultiple
          allowToggle
        >
          <AccordionItem mb={10} border={0} borderWidth={0}>
            <Skeleton height="200px" borderRadius={'lg'} />
          </AccordionItem>
        </Accordion>
      )}
      {collectionIndexes && (
        <Accordion defaultIndex={collectionIndexes} allowMultiple allowToggle>
          {collection ? (
            <AccordionItem
              key={collection._id}
              mb={10}
              border={0}
              borderWidth={0}
            >
              <AccordionButton
                bgColor={boxBg}
                _hover={{ bgColor: darkBoxBg }}
                _focus={{ boxShadow: 'none' }}
                py={4}
                px={6}
                borderTopRadius={'lg'}
                borderColor={'transparent'}
              >
                <Stack
                  flex={1}
                  pr={[1, 3, 4]}
                  justifyContent={'space-between'}
                  direction={'row'}
                >
                  <Text textAlign={'left'} fontSize={'lg'} fontWeight="900">
                    {collection.title === 'noCollection'
                      ? trans.noCollection
                      : collection.title}
                  </Text>
                  <Stack direction={'row'} alignItems="center">
                    <Text textAlign={'left'} fontSize={'lg'} fontWeight="600">
                      {collection.totalTodos !== collection.doneTodos &&
                        `${collection.totalTodos}/${collection.doneTodos}`}
                    </Text>
                    <Text fontWeight="400">
                      {collection.totalTodos !== collection.doneTodos
                        ? trans.done
                        : trans.allDone}
                    </Text>
                  </Stack>
                </Stack>

                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel pt={7} pb={5} bgColor={navBg}>
                {todos ? (
                  /* @ts-ignore */
                  todos.count ? (
                    /* @ts-ignore */
                    todos.data.todos.map((todo: ITodo) => {
                      return (
                        <Box key={todo._id} mb={5}>
                          <Todo data={todo} />
                        </Box>
                      );
                    })
                  ) : (
                    <NoData />
                  )
                ) : (
                  <Skeleton height={'80px'} />
                )}

                <Divider mt={10} mb={4} />
                <Flex justifyContent={'center'} alignItems="end">
                  <Link href={`/collections/${collection._id}`} passHref>
                    <Text
                      cursor={'pointer'}
                      transition={'all 0.3s'}
                      _hover={{ opacity: 0.7 }}
                      color={textDark}
                    >
                      {trans.goToCollection}
                      <Icon
                        transition={'0.3s all ease'}
                        fontSize="16"
                        top={'5px'}
                        position={'relative'}
                        _groupHover={{
                          color: 'gray.400',
                        }}
                        as={
                          currentLang !== 'fa'
                            ? MdKeyboardArrowRight
                            : MdKeyboardArrowLeft
                        }
                      />
                    </Text>
                  </Link>
                </Flex>
              </AccordionPanel>
            </AccordionItem>
          ) : (
            <Skeleton height="100px" borderRadius={'lg'} />
          )}
        </Accordion>
      )}
    </>
  );
};

export default CollectionBox;
