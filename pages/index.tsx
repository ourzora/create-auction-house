import styled from '@emotion/styled'
import Head from '../components/head'
import { PageWrapper } from '../styles/components'
import { GetStaticProps } from 'next'
import { fetchItems } from '../data/fetchItems'

// import { IndexerAuctionList } from '../components/IndexerAuctionList'
import { AuctionsList } from '../components/AuctionsList'

export default function Home({ tokens }: { tokens: any }) {
  return (
    <IndexWrapper>
      <Head/>
      <h1>{process.env.NEXT_PUBLIC_APP_TITLE}</h1>
      {/*<IndexerAuctionList initialData={{ tokens }}/>*/}
      <AuctionsList />
    </IndexWrapper>
  )
}

/*
export const getStaticProps: GetStaticProps = async () => {
  const data = await fetchItems(undefined, process.env.NEXT_PUBLIC_CURATORS_ID);
  console.log('data', data)
  return {
    props: {
      tokens: data.tokens,
    },
    revalidate: 30,
  };
};
*/

const IndexWrapper = styled(PageWrapper)`
  max-width: var(--content-width-xl);
`
