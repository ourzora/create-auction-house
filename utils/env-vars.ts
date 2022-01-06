export const NETWORK_ID: string = process.env.NEXT_PUBLIC_NETWORK_ID!;
if (!NETWORK_ID) {
  throw new Error("NetworkID is required.");
}

export const CURATOR_ID = process.env.NEXT_PUBLIC_CURATOR_ID;
export const CONTRACT_ADDRESSES = process.env.NEXT_PUBLIC_CONTRACT_ADDRESSES;
if (!CURATOR_ID && !CONTRACT_ADDRESSES) {
  throw new Error(
    "At least one of curator id or contract address is required"
  );
}

export const APP_TITLE = process.env.NEXT_PUBLIC_APP_TITLE

export const RPC_URL: string | undefined = process.env.NEXT_PUBLIC_RPC_URL;
