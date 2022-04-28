import { useEffect } from 'react';
// next
import { useRouter } from 'next/router';
import Link from 'next/link';
// yup
import * as Yup from 'yup';
// chakra
import {
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  Box,
  Text,
  FormControl,
  InputRightElement,
  Link as ChakraLink,
  useToast,
  useBoolean,
} from '@chakra-ui/react';
// form
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// hooks
import useAuth from '@hooks/useAuth';
import useLocales from '@hooks/useLocales';
// guards
import LoginGaurd from '@guards/LoginGuard';
// components
import Layout from '@layouts/Layout';
// utils
import { AFTER_LOGIN_ROUTE, PATH_AUTH } from '@utils/paths';
import { IAuthData } from '@utils/interfaces';

type FormData = {
  email: string;
  password: string;
};

const App = () => {
  const { trans, currentLang } = useLocales();
  const { login, isAuthenticated }: IAuthData = useAuth();
  const { push } = useRouter();
  const toast = useToast();
  const [isShowPass, setIsShowPass] = useBoolean();

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email(trans.emailMustBeValid)
      .required(trans.emailIsRequired),
    password: Yup.string().required(trans.passwordIsRequired),
  });

  const methods = useForm<FormData>({
    resolver: yupResolver(LoginSchema),
  });

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      await login(data.email, data.password);
    } catch (error: any) {
      toast({
        title: error.data?.message || error.toString(),
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      toast({
        title: trans.youSuccessfullySignedIn,
        status: 'success',
        duration: 2000,
        isClosable: false,
      });

      push(AFTER_LOGIN_ROUTE);
    }
  }, [isAuthenticated, push, toast, trans.youSuccessfullySignedIn]);

  return (
    <LoginGaurd>
      <Layout varient="general">
        <Stack spacing={8} mx={'auto'} maxW={'xl'} py={12} px={6}>
          <Stack align={'center'} minW={['20rem', 'md']}>
            <Heading fontSize={['2xl', '4xl']}>{trans.signInToAccount}</Heading>
            <Text fontSize={'lg'} color={'gray.600'}>
              {trans.loginToUse}
            </Text>
            <Link href={PATH_AUTH.register} passHref>
              <ChakraLink>{trans.clickToSignUp}</ChakraLink>
            </Link>
          </Stack>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box p={8}>
              <Stack spacing={4}>
                <FormControl id="email">
                  <Controller
                    name={'email'}
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                      <Input
                        {...field}
                        type="email"
                        placeholder={trans.email}
                        isRequired
                        isInvalid={!!error}
                      />
                    )}
                  />
                </FormControl>
                <FormControl id="password">
                  <Controller
                    name={'password'}
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                      <InputGroup>
                        <Input
                          p={4}
                          {...field}
                          type={isShowPass ? 'text' : 'password'}
                          placeholder={trans.password}
                          isRequired
                          isInvalid={!!error}
                        />
                        {currentLang === 'en' ? (
                          <InputRightElement width="4.5rem">
                            <Button
                              size="xsm"
                              variant={'gray'}
                              onClick={setIsShowPass.toggle}
                            >
                              {isShowPass ? trans.hide : trans.show}
                            </Button>
                          </InputRightElement>
                        ) : (
                          <InputLeftElement width="4.5rem">
                            <Button
                              size="xsm"
                              variant={'gray'}
                              onClick={setIsShowPass.toggle}
                            >
                              {isShowPass ? trans.hide : trans.show}
                            </Button>
                          </InputLeftElement>
                        )}
                      </InputGroup>
                    )}
                  />
                </FormControl>
                <Stack spacing={10}>
                  <Stack
                    direction={{ base: 'column', sm: 'row' }}
                    align={'start'}
                    justify={'space-between'}
                  >
                    <Link href={PATH_AUTH.register} passHref>
                      <ChakraLink color={'dark.100'}>
                        {trans.forgotPass}
                      </ChakraLink>
                    </Link>
                  </Stack>
                  <Button type="submit" isLoading={!!isSubmitting}>
                    {trans.signIn}
                  </Button>
                </Stack>
              </Stack>
            </Box>
          </form>
        </Stack>
      </Layout>
    </LoginGaurd>
  );
};

export default App;
