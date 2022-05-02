import React from 'react';
// icons
import { MdOutlineSearchOff } from 'react-icons/md';
// chakra
import { Text, Icon, Stack } from '@chakra-ui/react';
// hooks
import useLocales from '@hooks/useLocales';

const NoData = () => {
  const { trans } = useLocales();
  return (
    <Stack direction={'row'} spacing={2} justifyContent={'center'}>
      <Text fontSize={'xl'}>{trans.noData}</Text>
      <Icon
        as={MdOutlineSearchOff}
        transition={'all .25s ease-in-out'}
        w={8}
        h={8}
      />
    </Stack>
  );
};

export default NoData;
