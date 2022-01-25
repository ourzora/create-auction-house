import { Fragment, useContext } from "react";

import { NFTDataContext } from "../context/NFTDataContext";
import { AddressView } from "../components/AddressView";
import { useMediaContext } from "../context/useMediaContext";
import type { StyleProps } from "../utils/StyleTypes";

type MediaInfoProps = {
  a11yIdPrefix?: string;
} & StyleProps;

export const MediaInfo = ({ a11yIdPrefix, className }: MediaInfoProps) => {
  const { getStyles, getString, style } = useMediaContext();
  const {
    nft: { data },
    metadata: { metadata, error },
  } = useContext(NFTDataContext);

  const getContent = () => {
    if (metadata && data) {
      return {
        title: metadata.name,
        description: metadata.description,
      };
    }
    if (error) {
      return {
        title: "?",
        description: "?",
      };
    }
    return {
      title: "...",
      description: "...",
    };
  };

  const { title, description } = getContent();
  return (
    <div {...getStyles("fullItemInfo", className)}>
      <h2 {...getStyles("fullTitle")}>{title}</h2>
      <div id={`${a11yIdPrefix}description`} {...getStyles("fullDescription")}>
        {description}
      </div>
      {!style.theme.showCreator && !style.theme.showOwner ? (
        <Fragment />
      ) : (
        <dl {...getStyles("fullCreatorOwnerSection")}>
          {data?.nft.creator && style.theme.showCreator && (
            <Fragment>
              <dt {...getStyles("fullLabel")}>{getString("CREATOR")}</dt>
              <dd {...getStyles("fullOwnerAddress")}>
                {data ? <AddressView address={data.nft.creator} /> : " "}
              </dd>
            </Fragment>
          )}
          {data?.nft.creator && style.theme.showOwner && (
            <Fragment>
              <dt {...getStyles("fullLabel")}>{getString("OWNER")}</dt>
              <dd {...getStyles("fullOwnerAddress")}>
                {data ? <AddressView address={data.nft.owner} /> : " "}
              </dd>
            </Fragment>
          )}
        </dl>
      )}
    </div>
  );
};
