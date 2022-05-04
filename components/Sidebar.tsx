import React, { ReactNode, ReactText } from 'react';
// next
import Link from 'next/link';
import { useRouter } from 'next/router';
// chakra
import {
  Box,
  Flex,
  Icon,
  useColorModeValue,
  Link as ChakraLink,
  Text,
  useDisclosure,
  BoxProps,
  FlexProps,
} from '@chakra-ui/react';
// icons
import { MdDashboard, MdCollections } from 'react-icons/md';
import { IconType } from 'react-icons';
// components
import Header from './Header';
import MobileNav from './MobileNav';
// utils
import { LinkItemProps } from '@utils/interfaces';
import { getGreetingText } from '@utils/helpers';
// hooks
import useCommonStyles from '@hooks/useCommonStyles';
import useLocales from '@hooks/useLocales';
import useAuth from '@hooks/useAuth';

export default function Sidebar({ children }: { children: ReactNode }) {
  const { isOpen, onClose } = useDisclosure();
  const { bg } = useCommonStyles();
  const { trans } = useLocales();
  const LinkItems: Array<LinkItemProps> = [
    { name: trans.dashboard, icon: MdDashboard, href: `/dashboard` },
    {
      name: trans.collections,
      icon: MdCollections,
      href: `/collections`,
    },
  ];

  return (
    <Box minH="100vh" bg={bg} w={'full'} position="relative">
      <SidebarContent
        LinkItems={LinkItems}
        onClose={() => onClose}
        display={{ base: 'none', md: 'block' }}
      />
      <Box ml={{ base: 0, md: 60 }}>
        <Header isDashboard={true} />
        <Box display={{ md: 'none' }}>
          <MobileNav />
        </Box>
        <Flex
          direction="column"
          maxW={{ xl: '1100px' }}
          m="0 auto"
          px={{ base: 5, md: 10, xl: 12 }}
          py={{ base: 8, md: 12 }}
          pb={{ base: 16, md: 12 }}
        >
          {children}
        </Flex>
      </Box>
    </Box>
  );
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
  LinkItems: Array<LinkItemProps>;
}

const SidebarContent = ({ LinkItems, onClose, ...rest }: SidebarProps) => {
  const { text, lighterBg } = useCommonStyles();
  const { trans } = useLocales();
  const { user } = useAuth();

  return (
    <Box
      transition="0.3s ease"
      bg={lighterBg}
      shadow="md"
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.100', 'gray.900')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex
        h="24"
        alignItems="center"
        my="8"
        justifyContent="start"
        direction={'column'}
      >
        <Link href={'/'} passHref>
          <Text cursor={'pointer'} color={text} fontSize="2xl" fontWeight="900">
            {trans.todu}
          </Text>
        </Link>
        <Text color={text} fontSize="lg" mt={'1'}>{`${
          trans[getGreetingText()]
        } ${user.firstName}!`}</Text>
      </Flex>
      {LinkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon} href={link.href}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

interface NavItemProps extends FlexProps {
  icon: IconType;
  href: string;
  children: ReactText;
}
const NavItem = ({ icon, href, children, ...rest }: NavItemProps) => {
  const { pathname } = useRouter();
  const { text } = useCommonStyles();
  return (
    <Link href={href} passHref>
      <ChakraLink
        style={{ textDecoration: 'none' }}
        _focus={{ boxShadow: 'none' }}
      >
        <Flex
          align="center"
          p="4"
          mx="4"
          my="4"
          borderRadius="lg"
          bg={(pathname.includes(href) && 'primary.400') || 'transparent'}
          color={(pathname.includes(href) && 'white') || text}
          role="group"
          cursor="pointer"
          _hover={{
            bg: 'primary.600',
            color: 'white',
          }}
          {...rest}
        >
          {icon && (
            <Icon
              mr="4"
              fontSize="16"
              _groupHover={{
                color: 'white',
              }}
              as={icon}
            />
          )}
          {children}
        </Flex>
      </ChakraLink>
    </Link>
  );
};
