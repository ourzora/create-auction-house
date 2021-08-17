import { css } from '@emotion/react'
import unified from 'unified'
import parse from 'remark-parse'
import remark2react from 'remark-react'

import { media } from '../styles/mixins'

type MarkdownWrapperProps = {
  markdown?: string,
  styleOverrides?: any
}

export default function MarkdownWrapper({ markdown, styleOverrides }: MarkdownWrapperProps) {
  return (
    <article css={[css`
      width: 100%;
      h2, h3, h4 {
        border-bottom: var(--border-light);
        padding-bottom: var(--base-unit);
        margin-bottom: var(--space-sm);
      }
      img {
        width: 100%;
        height: auto;
        margin: 0 auto;
        text-align: center;
        display: inline;
        position: relative;
      }
      a {
        text-decoration: underline;
        display: inline-block;
      }
    `, styleOverrides]}>
      {
        unified()
          .use(parse)
          .use(remark2react)
          .processSync(markdown).result
      }
    </article>
  )
}