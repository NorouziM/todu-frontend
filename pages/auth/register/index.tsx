import { FormEvent, useEffect, useState } from 'react';
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
  FormErrorMessage,
} from '@chakra-ui/react';
// form
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// components
import Layout from '@layouts/Layout';
// hooks
import useAuth from '@hooks/useAuth';
import useLocales from '@hooks/useLocales';
import useCommonStyles from '@hooks/useCommonStyles';
// guards
import LoginGaurd from '@guards/LoginGuard';
// utiils
import { AFTER_LOGIN_ROUTE, PATH_AUTH } from '@utils/paths';
import { IAuthData } from '@utils/interfaces';

type FormData = {
  email: string;
  password: string;
  repeatPassword: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
};

const App = () => {
  const { trans, currentLang } = useLocales();
  const { register, isAuthenticated }: IAuthData = useAuth();
  const { push } = useRouter();
  const toast = useToast();
  const [isShowPass, setIsShowPass] = useBoolean();
  const { textLight, text } = useCommonStyles();

  const ResgisterSchema = Yup.object().shape({
    firstName: Yup.string().required(trans.firstNameIsRequired),
    lastName: Yup.string().required(trans.lastNameIsRequired),
    email: Yup.string()
      .email(trans.emailMustBeValid)
      .required(trans.emailIsRequired),
    password: Yup.string().required(trans.passwordIsRequired),
    phoneNumber: Yup.string().required(trans.phoneNumberIsRequired),
    repeatPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], trans.passDontMatch)
      .required(trans.repeatPasswordIsRequired),
  });

  const methods = useForm<FormData>({
    resolver: yupResolver(ResgisterSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      repeatPassword: '',
      phoneNumber: '',
    },
  });

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      await register(
        data.email,
        data.password,
        data.firstName,
        data.lastName,
        data.phoneNumber
      );
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
        title: trans.youSuccessfullySignedUp,
        status: 'success',
        duration: 2000,
        isClosable: false,
      });

      push(AFTER_LOGIN_ROUTE);
    }
  }, [isAuthenticated, push, toast, trans.youSuccessfullySignedUp]);

  return (
    <LoginGaurd>
      <Layout varient="general">
        <Stack spacing={8} mx={'auto'} maxW={'xl'} py={12} px={6}>
          <Stack align={'center'} minW={['20rem', 'md']}>
            <Heading fontSize={'4xl'} color={text}>
              {trans.signUpToAccount}
            </Heading>
            <Text fontSize={'lg'} color={textLight}>
              {trans.loginToUse}
            </Text>
            <Link href={PATH_AUTH.login} passHref>
              <ChakraLink>{trans.clickToSignIn}</ChakraLink>
            </Link>
          </Stack>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box p={8}>
              <Stack spacing={4}>
                <Stack spacing={4} direction={{ base: 'column', md: 'row' }}>
                  <FormControl id="firstName" isInvalid={!!errors.firstName}>
                    <Controller
                      name={'firstName'}
                      control={control}
                      render={({ field, fieldState: { error } }) => (
                        <Input
                          {...field}
                          type="text"
                          placeholder={trans.firstName}
                          isInvalid={!!error}
                        />
                      )}
                    />
                    {errors.firstName && (
                      <FormErrorMessage>
                        {errors.firstName.message}
                      </FormErrorMessage>
                    )}
                  </FormControl>
                  <FormControl id="lastName" isInvalid={!!errors.lastName}>
                    <Controller
                      name={'lastName'}
                      control={control}
                      render={({ field, fieldState: { error } }) => (
                        <Input
                          {...field}
                          type="text"
                          placeholder={trans.lastName}
                          isInvalid={!!error}
                        />
                      )}
                    />
                    {errors.lastName && (
                      <FormErrorMessage>
                        {errors.lastName.message}
                      </FormErrorMessage>
                    )}
                  </FormControl>
                </Stack>
                <Stack spacing={4} direction={{ base: 'column', md: 'row' }}>
                  <FormControl id="email" isInvalid={!!errors.email}>
                    <Controller
                      name={'email'}
                      control={control}
                      render={({ field, fieldState: { error } }) => (
                        <Input
                          {...field}
                          type="email"
                          placeholder={trans.email}
                          isInvalid={!!error}
                        />
                      )}
                    />
                    {errors.email && (
                      <FormErrorMessage>
                        {errors.email.message}
                      </FormErrorMessage>
                    )}
                  </FormControl>
                  <FormControl
                    id="phoneNumber"
                    isInvalid={!!errors.phoneNumber}
                  >
                    <Controller
                      name={'phoneNumber'}
                      control={control}
                      render={({ field, fieldState: { error } }) => (
                        <Input
                          {...field}
                          type="phoneNumber"
                          placeholder={trans.phoneNumber}
                          isInvalid={!!error}
                        />
                      )}
                    />
                    {errors.phoneNumber && (
                      <FormErrorMessage>
                        {errors.phoneNumber.message}
                      </FormErrorMessage>
                    )}
                  </FormControl>
                </Stack>

                <Stack spacing={4} direction={{ base: 'column', md: 'row' }}>
                  <FormControl id="password" isInvalid={!!errors.password}>
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
                    {errors.password && (
                      <FormErrorMessage>
                        {errors.password.message}
                      </FormErrorMessage>
                    )}
                  </FormControl>
                  <FormControl id="repeatPassword">
                    <Controller
                      name={'repeatPassword'}
                      control={control}
                      render={({ field, fieldState: { error } }) => (
                        <Input
                          {...field}
                          type="password"
                          placeholder={trans.repeatPassword}
                          isInvalid={!!error}
                        />
                      )}
                    />
                  </FormControl>
                </Stack>
                <Stack spacing={10}>
                  <Button type="submit" mt={8} isLoading={!!isSubmitting}>
                    {trans.signUp}
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
