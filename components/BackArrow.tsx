// next
import { useRouter } from 'next/router';
// chakra
import { Flex, Icon } from '@chakra-ui/react';
// hooks
import useCommonStyles from '@hooks/useCommonStyles';
import useLocales from '@hooks/useLocales';
// icpns
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';

const BackArrow = () => {
  const router = useRouter();
  const { boxBg } = useCommonStyles();
  const { currentLang } = useLocales();

  return (
    <Flex
      onClick={router.back}
      cursor={'pointer'}
      transition={'0.3s all ease'}
      bg={boxBg}
      h="8"
      w="8"
      justifyContent={'center'}
      alignItems={'center'}
      borderRadius={'lg'}
      role="group"
    >
      <Icon
        transition={'0.3s all ease'}
        fontSize="26"
        _groupHover={{
          color: 'gray.400',
        }}
        as={currentLang === 'fa' ? MdKeyboardArrowRight : MdKeyboardArrowLeft}
      />
    </Flex>
  );
};

export default BackArrow;
