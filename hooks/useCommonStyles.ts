import { useColorModeValue } from '@chakra-ui/react';

const useCommonStyles = () => {
  const bg = useColorModeValue('white', 'gray.800');
  const lighterBg = useColorModeValue('white', 'gray.700');
  const boxBg = useColorModeValue('gray.100', 'gray.600');
  const darkBoxBg = useColorModeValue('gray.200', 'gray.500');
  const navBg = useColorModeValue('gray.50', 'gray.700');

  const text = useColorModeValue('#1f3247', 'light.100');
  const textDark = useColorModeValue('#2A2E38', 'light.200');
  const textLight = useColorModeValue('#243A52', 'light.300');
  const borderColor = useColorModeValue('gray.200', 'gray.900');
  return {
    bg,
    text,
    borderColor,
    textDark,
    lighterBg,
    boxBg,
    textLight,
    darkBoxBg,
    navBg,
  };
};

export default useCommonStyles;
