import { css } from "@emotion/react";
import unified from "unified";
import parse from "remark-parse";
import remark2react from "remark-react";

import { media } from "../styles/mixins";

type MarkdownWrapperProps = {
  markdown?: string;
  styleOverrides?: any;
};

export default function MarkdownWrapper({
  markdown,
  styleOverrides,
}: MarkdownWrapperProps) {
  return (
    <article
      css={[
        css`
          width: 100%;
          h2,
          h3,
          h4 {
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
          ol {
            padding-left: var(--space-sm);
            list-style: number;
          }
          pre {
            font-size: var(--text-01) !important;
            text-align: start;
            padding: var(--base-unit);
            margin-bottom: var(--space-sm);
            line-height: 1.45;
            border-radius: 5px;
            background-color: var(--bg-color);
            color: var(--black) !important;
            overflow-x: scroll;
            position: relative;
            code {
              font-family: SFMono-Regular, Consolas, Liberation Mono, Menlo,
                monospace !important;
            }
          }
        `,
        styleOverrides,
      ]}
    >
      {unified().use(parse).use(remark2react).processSync(markdown).result}
    </article>
  );
}
