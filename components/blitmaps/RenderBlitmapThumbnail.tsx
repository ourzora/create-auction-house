import {
  NFTDataContext,
  NFTPreview,
  PreviewComponents,
} from "@zoralabs/nft-components";
import { useRouter } from "next/router";
import { SyntheticEvent, useContext } from "react";

import { css } from "@emotion/css";

const TokenNameComponent = () => {
  const context = useContext(NFTDataContext);
  return (
    <h3
      className={css`
        padding: 0 15px 15px;
      `}
    >
      {context?.metadata?.metadata?.name}
    </h3>
  );
};

export const RenderBlitmapThumbnail = ({
  token,
  linkDetails = true,
}: {
  token: any;
  linkDetails?: boolean;
}) => {
  const listed = token.auctions && token.auctions.length > 0;
  const router = useRouter();
  const linkTarget = listed
    ? `/nft/${token.address}/${token.tokenId}`
    : "/list";

  const wrapperLink = linkDetails
    ? {
        onClick: (evt: SyntheticEvent) => {
          evt.preventDefault();
          router.push(linkTarget);
        },
        href: linkTarget,
      }
    : {};

  return (
    <NFTPreview
      initialData={token}
      id={token.nft.tokenData.tokenId.toString()}
      contract={token.nft.tokenData.address}
      key={token.nft.tokenData.tokenId}
      useBetaIndexer={true}
    >
      <div
        key={token.nft.tokenData.tokenId}
        className={`thumbnail-wrapper ${!listed ? "not-listed" : ""} ${
          token.auctions &&
          token.auctions.length > 0 &&
          (token.auctions[0].bidEvents.length > 0 ? "auction-live" : "listed")
        }`}
        {...wrapperLink}
      >
        <PreviewComponents.MediaThumbnail />
        <div>
          <TokenNameComponent />
        </div>
        {token.auctions && token.auctions.length > 0 && (
          <PreviewComponents.PricingComponent />
        )}
      </div>
    </NFTPreview>
  );
};
