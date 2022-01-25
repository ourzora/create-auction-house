import { Fragment, useContext } from "react";
import { useMediaContext } from "../context/useMediaContext";
import { useNFTMetadata } from "@zoralabs/nft-hooks";
import { NFTDataContext } from "../context/NFTDataContext";
import { InfoContainer } from "./InfoContainer";
import type { StyleProps } from "../utils/StyleTypes";

type NFTPropertiesProps = StyleProps;

export const NFTProperties = ({ className }: NFTPropertiesProps) => {
  const {
    nft: { data },
  } = useContext(NFTDataContext);
  const { getStyles } = useMediaContext();
  const { metadata } = useNFTMetadata(data?.nft.metadataURI);

  const renderAttributes = (attributes: any) => {
    function formatAttributes(obj: any) {
      if (Array.isArray(obj)) {
        return obj;
      } else {
        const array =
          Object.keys(obj).length === 0 ? false : Object.entries(obj);
        if (array !== false) {
          return array.map((a) => ({
            trait_type: a[0],
            value: a[1],
          }));
        } else {
          return [];
        }
      }
    }

    const formattedAttributes = formatAttributes(attributes);

    if (!attributes || !formattedAttributes.length) {
      return null;
    }
    return (
      <InfoContainer className={className} titleString="PROPERTIES_TITLE">
        <div {...getStyles("propertiesGrid")}>
          {formattedAttributes.map((attribute: any, index: number) => {
            return (
              <div
                {...getStyles("propertiesItem")}
                key={`${data?.nft?.tokenId}${index}`}
              >
                {attribute?.trait_type && (
                  <span {...getStyles("propertiesLabel")}>
                    {attribute?.trait_type}
                  </span>
                )}
                {attribute?.value && <span>{attribute?.value}</span>}
              </div>
            );
          })}
        </div>
      </InfoContainer>
    );
  };

  const getContent = () => {
    if (data && metadata !== undefined && "attributes" in metadata) {
      return renderAttributes(metadata?.attributes);
    } else if (data && metadata !== undefined && "traits" in metadata) {
      return renderAttributes(metadata?.traits);
    } else if (data && metadata === undefined && "openseaInfo" in data) {
      // @ts-ignore
      return renderAttributes(data?.openseaInfo?.traits);
    } else {
      return <Fragment />;
    }
  };

  return data ? getContent() : null;
};
