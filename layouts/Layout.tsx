import { ReactElement } from 'react';
// chakra
import { Box, Flex } from '@chakra-ui/react';
// guards
import AuthGuard from '@guards/AuthGuard';
// components
import Header from '@components/Header';
import Sidebar from '@components/Sidebar';
import Footer from '@components/Footer';

type TVarient = 'dashboard' | 'general';

type Props = {
  children: ReactElement | ReactElement[];
  varient?: TVarient;
};

const Layout = ({ children, varient = 'dashboard', ...props }: Props) => {
  if (varient === 'general')
    return (
      <Box>
        <Header />
        <Flex
          py={5}
          flexDirection="column"
          width="100wh"
          height="full"
          minH={'90vh'}
          justifyContent="center"
          alignItems="center"
        >
          {children}
        </Flex>
        <Footer />
      </Box>
    );
  else
    return (
      <AuthGuard>
        <Box minH={'95vh'}>
          <Sidebar>{children}</Sidebar>
          <Footer />
        </Box>
      </AuthGuard>
    );
};

export default Layout;
