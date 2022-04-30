import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Text,
  Skeleton,
  Box,
  Flex,
  Icon,
} from '@chakra-ui/react';
import useCommonStyles from '@hooks/useCommonStyles';
import useLocales from '@hooks/useLocales';
import { useCollections } from '@hooks/useSWRActions';
import { ICollectionData } from '@utils/interfaces';
import Link from 'next/link';
import React from 'react';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';

const CollectionBox = () => {
  const { data: collections, isLoading } = useCollections();
  const { trans, currentLang } = useLocales();
  const { boxBg, lighterBg, darkBoxBg, textDark, text } = useCommonStyles();
  return (
    <Accordion defaultIndex={[0, 1]} allowMultiple allowToggle>
      {collections ? (
        collections.data.collections.map(
          (collection: ICollectionData, index: number) => (
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
                <Box flex={1}>
                  <Text textAlign={'left'}>{collection.title}</Text>
                </Box>

                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel py={7} bgColor={lighterBg}>
                <Text textAlign={'left'}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </Text>
                <Flex justifyContent={'center'} mt={8}>
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
          )
        )
      ) : (
        <Skeleton height="100px" borderRadius={'lg'} />
      )}
    </Accordion>
  );
};

export default CollectionBox;
