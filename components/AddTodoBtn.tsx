import React from 'react';
// chakra
import {
  Box,
  Button,
  Flex,
  FormControl,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Stack,
  Tooltip,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
// yup
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
// icons
import { CgMathPlus } from 'react-icons/cg';
// form
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
// hooks
import useLocales from '@hooks/useLocales';

type FormData = {
  title: string;
  content?: string;
  dueDate: Date;
  collectionId?: string;
};

const AddTodoBtn = () => {
  const { trans } = useLocales();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const TodoSchema = Yup.object().shape({
    email: Yup.string()
      .email(trans.emailMustBeValid)
      .required(trans.emailIsRequired),
    password: Yup.string().required(trans.passwordIsRequired),
  });

  const methods = useForm<FormData>({
    resolver: yupResolver(TodoSchema),
  });

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    // try {
    //   await login(data.email, data.password);
    // } catch (error: any) {
    //   toast({
    //     title: error.data?.message || error.toString(),
    //     status: 'error',
    //     duration: 3000,
    //     isClosable: true,
    //   });
    // }
  };

  const handleClick = () => {};
  return (
    <>
      <Tooltip label={trans.addTodo}>
        <IconButton
          title={trans.addTodo}
          onClick={onOpen}
          aria-label="Add Todo"
          variant={'gradient'}
          icon={<CgMathPlus size={30} />}
        />
      </Tooltip>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent px={3} pt={10}>
            <ModalCloseButton />
            <ModalBody>
              <Box pb={4}>
                <Stack spacing={4}>
                  <FormControl id="title">
                    <Controller
                      name={'title'}
                      control={control}
                      render={({ field, fieldState: { error } }) => (
                        <Input
                          {...field}
                          type="title"
                          placeholder={trans.title}
                          isRequired
                          isInvalid={!!error}
                        />
                      )}
                    />
                  </FormControl>
                  <FormControl id="content">
                    <Controller
                      name={'content'}
                      control={control}
                      render={({ field, fieldState: { error } }) => (
                        <Input
                          {...field}
                          type="content"
                          placeholder={trans.description}
                          isInvalid={!!error}
                        />
                      )}
                    />
                  </FormControl>
                </Stack>
              </Box>
            </ModalBody>

            <ModalFooter mb={3}>
              <Stack spacing={[2, 4, 6]} direction={'row'}>
                <Button onClick={onClose} variant="outline">
                  {trans.cancel}
                </Button>
                <Button isLoading={isSubmitting}>{trans.addTodo}</Button>
              </Stack>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </form>
    </>
  );
};

export default AddTodoBtn;
