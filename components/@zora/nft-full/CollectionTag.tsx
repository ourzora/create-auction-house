import { useContext } from "react";
import { css } from "@emotion/css";
import { useMediaContext } from "../context/useMediaContext";
import { NFTDataContext } from "../context/NFTDataContext";
import { Orb } from "../components/Orb";


export const CollectionTag = () => {
  const {
    nft: { data },
  } = useContext(NFTDataContext);
 
  const { getStyles } = useMediaContext();
  
  const getContent = () => {
    return (
      <a
        {...getStyles("colectionTagWrapper")}
        href={`https://zora.co/collections/${data?.nft.contract.address}`}
        target="_blank"
        rel="noreferrer"
      >
        <div {...getStyles("collectionTagIcon")}>
          {/* @ts-ignore */ data && "openseaInfo" in data
            ? <img src={data.openseaInfo.asset_contract.image_url} alt={data.openseaInfo.asset_contract.name}/>
            : <Orb />
          }
        </div>
        <span>{data && "openseaInfo" in data ? `${data.openseaInfo.asset_contract.name}` : 'Zora'}</span>
      </a>
    )
  }
  
  return (
    <div className={css`
      position: relative;
      display: flex;
      flex-direction: row;
    `}>
      {data ? getContent() : '...'}
    </div>
  )
}
