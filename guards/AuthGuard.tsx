import PropTypes from 'prop-types';
// chakra
import { Heading } from '@chakra-ui/react';
// next
import { useRouter } from 'next/router';
// utils
import { PATH_AUTH, PATH_DASHBOARD } from '@utils/paths';
// hooks
import useAuth from '@hooks/useAuth';
import { IAuthData } from '@utils/interfaces';

// ----------------------------------------------------------------------

AuthGuard.propTypes = {
  children: PropTypes.node,
};

interface Props {
  children: React.ReactNode;
}

export default function AuthGuard({ children }: Props) {
  const { isAuthenticated, isInitialized }: IAuthData = useAuth();

  const { pathname, push } = useRouter();

  if (!isInitialized) {
    return <Heading color={'primary.100'}>Loading</Heading>;
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
