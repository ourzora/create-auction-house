import { useContext } from "react";

import { AddressView } from "../components/AddressView";
import { MediaObject } from "../components/MediaObject";
import { useMediaContext } from "../context/useMediaContext";
import { NFTDataContext } from "../context/NFTDataContext";
import type { StyleProps } from "../utils/StyleTypes";

type ProposalMediaDisplayProps = {} & StyleProps;

export const ProposalMediaDisplay = ({
  className,
}: ProposalMediaDisplayProps) => {
  const {
    nft: { data },
    metadata: { metadata },
  } = useContext(NFTDataContext);

  const { getStyles, getString } = useMediaContext();

  const getContent = () => {
    if (metadata && data) {
      return {
        media: (
          <MediaObject
            contentURI={
              data && "zoraNFT" in data ? data.zoraNFT?.contentURI : undefined
            }
            metadata={metadata}
          />
        ),
        title: metadata.name,
      };
    }
    return {
      media: <div {...getStyles("mediaLoader")}></div>,
      title: "...",
    };
  };

  const { media, title } = getContent();
  const hasCreator = data?.nft.creator;
  const address = hasCreator ? data?.nft.creator : data?.nft.owner;
  return (
    <div className={className}>
      <div {...getStyles("nftProposalMediaWrapper")}>{media}</div>
      <div {...getStyles("nftProposalInfoLayout")}>
        <div {...getStyles("nftProposalTitle")}>{title}</div>
        <div {...getStyles("nftProposalLabelWrapper")}>
          <div {...getStyles("nftProposalLabel")}>
            {hasCreator
              ? getString("CARD_CREATED_BY")
              : getString("CARD_OWNED_BY")}
          </div>
          <div {...getStyles("fullOwnerAddress")}>
            {address && <AddressView address={address} />}
          </div>
        </div>
        {data?.pricing.reserve?.tokenOwner && (
          <div {...getStyles("nftProposalLabelWrapper")}>
            <div {...getStyles("nftProposalLabel")}>
              {getString("PROPOSED_BY")}
            </div>
            <div {...getStyles("fullOwnerAddress")}>
              {address && (
                <AddressView address={data.pricing.reserve.tokenOwner.id} />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
