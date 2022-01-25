import { AuctionStateInfo, AuctionType } from "@zoralabs/nft-hooks";
import React, { Fragment, useContext } from "react";

import { PricingString } from "../utils/PricingString";
import { AddressView } from "../components/AddressView";
import {
  CountdownDisplay,
  DurationDisplay,
} from "../components/CountdownDisplay";
import { NFTDataContext } from "../context/NFTDataContext";
import { useMediaContext } from "../context/useMediaContext";
import { InfoContainer, InfoContainerProps } from "./InfoContainer";
import type { StyleProps } from "../utils/StyleTypes";

type AuctionInfoProps = {
  showPerpetual?: boolean;
} & StyleProps;

export const AuctionInfo = ({
  showPerpetual = true,
  className,
}: AuctionInfoProps) => {
  const { nft } = useContext(NFTDataContext);
  const { getStyles, getString } = useMediaContext();

  const AuctionInfoWrapper = ({
    children,
    ...containerArgs
  }: InfoContainerProps) => (
    <InfoContainer {...containerArgs} className={className}>
      {children}
    </InfoContainer>
  );

  if (!nft.data) {
    return <Fragment />;
  }

  const { data } = nft;

  if (data.pricing.status === AuctionStateInfo.NO_PRICING) {
    return <React.Fragment />;
  }

  if (data.pricing.status === AuctionStateInfo.PERPETUAL_ASK && showPerpetual) {
    return (
      <Fragment>
        {data.pricing.perpetual.ask && (
          <AuctionInfoWrapper titleString="LIST_PRICE">
            <PricingString pricing={data.pricing.perpetual.ask.pricing} />
          </AuctionInfoWrapper>
        )}
        <AuctionInfoWrapper titleString="OPEN_OFFERS">
          Be the first one to bid on this piece!
        </AuctionInfoWrapper>
      </Fragment>
    );
  }

  const reserve = data.pricing.reserve;

  if (
    data.pricing.reserve &&
    data.pricing.reserve.current.likelyHasEnded &&
    (data.pricing.reserve.status === "Finished" ||
      data.pricing.reserve.status === "Active")
  ) {
    const highestPreviousBid =
      data.pricing.reserve.currentBid || data.pricing.reserve.previousBids[0];
    return (
      <AuctionInfoWrapper className={className} titleString="AUCTION_SOLD_FOR">
        <div {...getStyles("fullInfoAuctionPricing")}>
          <PricingString pricing={highestPreviousBid.pricing} />
        </div>
        <div {...getStyles("fullInfoSpacer", undefined, { width: 15 })} />
        <div {...getStyles("fullLabel")}>{getString("WINNER")}</div>
        <AddressView address={highestPreviousBid.bidder.id} />
      </AuctionInfoWrapper>
    );
  }

  if (
    reserve !== undefined &&
    !reserve.current.likelyHasEnded &&
    reserve.expectedEndTimestamp &&
    reserve.current.highestBid !== undefined
  ) {
    return (
      <AuctionInfoWrapper titleString="AUCTION_ENDS">
        <div {...getStyles("pricingAmount")}>
          <CountdownDisplay to={reserve.expectedEndTimestamp} />
        </div>
        <div {...getStyles("fullInfoSpacer")} />
        <div {...getStyles("fullLabel")}>{getString("HIGHEST_BID")}</div>
        <div {...getStyles("fullInfoAuctionPricing")}>
          <PricingString pricing={reserve.current.highestBid.pricing} />
        </div>
        <div {...getStyles("fullInfoSpacer")} />
        <div {...getStyles("fullLabel")}>{getString("BIDDER")}</div>
        <AddressView address={reserve.current.highestBid?.placedBy} />
      </AuctionInfoWrapper>
    );
  }

  if (
    showPerpetual &&
    data.pricing.auctionType === AuctionType.PERPETUAL &&
    data.pricing.perpetual.highestBid
  ) {
    return (
      <AuctionInfoWrapper titleString="HIGHEST_BID">
        <PricingString pricing={data.pricing.perpetual.highestBid?.pricing} />
      </AuctionInfoWrapper>
    );
  }

  if (!showPerpetual && data.pricing.auctionType === AuctionType.PERPETUAL) {
    return <Fragment />;
  }

  return (
    <AuctionInfoWrapper
      titleString={
        data.pricing.auctionType === AuctionType.PERPETUAL
          ? "LIST_PRICE"
          : "RESERVE_PRICE"
      }
    >
      <div {...getStyles("pricingAmount")}>
        {data.pricing.auctionType === AuctionType.PERPETUAL &&
          data.pricing.perpetual.ask && (
            <div>
              <PricingString pricing={data.pricing.perpetual.ask.pricing} />
            </div>
          )}
        {data.pricing.auctionType === AuctionType.RESERVE &&
          data.pricing.reserve?.reservePrice && (
            <>
              <div {...getStyles("fullInfoAuctionPricing")}>
                <PricingString pricing={data.pricing.reserve.reservePrice} />
              </div>
              <div>
                <div {...getStyles("fullInfoSpacer")} />
                <div {...getStyles("fullLabel")}>
                  {getString("AUCTION_PENDING_DURATION")}
                </div>
                <DurationDisplay duration={data.pricing.reserve.duration} />
              </div>
            </>
          )}
      </div>
    </AuctionInfoWrapper>
  );
};
