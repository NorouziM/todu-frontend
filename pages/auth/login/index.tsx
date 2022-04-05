import { FormEvent, useEffect, useState } from 'react';
import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  chakra,
  Box,
  Link,
  Avatar,
  FormControl,
  FormHelperText,
  InputRightElement,
  Spacer,
  useColorModeValue,
} from '@chakra-ui/react';
import { EmailIcon, LockIcon } from '@chakra-ui/icons';
import useAuth from '@hooks/useAuth';
import { useRouter } from 'next/router';
import Layout from '@layouts/Layout';
import LayoutBox from '@components/LayoutBox';

const App = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const { login, isAuthenticated } = useAuth();
  const { push } = useRouter();
  const iconColor = useColorModeValue('gray.600', 'gray.200');

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    login(email, password);
  };

  useEffect(() => {
    if (isAuthenticated) push('/');
  }, [isAuthenticated, push]);

  return (
    <Layout varient="general">
      <Stack
        flexDir="column"
        mb="2"
        justifyContent="center"
        alignItems="center"
      >
        <Heading>Welcome</Heading>
        <LayoutBox>
          <form onSubmit={handleFormSubmit}>
            <Stack spacing={4} p="8">
              <FormControl isRequired>
                <InputGroup>
                  <InputLeftElement pointerEvents="none" color={iconColor}>
                    <LockIcon color="gray.100" />
                  </InputLeftElement>
                  <Input id="email" type="email" />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement pointerEvents="none" color="gray.300">
                    <LockIcon color="gray.100" />
                  </InputLeftElement>
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password"
                    onChange={(e) => setpassword(e.target.value)}
                  />
                </InputGroup>
                <Spacer py="4" />
              </FormControl>
              <Button
                type="submit"
                variant="solid"
                width="full"
                colorScheme={'primary'}
              >
                Login
              </Button>
            </Stack>
          </form>
        </LayoutBox>
      </Stack>
      <Box>
        New to us?{' '}
        <Link color="teal.500" href="#">
          Sign Up
        </Link>
      </Box>
    </Layout>
  );
};

export default App;
