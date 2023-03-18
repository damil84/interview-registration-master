import type { AppProps } from 'next/app';
import Head from 'next/head';
import type { FC } from 'react';

const App: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <meta content="minimum-scale=1, initial-scale=1, width=device-width" name="viewport" />
      </Head>
      <Component {...pageProps} />
    </>
  );
};

export default App;
