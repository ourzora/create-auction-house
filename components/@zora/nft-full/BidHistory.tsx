import { Fragment, useContext } from "react";

import { PricingString } from "../utils/PricingString";
import { AddressView } from "../components/AddressView";
import { NFTDataContext } from "../context/NFTDataContext";
import { useMediaContext } from "../context/useMediaContext";
import { InfoContainer } from "./InfoContainer";
import type { StyleProps } from "../utils/StyleTypes";

const dateFromTimestamp = (timestamp: string) =>
  new Date(parseInt(timestamp, 10) * 1000);

const formatDate = (timestamp: string) =>
  dateFromTimestamp(timestamp).toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

type BidHistoryProps = {
  showPerpetual?: boolean;
} & StyleProps;

export const BidHistory = ({
  showPerpetual = true,
  className,
}: BidHistoryProps) => {
  const { nft } = useContext(NFTDataContext);
  const { getString, getStyles, style } = useMediaContext();

  const getPastBids = () => {
    const { data } = nft;
    if (!data || !data.nft) {
      return <Fragment />;
    }

    const currentBid = data.pricing.reserve?.currentBid
      ? [data.pricing.reserve?.currentBid]
      : [];
    const eventsList = [
      ...(showPerpetual ? data.pricing.perpetual.bids : []),
      ...(data.pricing.reserve?.previousBids || []),
      ...currentBid,
    ].map((bid) => ({
      activityDescription: getString("BID_HISTORY_BID"),
      actor: bid.bidder.id,
      pricing: <PricingString pricing={bid.pricing} showUSD={false} />,
      createdAt: bid.createdAtTimestamp,
      // hint for type inference
      transactionHash: bid.transactionHash as string | null,
    }));

    if (
      data.pricing.reserve?.createdAtTimestamp &&
      // Only show approved auction listings
      data.pricing.reserve?.approvedTimestamp
    ) {
      eventsList.push({
        activityDescription: getString("BID_HISTORY_LISTED"),
        pricing: <Fragment />,
        actor: data.pricing.reserve.tokenOwner.id,
        // TODO(iain): Update to the timestamp when approved
        createdAt: data.pricing.reserve.approvedTimestamp,
        transactionHash: data.pricing.reserve.transactionHash,
      });
    }

    if (
      data.pricing &&
      data.pricing.reserve &&
      data.pricing.reserve.current.likelyHasEnded &&
      (data.pricing.reserve.status === "Active" ||
        data.pricing.reserve.status === "Finished")
    ) {
      const highestBid =
        data.pricing.reserve.currentBid || data.pricing.reserve.previousBids[0];
      eventsList.push({
        activityDescription: getString("BID_HISTORY_WON_AUCTION"),
        pricing: <Fragment />,
        actor: highestBid.bidder.id,
        createdAt: data.pricing.reserve.expectedEndTimestamp,
        transactionHash:
          data.pricing.reserve.currentBid?.transactionHash || null,
      });
    }

    if (
      "zoraNFT" in data &&
      data.zoraNFT &&
      data.zoraNFT.createdAtTimestamp &&
      !("zoraIndexerResponse" in data)
    ) {
      eventsList.push({
        activityDescription: getString("BID_HISTORY_MINTED"),
        pricing: <Fragment />,
        actor: data.nft.creator || "",
        createdAt: data.zoraNFT.createdAtTimestamp,
        transactionHash: null,
      });
    }

    if ("zoraIndexerResponse" in data && data.zoraIndexerResponse.minter) {
      const unixDate =
        new Date(
          data.zoraIndexerResponse.mintTransferEvent?.blockTimestamp + "Z"
        ).getTime() / 1000;

      eventsList.push({
        activityDescription: getString("BID_HISTORY_MINTED"),
        pricing: <Fragment />,
        actor: data.zoraIndexerResponse.minter,
        createdAt: unixDate.toString(),
        transactionHash:
          data.zoraIndexerResponse.mintTransferEvent?.transactionHash || null,
      });
    }

    if ("openseaInfo" in data && data.openseaInfo.creator) {
      eventsList.push({
        activityDescription: getString("BID_HISTORY_MINTED"),
        pricing: <Fragment />,
        actor: data.openseaInfo.creator.address,
        createdAt: null,
        transactionHash: null,
      });
    }

    return eventsList
      .sort((bidA, bidB) => (bidA.createdAt > bidB.createdAt ? -1 : 1))
      .map((bidItem) => (
        <li
          {...getStyles("fullPageHistoryItem")}
          key={`${bidItem.actor}-${bidItem.createdAt}`}
        >
          <div {...getStyles("fullPageHistoryItemDescription")}>
            <div {...getStyles("fullPageHistoryItemDescriptionCopy")}>
              <AddressView address={bidItem.actor} />
              &nbsp;
              <span {...getStyles("pricingAmount")}>
                {bidItem.activityDescription} {bidItem.pricing}
              </span>
            </div>
            {bidItem.transactionHash && style.theme.showTxnLinks && (
              <a
                {...getStyles("fullPageHistoryTxnLink")}
                href={`https://etherscan.io/tx/${bidItem.transactionHash}`}
                target="_blank"
                rel="noreferrer"
              >
                {getString("BID_HISTORY_VIEW_TRANSACTION")}
              </a>
            )}
          </div>
          {bidItem.createdAt && (
            <div {...getStyles("fullPageHistoryItemMeta")}>
              <time
                dateTime={dateFromTimestamp(bidItem.createdAt).toISOString()}
                {...getStyles("fullPageHistoryItemDatestamp")}
              >
                {formatDate(bidItem.createdAt)}
              </time>
            </div>
          )}
        </li>
      ));
  };

  return (
    <InfoContainer titleString="NFT_HISTORY" className={className}>
      <ol {...getStyles("fullPageHistoryList")}>{getPastBids()}</ol>
    </InfoContainer>
  );
};
