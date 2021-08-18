import styled from '@emotion/styled'
import Head from '../components/head'
import { PageWrapper } from '../styles/components'
import { GetStaticProps } from 'next'
import { fetchTokens } from '../data/fetchTokens'

import { AuctionsList } from '../components/AuctionsList'
// import { IndexerAuctionList } from '../components/IndexerAuctionList'
// import { AuctionHouseList } from '@zoralabs/nft-components'

export default function Home({ tokens }: { tokens: any }) {
  return (
    <IndexWrapper>
      <Head/>
      <h1>{process.env.NEXT_PUBLIC_APP_TITLE}</h1>
      <AuctionsList />
      {/*<IndexerAuctionList initialData={{ tokens }}/>
      <AuctionHouseList
        curatorIds={[process.env.NEXT_PUBLIC_CURATORS_ID as string]}
      />*/}
    </IndexWrapper>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const data = await fetchTokens(undefined, undefined);
  console.log('data', data)
  return {
    props: {
      tokens: /*data.tokens*/null,
    },
    revalidate: 30,
  };
};

const IndexWrapper = styled(PageWrapper)`
  max-width: var(--content-width-xl);
`
