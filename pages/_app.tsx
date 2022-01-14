import '../styles/reset.css'

import type { AppProps } from 'next/app'
import { css } from '@emotion/css'
import { NetworkIDs } from '@zoralabs/nft-hooks'
import { MediaConfiguration } from '@zoralabs/nft-components'
import { Web3ConfigProvider } from '@zoralabs/simple-wallet-provider'
import { NETWORK_ID, RPC_URL } from '../utils/env-vars'
import { mediaConfigurationStyles } from '../styles/theme'
import GlobalStyles from '../styles/GlobalStyles'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'

export default function CreateAuctionHouseApp({
  Component,
  pageProps
}: AppProps) {
  return (
    <>
      <GlobalStyles />
      <Web3ConfigProvider
        networkId={parseInt(NETWORK_ID as string, 10)}
        rpcUrl={RPC_URL as string || undefined}
        theme={{
          walletOption: css`
            color: #000 !important;
            position: relative;
            width: 100%;
            padding: 20px;
            margin-bottom: 20px;
            cursor: pointer;
            &:last-child {
              margin-bottom: 0;
            }
          `,
        }}
      >
        <MediaConfiguration
          networkId={NETWORK_ID as NetworkIDs}
          style={mediaConfigurationStyles}
        >
          <Header />
          <main>
            <Component {...pageProps} />
          </main>
          <Footer />
        </MediaConfiguration>
      </Web3ConfigProvider>
    </>
  );
}
