import { PreviewComponents } from "@zoralabs/nft-components";
import { MediaThumbnailWrapper } from "@zoralabs/nft-components/dist/nft-preview/MediaThumbnailWrapper";
import { useRouter } from "next/router";
import { SyntheticEvent } from "react";

import { DataProvider } from "../data/DataProvider";

export const TokenThumbnail = ({
  token,
  linkDetails = true,
}: {
  token: any;
  linkDetails?: boolean;
}) => {
  const listed = token.auctions && token.auctions.length > 0;
  const router = useRouter();
  const linkTarget = listed ? `/${token.address}/${token.tokenId}` : "/list";

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
    <DataProvider
      tokenId={token.tokenId}
      initialData={token}
      key={token.tokenId}
    >
      <div
        key={token.tokenId}
        /*
        className={`thumbnail-wrapper ${!listed ? "not-listed" : ""} ${
          token.auctions &&
          token.auctions.length > 0 &&
          (token.auctions[0].bidEvents.length > 0 ? "auction-live" : "listed")
        }`}
        */
        {...wrapperLink}
      >
        <MediaThumbnailWrapper {...wrapperLink}>
          <PreviewComponents.MediaThumbnail />
          {token.auctions && token.auctions.length > 0 && (
            <PreviewComponents.PricingComponent />
          )}
        </MediaThumbnailWrapper>
      </div>
    </DataProvider>
  );
};
