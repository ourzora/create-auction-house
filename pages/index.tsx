import styled from "@emotion/styled";
import Head from "../components/head";
import { PageWrapper } from "../styles/components";
import { GetStaticProps } from "next";

import { AuctionsList } from "../components/blitmaps";
import { media, buttonStyle, absoluteCentered } from "../styles/mixins";
import {
  FetchStaticData,
  MediaFetchAgent,
} from "@zoralabs/nft-hooks";
import { IndexerDataType } from "@zoralabs/nft-hooks/dist/fetcher/AuctionInfoTypes";

export default function Home({ tokens }: { tokens: IndexerDataType[] }) {
  return (
    <IndexWrapper>
      <Head />
      <h1>{process.env.NEXT_PUBLIC_APP_TITLE}</h1>
      <AuctionsList initialData={{ tokens }} />
    </IndexWrapper>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const fetchAgent = new MediaFetchAgent(
    process.env.NEXT_PUBLIC_NETWORK as any
  );
  const tokens = await FetchStaticData.fetchZoraIndexerList(
    fetchAgent,
    {
      collectionAddress: process.env.NEXT_PUBLIC_TARGET_CONTRACT_ADDRESS || "",
      limit: 200,
      offset: 0,
    },
    true
  );

  return {
    props: {
      tokens,
    },
    revalidate: 30,
  };
};

const IndexWrapper = styled(PageWrapper)`
  max-width: var(--content-width-xl);
  .thumbnail-wrapper {
    margin: 5px;
    border: var(--border-black);
    .zora-cardOuter {
      border: 0;
      margin: 0;
    }
    &.not-listed {
      opacity: 0.5;
      .zora-cardLink:before {
        content: "Own this? List It Here!" !important;
      }
    }
    &.not-listed {
      order: 1;
    }
    &.auction-live {
      order: -1;
      .zora-cardLink:before {
        content: "Bid Now!" !important;
      }
      .zora-cardAuctionPricing {
        background-color: var(--green) !important;
      }
    }
    ${media.canHover`
      &:hover {
        opacity: 1!important;
        .zora-cardLink {
          opacity: 1;
        }
      }
    `}
  }
  .zora-cardOuter {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    height: 100%;
    .zora-cardItemInfo {
      width: 100%;
    }
    .blit-wrapper {
      width: 100%;
    }
    .zora-cardAuctionPricing {
      width: 100%;
      background-color: var(--blue) !important;
      * {
        color: var(--white) !important;
        opacity: 1 !important;
      }
    }
    .zora-cardLink {
      opacity: 0;
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 100;
      font-size: 0;
      &:before {
        z-index: 10;
        ${buttonStyle};
        content: "Start Bidding!";
        width: 200px;
        height: 23px;
        font-size: var(--text-02);
        border: 2px solid var(--white);
        ${absoluteCentered};
      }
      &:after {
        content: "";
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        background-color: var(--overlay-light);
      }
    }
  }
`;
