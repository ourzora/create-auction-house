import React from 'react'
import styled from '@emotion/styled'
import Head from '../components/head'
import { PageWrapper } from '../styles/components'
import { GetStaticProps } from 'next'
import { fetchTokens } from '../data/fetchTokens'

import { AuctionsList } from '../components/AuctionsList'
import { IndexerAuctionList } from '../components/IndexerAuctionList'
// import { AuctionHouseList } from '@zoralabs/nft-components'

const ConsoleTokens = ({
  data
}: {
  data: any
}) => {
  console.log(data)
  return (
    <React.Fragment/>
  )
}

export default function Home({ tokens }: { tokens: any }) {
  return (
    <IndexWrapper>
      <Head/>
      <h1>{process.env.NEXT_PUBLIC_APP_TITLE}</h1>
      <AuctionsList />
      <IndexerAuctionList initialData={{ tokens }}/>
      {/*<AuctionHouseList
        curatorIds={[process.env.NEXT_PUBLIC_CURATORS_ID as string]}
      />*/}
      <ConsoleTokens data={tokens}/>
    </IndexWrapper>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const data = await fetchTokens(undefined, undefined);
  // console.log('data', data)
  return {
    props: {
      tokens: data,
    },
    revalidate: 30,
  };
};

const IndexWrapper = styled(PageWrapper)`
  max-width: var(--content-width-xl);
`
