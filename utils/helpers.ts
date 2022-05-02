import useLocales from '@hooks/useLocales';

export const PAGE_SIZE = 10;
export const GET_COLLECTION_TODOS = 'getCollectionTodos';

/**
 *
 * @returns {string}
 */

export const getGreetingText = () => {
  const date = new Date();
  const hour = date.getHours();
  if (hour < 11) {
    return 'goodMorning';
  }
  if (hour < 16) {
    return 'goodAfternoon';
  }
  return 'goodEvening';
};

/**
 *
 * @param error  error object
 * @param setError react hook form function
 * @returns string
 */

export const getErrorMessageList = (error: any, setError?: any) => {
  if (typeof error.message === 'string') return error.message;

  let message = '';

  Object.keys(error.message).forEach((key) => {
    console.log(key, error.message[key], 'keykey');

    setError && setError(key, { type: 'custom', message: error.message[key] });
    if (!message) message = `${key}: ${error.message[key]}`;
  });
  return message;
};
/**
 *
 * @param data
 * @param valueParam
 * @param labelParam
 * @returns Array of options
 */

export const useGetOptionsArray = (
  data: any,
  valueParam: string,
  labelParam: string
) => {
  const { trans } = useLocales();
  type TOption = { value: string; label: string };
  const options: Array<TOption> = [];
  if (data.length)
    data.forEach((item: any) => {
      options.push({
        value: item[valueParam],
        label:
          item[labelParam] === 'noCollection'
            ? trans.noCollection
            : item[labelParam],
      });
    });
  return options;
};
