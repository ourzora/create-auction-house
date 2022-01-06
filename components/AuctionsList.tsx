import { FetchStaticData } from "@zoralabs/nft-hooks";
import { NFTPreview } from "@zoralabs/nft-components";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { CONTRACT_ADDRESSES } from "../utils/env-vars";

type TokenInfo = {
  id: string;
}

export const AuctionsList = () => {
  const [medias, setMedias] = useState<TokenInfo[] | undefined>(undefined);
  const fetchMedia = useCallback(async () => {
    const mediaRequest = await fetch(
      "https://api.thegraph.com/subgraphs/name/ourzora/zora-v1-polygon",
      {
        headers: {
          "Content-Type": "application/json",
        },
        body: '{"query":"{\\n  medias(last:100) {\\n    id\\n  }\\n}","variables":null}',
        method: "POST",
      }
    );
    const json = await mediaRequest.json();
    setMedias(json.data.medias);
  }, [setMedias]);
  useEffect(() => {
    fetchMedia();
  }, []);
  const router = useRouter();

  return (
    <div css={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
      {medias &&
        medias.map((media: TokenInfo) => {
          return (
            <NFTPreview
              key={media.id}
              id={media.id}
              contract={CONTRACT_ADDRESSES}
              onClick={() => router.push(`/token/zora/${media.id}`)}
              useBetaIndexer={false}
            />
          );
        })}
    </div>
  );
};
