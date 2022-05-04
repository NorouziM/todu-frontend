import { Global } from '@emotion/react';
import { useRouter } from 'next/router';

const Fonts = () => {
  const router = useRouter();

  return (
    <Global
      styles={`
      @font-face {
        font-family: 'Todu-Yekan';
        font-style: normal;
        font-weight: 100;
        src: url('${router.basePath}/fonts/Yekan Bakh Fa-En 01 Hairline.eot') format('eot'), url('${router.basePath}/fonts/Yekan Bakh Fa-En 01 Hairline.woff') format('woff');
      }
      @font-face {
        font-family: 'Todu-Yekan';
        font-style: normal;
        font-weight: 200;
        src: url('${router.basePath}/fonts/Yekan Bakh Fa-En 02 Thin.eot') format('eot'), url('${router.basePath}/fonts/Yekan Bakh Fa-En 02 Thin.woff') format('woff');
      }
      @font-face {
        font-family: 'Todu-Yekan';
        font-style: normal;
        font-weight: 300;
        src: url('${router.basePath}/fonts/Yekan Bakh Fa-En 03 Light.eot') format('eot'), url('${router.basePath}/fonts/Yekan Bakh Fa-En 03 Light.woff') format('woff');
      }
      @font-face {
        font-family: 'Todu-Yekan';
        font-style: normal;
        font-weight: 400;
        src: url('${router.basePath}/fonts/Yekan Bakh Fa-En 04 Regular.woff') format('woff');
      }
      @font-face {
        font-family: 'Todu-Yekan';
        font-style: normal;
        font-weight: 500;
        src: url('${router.basePath}/fonts/Yekan Bakh Fa-En 05 Medium.eot') format('eot'), url('${router.basePath}/fonts/Yekan Bakh Fa-En 05 Medium.woff') format('woff');
      }
      @font-face {
        font-family: 'Todu-Yekann';
        font-style: normal;
        font-weight: 600;
        src: url('${router.basePath}/fonts/Yekan Bakh Fa-En 06 Bold.eot') format('eot'), url('${router.basePath}/fonts/Yekan Bakh Fa-En 06 Bold.woff') format('woff');
      }
      @font-face {
        font-family: 'Todu-Yekan';
        font-style: normal;
        font-weight: 700;
        src: url('${router.basePath}/fonts/Yekan Bakh Fa-En 07 Heavy.eot') format('eot'), url('${router.basePath}/fonts/Yekan Bakh Fa-En 07 Heavy.woff') format('woff');
      }
      @font-face {
        font-family: 'Todu-Yekan';
        font-style: normal;
        font-weight: 800;
        src: url('${router.basePath}/fonts/Yekan Bakh Fa-En 08 Fat.eot') format('eot'), url('${router.basePath}/fonts/Yekan Bakh Fa-En 08 Fat.woff') format('woff');
      }
      `}
    />
  );
};

export default Fonts;
