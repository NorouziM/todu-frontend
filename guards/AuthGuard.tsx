import PropTypes from 'prop-types';
import { useState, useEffect, FC } from 'react';
// next
import { useRouter } from 'next/router';
// pages
import Login from '@pages/auth/login';
// hooks
import useAuth from '@hooks/useAuth';
import { Heading } from '@chakra-ui/react';

// ----------------------------------------------------------------------

AuthGuard.propTypes = {
  children: PropTypes.node,
};

interface Props {
  children: React.ReactNode;
}

export default function AuthGuard({ children }: Props) {
  const { isAuthenticated, isInitialized } = useAuth();

  const { pathname, push } = useRouter();

  if (!isInitialized) {
    return <Heading color={'primary.100'}>Loading</Heading>;
  }

  if (!isAuthenticated && !pathname.includes('/auth')) {
    push('/auth/login');
    return null;
  }

  if (isAuthenticated && pathname.includes('/auth')) {
    push('/');
    return null;
  }

  return <>{children}</>;
}
