import { css } from "@emotion/css";
import { AuctionStateInfo } from "@zoralabs/nft-hooks";

import { Style } from "../../constants/style";
import { ThemeOptionsType } from "../../constants/theme";

export const DarkTheme = {
  theme: {
    previewCard: {
      height: "420px",
    },
    titleFont: {
      fontFamily: "courier",
      color: "#fff",
      fontWeight: 400,
      fontSize: "14px",
    },
    bodyFont: {
      fontFamily: "courier",
      color: "#fff",
      fontWeight: 300,
      fontSize: "14px",
    },

    borderStyle: "0",
    lineSpacing: 28,
  },
  styles: {
    cardAuctionPricing: (theme: ThemeOptionsType, args: any) => {
      return [
        Style.styles.cardAuctionPricing(theme, args),
        css`
          background: transparent;
        `,
      ];
    },
    cardOuter: (
      theme: ThemeOptionsType,
      { hasClickEvent, auctionStatus }: any
    ) => {
      const getBackground = () => {
        switch (auctionStatus) {
          case AuctionStateInfo.RESERVE_AUCTION_ACTIVE:
            return `
              background: linear-gradient(
                  180deg,
                  rgba(255, 255, 255, 0.5) 0%,
                  rgba(255, 255, 255, 0) 100%
                ),
                #202020;
            `;
          case AuctionStateInfo.RESERVE_AUCTION_LAST_15:
            return `
              background: linear-gradient(
                  0deg,
                  rgba(0, 0, 0, 0.5),
                  rgba(0, 0, 0, 0.5)
                ),
                linear-gradient(180deg, #adf500 68.97%, #b88a61 100%);
            `;
          case AuctionStateInfo.PERPETUAL_ASK:
          case AuctionStateInfo.RESERVE_AUCTION_PENDING:
          default:
            return `
              background: linear-gradient(
                  180deg,
                  rgba(255, 255, 255, 0.5) 0%,
                  rgba(255, 255, 255, 0) 100%
                ),
                #696969;
            `;
        }
      };

      return [
        Style.styles.cardOuter(theme, { hasClickEvent }),
        css`
          ${getBackground()}
        `,
      ];
    },
  },
};
