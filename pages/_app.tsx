import '../styles/reset.css'
import type { AppProps } from 'next/app'
import { css } from '@emotion/react'

import { NetworkIDs } from '@zoralabs/nft-hooks'
import { MediaConfiguration } from '@zoralabs/nft-components'
import { Web3ConfigProvider } from '@zoralabs/simple-wallet-provider'

import GlobalStyles from '../styles/GlobalStyles'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'

export default function CreateAuctionHouseApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyles />
      <Header />
      <main>
        <Component {...pageProps} />
      </main>
      <Footer/>
    </>
  );
}

const Styles = {
  main: css`
    position: relative;
    width: 100%;
  `
}
