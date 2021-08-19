import { PreviewComponents } from "@zoralabs/nft-components";
import { MediaThumbnailWrapper } from "@zoralabs/nft-components/dist/nft-preview/MediaThumbnailWrapper";
import { useRouter } from "next/router";
import { SyntheticEvent } from "react";

import { DataProvider } from "../../data/DataProvider";
import { css } from '@emotion/css'

export const RenderBlitmapThumbnail = ({
  token,
  linkDetails = true,
}: {
  token: any;
  linkDetails?: boolean;
}) => {
  const listed = token.auctions && token.auctions.length > 0;
  const router = useRouter();
  const linkTarget = listed ? `/nft/${token.address}/${token.tokenId}` : "/list";

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
        className={`thumbnail-wrapper ${!listed ? "not-listed" : ""} ${
          token.auctions &&
          token.auctions.length > 0 &&
          (token.auctions[0].bidEvents.length > 0 ? "auction-live" : "listed")
        }`}
        {...wrapperLink}
      >
        <MediaThumbnailWrapper {...wrapperLink}>
          <PreviewComponents.MediaThumbnail />
          <div>
            <h3 className={css`
              padding: 0 15px 15px;
            `}>{token.metadata.json.name}</h3>
          </div>
          {token.auctions && token.auctions.length > 0 && (
            <PreviewComponents.PricingComponent />
          )}
        </MediaThumbnailWrapper>
      </div>
    </DataProvider>
  );
};
