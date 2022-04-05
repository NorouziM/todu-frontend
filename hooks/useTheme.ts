import {
  extendTheme,
  type ThemeConfig,
  type ChakraTheme,
  withDefaultColorScheme,
  ComponentStyleConfig,
} from '@chakra-ui/react';
// components
import { Box, Button, Input } from '@components/ChakraComponents';
// utils
import useLocales from '@hooks/useLocales';

const useTheme = () => {
  const { currentLang } = useLocales();

  const config: ThemeConfig = {
    initialColorMode: 'system',
    useSystemColorMode: false,
  };

  const direction = currentLang === 'fa' ? 'rtl' : 'ltr';

  const fonts = {
    body: 'Todu Yekan',
  };

  const colors = {
    black: '#101015',
    dark: { 100: '#2C363F', 200: '#252E36', 300: '1F272E', 400: '#171D22' },
    lightDark: { 100: '#393346', 200: '#322D3E', 300: '#2E2939' },
    primary: {
      main: '#E75A7C',
      '50': '#FCE9ED',
      '100': '#F6C1CE',
      '200': '#F099AE',
      '300': '#EA718E',
      '400': '#E4486E',
      '500': '#DF204E',
      '600': '#B21A3F',
      '700': '#86132F',
      '800': '#590D1F',
      '900': '#2D0610',
    },
    light: {
      100: '#FBFCF8',
      200: '#F8FAF4',
      300: '#F6F8F0',
      400: '#F2F5EA',
      500: '#FFFFEA',
    },
    red: {
      50: '#FFE6E5',
      100: '#FFB9B8',
      200: '#FF8C8A',
      300: '#FF5F5C',
      400: '#FF322E',
      500: '#FF0500',
      600: '#CC0400',
      700: '#990300',
      800: '#660200',
      900: '#330100',
    },
  };

  const layerStyle = {
    base: {
      borderColor: 'primary.100',
    },
    selected: {
      bg: 'primary.300',
      color: 'light.200',
    },
  };

  const fontSizes = {
    xs: '0.80rem',
    sm: '0.925rem',
    md: '1.1rem',
    lg: '1.135rem',
    xl: '1.3rem',
  };

  const styles = {
    global: (props: any) => ({
      'h1,h2,h3,h4,p': {
        color: props.colorMode === 'dark' ? 'light.500' : 'dark.100',
      },
    }),
  };

  const semanticTokens = {
    colors: {
      error: 'red.500',
      text: {
        default: 'primary.900',
        _dark: 'primary.50',
      },
    },
  };

  const theme = extendTheme(
    {
      config,
      direction,
      fonts,
      fontSizes,
      colors,
      styles,
      layerStyle,
      boxShadows: {
        lg: '0px 10px 100px -30px rgb(44, 54, 63, 1)',
      },
      components: {
        Box,
        Button,
        Input,
      },
      semanticTokens,
    }
    // withDefaultColorScheme({ colorScheme: 'primary' })
  );

  return { theme };
};

export default useTheme;
