import { FetchStaticData, MediaFetchAgent } from "@zoralabs/nft-hooks";
import { CONTRACT_ADDRESSES } from "../../utils/env-vars";

module.exports = async (req: any, res: any) => {
  const { owner } = req.query;
  if (!owner) {
    return res.status(403).json({ failed: true });
  }

  const fetchAgent = new MediaFetchAgent(
    process.env.NEXT_PUBLIC_NETWORK_ID as any
  );

  const tokens = await FetchStaticData.fetchUserOwnedNFTs(
    fetchAgent,
    {
      collectionAddresses: CONTRACT_ADDRESSES?.split(","),
      userAddress: owner,
      limit: 200,
      offset: 0,
    },
    true
  );
  res.status(200).json({ tokens });
};
