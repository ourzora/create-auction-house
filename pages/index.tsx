import styled from '@emotion/styled'
import Head from '../components/head'
import { PageWrapper } from '../styles/components'

export default function Home() {
  return (
    <IndexWrapper>
      <Head/>
      <h1>{process.env.NEXT_PUBLIC_APP_TITLE}</h1>
    </IndexWrapper>
  )
}

const IndexWrapper = styled(PageWrapper)`
  max-width: var(--content-width-xl);
`