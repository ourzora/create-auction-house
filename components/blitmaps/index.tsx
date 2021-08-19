import { MediaConfiguration, MediaRenderers } from "@zoralabs/nft-components";
import useSWR from "swr";

import { fetcher } from "../../data/fetcher";
import { RenderBlitmapThumbnail } from "./RenderBlitmapThumbnail";

export const AuctionsList = ({ initialData }: { initialData: any }) => {
  const { data, error } = useSWR(
    "/api/items",
    fetcher,
    {
      refreshInterval: 100,
      initialData
    },
  );

  if (!data || error) {
    return <span>...</span>;
  }

  return (
    <MediaConfiguration renderers={[MediaRenderers.Image]}>
      <div
        css={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
      >
        {data &&
          data.tokens.map((token: any) => (
            <RenderBlitmapThumbnail key={token.tokenId} token={token} />
          ))}
      </div>
    </MediaConfiguration>
  );
};
