// next
import type { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
// chakra
import {
  Container,
  Button,
  Text,
  Flex,
  Heading,
  Stack,
} from '@chakra-ui/react';
// hooks
import useLocales from '@hooks/useLocales';
import useAuth from '@hooks/useAuth';
// layout
import Layout from '@layouts/Layout';
// components
import { Illustration } from '@components/HomeIllustration';
// utils
import { PATH_AUTH, PATH_DASHBOARD } from '@utils/paths';
import { IAuthData } from '@utils/interfaces';

const Home: NextPage = () => {
  const { pathname } = useRouter();
  const { trans } = useLocales();
  const { isAuthenticated }: IAuthData = useAuth();

  return (
    <Layout varient="general">
      <Container maxW={'5xl'}>
        <Stack
          textAlign={'center'}
          align={'center'}
          spacing={{ base: 8, md: 10 }}
          py={{ base: 20, md: 28 }}
        >
          <Heading
            fontWeight={600}
            mt={10}
            fontSize={{ base: '3xl', sm: '4xl', md: '6xl' }}
            lineHeight={'110%'}
          >
            {trans.homeTitle}
            <Text as={'span'} color={'primary.main'}>
              {trans.todu}
            </Text>
          </Heading>
          <Text fontSize="xl" maxW={'3xl'}>
            {trans.homeDescription}
          </Text>
          <Link
            href={isAuthenticated ? PATH_DASHBOARD.root : PATH_AUTH.login}
            passHref
          >
            <Button variant={'gradient'}>{trans.letsGo}</Button>
          </Link>

          <Flex w={'full'}>
            <Illustration
              height={{ sm: '24rem', lg: '28rem' }}
              mt={{ base: 12, sm: 16 }}
            />
          </Flex>
        </Stack>
      </Container>
    </Layout>
  );
};

export default Home;
