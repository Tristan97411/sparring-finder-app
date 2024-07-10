import Head from "next/head";
import RootProvider from "../src/contexts/@store/RootProvider";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <RootProvider>
        <Component {...pageProps} />
      </RootProvider>
    </>
  );
}
