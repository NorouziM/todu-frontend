// chakra
import { Box } from '@chakra-ui/react';
// datepicker
import DatePicker from 'react-multi-date-picker';
import persian from 'react-date-object/calendars/persian';
import gregorian from 'react-date-object/calendars/gregorian';
import gregorian_en from 'react-date-object/locales/gregorian_en';
import persian_fa from 'react-date-object/locales/persian_fa';
// hooks
import useCommonStyles from '@hooks/useCommonStyles';
import useLocales from '@hooks/useLocales';
// icons
import { MdOutlineCalendarToday } from 'react-icons/md';

interface IProps {
  value: any;
  onChange: any;
  name: string;
  isSelected?: boolean;
}

const CustomDatePicker = ({ value, onChange, name, isSelected }: IProps) => {
  const { boxBg } = useCommonStyles();
  const { currentLang } = useLocales();

  const Overlay = ({ openCalendar }: any) => (
    <Box
      cursor="pointer"
      borderWidth="1px"
      borderColor={boxBg}
      borderRadius="xl"
      boxShadow="md"
      justifyContent={'center'}
      display="flex"
      fontSize={'sm'}
      onClick={openCalendar}
      bg={isSelected ? boxBg : 'tranparent'}
      _focus={{
        boxShadow: '0 0 0 4px rgba(65, 64, 82, 0.4)',
      }}
      px={9}
      py={3}
    >
      <MdOutlineCalendarToday size={20} />
    </Box>
  );

  return (
    <DatePicker
      name={name}
      render={(_: any, openCalendar: any) => (
        <Overlay openCalendar={openCalendar} />
      )}
      calendarPosition="bottom-center"
      minDate={new Date()}
      value={value}
      onChange={(value: any) => {
        onChange(value.toDate());
      }}
      calendar={currentLang === 'fa' ? persian : gregorian}
      locale={currentLang === 'fa' ? persian_fa : gregorian_en}
    />
  );
};

export default CustomDatePicker;
