import { Global, css } from '@emotion/react'
import { media, buttonStyle } from './mixins'

export default function GlobalStyles() {
  return (
    <Global
      styles={css`
        :root {
          /* COLORS */
          --black: #000;
          --white: #fff;
          --overlay: rgba(0, 0, 0, 0.85);
          --grid-line: var(--light-blue);
          --border-black: 1px solid var(--black);

          /* FONTS */
          --font-a: Helvetica, Arial, sans-serif;
          --font-b: Courier, monospace;
          
          /* SPACING */
          --base-unit: 10px;
          --space-sm: calc(var(--base-unit) * 2);
          --space-md: calc(var(--base-unit) * 3);
          --space-lg: calc(var(--base-unit) * 5);

          /* TYPOGRAPHY */
          --text-01: calc(var(--base-unit) * 2);
          --text-02: calc(var(--base-unit) * 2.5);
          --text-03: calc(var(--base-unit) * 3);
          --text-04: calc(var(--base-unit) * 5);
          --text-05: calc(var(--base-unit) * 8);
          --text-06: 10vmin;

          /* LAYOUT */
          --header-z: 100;
          --header-height: calc(var(--base-unit) * 8);
          --footer-height: calc(var(--base-unit) * 10);
          --content-width: 960px;
        }

        ${media.laptop`
          :root {
            --base-unit: 15px;
          }
        `}

        ${media.xl`
          :root {
            --base-unit: 20px;
          }
        `}

        /* DEFAULTS */
        body * {
          color: var(--black);
          font-family: var(--font-a)!important;
        }

        main {
          width: 100%;
          overflow-x: hidden;
          position: relative;
        }

        h1 {
          font-size: var(--text-06);
          line-height: 1;
          text-align: center;
          padding: var(--space-md) 0;
        }

        h2 {
          font-size: var(--text-03);
          padding: var(--space-md) 0;
        }
      `}
    />
  )
}