import '../styles/reset.css'

import type { AppProps } from 'next/app'
import { css } from '@emotion/css'

import { NetworkIDs } from '@zoralabs/nft-hooks'
import { MediaConfiguration } from '@zoralabs/nft-components'
import { Web3ConfigProvider } from '@zoralabs/simple-wallet-provider'

import { mediaConfigurationStyles } from '../styles/theme'
import GlobalStyles from '../styles/GlobalStyles'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'

const CLIENT_INFO = {
  name: "testing wallet connector",
  url: "http://localhost:1234",
  description: "testing wallet",
  icons: [],
};

export default function CreateAuctionHouseApp({
  Component,
  pageProps
}: AppProps) {
  return (
    <>
      <GlobalStyles />
      <Web3ConfigProvider
        networkId={parseInt(process.env.NEXT_PUBLIC_NETWORK_ID as string, 10)}
        rpcUrl="https://eth-mainnet.alchemyapi.io/v2/TMmFiIhF3-KTab6spgLh-RRhm4FEWQRe"
        clientInfo={CLIENT_INFO}
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
          networkId={process.env.NEXT_PUBLIC_NETWORK as NetworkIDs}
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
