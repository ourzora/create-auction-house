import { css } from "@emotion/react";
import unified from "unified";
import parse from "remark-parse";
import remark2react from "remark-react";

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
          * {
            color: var(--black);
          }
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
          ol,
          ul {
            margin-block-start: 10px;
            margin-block-end: 10px;
            margin-inline-start: 0px;
            margin-inline-end: 0px;
            padding-inline-start: 40px;
          }
          ol {
            list-style: number;
          }
          ul {
            list-style-type: disc;
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
          }
          code {
            font-size: var(--text-01) !important;
            line-height: 1.45;
            border-radius: 5px;
            background-color: var(--bg-color);
            font-family: SFMono-Regular, Consolas, Liberation Mono, Menlo,
                monospace !important;
          }
        `,
        styleOverrides,
      ]}
    >
      {unified().use(parse).use(remark2react).processSync(markdown).result}
    </article>
  );
}
