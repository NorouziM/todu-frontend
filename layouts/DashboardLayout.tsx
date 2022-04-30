import { Flex, Icon, Stack, Text, useBreakpointValue } from '@chakra-ui/react';
import BackArrow from '@components/BackArrow';
import useAuth from '@hooks/useAuth';
import useCommonStyles from '@hooks/useCommonStyles';
import useLocales from '@hooks/useLocales';
import { getGreetingText } from '@utils/helpers';
import { IAuthData } from '@utils/interfaces';
import React from 'react';

interface IProps {
  title: string;
  children: React.ReactNode;
}

const DashboardLayout = ({ title, children }: IProps) => {
  const { textDark, boxBg } = useCommonStyles();
  const { trans, currentLang } = useLocales();
  const { user }: IAuthData = useAuth();

  return (
    <Stack direction={'column'} spacing={12}>
      <Stack textAlign={useBreakpointValue({ base: 'center', md: 'left' })}>
        <Stack
          spacing={8}
          direction={'row'}
          alignItems={'flex-start'}
          mb={9}
          justifyContent={'flex-start'}
        >
          <BackArrow />

          <Text color={textDark} fontSize={'3xl'} fontWeight="700">
            {title}
          </Text>
        </Stack>
        <Text color={textDark} fontSize={'4xl'} fontWeight="900">
          {`${trans[getGreetingText()]}، `}
          <br />
          {`${user.firstName} ${user.lastName}`}
        </Text>
      </Stack>
      {children}
    </Stack>
  );
};

export default DashboardLayout;
