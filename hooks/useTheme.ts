import {
  extendTheme,
  type ThemeConfig,
  withDefaultColorScheme,
} from '@chakra-ui/react';
// components
import { Box, Button, Input, Link } from '@components/ChakraComponents';
// utils
import useLocales from '@hooks/useLocales';

const useTheme = () => {
  const { currentLang } = useLocales();

  const config: ThemeConfig = {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  };

  const direction = currentLang === 'fa' ? 'rtl' : 'ltr';

  const fonts = {
    body: 'Todu-Yekan',
    heading: 'Todu-Yekan',
    h2: 'Todu-Yekan',
  };

  const colors = {
    black: '#101015',
    text: '#1f3247',
    dark: '#1F2229',
    lightDark: '#2A2E38',
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
    gray: {
      '500': '#504F65',
      '600': '#414052',
      '700': '#20212c',
      '800': '#181820',
      '900': '#1F2229',
    },
    light: {
      100: '#FBFCF8',
      200: '#F8FAF4',
      300: '#F6F8F0',
      400: '#F2F5EA',
      500: '#FFFFEA',
    },
  };

  const layerStyle = {
    base: {
      borderColor: 'primary.100',
    },
    selected: {
      bg: 'primary.main',
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
        color: props.colorMode === 'dark' ? 'light.200' : 'text',
      },
      '.chakra-input': {
        borderRadius: '0.5rem',
      },
      'a,.chakra-link ': {
        color: 'primary.main',
      },
    }),
  };

  const semanticTokens = {
    colors: {
      error: 'red.500',
      text: {
        default: 'text',
        _dark: 'light.200',
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
      layerStyle,
      boxShadows: {
        lg: '0px 10px 100px -30px rgb(44, 54, 63, 1)',
      },
      components: {
        Box,
        Button,
        Input,
        Link,
      },
      semanticTokens,
      styles,
    },
    withDefaultColorScheme({ colorScheme: 'primary' })
  );

  return { theme };
};

export default useTheme;
