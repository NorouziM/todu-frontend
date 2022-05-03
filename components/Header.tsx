// next
import Link from 'next/link';
import { useRouter } from 'next/router';
// chakra
import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  Link as ChakraLink,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
  useColorMode,
  Menu,
  MenuButton,
  Avatar,
  MenuItem,
  MenuList,
  MenuDivider,
} from '@chakra-ui/react';
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  MoonIcon,
  SunIcon,
} from '@chakra-ui/icons';
// hooks
import useLocales from '@hooks/useLocales';
import useAuth from '@hooks/useAuth';
import useCommonStyles from '@hooks/useCommonStyles';
// utils
import { PATH_AUTH } from '@utils/paths';
import { IAuthData } from '@utils/interfaces';
import AddTodoBtn from './AddTodoBtn';

interface IProps {
  isDashboard?: boolean;
}

interface INavItem {
  label: string;
  subLabel?: string;
  children?: Array<INavItem>;
  href: string;
}

export default function Header({ isDashboard }: IProps) {
  const { isOpen, onToggle } = useDisclosure();
  const { trans, nextLang } = useLocales();
  const { colorMode, toggleColorMode } = useColorMode();
  const { isAuthenticated, user, logout }: IAuthData = useAuth();
  const { pathname, push, asPath } = useRouter();
  const { text, bg, textDark, lighterBg } = useCommonStyles();

  const logoTextAlign = useBreakpointValue({ base: 'center', md: 'left' });

  const NAV_ITEMS: Array<INavItem> = [
    ...(isAuthenticated
      ? [
          {
            label: trans.dashboard,
            href: '/dashboard',
          },
        ]
      : []),
  ];

  const handleClickLogOut = () => {
    logout();
    push(PATH_AUTH.login);
  };

  return (
    <Box w={'full'}>
      <Flex
        bg={lighterBg}
        color={text}
        minH={'60px'}
        w={'full'}
        py={{ base: 3 }}
        px={{ base: 3, md: 10 }}
        pl={{ md: isDashboard ? 4 : 10 }}
        shadow="md"
        align={'center'}
      >
        <Flex
          flex={{ base: 1, md: 'auto' }}
          ml={{ base: -2 }}
          display={{ base: 'flex', md: 'none' }}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={'ghost'}
            aria-label={'Toggle Navigation'}
          />
        </Flex>

        <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
          {!isDashboard && (
            <Text
              /* @ts-ignore */
              textAlign={logoTextAlign || 'center'}
              fontFamily={'heading'}
              fontSize={['xl', '2xl']}
              color={textDark}
            >
              {trans.todu.toUpperCase()}
            </Text>
          )}
          <Flex display={{ base: 'none', md: 'flex' }}>
            <DesktopNav navItems={NAV_ITEMS} isDashboard={!!isDashboard} />
          </Flex>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={'flex-end'}
          direction={'row'}
          alignContent={'center'}
          alignItems={'center'}
          spacing={6}
        >
          <Stack
            spacing={0}
            borderRadius={'lg'}
            bg={bg}
            flex={{ base: 1 }}
            justify={'center'}
            alignItems={'center'}
            direction={'row'}
          >
            <Button
              fontSize={['sm', 'md']}
              onClick={toggleColorMode}
              variant={'link'}
              p={4}
            >
              {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
            </Button>
            <Link href={asPath} locale={nextLang} passHref>
              <Button fontSize={['sm', 'md']} variant="gray" bg={bg}>
                <Text mt={2} color={text}>
                  {nextLang.toUpperCase()}
                </Text>
              </Button>
            </Link>
          </Stack>
          {!isAuthenticated ? (
            <>
              <Link href={'/auth/login'} passHref>
                <Button
                  as={'a'}
                  fontSize={['sm', 'md']}
                  fontWeight={400}
                  variant={'link'}
                  color={text}
                >
                  {trans.signIn}
                </Button>
              </Link>
              <Link href={'/auth/register'} passHref>
                <Button
                  display={{ base: 'none', md: 'inline-flex' }}
                  fontSize={['sm', 'md']}
                  fontWeight={600}
                  color={'light.100'}
                >
                  {trans.signUp}
                </Button>
              </Link>
            </>
          ) : (
            <Menu>
              <MenuButton
                as={Button}
                rounded={'full'}
                variant={'link'}
                cursor={'pointer'}
                minW={0}
              >
                <Avatar size={'sm'} src={user.avatarUrl} />
              </MenuButton>
              <MenuList>
                <Stack px={3} py={2} spacing={-1}>
                  <Text color={textDark} fontSize={'sm'}>
                    {`${trans.hi} ${user.firstName}!`}
                  </Text>
                  <Text color={text} fontSize={'sm'}>
                    {user.email}
                  </Text>
                </Stack>
                <MenuItem>Link 1</MenuItem>
                <MenuItem>Link 2</MenuItem>
                <MenuDivider />
                <MenuItem onClick={handleClickLogOut}>{trans.logout}</MenuItem>
              </MenuList>
            </Menu>
          )}
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav navItems={NAV_ITEMS} />
      </Collapse>
    </Box>
  );
}

interface IDesProps {
  navItems: Array<INavItem>;
  isDashboard: boolean;
}

const DesktopNav = ({ navItems, isDashboard }: IDesProps) => {
  const linkColor = useColorModeValue('gray.600', 'gray.200');
  const linkHoverColor = useColorModeValue('gray.800', 'light.100');

  return (
    <Stack
      direction={'row'}
      alignItems={'center'}
      justifyContent={'space-between'}
    >
      {!isDashboard &&
        navItems.map((navItem) => (
          <>
            <Box key={navItem.label}>
              <Link href={navItem.href} passHref>
                <ChakraLink
                  p={2}
                  href={navItem.href ?? '#'}
                  fontSize={'sm'}
                  fontWeight={500}
                  color={linkColor}
                  _hover={{
                    textDecoration: 'none',
                    color: linkHoverColor,
                  }}
                >
                  {navItem.label}
                </ChakraLink>
              </Link>
            </Box>
          </>
        ))}
      {isDashboard && (
        <Box
          display={{ base: 'none', md: 'flex' }}
          justifyContent={'flex-start'}
          m={0}
        >
          <AddTodoBtn />
        </Box>
      )}
    </Stack>
  );
};

interface IMobileProps {
  navItems: Array<INavItem>;
}

const MobileNav = ({ navItems }: IMobileProps) => {
  const { bg, text } = useCommonStyles();
  const { isAuthenticated, user } = useAuth();

  return (
    <Stack bg={bg} p={4} display={{ md: 'none' }}>
      {navItems.map((navItem: INavItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
      {isAuthenticated && (
        <Text color={text} fontSize={'sm'}>
          {user.email}
        </Text>
      )}
    </Stack>
  );
};

const MobileNavItem = ({ label, children, href }: INavItem) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex
        py={2}
        as={ChakraLink}
        href={href ?? '#'}
        justify={'space-between'}
        align={'center'}
        _hover={{
          textDecoration: 'none',
        }}
      >
        <Text
          fontWeight={600}
          color={useColorModeValue('gray.600', 'gray.200')}
        >
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={'all .25s ease-in-out'}
            transform={isOpen ? 'rotate(180deg)' : ''}
            w={6}
            h={6}
          />
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={'solid'}
          borderColor={useColorModeValue('gray.200', 'gray.700')}
          align={'start'}
        >
          {children &&
            children.map((child) => (
              <Link key={child.label} href={child.href}>
                {child.label}
              </Link>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};
