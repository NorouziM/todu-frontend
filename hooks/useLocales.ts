import { useRouter } from 'next/router';
import en from '@locales/en';
import fa from '@locales/fa';

const useLocales = () => {
  const {
    locale: currentLang,
    locales: allLangs,
    defaultLocale: defaultLang,
  } = useRouter();

  const nextLang = currentLang === 'en' ? 'fa' : 'en';

  const trans = currentLang === 'en' ? en : fa;

  return {
    currentLang,
    allLangs,
    defaultLang,
    nextLang,
    trans,
  };
};

export default useLocales;
