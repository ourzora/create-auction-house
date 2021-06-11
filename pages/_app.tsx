import "../styles/globals.css";
import { css } from '@emotion/react'

import type { AppProps } from "next/app";
import Header from './../components/Header';

export default function CreateAuctionHouseApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header />
      <main css={Styles.main}>
        <Component {...pageProps} />
      </main>
    </>
  );
}

const Styles = {
  main: css`
    position: relative;
    width: 100%;
  `
}
