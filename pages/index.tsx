import { Box, Button, chakra } from '@chakra-ui/react'
import useLocales from '@hooks/useLocales'
import type { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Home: NextPage = () => {
  const { currentLang, nextLang, trans } = useLocales();
  const {pathname} = useRouter();

  useEffect(() => {
    document.body.dir = currentLang === 'fa' ? 'rtl' : 'ltr';
  }, [currentLang])

  const ChakraLink = chakra(Link);

  return (
    <Box mr={3} fontSize='6xl'>
      <Button>Hi</Button>
      <ChakraLink  href={pathname} locale={nextLang}>{trans.title}</ChakraLink>
    </Box>
  )
}

export default Home
