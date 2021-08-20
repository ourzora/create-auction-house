import styled from "@emotion/styled";
import {
  AuctionManager,
  useManageAuction,
} from "@zoralabs/manage-auction-hooks";
import {
  NFTDataContext,
  NFTPreview,
  PreviewComponents,
} from "@zoralabs/nft-components";
import {
  useWalletButton,
  useWeb3Wallet,
} from "@zoralabs/simple-wallet-provider";
import { Fragment, useContext } from "react";
import useSWR from "swr";
import { BlitmapThumbnail } from "../components/blitmaps/BlitmapThumbnail";
import { DataProvider } from "../data/DataProvider";
import { fetcher } from "../data/fetcher";

import Head from "../components/head";
import { PageWrapper } from "./../styles/components";
import { buttonStyle } from "../styles/mixins";

const ListItemComponent = () => {
  const {
    nft: { data },
  } = useContext(NFTDataContext);

  const { openManageAuction, openListAuction } = useManageAuction();

  if (!data || !data.nft) {
    return <Fragment />;
  }

  if (
    data.pricing.reserve?.status === "Active" ||
    data.pricing.reserve?.status === "Pending"
  ) {
    return (
      <button
        className="button"
        onClick={() => {
          const reserveId = data.pricing.reserve?.id;
          if (reserveId) {
            openManageAuction(parseInt(reserveId, 10));
          }
        }}
      >
        Manage
      </button>
    );
  }

  return (
    <button
      onClick={() => {
        openListAuction(data.nft.contract.address, data.nft.tokenId);
      }}
      className="button"
    >
      List
    </button>
  );
};

const ConnectWallet = () => {
  const { buttonAction, actionText, connectedInfo } = useWalletButton();

  return (
    <div>
      <h1>{`${
        connectedInfo === undefined
          ? "To List your NFT Connect your wallet!"
          : connectedInfo
      }`}</h1>
      <button className="button" onClick={() => buttonAction()}>
        {actionText}
      </button>
    </div>
  );
};

const RenderOwnedList = ({ account }: { account: string }) => {
  const { data, error } = useSWR(`/api/ownedItems?owner=${account}`, fetcher);

  if (!data) {
    // loading
    return <Fragment />;
  }
  if (error) {
    // error
    return <Fragment />;
  }

  if (data && data.tokens.length === 0) {
    return (
      <div className="owned-list-no-tokens">
        <h2>We couldn’t find any NFTs you own 😢</h2>
        <p>Make sure you’ve connected the correct wallet</p>
      </div>
    );
  }

  return data.tokens.map((token: any) => (
    <NFTPreview
      key={token.nft.tokenData.tokenId}
      id={token.nft.tokenData.tokenId.toString()}
      contract={token.nft.tokenData.address}
      initialData={token}
      useBetaIndexer={true}
    >
      <div className="owned-list">
        <div className="owned-list-item">
          <PreviewComponents.MediaThumbnail />
          <div className="list-component-wrapper">
            <ListItemComponent />
          </div>
        </div>
      </div>
    </NFTPreview>
  ));
};

export default function List() {
  const { active, account } = useWeb3Wallet();
  return (
    <>
      <Head title="List" />
      <AuctionManager
        renderMedia={BlitmapThumbnail}
        strings={{
          LIST_MEDIA_HEADER: "List your NFT",
          LIST_MEDIA_DESCRIPTION: `Set the reserve price to list your NFT on ${process.env.NEXT_PUBLIC_APP_TITLE}`,
        }}
      >
        <ListWrapper>
          <ConnectWallet />
          {account && <RenderOwnedList account={account} />}
        </ListWrapper>
      </AuctionManager>
    </>
  );
}

const ListWrapper = styled(PageWrapper)`
  .owned-list {
    padding-top: var(--space-lg);
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
  .owned-list-item {
    border: 1px solid #e6e6e6;
    margin: 15px;
    width: 332px;
    padding-bottom: 15px;
  }
  .owned-list-no-tokens {
    text-align: center;
    padding-top: var(--space-sm);
  }
`;
