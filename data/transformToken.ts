import { AuctionStateInfo, AuctionType } from "@zoralabs/nft-hooks";
import type { NFTDataContext as NFTDataContextType } from "@zoralabs/nft-components";

export function transformToken(token: any): NFTDataContextType {
  if (!token || !token.metadata) {
    return {
      nft: { error: "missing data", currencyLoaded: false },
      metadata: { loading: false, metadata: null },
    };
  }
  //todo(iain); check
  const metadata = token.metadata.json;
  return {
    nft: {
      blitmapInfo: token.blitmapInfo,
      data: {
        pricing: {
          status: AuctionStateInfo.RESERVE_AUCTION_ENDED,
          perpetual: { bids: [] },
          reserve: undefined,
          auctionType: AuctionType.RESERVE,
        },
        nft: {
          tokenId: token.tokenId,
          contract: {
            address: token.address,
          },
          owner: token.owner,
          creator: token.minter,
          metadataURI: token.tokenURI,
        },
        // @ts-ignore
        openseaInfo: {
          creator: { address: token.minter },
        },
      },
    },
    metadata: {
      metadata: {
        // title: metadata.title,
        // description: metadata.description,
        image: `https://market.blitmap.com/blitmaps-32/${token.tokenId}.png`,//metadata.image,
      },
      loading: false,
    },
  };
}
