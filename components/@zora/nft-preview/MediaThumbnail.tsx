import { useContext } from "react";

import { AddressView } from "../components/AddressView";
import { MediaObject } from "../components/MediaObject";
import { useMediaContext } from "../context/useMediaContext";
import { NFTDataContext } from "../context/NFTDataContext";
import {
  defaultGetContentData,
  GetContentDataType,
} from "../utils/getContentDataOptions";
import type { StyleProps } from "../utils/StyleTypes";

export const MediaThumbnail = ({
  getContentData = defaultGetContentData,
  className,
}: GetContentDataType & StyleProps) => {
  const {
    nft: { data },
    metadata: { metadata },
  } = useContext(NFTDataContext);

  const { getStyles, getString } = useMediaContext();

  const getContent = () => {
    if (metadata && data) {
      return {
        media: <MediaObject {...getContentData(data, metadata)} />,
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
      <div {...getStyles("cardMediaWrapper")}>{media}</div>
      <div {...getStyles("cardItemInfo")}>
        <h5 {...getStyles("cardTitle")}>{title}</h5>
        <div>
          <span {...getStyles("textSubdued")}>
            {hasCreator
              ? getString("CARD_CREATED_BY")
              : getString("CARD_OWNED_BY")}
          </span>{" "}
          <span>{address && <AddressView address={address} />}</span>
        </div>
      </div>
    </div>
  );
};
