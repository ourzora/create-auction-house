import { FetchStaticData } from "@zoralabs/nft-hooks";
import { css } from '@emotion/react'
import { useRouter } from "next/router";
import { Card } from './Card';
import { NavLink } from './NavLink'
import {
  useWalletButton,
} from "@zoralabs/simple-wallet-provider";

export const AuctionsList = ({ tokens }: { tokens: any[] }) => {
  const router = useRouter();
  const { buttonAction, actionText, connectedInfo, active  } = useWalletButton();

  return (
    <>
     <div css={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between" }}>
      <NavLink 
        css={css`
        border: none;
        cursor: pointer;
      `}
      passHref href="/list">
        <h2
          css={css`
          border: none;
          cursor: pointer;
        `}>List</h2>
      </NavLink>
      {
            active ?
            <div>
            <button 
              css={css`
                border: none;
                cursor: pointer;
              `}
              onClick={() => buttonAction()}>
              <h2>Disconect Wallet</h2>
            </button>
          </div>
            :
            <div>
            <button 
              css={css`
                border: none;
                cursor: pointer;
              `}
              onClick={() => buttonAction()}>
              <h2>Connect Wallet</h2>
            </button>
          </div>
      }
     </div>
     <div css={{ display: "flex", flexDirection:'column', flexWrap: "wrap", justifyContent: "center", alignItems:'center' }}>
      <div>
        <h1>{process.env.NEXT_PUBLIC_APP_TITLE}</h1>
      </div>
      <div>
        <p>{process.env.NEXT_PUBLIC_DEFAULT_DESCRIPTION}</p>
      </div>
     </div>
    <div css={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
      {tokens &&
        tokens.map((token) => {
          const reservePrice = "--"
          const bid = "--"
          const tokenInfo = FetchStaticData.getIndexerServerTokenInfo(token);
          const { metadata } = tokenInfo
          const {image} = metadata;

          return (
            <Card 
              image={image}
              id={tokenInfo.tokenId}
              key={tokenInfo.tokenId}
              contract={tokenInfo.tokenContract}
              reservePrice={reservePrice}
              bid={bid}
            />
          );
        })}
    </div>
    </>
  );
};