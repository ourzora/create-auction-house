import { FetchStaticData, MediaFetchAgent } from "@zoralabs/nft-hooks";
import { NETWORK_ID, CONTRACT_ADDRESSES } from './../../utils/env-vars'

module.exports = async (req: any, res: any) => {
  const { owner } = req.query;
  if (!owner) {
    return res.status(403).json({ failed: true });
  }

  const fetchAgent = new MediaFetchAgent(
    NETWORK_ID as any
  );

  const tokens = await FetchStaticData.fetchUserOwnedNFTs(
    fetchAgent,
    {
      collectionAddresses: CONTRACT_ADDRESSES
        ? (CONTRACT_ADDRESSES as string).split(",")
        : undefined,
      userAddress: owner,
      limit: 200,
      offset: 0,
    },
    true
  );
  res.status(200).json({ tokens });
};
