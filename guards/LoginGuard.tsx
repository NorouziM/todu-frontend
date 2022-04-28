import PropTypes from 'prop-types';
// chakra
import { Heading } from '@chakra-ui/react';
// next
import { useRouter } from 'next/router';
// utils
import { PATH_DASHBOARD } from '@utils/paths';
// hooks
import useAuth from '@hooks/useAuth';
// interfaces
import { IAuthData } from '@utils/interfaces';

// ----------------------------------------------------------------------

LoginGaurd.propTypes = {
  children: PropTypes.node,
};

interface Props {
  children: React.ReactNode;
}

export default function LoginGaurd({ children }: Props) {
  const { isAuthenticated, isInitialized }: IAuthData = useAuth();

  const { push } = useRouter();

  if (!isInitialized) {
    return <Heading color={'primary.100'}>Loading</Heading>;
  }

  if (isAuthenticated) {
    push(PATH_DASHBOARD.root);
    return null;
  }

  return <>{children}</>;
}
