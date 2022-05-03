import React, { useState } from 'react';
// chakra
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Stack,
  Tooltip,
  useToast,
} from '@chakra-ui/react';
// yup
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
// icons
import { AiOutlinePlus } from 'react-icons/ai';
// form
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
// hooks
import useLocales from '@hooks/useLocales';
import { getCollectionsKey, useCollections } from '@hooks/useSWRActions';
import useCommonStyles from '@hooks/useCommonStyles';
// utils
import { getErrorMessageList, MAX_ALLOWED_COLLECTIONS } from '@utils/helpers';
import { useSWRConfig } from 'swr';
// network
import { createCollection } from 'network/collection';

type TFormData = {
  title: string;
  content?: string;
  dueDate?: Date | string;
  collectionId: string;
};

const AddCollectionBtn = () => {
  const { trans } = useLocales();
  const { data: collections } = useCollections();
  const [isOpen, setIsOpen] = useState(false);
  const toast = useToast();
  const { boxBg, navBg } = useCommonStyles();
  const { mutate } = useSWRConfig();

  const TodoSchema = Yup.object().shape({
    title: Yup.string().required(trans.titleIsRequired),
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
    const errors = await createCollection(data);

    if (errors) {
      toast({
        title: getErrorMessageList(errors, setError),
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } else {
      onClose();
      mutate(getCollectionsKey);

      toast({
        title: trans.operationnWasSuccessful,
        status: 'success',
        duration: 3000,
        isClosable: false,
      });
    }
  };

  const onOpen = () => {
    if (collections && Number(collections.count) < MAX_ALLOWED_COLLECTIONS)
      setIsOpen(true);
    else
      toast({
        title: trans.cantAddCollection,
        status: 'warning',
        duration: 5000,
        isClosable: true,
      });
  };

  const onClose = () => {
    setIsOpen(false);
    reset();
    clearErrors();
  };

  return (
    <>
      <Tooltip label={trans.addCollection}>
        <Box
          cursor="pointer"
          borderWidth="2px"
          borderColor={boxBg}
          bgColor={navBg}
          borderRadius="xl"
          borderStyle="dotted"
          boxShadow="md"
          justifyContent={'center'}
          display="flex"
          px={4}
          py={6}
          h={200}
          mr={2}
          my={2}
          w={[40, '180px', '200px', '220px']}
          alignItems="center"
          onClick={onOpen}
        >
          <AiOutlinePlus size={40} />
        </Box>
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
                          maxLength={20}
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
                </Stack>
              </Box>
            </ModalBody>

            <ModalFooter mb={3}>
              <Stack spacing={[2, 4, 6]} direction={'row'}>
                <Button onClick={onClose} variant="outline">
                  {trans.cancel}
                </Button>
                <Button isLoading={isSubmitting} type="submit">
                  {trans.addCollection}
                </Button>
              </Stack>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </>
  );
};

export default AddCollectionBtn;
