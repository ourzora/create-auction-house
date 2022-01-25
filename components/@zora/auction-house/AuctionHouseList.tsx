import { AuctionResultType, useAuctions } from "@zoralabs/nft-hooks";
import { useMediaContext } from "../context/useMediaContext";
import { NFTPreview } from "../nft-preview/NFTPreview";

type AuctionHouseProps = {
  curatorIds: string[];
  approved?: boolean | null;
  onClick?: (
    evt: React.MouseEvent<HTMLElement>,
    result: AuctionResultType
  ) => void;
};

export const AuctionHouseList = ({
  curatorIds,
  approved = true,
  onClick,
}: AuctionHouseProps) => {
  const { data, loading, error } = useAuctions(curatorIds, approved);
  const { getStyles } = useMediaContext();

  if (loading || error) {
    return <span>...</span>;
  }

  return (
    <div {...getStyles("auctionHouseList")}>
      {data &&
        data.map((auction) => (
          <NFTPreview
            key={auction.id}
            id={auction.tokenId}
            contract={auction.tokenContract}
            onClick={onClick ? (evt) => onClick(evt, auction) : undefined}
          />
        ))}
    </div>
  );
};
