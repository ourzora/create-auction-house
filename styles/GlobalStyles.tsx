import { Global, css } from '@emotion/react'
import { media, buttonStyle } from './mixins'
import { returnBreakpoint } from './breakpoints'

export default function GlobalStyles() {
  return (
    <Global
      styles={css`
        :root {
          /* COLORS */
          --black: #000;
          --white: #fff;
          --bg-color: #f6f8fa;
          --overlay: rgba(0, 0, 0, 0.85);
          --overlay-light: rgba(0, 0, 0, 0.35);
          --border-black: 1px solid var(--black);
          --border-light: 1px solid #dbdbdb;

          /* FONTS */
          --font-a: Helvetica, Arial, sans-serif;
          --font-b: Courier, monospace;
          
          /* SPACING */
          --base-unit: 8px;
          --space-sm: calc(var(--base-unit) * 2);
          --space-md: calc(var(--base-unit) * 3);
          --space-lg: calc(var(--base-unit) * 5);

          /* TYPOGRAPHY */
          --text-01: calc(var(--base-unit) * 1.5);
          --text-02: calc(var(--base-unit) * 2);
          --text-03: calc(var(--base-unit) * 3);
          --text-04: calc(var(--base-unit) * 4);
          --text-05: calc(var(--base-unit) * 5);

          /* LAYOUT */
          --header-z: 100;
          --header-height: calc(var(--base-unit) * 10);
          --footer-height: calc(var(--base-unit) * 10);
          --content-width-md: 960px;
          --content-width-lg: ${returnBreakpoint('desktop')};
          --content-width-xl: ${returnBreakpoint('xl')};
        }

        /* MEDIA QUERY MIXIN */
        ${media.laptop`
          :root {
            --base-unit: 10px;
            --text-05: calc(var(--base-unit) * 6);
          }
        `}

        ${media.xl`
          :root {
            --base-unit: 11px;
            --text-05: calc(var(--base-unit) * 7);
          }
        `}

        /* DEFAULTS */
        /* LAYOUT */
        body * {
          font-family: var(--font-a)!important;
        }

        main {
          width: 100%;
          overflow-x: hidden;
          position: relative;
          min-height: calc(100vh - (var(--header-height) + var(--footer-height)));
        }

        header,
        footer {
          font-size: var(--text-02);
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 var(--space-md);
          a {
            text-decoration: none;
            color: var(--black);
            &.active {
              text-decoration: underline;
            }
            ${media.hover`
              text-decoration: underline;
            `}
          }
        }

        /* TYPOGRPAHY */
        h1,h2,h3,h4,h5,h6 {
          font-weight: 500;
        }
        h1 {
          font-size: var(--text-05);
          line-height: 1;
          text-align: center;
          padding: var(--space-md) 0 var(--space-lg);
        }
        h2 {
          font-size: var(--text-03);
          padding: var(--space-sm) 0;
        }
        h3 {
          font-size: var(--text-03);
          padding: var(--space-sm) 0;
        }
        a {
          font-weight: 400;
        }
        p,ol,ul {
          font-size: var(--text-02);
          padding-bottom: var(--space-sm);
          line-height: 1.35;
          font-weight: 400;
        }

        /* CUSTOM */
        .button {
          ${buttonStyle};
        }

        /* ZORA SPECIFIC -- CLEAN UP
           - WALLET MODAL
        */
        .zora-wallet-modalContent {
          h3 {
            font-size: var(--text-03)!important;
            padding: 0 0 15px;
          }
          .zora--auction-house-modalSuccessMessage {
            font-size: var(--text-02)!important;
          }
          img {
            object-fit: contain;
          }
          p {
            font-size: var(--text-02)!important;
            padding: 0 0 10px;
            &:last-of-type {
              padding-bottom: 30px!important;
            }
          }
          .zora--auction-house-ethAmountLabel {
            padding-bottom: 15px;
            font-size: var(--text-02);
          }
          input {
            margin-bottom: 15px;
          }
          button.zora--auction-house-actionButton {
            ${buttonStyle};
            margin-bottom: 15px;
          }
        }
      `}
    />
  )
}
