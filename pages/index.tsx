import styled from '@emotion/styled'
import Head from '../components/head'
import { PageWrapper } from '../styles/components'
import { GetStaticProps } from 'next'
import { fetchItems } from '../data/fetchItems'

import { AuctionsList } from '../components/blitmaps'

export default function Home({ tokens }: { tokens: any }) {
  return (
    <IndexWrapper>
      <Head/>
      <h1>{process.env.NEXT_PUBLIC_APP_TITLE}</h1>
      <AuctionsList initialData={{ tokens }} />
    </IndexWrapper>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const data = await fetchItems(undefined, undefined);

  return {
    props: {
      tokens: data.tokens,
    },
    revalidate: 30,
  };
};

const IndexWrapper = styled(PageWrapper)`
  max-width: var(--content-width-xl);
`
