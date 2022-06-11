// chakra
import { ColorModeScript } from '@chakra-ui/react';
// next
import NextDocument, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from 'next/document';

export default class Document extends NextDocument {
  static async getInitialProps(ctx: DocumentContext) {
    return await NextDocument.getInitialProps(ctx);
  }
  render() {
    const { locale } = this.props.__NEXT_DATA__;
    const dir = locale === 'fa' ? 'rtl' : 'ltr';
    return (
      <Html dir={dir} lang={locale}>
        <Head />
        <body>
          <ColorModeScript initialColorMode={'dark'} />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
