import "../styles/globals.css";
import { Global, css } from '@emotion/react'

import type { AppProps } from "next/app";
import Header from './../components/Header';
import { mq } from './../lib/breakpoints'

export default function LandmassApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Global
        styles={css`
          html {
            ${mq({
              fontSize: ['58%', '60.5%', '60.5%', '60.5%', '62.5%', '64%', '80%']
            })}
          }
          body {
            font-size: 16px;
            font-family: var(--font-a);
            color: var(--black);
          }
        `}
      />
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
