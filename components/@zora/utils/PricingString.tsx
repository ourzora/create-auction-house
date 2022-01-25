import type { PricingInfo } from "@zoralabs/nft-hooks";
import { Fragment } from "react";

import { useMediaContext } from "../context/useMediaContext";

export const PricingString = ({
  pricing,
  showUSD = true,
}: {
  pricing: PricingInfo;
  showUSD?: boolean;
}) => {
  const { getStyles, style } = useMediaContext();

  const { format } = new Intl.NumberFormat(
    typeof window === "undefined" ? "en-US" : navigator.language,
    {
      style: "decimal",
      maximumFractionDigits: style.theme.maximumPricingDecimals,
    }
  );

  return (
    <Fragment>
      <span {...getStyles("pricingAmount")}>
        {format(parseFloat(pricing.prettyAmount))} {pricing.currency.symbol}
      </span>
      {showUSD && pricing.computedValue && (
        <span {...getStyles("textSubdued")}>
          {" "}
          ${format(parseInt(pricing.computedValue?.inUSD, 10))}
        </span>
      )}
    </Fragment>
  );
};
