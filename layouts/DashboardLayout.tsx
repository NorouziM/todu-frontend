import { Skeleton, Stack, Text, useBreakpointValue } from '@chakra-ui/react';
// components
import BackArrow from '@components/BackArrow';
// hooks
import useAuth from '@hooks/useAuth';
import useCommonStyles from '@hooks/useCommonStyles';
import useLocales from '@hooks/useLocales';
// utils
import { getGreetingText } from '@utils/helpers';
import { IAuthData } from '@utils/interfaces';

interface IProps {
  title?: string;
  children: React.ReactNode;
  hasGreeting?: boolean;
  isLoading?: boolean;
  extraOption?: React.ReactNode;
}

const DashboardLayout = ({
  title,
  hasGreeting = true,
  isLoading = false,
  children,
  extraOption,
}: IProps) => {
  const { textDark, boxBg } = useCommonStyles();
  const { trans, currentLang } = useLocales();
  const { user }: IAuthData = useAuth();

  return (
    <Stack direction={'column'} spacing={{ base: 4, md: 12 }}>
      <Stack textAlign={useBreakpointValue({ base: 'center', md: 'left' })}>
        <Stack
          direction={'row'}
          justifyContent={'space-between'}
          alignItems="baseline"
        >
          <Stack
            spacing={8}
            direction={'row'}
            alignItems={'flex-start'}
            mb={9}
            justifyContent={'flex-start'}
          >
            <BackArrow />
            {isLoading ? (
              <Skeleton minW={'70px'} height={'40px'} />
            ) : (
              <Text color={textDark} fontSize={'3xl'} fontWeight="700">
                {title}
              </Text>
            )}
          </Stack>
          {extraOption && extraOption}
        </Stack>
        {hasGreeting && (
          <Text color={textDark} fontSize={'4xl'} fontWeight="900">
            {`${trans[getGreetingText()]}، `}
            <br />
            {`${user.firstName} ${user.lastName}`}
          </Text>
        )}
      </Stack>
      {children}
    </Stack>
  );
};

export default DashboardLayout;
