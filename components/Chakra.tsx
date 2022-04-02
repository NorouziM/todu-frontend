import { FC, ReactNode } from 'react'
// next
import { GetServerSideProps } from 'next'
// chakra
import {
  ChakraProvider,
  ChakraProviderProps,
  cookieStorageManager,
  localStorageManager,
} from '@chakra-ui/react'
// hooks
import useTheme from '@hooks/useTheme'
// utils
import Fonts from '@components/Fonts'


  interface CustomChakraProviderProps extends ChakraProviderProps {
    children: ReactNode;
    cookies: any;
  }
  
  export const Chakra: FC<CustomChakraProviderProps> = ({ cookies, children, ...other} : { cookies: any, children: ReactNode }) => {
    const { theme } = useTheme();

    const colorModeManager =
      typeof cookies === 'string'
        ? cookieStorageManager(cookies)
        : localStorageManager
  
    return (
      <ChakraProvider colorModeManager={colorModeManager} theme={theme} {...other}>
        <Fonts />
        {children}
      </ChakraProvider>
    )
  }
  
  export const getServerSideProps: GetServerSideProps = async ({ req }) => {
    return {
      props: {
        cookies: req.headers.cookie ?? '',
      },
    }
  }
