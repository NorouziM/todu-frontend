import PropTypes from 'prop-types';
// chakra
import {
  CircularProgress,
  CircularProgressLabel,
  Flex,
} from '@chakra-ui/react';
// next
import { useRouter } from 'next/router';
// utils
import { PATH_AUTH, PATH_DASHBOARD } from '@utils/paths';
// hooks
import useAuth from '@hooks/useAuth';
import { IAuthData } from '@utils/interfaces';
import useLocales from '@hooks/useLocales';

// ----------------------------------------------------------------------

AuthGuard.propTypes = {
  children: PropTypes.node,
};

interface Props {
  children: React.ReactNode;
}

export default function AuthGuard({ children }: Props) {
  const { isAuthenticated, isInitialized }: IAuthData = useAuth();
  const { trans } = useLocales();
  const { pathname, push } = useRouter();

  if (!isInitialized) {
    return (
      <Flex justify={'center'} align="center" h={'90vh'} w={'full'}>
        <CircularProgress
          isIndeterminate
          trackColor="transparent"
          color="primary.main"
          size={60}
          thickness="6px"
        >
          <CircularProgressLabel fontSize={'lg'}>
            {trans.loading}
          </CircularProgressLabel>
        </CircularProgress>
      </Flex>
    );
  }

  if (!isAuthenticated && !pathname.includes('/auth')) {
    push(PATH_AUTH.login);
    return null;
  }

  if (isAuthenticated && pathname.includes('/auth')) {
    push(PATH_DASHBOARD.root);
    return null;
  }

  return <>{children}</>;
}
