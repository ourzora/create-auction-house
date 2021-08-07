import { css } from "@emotion/react";
import { AuctionHouseList, MediaConfiguration } from "@zoralabs/nft-components";
import { useRouter } from "next/router";

import Head from "../components/head";
import { NetworkIDs } from "@zoralabs/nft-hooks";

export default function Artworks() {
  const router = useRouter();
  return (
    <>
      <Head title="Gallery" />
      <div css={Styles.auctionListWrapper}>
        <MediaConfiguration
          networkId={process.env.NEXT_PUBLIC_NETWORK as NetworkIDs}
        >
          <AuctionHouseList
            curatorIds={[process.env.NEXT_PUBLIC_CURATORS_ID as string]}
            onClick={(_: any, { tokenId, tokenContract }: any) => {
              router.push(`/piece/${tokenContract}/${tokenId}`);
            }}
          />
        </MediaConfiguration>
      </div>
    </>
  );
}

// Example of Overriding NFT Components styling
const Styles = {
  auctionListWrapper: css``,
};
