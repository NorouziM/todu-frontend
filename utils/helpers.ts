export const PAGE_SIZE = 10;

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
