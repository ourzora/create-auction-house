import { FetchStaticData } from "@zoralabs/nft-hooks";
import { MediaThumbnailWrapper } from "@zoralabs/nft-components/dist/nft-preview/MediaThumbnailWrapper";
import { NFTPreview, PreviewComponents } from "@zoralabs/nft-components";
import { useRouter } from "next/router";
import { SyntheticEvent } from "react";

const TokenThumbnail = ({
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
    <NFTPreview
      key={`${token.tokenContract}-${token.tokenId}`}
      contract={token.tokenContract}
      id={token.tokenId}
      initialData={token}
      useBetaIndexer={true}
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
          {token.auctions && token.auctions.length > 0 && (
            <PreviewComponents.PricingComponent />
          )}
        </MediaThumbnailWrapper>
      </div>
    </NFTPreview>
  )
}

export const CustomAuctionsList = ({ tokens }: { tokens: any[] }) => {
  return (
    <div css={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
      {tokens &&
        tokens.map((token) => {
          const tokenInfo = FetchStaticData.getIndexerServerTokenInfo(token);
          return (
            <TokenThumbnail
              token={token}
              key={tokenInfo.tokenId}
            />
          );
        })}
    </div>
  );
};
