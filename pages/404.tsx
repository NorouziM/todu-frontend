import { Box, Heading, Text, Button } from '@chakra-ui/react';
import useLocales from '@hooks/useLocales';
import Layout from '@layouts/Layout';
import Link from 'next/link';

export default function NotFound() {
  const { trans } = useLocales();
  return (
    <Layout varient="general">
      <Box textAlign="center" py={10} px={6}>
        <Heading display="inline-block" as="h2" size="4xl">
          404
        </Heading>
        <Text fontSize="xl" my={5}>
          {trans.pageNotFound}
        </Text>

        <Link href={'/'} passHref>
          <Button size={'lg'} variant="gradient">
            {trans.goToHome}{' '}
          </Button>
        </Link>
      </Box>
    </Layout>
  );
}
