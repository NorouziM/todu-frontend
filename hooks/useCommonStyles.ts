import { useColorModeValue } from '@chakra-ui/react';

const useCommonStyles = () => {
  const bg = useColorModeValue('white', 'gray.800');
  const sidebarBg = useColorModeValue('white', 'gray.800');
  const text = useColorModeValue('gray.600', 'light.100');
  const textDark = useColorModeValue('gray.800', 'light.200');
  const borderColor = useColorModeValue('gray.200', 'gray.900');
  return { bg, text, borderColor, textDark, sidebarBg };
};

export default useCommonStyles;
