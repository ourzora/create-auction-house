import { css } from '@emotion/react'
import { AuctionHouseList, MediaConfiguration } from "@zoralabs/nft-components";
import { useRouter } from 'next/router'
import { mqMain } from './../lib/breakpoints'

import Head from '../components/head'
import { NetworkIDs } from '@zoralabs/nft-hooks';

const strings = {
  CARD_CREATED_BY: 'Artist name'
}

// Passing in the themeing object

const styles = {
  theme: {
    bodyFont: 'var(--font-b)',
    borderStyle: 'none',
    buttonColor: {
      background: 'transparent',
      primaryBackground: 'transparent',
      primaryText: 'var(--black)',
      text: 'var(--black)'
    },
    defaultBorderRadius: 0,
    fontSizeFull: 15,
    headerFont: 'var(--font-b)',
    lineSpacing: 24,
    linkColor: 'var(--black)',
    mediaContentFont: {
      fontFamily: 'var(--font-b)'
    },
    previewCard: {
      background: 'transparent',
      height: '100%',
      width: '100%'
    },
    textBlockPadding: 'var(--space-sm) 0',
    titleFont: 'var(--text-01)'
  }
}

export default function Artworks() {
  const router = useRouter();
  return (
    <>
      <Head title="Gallery"/>
      <div css={Styles.auctionListWrapper}>
        <MediaConfiguration
          networkId={process.env.NEXT_PUBLIC_NETWORK as NetworkIDs}
          style={styles}
          strings={strings}
        >
          <AuctionHouseList
            curatorIds={[process.env.NEXT_PUBLIC_CURATORS_ID as string]}
            onClick={(_, { tokenId }) => {
              router.push(`/piece/${tokenId}`);
            }}
          />
        </MediaConfiguration>
      </div>
    </>
  );
}

// EXAMPLE OF Overriding NFT Components styling

const Styles = {
  auctionListWrapper: css`
    position: relative;
    margin: 0 auto;
    width: 100%;
    .zora-auctionHouseList {
      display: grid;
      grid-row-gap: 5vw;
      grid-column-gap: 7.5vw;
      ${mqMain ({
        gridTemplateColumns: ['1fr', '1fr', '1fr 1fr'],
        padding: ['var(--space-md) var(--space-sm)', '2.5vw 5vw 5vw']
      })}
    }
    .zora-cardOuter {
      margin: 0;
      width: 100%;
    }
    .zora-textSubdued {
      opacity: 1;
      font-size: var(--text-01);
    }
    .zora-cardMediaWrapper {
      width: 100%;
      height: 0;
      padding-top: 100%;
      img {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        object-fit: cover;
        margin: 0;
      }
    }
    .zora-cardTitle {
      border-bottom: var(--border-black);
      padding-bottom: var(--space-md);
      margin-bottom: var(--space-sm);
      + div {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        font-size: var(--text-01);
        color: var(--black);
      }
    }
    .zora-cardAuctionPricing {
      border-top: var(--border-dashed);
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      background: transparent;
      font-size: var(--text-01);
      color: var(--black);
    }
    .zora-cardItemInfo {
      padding-top: var(--space-md);
    }
    .zora-pricingAmount,
    .zora-cardTitle {
      font-size: var(--text-02);
      color: var(--black);
    }
  `,
}
