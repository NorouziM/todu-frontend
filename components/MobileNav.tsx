// next
import Link from 'next/link';
import { useRouter } from 'next/router';
// chakra
import { Box, Flex, Icon } from '@chakra-ui/react';
// icons
import { MdCollections, MdDashboard } from 'react-icons/md';
// components
import AddTodoBtn from '@components/AddTodoBtn';
// hooks
import useCommonStyles from '@hooks/useCommonStyles';
import useLocales from '@hooks/useLocales';

const MobileNav = () => {
  const { trans } = useLocales();
  const { textDark, text, navBg } = useCommonStyles();
  const { pathname } = useRouter();

  return (
    <Box position={'fixed'} bottom={0} w={'full'} boxShadow={'lg'} zIndex={2}>
      <Flex
        bgColor={navBg}
        borderRadius={'lg'}
        py={2}
        px={10}
        pb={3}
        alignItems={'center'}
        justifyContent={'space-around'}
      >
        <Link href="dashboard" passHref>
          <Icon
            bgColor={'transparent'}
            color={text}
            opacity={pathname.includes('dashboard') ? 1 : 0.6}
            w={7}
            h={7}
            as={MdDashboard}
            aria-label={trans.dashboard}
          ></Icon>
        </Link>
        <Box position={'relative'} top={-3}>
          <AddTodoBtn size={40} />
        </Box>
        <Link href="collections" passHref>
          <Icon
            bgColor={'transparent'}
            opacity={pathname.includes('collections') ? 1 : 0.6}
            color={text}
            w={7}
            h={7}
            as={MdCollections}
            aria-label={trans.dashboard}
          ></Icon>
        </Link>
      </Flex>
    </Box>
  );
};

export default MobileNav;
