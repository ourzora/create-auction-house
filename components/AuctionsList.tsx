import React from "react";
import { useAuctions } from "@zoralabs/nft-hooks";
import { NFTPreview } from "@zoralabs/nft-components";
import { useRouter } from "next/router";

export const AuctionsList = ({}) => {
  const router = useRouter();
  const { data, loading, error } = useAuctions(undefined, true);

  if (loading || error) {
    return <span>...</span>;
  }

  return (
    <div css={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
      {data &&
        data
          .filter(
            (auction) =>
              parseInt(auction.expectedEndTimestamp, 10) >=
              new Date().getTime() / 1000
          )
          .map((auction) => (
            <React.Fragment key={auction.id}>
              <NFTPreview
                key={auction.id}
                id={auction.tokenId}
                useBetaIndexer={true}
                href={`/token/${auction.tokenContract}/${auction.tokenId}`}
                onClick={(evt) => {
                  evt.preventDefault();
                  router.push(
                    `/token/${auction.tokenContract}/${auction.tokenId}`
                  );
                }}
              />
            </React.Fragment>
          ))}
    </div>
  );
};
