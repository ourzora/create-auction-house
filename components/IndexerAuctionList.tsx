import { MediaConfiguration, MediaRenderers } from "@zoralabs/nft-components";
import useSWR from "swr";

import { fetcher } from "../data/fetcher";

const RenderToken = ({
  token
}: {
  token: any
}) => {
  console.log(token)
  return (
    <div>{token.tokenId}</div>
  )
}

export const AuctionsList = ({ initialData }: { initialData: any }) => {
  const { data, error } = useSWR(
    "/api/items",
    fetcher,
    {
      refreshInterval: 100,
      initialData
    },
  );
  
  console.log(data)

  if (!data || error) {
    return <span>...</span>;
  }

  return (
    <MediaConfiguration renderers={[MediaRenderers.Image]}>
      {data && data.tokens.map((token: any) => (
        <RenderToken key={token.tokenId} token={token} />
      ))}
    </MediaConfiguration>
  );
};
