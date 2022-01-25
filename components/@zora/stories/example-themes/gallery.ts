import { css } from "@emotion/css";
import { AuctionStateInfo } from "@zoralabs/nft-hooks";

import { Style } from "../../constants/style";
import { ThemeOptionsType } from "../../constants/theme";

export const GalleryTheme = {
  theme: {
    previewCard: {
      height: "500px",
      width: "400px",
    },
    borderStyle: "0",
    lineSpacing: 28,
  },
  styles: {
    cardAuctionPricing: (theme: ThemeOptionsType, { type }: { type: any }) => {
      return [
        Style.styles.cardAuctionPricing(theme, { type }),
        css`
          ${type !== "reserve-active" ? "display: none;" : ""}
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background-color: rgba(0, 0, 0, 0.4);
          transition: background-color 0.5s ease-in-out;
          &:hover {
            background-color: rgba(0, 0, 0, 0.5);
          }
        `,
      ];
    },
    cardItemInfo: (_: ThemeOptionsType) => css`
      display: none;
    `,
    cardOuter: (
      theme: ThemeOptionsType,
      { hasClickEvent, auctionStatus }: any
    ) => {
      const shouldHighlight =
        auctionStatus === AuctionStateInfo.RESERVE_AUCTION_ACTIVE ||
        auctionStatus === AuctionStateInfo.RESERVE_AUCTION_LAST_15;
      return [
        Style.styles.cardOuter(theme, { hasClickEvent }),
        css`
          position: relative;
          max-height: 600px;
          ${shouldHighlight
            ? "box-shadow: 0 25px 40px -12px rgba(0, 0, 0, 0.35);"
            : ""}
        `,
      ];
    },
  },
};
