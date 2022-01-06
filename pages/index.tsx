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

const IndexWrapper = styled(PageWrapper)`
  max-width: var(--content-width-xl);
`;
