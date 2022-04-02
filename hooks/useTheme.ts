
import { extendTheme, type ThemeConfig, type ChakraTheme, withDefaultColorScheme } from '@chakra-ui/react'
// utils
import useLocales from '@hooks/useLocales'


const useTheme = () => {
    const { currentLang } = useLocales();

    const config: ThemeConfig = {
        initialColorMode: 'system',
        useSystemColorMode: false,
      }
  
    const direction = currentLang === 'fa' ? 'rtl' : 'ltr';

    const fonts = {
      body: 'Todu Yekan',
    }

    const colors = {
      black: '#101015',
      dark: {100: '#2C363F', 200: '#252E36', 300: '1F272E', 400: '#171D22'},
      lightDark: {100: '#393346', 200: '#322D3E', 300: '#2E2939'},
      primary: {100: '#E75A7C', 200: '#E13059', 300: '#CA1D45'},
      light: {100:'#FBFCF8', 200: '#F8FAF4', 300: '#F6F8F0', 400: '#F2F5EA', 500:'#FFFFEA',},
      red: {
        "50": "#FFE6E5",
        "100": "#FFB9B8",
        "200": "#FF8C8A",
        "300": "#FF5F5C",
        "400": "#FF322E",
        "500": "#FF0500",
        "600": "#CC0400",
        "700": "#990300",
        "800": "#660200",
        "900": "#330100"
      },
    }

    const layerStyle = {
        base: {
          borderColor: 'primary.100',
        },
        selected: {
          bg: 'primary.300',
          color: 'light.200',
        },
      }

    const fontSizes = {
      xs: "0.80rem",
      sm: "0.925rem",
      md: "1.1rem",
      lg: "1.135rem",
      xl: "1.3rem"
    }

    const styles =  {
      global: {
        
      },
    }

    const theme = extendTheme({ config, direction, fonts, fontSizes, colors, styles, layerStyle}, withDefaultColorScheme({ colorScheme: 'red'}))

    return {theme};
}

export default useTheme;