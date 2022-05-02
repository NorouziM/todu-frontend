import React from 'react';
// chakra
import { Box, HStack, useRadio, useRadioGroup } from '@chakra-ui/react';
// hooks
import useCommonStyles from '@hooks/useCommonStyles';

interface IProps {
  children: React.ReactNode;
}

const CustomRadio = (props: IProps) => {
  const { getInputProps, getCheckboxProps } = useRadio(props as any);

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  const { boxBg, text } = useCommonStyles();

  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        borderWidth="1px"
        borderColor={boxBg}
        borderRadius="xl"
        boxShadow="md"
        justifyContent={'center'}
        display="flex"
        fontSize={'sm'}
        _checked={{
          bg: boxBg,
          color: text,
        }}
        _focus={{
          boxShadow: '0 0 0 4px rgba(65, 64, 82, 0.4)',
        }}
        px={9}
        py={3}
      >
        {props.children}
      </Box>
    </Box>
  );
};
interface IRadioProps {
  options: Array<{ label: string; value: string }>;
  onChange: any;
  name: string;
  defaultValue?: string;
}
function Radio({ options, onChange, name, defaultValue }: IRadioProps) {
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: name,
    defaultValue: defaultValue ?? '',
    onChange: onChange,
  });

  const group = getRootProps();

  return (
    <HStack {...group} spacing={4}>
      {options.map((option: { label: string; value: string }) => {
        const radio = getRadioProps({ value: option.value });
        return (
          <CustomRadio key={option.value} {...radio}>
            {option.label}
          </CustomRadio>
        );
      })}
    </HStack>
  );
}
export default Radio;
