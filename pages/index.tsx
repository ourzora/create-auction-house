import styled from '@emotion/styled'
import Head from '../components/head'
import { PageWrapper } from '../styles/components'
import { AuctionsList } from '../components/AuctionList'

export default function Home() {
  return (
    <IndexWrapper>
      <Head/>
      <h1>{process.env.NEXT_PUBLIC_APP_TITLE}</h1>
      <AuctionsList/>
    </IndexWrapper>
  )
}

const IndexWrapper = styled(PageWrapper)`
  max-width: var(--content-width-xl);
`