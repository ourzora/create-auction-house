import styled from "@emotion/styled";
import Head from "../components/head";
import { PageWrapper } from "../styles/components";
import { GetStaticProps } from "next";

import { AuctionsList } from "../components/AuctionsList";

import {
  FetchStaticData,
  MediaFetchAgent,
  NetworkIDs,
} from "@zoralabs/nft-hooks";
import { APP_TITLE, CONTRACT_ADDRESSES, CURATOR_ID } from "../utils/env-vars";

export default function Home({ tokens }: { tokens: any }) {
  return (
    <IndexWrapper>
      <Head />
      <h1>{APP_TITLE}</h1>
      <AuctionsList tokens={tokens} />
    </IndexWrapper>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const fetchAgent = new MediaFetchAgent(
    process.env.NEXT_PUBLIC_NETWORK_ID as NetworkIDs
  );
  const tokens = await FetchStaticData.fetchZoraIndexerList(fetchAgent, {
    curatorAddress: CURATOR_ID,
    collectionAddresses: CONTRACT_ADDRESSES?.split(","),
    limit: 100,
    offset: 0,
  });

  return {
    props: {
      tokens,
    },
    revalidate: 60,
  };
};

const IndexWrapper = styled(PageWrapper)`
  max-width: var(--content-width-xl);
`;
