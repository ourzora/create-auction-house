import { css } from "@emotion/css";

import {
  SVG_FULLSCREEN,
  SVG_MUTED,
  SVG_NEXT_ICON,
  SVG_PAUSE,
  SVG_PLAY_ARROW,
  SVG_UNMUTED,
  SVG_AUCTION_APPROVE,
  SVG_AUCTION_DENY,
} from "./svg-icons";
import { ThemeOptions, ThemeOptionsType } from "./theme";

const buttonCommonSize = (size: string) => `
  padding: ${size};
  width: ${size};
  height: ${size};
  background: #eee;
  border: 0;
  border-radius: 200px;
  color: transparent;
  cursor: pointer;
  background-repeat: no-repeat;
  background-position: center;
  margin: 0 10px;
`;

const buttonReset = `
  font: inherit;
  text-decoration: none;
  margin: 0;
  border: 0;
  cursor: pointer;
  display: inline-block;
`;

const CENTER_FULL_CONTAINER = `
  position: absolute;
  width: 100%;
  justify-content: center;
  align-content: center;
  align-items: center;
  justify-items: center;
  display: flex;
  height: 100%;
`;

function renderSVG(svg: string) {
  return `background-image: url("data:image/svg+xml,${encodeURIComponent(
    svg
  )}");`;
}

export const Style = {
  theme: ThemeOptions,
  useDefaultStyles: true,
  styles: {
    auctionHouseList: (_: ThemeOptionsType) => css`
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
    `,
    // Styles for preview card
    cardOuter: (theme: ThemeOptionsType, { hasClickEvent }: any) => css`
      background: ${theme.previewCard.background};
      overflow: hidden;
      border-radius: ${theme.defaultBorderRadius}px;
      border: ${theme.borderStyle};
      margin: 15px;
      width: ${theme.previewCard.width};
      line-height: ${theme.lineSpacing}px;
      ${theme.bodyFont}
      transition: transform 0.1s ease-in-out;
      position: relative;
      ${hasClickEvent
        ? `
        &:active {
          transform: scale(0.98);
        }
      `
        : ""}
    `,
    cardLink: (_: ThemeOptionsType) => css`
      ${buttonReset}
      color: transparent;
      background: transparent;
      width: 100%;
      height: 100%;
      position: absolute;
      z-index: 1;
    `,
    cardHeader: (theme: ThemeOptionsType) => css`
      padding: ${theme.textBlockPadding};
      ${theme.titleFont}
    `,
    cardMediaWrapper: (theme: ThemeOptionsType) => css`
      width: ${theme.previewCard.width};
      height: ${theme.previewCard.height};
      display: flex;
      overflow: hidden;
      position: relative;
      justify-content: center;
    `,
    cardItemInfo: (theme: ThemeOptionsType) => css`
      padding: ${theme.textBlockPadding};
      border-top: ${theme.borderStyle};
    `,
    cardAuctionPricing: (
      theme: ThemeOptionsType,
      {
        type,
      }: {
        type: "perpetual" | "reserve-active" | "reserve-pending" | "unknown";
      }
    ) => {
      const getActiveStyle = () => {
        switch (type) {
          case "reserve-active":
            return `
              background: #000;
              color: #fff;
            `;
          case "reserve-pending":
            return `
              background: #e6e6e6; 
            `;
          case "unknown":
          case "perpetual":
            return ``;
        }
      };
      return css`
        display: grid;
        grid-auto-flow: column;
        grid-template-rows: auto auto;
        grid-auto-columns: 1fr;
        padding: ${theme.textBlockPadding};
        border-top: ${theme.borderStyle};
        ${getActiveStyle()};
      `;
    },
    cardTitle: (theme: ThemeOptionsType) => css`
      font-size: inherit;
      margin: 0;
      max-width: calc(${theme.previewCard.width} - 30px);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      ${theme.titleFont};
    `,
    // Styles for full-page view
    fullPage: (theme: ThemeOptionsType) => theme.bodyFont,
    fullMediaWrapper: (_: ThemeOptionsType) => css`
      margin: 5%;
      position: relative;
    `,
    fullItemInfo: (_: ThemeOptionsType) => css``,
    fullTitle: (theme: ThemeOptionsType) => css`
      font-weight: inherit;
      font-size: 30px;
      margin: ${theme.spacingUnit} 0;
    `,
    fullDescription: (theme: ThemeOptionsType) => css`
      font-size: ${theme.fontSizeFull}px;
      margin: 10px 0;
      overflow: hidden;
    `,
    fullOwnerAddress: (theme: ThemeOptionsType) => [
      css`
        font-size: ${theme.fontSizeFull}px;
        margin: 0;
        overflow: hidden;
      `,
      theme.titleFont,
    ],
    fullLabel: (theme: ThemeOptionsType) => [
      css`
        margin: 0 0 5px;
        text-transform: uppercase;
        font-size: 14px;
        opacity: 0.5;
        overflow: hidden;
      `,
      theme.bodyFont,
    ],
    fullPageHistoryList: () => css`
      padding: 0;
      margin: 0;
    `,
    fullPageHistoryItem: (theme: ThemeOptionsType) => [
      css`
        margin-top: 15px;
        display: flex;
        flex-direction: column;
        font-weight: 300;
      `,
      theme.bodyFont,
    ],
    // CSS Class for restyling and targeting
    fullPageHistoryItemDescription: () => css`
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    `,
    fullPageHistoryItemDescriptionCopy: () => css`
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
    `,
    fullPageHistoryItemMeta: () => css`
      position: relative;
    `,
    fullPageHistoryTxnLink: () => css`
      font-size: 0;
      position: relative;
      display: block;
      &:hover {
        :after {
          opacity: 1;
          color: pink;
        }
      }
      :after {
        border-radius: 4px;
        padding: 4px;
        opacity: 0.8;
        background-repeat: no-repeat;
        background-position: center;
        top: 2px;
        z-index: 10;
        right: 0;
        transition: opacity 0.4s ease-in;
        content: " ";
        width: 14px;
        height: 14px;
        position: absolute;
        ${renderSVG(SVG_NEXT_ICON)}
      }
    `,
    nftProposalMediaWrapper: (theme: ThemeOptionsType) => css`
      border-radius: 4px;
      display: flex;
      height: ${theme.nftProposalCard.mediaHeight};
      justify-content: center;
      overflow: hidden;
      position: relative;
      width: ${theme.nftProposalCard.mediaWidth};
    `,
    nftProposalInfoLayout: (theme: ThemeOptionsType) => css`
      flex-grow: 1;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 10px;
      margin: 0 30px;
      position: relative;

      &:after {
        content: " ";
        position: absolute;
        top: 10px;
        bottom: 10px;
        right: 5px;
        border-right: ${theme.borderStyle};
        border-right-width: 1px;
      }
    `,
    nftProposalActionList: (_: ThemeOptionsType) => css`
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-template-rows: repeat(2, 1fr);
      gap: 10px;
      padding: 5px 0;
    `,
    nftProposalLabelWrapper: (_: ThemeOptionsType) => css``,
    nftProposalUserView: (_: ThemeOptionsType) => css``,
    nftProposalLabel: (theme: ThemeOptionsType) => [
      css`
        text-transform: uppercase;
        font-size: 12px;
        margin-bottom: 10px;
        opacity: 0.5;
      `,
      theme.bodyFont,
    ],
    fullPageHistoryItemDatestamp: (theme: ThemeOptionsType) => [
      css`
        font-size: 12px;
        padding-top: 2px;
        opacity: 0.5;
      `,
      theme.bodyFont,
    ],
    fullPageDataGrid: (theme: ThemeOptionsType) => css`
      display: grid;
      grid-gap: ${theme.spacingUnit};
    `,
    infoContainer: (theme: ThemeOptionsType, { bottomPadding }: any) =>
      css`
        border: 2px solid black;
        border-radius: ${theme.defaultBorderRadius}px;
        padding: ${theme.spacingUnit} ${theme.spacingUnit}
          ${bottomPadding ? theme.spacingUnit : 0};
        position: relative;
      `,
    fullInfoSpacer: (_: any, { height = 15 }: { height: number }) => css`
      height: ${height}px;
    `,
    fullInfoAuctionPricing: (theme: ThemeOptionsType) => css`
      display: flex;
      flex-direction: row;
      span:first-of-type {
        padding-right: calc(${theme.spacingUnit} / 2);
      }
    `,
    fullInfoAuctionWrapper: () => ``,
    fullPlaceOfferButton: (_: any) => css``,
    fullInfoCreatorEquityContainer: (_: any) => css``,
    fullInfoCuratorFeeContainer: (_: any) => css`
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
    `,
    fullInfoProofAuthenticityContainer: (theme: ThemeOptionsType) => css`
      margin-top: ${theme.spacingUnit};
    `,
    fullProofLink: (theme: ThemeOptionsType) => css`
      display: block;
      text-decoration: none;
      color: ${theme.linkColor};
      padding: ${theme.spacingUnit};
      margin: 0 -${theme.spacingUnit};
      border-top: 2px solid black;

      :hover {
        color: pink;
      }
      :after {
        content: " ";
        width: 14px;
        height: 14px;
        opacity: 0.5;
        ${renderSVG(SVG_NEXT_ICON)}
        color: #eee;
        right: ${theme.spacingUnit};
        position: absolute;
      }
    `,
    fullCreatorOwnerSection: (theme: ThemeOptionsType) => css`
      display: grid;
      grid-auto-flow: column;
      grid-template-rows: auto auto;
      grid-auto-columns: 1fr;
      padding: ${theme.spacingUnit};
      border: 2px solid black;
      border-radius: ${theme.defaultBorderRadius}px;
      margin: ${theme.spacingUnit} 0 0;
    `,
    // Properties Component
    propertiesGrid: (theme: ThemeOptionsType) => css`
      display: grid;
      grid-auto-flow: row;
      grid-template-columns: auto auto;
      padding-top: ${theme.spacingUnit};
      grid-gap: calc(${theme.spacingUnit} / 2);
      text-align: center;
    `,
    propertiesItem: (theme: ThemeOptionsType) => css`
      border: ${theme.borderStyle};
      border-radius: ${theme.defaultBorderRadius}px;
      padding: ${theme.spacingUnit} calc(${theme.spacingUnit} / 4);
      position: relative;
      display: grid;
      grid-template-rows: 1fr 1fr;
      grid-gap: calc(${theme.spacingUnit} / 6);
      line-height: 1;
    `,
    propertiesLabel: (theme: ThemeOptionsType) => [
      css`
        margin: 0 0 5px;
        text-transform: capitalize;
        font-size: 14px;
        opacity: 0.5;
      `,
      theme.bodyFont,
    ],
    // Collection Tag
    colectionTagWrapper: (theme: ThemeOptionsType) => [
      css`
        border: 2px solid black;
        border-radius: 200px;
        transition: transform 0.1s ease-in-out;
        padding: calc(${theme.spacingUnit} / 4);
        display: flex;
        flex-direction: row;
        align-items: center;
        text-decoration: none;
        color: ${theme.linkColor};
        overflow: hidden;
        cursor: pointer;
        &:hover{
          color: pink;
        }
        &:active {
          transform: scale(0.98);
        }
        span {
          margin: 0 calc(${theme.spacingUnit} / 2);
        }
      `,
      theme.titleFont,
    ],
    collectionTagIcon: (theme: ThemeOptionsType) => css`
      border-radius: 1500px;
      display: block;
      width: 32px;
      height: 32px;
      overflow: hidden;
      position: relative;
      background: ${theme.placeHolderColor};
      img {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        margin: auto;
        object-fit: cover;
      }
    `,
    // Generic styles
    button: (theme: ThemeOptionsType, { primary }: any) => css`
      ${buttonReset}
      background: ${primary
        ? theme.buttonColor.primaryBackground
        : theme.buttonColor.background};
      color: ${primary
        ? theme.buttonColor.primaryText
        : theme.buttonColor.text};
      border-radius: ${theme.defaultBorderRadius}px;
      padding: 11px;
      transition: transform 0.1s ease-in-out;
      &:active {
        transform: scale(0.98);
      }
    `,
    textSubdued: (theme: ThemeOptionsType) => [
      css`
        opacity: 0.5;
      `,
      theme.bodyFont,
    ],
    pricingAmount: (theme: ThemeOptionsType) => theme.bodyFont,
    addressLink: (theme: ThemeOptionsType) => [
      css`
        text-decoration: none;
        color: ${theme.linkColor};
        &:hover{
          color: pink;
        }
      `,
      theme.titleFont,
    ],
    nftProposal: (theme: ThemeOptionsType) => css`
      border: ${theme.borderStyle};
      border-radius: ${theme.defaultBorderRadius}px;
      display: flex;
      padding: ${theme.spacingUnit};
    `,
    nftProposalActions: () => css`
      grid-area: 1 / 2 / span 1 / span 2;
      text-align: right;
    `,
    nftProposalActionButton: (
      theme: ThemeOptionsType,
      { action }: { action: "approve" | "deny" }
    ) => css`
      border-radius: 1000px;
      background-color: ${theme.buttonColor.background};
      background-repeat: no-repeat;
      color: transparent;
      width: 40px;
      height: 40px;
      background-position: center;
      border: 0;
      cursor: pointer;

      ${action === "approve" && `margin-right: 15px;`}

      ${action === "approve" && renderSVG(SVG_AUCTION_APPROVE)}
      ${action === "deny" && renderSVG(SVG_AUCTION_DENY)}
    `,
    nftProposalAcceptedPill: (theme: ThemeOptionsType) => css`
      color: #009165;
      background: rgba(64, 193, 154, 0.2);
      padding: 5px 10px;
      display: inline-block;
      border-radius: 4px;

      ${theme.bodyFont}
    `,
    nftProposalTitle: (theme: ThemeOptionsType) => css`
      font-size: 40px;
      grid-column: 1 / 3;

      ${theme.titleFont}
    `,
    mediaLoader: (_: ThemeOptionsType, { mediaLoaded, isFullPage }: any) => css`
      pointer-events: none;
      ${isFullPage ? "min-height: 40vh;" : ""}
      width: 100%;
      justify-content: center;
      align-items: center;
      opacity: ${mediaLoaded ? "0" : "1"};
      transition: 0.2s ease-out opacity;
      ${CENTER_FULL_CONTAINER}
      ${isFullPage && !mediaLoaded
        ? `
      &:after {
        content: " ";
        ${isFullPage ? "height: 30vh" : ""}
      }
      `
        : ""}
    `,
    mediaObject: (_: ThemeOptionsType, { mediaLoaded, isFullPage }: any) => css`
      opacity: ${mediaLoaded ? "1" : "0"};
      transition: 0.2s ease-in opacity;
      ${isFullPage ? "max-height: 70vh;" : "height: 100%;"}
      ${isFullPage ? "max-width: 100%;" : "width: 100%;"}
      display: block;
      background: white;
      padding: 20px;
      margin: 0 auto;
      flex-shrink: 1;
      min-width: 0px;
      border: 2px solid black;
      box-shadow: 5px 5px rgb(0 0 0 / 50%);
      object-fit: cover;
    `,
    mediaAudioWrapper: (_: ThemeOptionsType) => css`
      margin-top: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      width: 100%;
    `,
    mediaAudioWaveform: (_: ThemeOptionsType) => css`
      width: 100%;
      cursor: pointer;
    `,
    mediaObjectMessage: (_: ThemeOptionsType) => css`
      align-self: center;
    `,
    mediaContentText: (theme: ThemeOptionsType) => [
      css`
        white-space: pre;
        text-align: left;
        padding: ${theme.spacingUnit};
        width: 100%;
      `,
      theme.mediaContentFont,
    ],
    mediaPlayButton: (_: ThemeOptionsType, { playing }: any) => css`
      ${buttonCommonSize("32px")}
      background-image: url("data:image/svg+xml,${encodeURIComponent(
        playing ? SVG_PAUSE : SVG_PLAY_ARROW
      )}");
      z-index: 8;
    `,
    mediaVideoControls: (_: ThemeOptionsType, { isFullPage }: any) => css`
      ${CENTER_FULL_CONTAINER}
      ${isFullPage
        ? `
        z-index: 1; /* todo: iain remove need for line */
        opacity: 0;
        &:hover,
        &:focus,
        &:focus-within {
          opacity: 1;
        }
        transition: opacity 0.6s ease-in-out;
        transition-delay: 0 0.3s;
      `
        : "display: none;"}
    `,
    mediaFullscreenButton: (theme: ThemeOptionsType) => css`
      ${buttonCommonSize(theme.spacingUnit)}
      background-color: #000;
      ${renderSVG(SVG_FULLSCREEN)}
    `,
    mediaMuteButton: (theme: ThemeOptionsType, { muted }: any) => css`
      ${buttonCommonSize(theme.spacingUnit)}
      background-color: #000;
      background-image: url("data:image/svg+xml,${encodeURIComponent(
        muted ? SVG_UNMUTED : SVG_MUTED
      )}");
    `,
  },
};
