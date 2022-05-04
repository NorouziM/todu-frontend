import React, { useState } from 'react';
// chakra
import {
  Box,
  Button,
  Divider,
  FormControl,
  FormErrorMessage,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Skeleton,
  Stack,
  Tooltip,
  useToast,
} from '@chakra-ui/react';
// yup
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
// swt
import { useSWRConfig } from 'swr';
// icons
import { CgMathPlus } from 'react-icons/cg';
// form
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
// components
import CustomDatePicker from './CustomDatePicker';
import Radio from './Radio';
// hooks
import useLocales from '@hooks/useLocales';
// utils
import { createTodo } from 'network/todo';
import {
  getErrorMessageList,
  mutatePartialKeys,
  useGetOptionsArray,
} from '@utils/helpers';
// hooks
import { useCollections } from '@hooks/useSWRActions';
import useCommonStyles from '@hooks/useCommonStyles';

type TFormData = {
  title: string;
  content?: string;
  dueDate?: Date | string;
  collectionId: string;
};

interface IProps {
  size?: number;
}

const AddTodoBtn = ({ size }: IProps) => {
  const { trans } = useLocales();
  const { data: collections } = useCollections();
  const [isOpen, setIsOpen] = useState(false);
  const [noDueDate, setNoDueDate] = useState(true);
  const toast = useToast();
  const { boxBg, text } = useCommonStyles();
  const { mutate, cache } = useSWRConfig();
  const options = useGetOptionsArray(
    collections ? collections.data.collections : [],
    '_id',
    'title'
  );

  const TodoSchema = Yup.object().shape({
    title: Yup.string().required(trans.titleIsRequired),
    content: Yup.string(),
    collectionId: Yup.string().required(trans.collectionIsRequired),
    dueDate: Yup.string(),
  });

  const methods = useForm<TFormData>({
    resolver: yupResolver(TodoSchema),
    defaultValues: {
      title: '',
      content: '',
      dueDate: '',
    },
  });

  const {
    control,
    handleSubmit,
    setError,
    clearErrors,
    reset,
    formState: { isSubmitting, errors },
  } = methods;

  const onSubmit: SubmitHandler<TFormData> = async (data) => {
    const newData = { ...data };
    if (noDueDate) delete data.dueDate;

    const errors = await createTodo(newData);

    if (errors) {
      toast({
        title: getErrorMessageList(errors, setError),
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } else {
      onClose();
      mutatePartialKeys('api/v1/todos', cache, mutate);
      mutatePartialKeys('api/v1/collection', cache, mutate);

      toast({
        title: trans.operationnWasSuccessful,
        status: 'success',
        duration: 3000,
        isClosable: false,
      });
    }
  };

  const onOpen = () => {
    setIsOpen(true);
  };

  const onClose = () => {
    setIsOpen(false);
    setNoDueDate(true);
    reset();
    clearErrors();
  };

  return (
    <>
      <Tooltip label={trans.addTodo}>
        <IconButton
          title={trans.addTodo}
          onClick={onOpen}
          aria-label="Add Todo"
          variant={'gradient'}
          icon={<CgMathPlus size={size || 30} />}
        />
      </Tooltip>

      <Modal isOpen={isOpen} onClose={onClose}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalOverlay />
          <ModalContent px={3} pt={10}>
            <ModalCloseButton />
            <ModalBody>
              <Box pb={4}>
                <Stack spacing={4}>
                  <FormControl id="title" isInvalid={!!errors.title}>
                    <Controller
                      name={'title'}
                      control={control}
                      render={({ field, fieldState: { error } }) => (
                        <Input
                          {...field}
                          type="title"
                          placeholder={trans.title}
                          maxLength={30}
                          isInvalid={!!error}
                        />
                      )}
                    />
                    {errors.title && (
                      <FormErrorMessage>
                        {errors.title.message}
                      </FormErrorMessage>
                    )}
                  </FormControl>
                  <FormControl id="content" isInvalid={!!errors.content}>
                    <Controller
                      name={'content'}
                      control={control}
                      render={({ field, fieldState: { error } }) => (
                        <Input
                          {...field}
                          type="content"
                          placeholder={trans.description}
                          isInvalid={!!error}
                          maxLength={40}
                        />
                      )}
                    />
                    {errors.content && (
                      <FormErrorMessage>
                        {errors.content.message}
                      </FormErrorMessage>
                    )}
                  </FormControl>
                  <Divider />
                  {collections ? (
                    <FormControl
                      id="collectionId"
                      isInvalid={!!errors.collectionId}
                    >
                      <Controller
                        name={'collectionId'}
                        control={control}
                        render={({ field }) => (
                          <Radio options={options} {...field} />
                        )}
                      />
                      {errors.collectionId && (
                        <FormErrorMessage>
                          {errors.collectionId.message}
                        </FormErrorMessage>
                      )}
                    </FormControl>
                  ) : (
                    <Skeleton height={40} />
                  )}
                </Stack>
                <Divider my={4} />

                <Stack direction={'row'}>
                  <Box>
                    <Controller
                      name={'dueDate'}
                      control={control}
                      render={({ field }) => (
                        <CustomDatePicker
                          {...field}
                          isSelected={!noDueDate}
                          onChange={(e: any) => {
                            field.onChange(e);
                            setNoDueDate(false);
                          }}
                        />
                      )}
                    />
                    {errors.dueDate && (
                      <FormErrorMessage>
                        {errors.dueDate.message}
                      </FormErrorMessage>
                    )}
                  </Box>
                  <FormControl>
                    <Box
                      cursor="pointer"
                      borderWidth="1px"
                      borderColor={boxBg}
                      borderRadius="xl"
                      boxShadow="md"
                      w={32}
                      justifyContent={'center'}
                      display="flex"
                      fontSize={'sm'}
                      onClick={() => setNoDueDate((prevState) => !prevState)}
                      bg={noDueDate ? boxBg : 'tranparent'}
                      color={text}
                      _focus={{
                        boxShadow: '0 0 0 4px rgba(65, 64, 82, 0.4)',
                      }}
                      px={2}
                      py={2.5}
                    >
                      {trans.noDueDate}
                    </Box>
                  </FormControl>
                </Stack>
              </Box>
            </ModalBody>

            <ModalFooter mb={3}>
              <Stack spacing={[2, 4, 6]} direction={'row'}>
                <Button onClick={onClose} variant="outline">
                  {trans.cancel}
                </Button>
                <Button isLoading={isSubmitting} type="submit">
                  {trans.addTodo}
                </Button>
              </Stack>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </>
  );
};

export default AddTodoBtn;
