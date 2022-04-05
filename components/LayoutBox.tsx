import { Box, useColorModeValue } from '@chakra-ui/react';
import React, { FC } from 'react';

type TProps = {
  children: React.ReactNode;
};

const LayoutBox: FC<TProps> = ({ children, ...props }) => {
  const boxShadow = useColorModeValue(
    '0px 10px 50px -30px rgb(44, 54, 63, 0.2)',
    '0px 10px 30px 10px rgb(0 0 0 / 15%)'
  );

  return (
    <Box minW={[null, 'sm']} sx={{ boxShadow }} {...props}>
      {children}
    </Box>
  );
};

export default LayoutBox;
