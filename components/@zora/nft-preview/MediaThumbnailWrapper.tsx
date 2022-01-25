import { useContext } from "react";
import type { StyleProps } from "../utils/StyleTypes";

import { NFTDataContext } from "../context/NFTDataContext";
import { useMediaContext } from "../context/useMediaContext";

type MediaThumbnailWrapperProps = {
  children: React.ReactNode;
  onClick?: (evt: React.MouseEvent<HTMLElement>) => void;
  href?: string;
} & StyleProps;

export const MediaThumbnailWrapper = ({
  children,
  onClick,
  href,
  className,
}: MediaThumbnailWrapperProps) => {
  const { getStyles } = useMediaContext();

  const { nft } = useContext(NFTDataContext);
  const auctionStatus = nft?.data?.pricing?.status;

  const LinkComponent = href ? "a" : "button";

  return (
    <div
      {...getStyles("cardOuter", className, {
        hasClickEvent: !!onClick,
        auctionStatus,
      })}
    >
      {(href || onClick) && (
        <LinkComponent {...getStyles("cardLink")} href={href} onClick={onClick}>
          View NFT
        </LinkComponent>
      )}
      {children}
    </div>
  );
};
