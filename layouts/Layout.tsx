import { ReactElement } from 'react';
// chakra
import { Box, Flex } from '@chakra-ui/react';
// guards
import AuthGuard from '@guards/AuthGuard';
// components
import Header from '@components/Header';
import Sidebar from '@components/Sidebar';

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
          flexDirection="column"
          width="100wh"
          height="100vh"
          justifyContent="center"
          alignItems="center"
        >
          {children}
        </Flex>
      </Box>
    );
  else
    return (
      <AuthGuard>
        <Box>
          <Sidebar>{children}</Sidebar>
        </Box>
      </AuthGuard>
    );
};

export default Layout;
