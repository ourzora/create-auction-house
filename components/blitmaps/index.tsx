import { MediaConfiguration, MediaRenderers } from "@zoralabs/nft-components";
import { IndexerDataType } from "@zoralabs/nft-hooks/dist/fetcher/AuctionInfoTypes";
import useSWR from "swr";

import { fetcher } from "../../data/fetcher";
import { RenderBlitmapThumbnail } from "./RenderBlitmapThumbnail";

export const AuctionsList = ({
  initialData,
}: {
  initialData: { tokens: IndexerDataType[] };
}) => {
  const data = initialData

  if (!data) {
    return <span>...</span>;
  }

  return (
    <MediaConfiguration renderers={[MediaRenderers.Image]}>
      <div
        css={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
      >
        {data &&
          data.tokens &&
          data.tokens.map((token: any) => (
            <RenderBlitmapThumbnail key={token.nft.tokenData.tokenId} token={token} />
          ))}
      </div>
    </MediaConfiguration>
  );
};
