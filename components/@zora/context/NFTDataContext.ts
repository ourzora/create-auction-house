import { createContext } from "react";
import type {
  useNFTMetadataType,
  useNFTType,
  useZNFTType,
} from "@zoralabs/nft-hooks";

export type NFTDataContext = {
  nft: useNFTType | useZNFTType;
  metadata: useNFTMetadataType;
};

const DEFAULT_OBJECT = {
  loading: true,
  error: undefined,
};

export const NFTDataContext = createContext<NFTDataContext>({
  nft: { ...DEFAULT_OBJECT, currencyLoaded: false },
  metadata: { ...DEFAULT_OBJECT, metadata: undefined },
});
