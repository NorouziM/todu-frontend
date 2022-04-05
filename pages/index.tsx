import { useEffect } from 'react';
// next
import type { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
// chakra
import { Box, Button, chakra, Heading } from '@chakra-ui/react';
// hooks
import useLocales from '@hooks/useLocales';
// gurds
import AuthGuard from 'guards/AuthGuard';
// layout
import Layout from '@layouts/Layout';

const Home: NextPage = () => {
  const { currentLang, nextLang, trans } = useLocales();
  const { pathname } = useRouter();

  useEffect(() => {
    document.body.dir = currentLang === 'fa' ? 'rtl' : 'ltr';
  }, [currentLang]);

  return (
    <Layout>
      <Box>
        <Link href={pathname} locale={nextLang}>
          Hi
        </Link>
      </Box>
    </Layout>
  );
};

export default Home;
