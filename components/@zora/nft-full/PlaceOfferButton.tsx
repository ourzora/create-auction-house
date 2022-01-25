import { Fragment, useContext } from "react";

import { ZORA_SITE_URL_BASE } from "../constants/media-urls";
import { useMediaContext } from "../context/useMediaContext";
import { Button } from "../components/Button";
import { NFTDataContext } from "../context/NFTDataContext";
import { AuctionType } from "@zoralabs/nft-hooks";
import type { StyleProps } from "../utils/StyleTypes";

type PlaceOfferButtonProps = {
  allowOffer?: boolean;
} & StyleProps;

export const PlaceOfferButton = ({ allowOffer, className }: PlaceOfferButtonProps) => {
  const { nft } = useContext(NFTDataContext);
  const { getString, getStyles } = useMediaContext();

  if (!nft.data) {
    return <Fragment />;
  }

  // Disable offer functionality if not a zora NFT or if offers are disabled
  if (
    (allowOffer === false ||
      !("zoraNFT" in nft.data) ||
      nft.data.zoraNFT === undefined) &&
    nft.data.pricing.auctionType !== AuctionType.RESERVE
  ) {
    return <Fragment />;
  }

  function getBidURLParts() {
    const data = nft.data;
    if (!data) {
      return;
    }
    if (data.pricing.auctionType !== AuctionType.RESERVE && data.nft.contract.knownContract !== 'zora') {
      return;
    }
    return [
      ZORA_SITE_URL_BASE,
      "collections",
      data.nft.contract.address,
      data.nft.tokenId,
      data.pricing.auctionType === AuctionType.RESERVE ? "auction/bid" : "offer",
    ];
  }

  const bidURL = getBidURLParts()?.join("/");

  if (!bidURL) {
    return <Fragment />;
  }

  return (
    <div {...getStyles("fullPlaceOfferButton", className)}>
      <Button primary={true} href={bidURL}>
        {getString(
          nft.data.pricing.auctionType === AuctionType.RESERVE
            ? "PLACE_BID"
            : "PLACE_OFFER"
        )}
      </Button>
    </div>
  );
};
