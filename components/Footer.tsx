import { ReactNode } from 'react';
// chakra
import {
  Box,
  chakra,
  Container,
  Stack,
  Text,
  useColorModeValue,
  VisuallyHidden,
} from '@chakra-ui/react';
import { FaGithub, FaTelegram } from 'react-icons/fa';
// hooks
import useCommonStyles from '@hooks/useCommonStyles';
import useLocales from '@hooks/useLocales';

const Logo = () => {
  const { trans } = useLocales();
  return (
    <Text fontWeight={'900'} fontSize="xl">
      {trans.todu}
    </Text>
  );
};

const SocialButton = ({
  children,
  label,
  href,
}: {
  children: ReactNode;
  label: string;
  href: string;
}) => {
  return (
    <chakra.button
      bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
      rounded={'full'}
      w={8}
      h={8}
      cursor={'pointer'}
      as={'a'}
      target={'_blank'}
      href={href}
      display={'inline-flex'}
      alignItems={'center'}
      justifyContent={'center'}
      transition={'background 0.3s ease'}
      _hover={{
        bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
      }}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};

export default function Footer() {
  const { navBg, text } = useCommonStyles();
  const { trans } = useLocales();

  return (
    <Box bg={navBg} color={text}>
      <Container
        as={Stack}
        maxW={'6xl'}
        py={4}
        direction={{ base: 'column', md: 'row' }}
        spacing={4}
        justify={{ base: 'center', md: 'space-between' }}
        align={{ base: 'center', md: 'center' }}
      >
        <Logo />
        <Text>
          {'© ' + new Date().getFullYear() + ' ' + trans.footerCopyright}
        </Text>
        <Stack direction={'row'} spacing={6}>
          <SocialButton label={'Telegram'} href={'https://t.me/EP_MNT'}>
            <FaTelegram />
          </SocialButton>
          <SocialButton label={'Github'} href={'https://github.com/NorouziM/'}>
            <FaGithub />
          </SocialButton>
        </Stack>
      </Container>
    </Box>
  );
}
