import { css } from '@emotion/react'
import * as mixins from './mixins'

export const mediaConfigurationStyles = {
  theme: {
    /*
    lineSpacing: 20,
    linkColor: 'var(--black)',
    borderStyle: '1px solid var(--black)',
    defaultBorderRadius: 0,
    maximumPricingDecimals: 2,
    */
  },
  styles: {
    /*
    fullMediaWrapper: () => css`
      margin: 0;
      position: relative;
      width: 100%;
      height: 0;
      padding-bottom: 100%;
      overflow-y: visible;
      img {
        object-fit: contain;
        ${mixins.absoluteFullCentered};
      }
      ${mixins.media.laptop`
        height: 50vh;
        min-height: 35rem;
        max-height: 65rem;
        padding-bottom: 0;
      `}
    `,
    mediaObject: () => css`
      z-index: 1;
      position: relative;
      width: 100%;
      height: 100%;
      object-fit: contain;
    `,
    mediaLoader: () => css`
      ${mixins.absoluteFullCentered};
      z-index: 0;
    `,
    fullPageDataGrid: () => css`
      display: grid;
      grid-gap: var(--space-md);
    `,
    fullCreatorOwnerSection: () => css`
      padding: 0;
      display: grid;
      grid-auto-flow: column;
      grid-template-rows: auto auto;
      padding: var(--base-unit);
      border: 1px solid var(--black);
      * {
        text-align: center;
      }
    `,
    fullOwnerAddress: () => css`
      padding-top: var(--space-sm);
      font-size: var(--text-01);
    `,
    fullDescription: () => css`
      margin: var(--space-sm) 0;
      font-size: var(--text-02);
      line-height: 1.25;
    `,
    fullTitle: () => css`
      font-size: var(--text-04);
      padding: var(--base-unit) 0;
    `,
    fullLabel: () => css`
      color: var(--black);
      font-family: var(--font-b)!important;
      text-transform: uppercase;
      font-size: var(--text-03);
    `,
    infoContainer: () => css`
      padding: var(--space-sm);
      border: 1px solid var(--black);
      margin: 0 auto var(--space-sm);
    `,
    fullInfoProofAuthenticityContainer: () => css`
      padding: var(--space-sm) 0 0;
      display: grid;
      grid-template-columns: 1fr;
    `,
    fullPageHistoryTxnLink: () => css`
      font-size: var(--text-01);
      padding-top: 5px;
    `,
    fullPageHistoryItemDatestamp: () => css`
      color: var(--black);
      font-size: var(--text-01);
      padding-top: 5px;
    `,
    fullPageHistoryItemMeta: () => css`
      padding-top: 10px;
    `,
    fullProofLink: () => css`
      ${mixins.buttonStyle};
      display: inline-block;
      padding: var(--base-unit);
      margin-bottom: var(--space-sm);
      font-size: var(--text-02);
    `,
    fullPageHistoryItem: () => css`
      margin: 0;
      padding: 0 0 5px;
      margin-bottom: var(--space-sm);
      font-size: var(--text-01);
      border-bottom: 1px dotted var(--black);
      &:last-of-type {
        border-bottom: 0;
      }
      > div {
        width: 100%;
        display: flex;
        flex-direction: column;
        padding-bottom: 1px;
        font-size: var(--text-04);
        line-height: 1.2;
        * {
          margin: 0;
          text-align: center;
        }
        ${mixins.media.tablet`
          justify-content: space-between;
          flex-direction: row;
        `}
        ${mixins.media.laptop`
          font-size: var(--text-01);
        `}
      }
    `,
    fullInfoCreatorEquityContainer: () => css`
      margin: 0 0 var(--space-md);
    `,
    cardItemInfo: () => css`
      padding: var(--space-sm) var(--space-sm) 0;
      display: flex;
      justify-content: center;
      font-size: 0.9em;
      * {
        text-align: center;
      }
    `,
    fullPageHistoryItemDescription: () => css`
      font-size: var(--text-01);
    `,
    cardMediaWrapper: () => css`
      width: 100%;
      position: relative;
      height: 0;
      padding-bottom: 100%;
      overflow-y: visible;
      img {
        ${mixins.absoluteFullCentered};
        object-fit: cover;
      }
    `*/
  }
}
