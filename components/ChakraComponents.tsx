import type { ComponentStyleConfig } from '@chakra-ui/theme';
export const Box: ComponentStyleConfig = {
  baseStyle: {
    borderRadius: 'xl',
  },
};

export const Button: ComponentStyleConfig = {
  baseStyle: {
    borderRadius: 'lg',
    _focus: {
      boxShadow: '0 0 0 3px rgba(134, 19, 47, 0.6)',
    },
  },
  variants: {
    gradient: {
      bgGradient: 'linear(to-r, primary.400, primary.600)',
      color: 'light.100',
    },
    gray: {
      bg: 'gray.100',
      color: 'gray.800',
      _focus: {
        boxShadow: '0 0 0 3px rgba(0, 0, 0, 0.08)',
      },
    },
  },
  sizes: {
    xsm: {
      fontSize: 'sm',
      height: '1rem',
      minH: '1.5rem',
      minW: '2rem',
      paddingY: '.3rem',
      paddingX: '.4rem',
    },
    md: {
      paddingY: '1.4rem',
    },
  },
  defaultProps: {
    colorScheme: 'primary',
    color: 'light.100',
    bg: 'primary.main',
    _hover: { bg: 'primary.600' },
  },
};

export const Input: ComponentStyleConfig = {
  defaultProps: {
    focusBorderColor: 'primary.200',
  },
};

export const Link: ComponentStyleConfig = {
  baseStyle: {
    color: 'primary.main',
  },
  defaultProps: {
    color: 'primary.main',
  },
};
