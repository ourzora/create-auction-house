import { Fragment, useContext } from "react";

import { useMediaContext } from "../context/useMediaContext";
import { NFTDataContext } from "../context/NFTDataContext";
import { CountdownDisplay } from "../components/CountdownDisplay";
import { PricingString } from "../utils/PricingString";
import { AuctionStateInfo, AuctionType } from "@zoralabs/nft-hooks";
import type { StyleProps } from "../utils/StyleTypes";

function isInFuture(timestamp: string) {
  const timestampParsed = parseInt(timestamp);
  return timestampParsed > Math.floor(new Date().getTime() / 1000);
}

type PricingComponentProps = {
  showPerpetual?: boolean;
} & StyleProps;

export const PricingComponent = ({
  showPerpetual = true,
  className,
}: PricingComponentProps) => {
  const {
    nft: { data },
  } = useContext(NFTDataContext);

  const { getStyles, getString } = useMediaContext();

  const pricing = data?.pricing;

  if (
    pricing &&
    !pricing.reserve &&
    pricing.status === AuctionStateInfo.NO_PRICING
  ) {
    return (
      <div {...getStyles("cardAuctionPricing", className, { type: "unknown" })}>
        <div {...getStyles("textSubdued")}>{getString("RESERVE_PRICE")}</div>
        <div {...getStyles("pricingAmount")}>
          {getString("NO_PRICING_PLACEHOLDER")}
        </div>
        <div {...getStyles("textSubdued")}>{getString("HIGHEST_BID")}</div>
        <div {...getStyles("pricingAmount")}>
          {getString("NO_PRICING_PLACEHOLDER")}
        </div>
      </div>
    );
  }

  if (
    pricing &&
    showPerpetual &&
    (!pricing.reserve || pricing.reserve?.finalizedAtTimestamp) &&
    pricing.auctionType === AuctionType.PERPETUAL
  ) {
    let listPrice = null;

    if (pricing.perpetual.ask?.pricing) {
      const perpetualPricing = pricing.perpetual.ask?.pricing;
      listPrice = (
        <Fragment>
          <span {...getStyles("textSubdued")}>{getString("LIST_PRICE")}</span>
          <PricingString pricing={perpetualPricing} showUSD={false} />
        </Fragment>
      );
    }
    const highestBid = pricing.perpetual.highestBid;
    if (!highestBid && pricing.reserve?.previousBids.length) {
      const highestPreviousBid = pricing.reserve.previousBids[0];
      return (
        <div
          {...getStyles("cardAuctionPricing", className, {
            type: "reserve-pending",
          })}
        >
          <span {...getStyles("textSubdued")}>{getString("SOLD_FOR")}</span>
          <span {...getStyles("pricingAmount")}>
            <PricingString
              pricing={highestPreviousBid.pricing}
              showUSD={false}
            />
          </span>
          {listPrice}
        </div>
      );
    }
    return (
      <div
        {...getStyles("cardAuctionPricing", className, { type: "perpetual" })}
      >
        <span {...getStyles("textSubdued")}>{getString("HIGHEST_BID")}</span>
        <span {...getStyles("pricingAmount")}>
          {highestBid ? (
            <PricingString showUSD={false} pricing={highestBid.pricing} />
          ) : (
            getString("NO_PRICING_PLACEHOLDER")
          )}
        </span>
        {listPrice}
      </div>
    );
  }
  if (pricing && pricing.reserve) {
    if (
      pricing.reserve?.current.reserveMet &&
      !pricing.reserve?.current.likelyHasEnded
    ) {
      const highestBid = pricing.reserve?.current.highestBid;
      return (
        <div
          {...getStyles("cardAuctionPricing", className, {
            type: "reserve-active",
          })}
        >
          <span {...getStyles("textSubdued")}>{getString("TOP_BID")}</span>
          <span {...getStyles("pricingAmount")}>
            {highestBid && (
              <PricingString pricing={highestBid?.pricing} showUSD={false} />
            )}
          </span>
          {pricing.reserve?.expectedEndTimestamp &&
            isInFuture(pricing.reserve.expectedEndTimestamp) && (
              <Fragment>
                <span {...getStyles("textSubdued")}>
                  {getString("ENDS_IN")}
                </span>
                <span {...getStyles("pricingAmount")}>
                  <CountdownDisplay to={pricing.reserve.expectedEndTimestamp} />
                </span>
              </Fragment>
            )}
        </div>
      );
    }

    if (pricing.reserve && pricing.reserve.current.likelyHasEnded) {
      const highestBid =
        pricing.reserve.currentBid || pricing.reserve.previousBids[0];
      return (
        <div
          {...getStyles("cardAuctionPricing", className, {
            type: "reserve-finished",
          })}
        >
          <span {...getStyles("textSubdued")}>
            {getString("AUCTION_SOLD_FOR")}
          </span>
          <span {...getStyles("pricingAmount")}>
            <PricingString showUSD={false} pricing={highestBid.pricing} />
          </span>
        </div>
      );
    }
    if (pricing.reserve?.reservePrice) {
      return (
        <div
          {...getStyles("cardAuctionPricing", className, {
            type: "reserve-pending",
          })}
        >
          <span {...getStyles("textSubdued")}>
            {getString("RESERVE_PRICE")}
          </span>
          <span>
            <PricingString
              showUSD={false}
              pricing={pricing.reserve.reservePrice}
            />
          </span>
        </div>
      );
    }
  }

  return (
    <div {...getStyles("cardAuctionPricing", className, { type: "unknown" })}>
      <div {...getStyles("textSubdued")}>{getString("PRICING_LOADING")}</div>
      <div {...getStyles("pricingAmount")}>{getString("PRICING_LOADING")}</div>
    </div>
  );
};
