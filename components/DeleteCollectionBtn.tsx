import { useRef, useState } from 'react';
// next
import { useRouter } from 'next/router';
// chakra
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  chakra,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
// icons
import { AiOutlineDelete } from 'react-icons/ai';
// utils
import { getErrorMessageList } from '@utils/helpers';
import { deleteCollection } from 'network/collection';
import { PATH_DASHBOARD } from '@utils/paths';
// hooks
import { useCollections } from '@hooks/useSWRActions';
import useLocales from '@hooks/useLocales';

interface IProps {
  id: string;
}

const DeleteCollectionBtn = ({ id }: IProps) => {
  const [isLoading, setisLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { push } = useRouter();
  const { trans } = useLocales();
  const toast = useToast();
  const { mutate } = useCollections();
  const cancelRef = useRef<any>();

  const AiOutlineDeleteChakra = chakra(AiOutlineDelete);

  const handleClickDelete = async () => {
    if (id) {
      setisLoading(true);
      const error = await deleteCollection(id);
      setisLoading(false);
      if (error) {
        toast({
          title: getErrorMessageList(error),
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      } else {
        onClose();
        mutate();
        toast({
          title: trans.operationnWasSuccessful,
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        push(PATH_DASHBOARD.collections);
      }
    }
  };

  return (
    <>
      {id && (
        <AiOutlineDeleteChakra
          cursor={'pointer'}
          onClick={onOpen}
          size={28}
          color="primary.main"
        />
      )}
      <AlertDialog
        isOpen={isOpen}
        onClose={onClose}
        leastDestructiveRef={cancelRef}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              {trans.deleteCollection}
            </AlertDialogHeader>

            <AlertDialogBody>{trans.deleteCollectionWarning}</AlertDialogBody>

            <AlertDialogFooter>
              <Button onClick={onClose} ref={cancelRef} variant="outline">
                {trans.cancel}
              </Button>
              <Button isLoading={isLoading} onClick={handleClickDelete} ml={3}>
                {trans.delete}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default DeleteCollectionBtn;
