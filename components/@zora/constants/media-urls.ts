import { Networks } from "@zoralabs/nft-hooks";

export const MEDIA_URL_BASE_BY_NETWORK = {
  [Networks.MAINNET]: "https://zora.co/",
  [Networks.RINKEBY]: null,
};

export const VIEW_ETHERSCAN_URL_BASE_BY_NETWORK = {
  [Networks.MAINNET]: "https://etherscan.io/token/",
  [Networks.RINKEBY]: "https://rinkeby.etherscan.io/token/",
};

export const ZORA_SITE_URL_BASE = "https://zora.co";
