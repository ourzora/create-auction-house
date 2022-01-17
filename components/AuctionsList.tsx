import { FetchStaticData } from "@zoralabs/nft-hooks";
import { NFTPreview } from "@zoralabs/nft-components";
import { useRouter } from "next/router";
import { Card } from './Card';

export const AuctionsList = ({ tokens }: { tokens: any[] }) => {
  const router = useRouter();

  return (
    <div css={{minHeight: "100vh", display: "flex", flexDirection: 'column', flexWrap: "wrap", justifyContent: "flex-start", alignItems: "center" }}>
      <div css={{cursor: 'pointer'}}>
        <h1>{process.env.NEXT_PUBLIC_APP_TITLE}</h1>
      </div>
      <div css={{minHeight: "100vh", minWidth: '100%', display: "flex", flexDirection: 'row', flexWrap: "wrap", justifyContent: "center", alignItems: "center" }}>
        {
          tokens && tokens.map((token) => {
            const tokenInfo = FetchStaticData.getIndexerServerTokenInfo(token);
              return (
                <Card
                  key={token.nft}
                  token={token} />
              );
          })
        }
      </div>
    </div>
  );
};

{/*<NFTPreview
              initialData={token}
              key={tokenInfo.tokenId}
              id={tokenInfo.tokenId}
              contract={tokenInfo.tokenContract}
              onClick={(evt) =>
                router.push(
                  `/token/${tokenInfo.tokenContract}/${tokenInfo.tokenId}`
                )
              }
              useBetaIndexer={true}
            />*/}