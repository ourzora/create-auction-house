import { css } from '@emotion/react'
import Head from '../components/head'

import { LANDING_COPY } from './../lib/copy'

export default function Home() {
  return (
    <>
      <Head/>
      <h1 css={Styles.headline}>
        <span>{process.env.NEXT_PUBLIC_APP_TITLE}</span>
      </h1>
    </>
  )
}

const Styles = {
  headline: css`
    font-size: 10vmin;
    width: 100%;
    height: 80vh;
    display: flex;
    justify-content: center;
    align-items: center;
  `
}
