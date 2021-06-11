import { NFTFullPage, FullComponents, MediaConfiguration } from "@zoralabs/nft-components";
import { useRouter } from 'next/router'
import { css } from '@emotion/react'
import { MediaFetchAgent } from "@zoralabs/nft-hooks";
import { GetServerSideProps } from 'next'

import Head from './../../components/head'
import { mqMain } from './../../lib/breakpoints'

const strings = {
  CREATOR: 'Artist name'
}

const styles = {
  theme: {
    bodyFont: 'var(--font-a)',
    borderStyle: 'none',
    buttonColor: {
      background: 'transparent',
      primaryBackground: 'transparent',
      primaryText: 'var(--black)',
      text: 'var(--black)'
    },
    defaultBorderRadius: 0,
    fontSizeFull: 15,
    headerFont: 'var(--font-a)',
    lineSpacing: 24,
    linkColor: 'var(--black)',
    mediaContentFont: {
      fontFamily: 'var(--courier)'
    },
    previewCard: {
      background: 'transparent',
      height: '100%',
      width: '100%'
    },
    textBlockPadding: 'var(--space-sm) 0',
    titleFont: 'var(--courier)'
  }
}

type PieceProps = {
  name: string,
  description: string,
  image: string
}

export default function Piece({ name, description, image }: PieceProps) {
  const {query} = useRouter();
  return (
    <>
      <Head
        title={`${name} | Land Mass`}
        description={description}
        ogImage={image}
      />
      <div css={Styles.fullPageWrapper}>
        <MediaConfiguration
          /* Need to configure network variable - as string - to pass typecheck for networkId
          // @ts-ignore */
          networkId={process.env.NEXT_PUBLIC_NETWORK as string}
          style={styles}
          strings={strings}
        >
          <NFTFullPage id={query.id as string}>
            <FullComponents.MediaFull />
            <div css={Styles.infoWrapper}>
              <div css={Styles.colA}>
                <h3>NFT Title</h3>
                <FullComponents.MediaInfo />
                <FullComponents.AuctionInfo />
                <FullComponents.PlaceOfferButton />
                <FullComponents.BidHistory />
              </div>
              <div css={Styles.colB}>
                <FullComponents.ProofAuthenticity />
              </div>
            </div>
          </NFTFullPage>
        </MediaConfiguration>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {

  /* @ts-ignore */
  // Need to configure env vars to pass typecheck for MediaFetchAgent
  const fetcher = new MediaFetchAgent(process.env.NEXT_PUBLIC_NETWORK as string);

  /* @ts-ignore */
  // Need to configure params.id to pass typecheck for loadZNFTData
  const nft = await fetcher.loadZNFTData(params.id as string);
  const metadata = await fetcher.fetchIPFSMetadata(nft.nft.metadataURI);

  function prepareJson(json: object) {
    return JSON.parse(JSON.stringify(json));
  }

  const nftData = prepareJson({
    ...nft,
    ...metadata
  })

  if (!nft) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: {
      name: nftData.name,
      description: nftData.description,
      image: nftData.zoraNFT.contentURI
    }
  }
}

const Styles = {
  fullPageWrapper: css`
    position: relative;
    margin: 0 auto;
    width: 100%;
    * {
      font-weight: 300;
    }
    ${mqMain ({
      padding: ['var(--space-md) var(--space-sm)', '0 5vw 5vw']
    })}
    .zora-fullMediaWrapper {
      margin: 0;
      ${mqMain ({
        padding: ['var(--space-md)', '5vw']
      })}
    }
    .zora-fullLabel {
      font-size: var(--text-01);
      font-family: var(--font-a);
      opacity: 1;
      text-transform: capitalize!important;
    }
    .zora-infoContainer {
      margin: 0;
      padding: 0;
    }
    .zora-fullPlaceOfferButton a,
    .zora-fullProofLink {
      border: var(--border-black);
      font-size: var(--text-01);
      font-family: var(--font-b);
      width: 100%;
      border-radius: 2rem;
      display: flex;
      justify-content: center;
      text-transform: uppercase;
      &:after {
        display: none;
      }
      &:hover {
        background-color: var(--black);
        color: var(--white);
      }
    }
    .zora-fullPlaceOfferButton {
      padding-bottom: var(--space-md);
    }
    .zora-fullProofLink {
      margin: 0 0 var(--space-md);
      padding: var(--space-sm);
    }
    .zora-textSubdued {
      opacity: 1;
    }
    .zora-fullInfoAuctionWrapper,
    .zora-fullDescription {
      font-size: var(--text-02);
    }
  `,
  infoWrapper: css`
    display: grid;
    grid-column-gap: 5vw;
    padding-bottom: var(--space-xxl);
    margin: 0 auto;
    width: 100%;
    max-width: var(--max-width);
    * {
      margin: 0;
    }
    ${mqMain ({
      gridTemplateColumns: ['1fr', '1fr', '1fr 1fr'],
      padding: ['var(--space-md) var(--space-sm) var(--space-xl)', '0 0 var(--space-xxl)']
    })}
  `,
  colA: css`
    h3 {
      font-size: var(--text-01);
    }
    .zora-fullPageHistoryItem {
      border-top: var(--border-dashed);
      display: flex;
      flex-direction: column-reverse;
      padding-top: var(--space-sm);
      div {
        font-size: var(--text-02);
      }
    }
    .zora-fullPageHistoryItemDatestamp {
      font-family: var(--font-a);
      font-size: var(--text-01)!important;
      opacity: 1;
      padding-bottom: .5rem;
    }
    .zora-fullTitle,
    .zora-fullOwnerAddress,
    .zora-pricingAmount {
      margin: 0;
      font-size: var(--text-02);
    }
    .zora-fullTitle,
    .zora-fullItemInfo {
      border-bottom: var(--border-black);
      padding-bottom: var(--space-sm);
      margin-bottom: var(--space-sm);
    }
    .zora-fullDescription {
      display: none;
    }
    .zora-fullItemInfo {
      margin-bottom: var(--space-md);
    }
  `,
  colB: css`
    .description {
      border-bottom: var(--border-black);
      padding-bottom: var(--space-sm);
      margin-bottom: var(--space-md);
      line-height: 1.3;
    }
  `,
}