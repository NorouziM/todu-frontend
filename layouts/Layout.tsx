import { ReactElement, useEffect, useState } from 'react';
import { Flex, Heading } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import useAuth from '@hooks/useAuth';
import AuthGuard from '@guards/AuthGuard';

type TVarient = 'dashboard' | 'general';

type Props = {
  children: ReactElement | ReactElement[];
  varient?: TVarient;
};

const Layout = ({ children, varient = 'dashboard', ...props }: Props) => {
  if (varient === 'general')
    return (
      <AuthGuard>
        <Flex
          flexDirection="column"
          width="100wh"
          height="100vh"
          justifyContent="center"
          alignItems="center"
        >
          {children}
        </Flex>
      </AuthGuard>
    );
  else
    return (
      <AuthGuard>
        <Flex
          direction="column"
          maxW={{ xl: '1200px' }}
          m="0 auto"
          p={6}
          {...props}
        >
          {children}
        </Flex>
      </AuthGuard>
    );
};

export default Layout;
