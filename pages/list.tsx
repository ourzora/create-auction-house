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
import { FetchStaticData } from "@zoralabs/nft-hooks";
import {
  useWalletButton,
  useWeb3Wallet,
} from "@zoralabs/simple-wallet-provider";
import { Fragment, useContext } from "react";
import useSWR from "swr";
import { APP_TITLE } from "../utils/env-vars";
import Head from "../components/head";
import { PageWrapper } from "./../styles/components";

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
  const { data, error } = useSWR(
    `/api/ownedItems?owner=${account}`,
    (url: string) => fetch(url).then((res) => res.json())
  );

  if (!data) {
    // loading
    return <Fragment />;
  }
  if (error) {
    // error
    return <Fragment />;
  }

  if (data.tokens.length === 0) {
    return (
      <div className="owned-list-no-tokens">
        <h2>We couldn’t find any NFTs you own 😢</h2>
        <p>Make sure you’ve connected the correct wallet</p>
      </div>
    );
  }

  return data.tokens.map((token: any) => {
    const tokenInfo = FetchStaticData.getIndexerServerTokenInfo(token);
    return (
      <NFTPreview
        id={tokenInfo.tokenId}
        contract={tokenInfo.tokenContract}
        initialData={token}
        useBetaIndexer={true}
        key={`${tokenInfo.tokenContract}-${tokenInfo.tokenId}`}
      >
        <div className="owned-list-item">
          <PreviewComponents.MediaThumbnail />
          <div className="list-component-wrapper">
            <ListItemComponent />
          </div>
        </div>
      </NFTPreview>
    );
  });
};

const MediaThumbnailPreview = ({
  tokenContract,
  tokenId,
}: {
  tokenContract: string;
  tokenId: string;
}) => {
  return (
    // TODO(iain): Fix indexer in this use case
    <NFTPreview
      id={tokenId}
      contract={tokenContract}
      useBetaIndexer={true}
    >
      <div className="owned-list-item">
        <PreviewComponents.MediaThumbnail />
        <div className="list-component-wrapper">
          <ListItemComponent />
        </div>
      </div>
    </NFTPreview>
  );
};

export default function List() {
  const { active, account } = useWeb3Wallet();
  return (
    <>
      <Head title="List" />
      <AuctionManager
        renderMedia={MediaThumbnailPreview}
        strings={{
          LIST_MEDIA_HEADER: "List your NFT",
          LIST_MEDIA_DESCRIPTION: `Set the reserve price to list your NFT on ${APP_TITLE}`,
        }}
      >
        <ListWrapper>
          <ConnectWallet />
          {account &&
            <div className="owned-list">
              <RenderOwnedList account={account} />
            </div>
          }
        </ListWrapper>
      </AuctionManager>
    </>
  );
}

const ListWrapper = styled(PageWrapper)`
  max-width: var(--content-width-lg);
  .owned-list {
    padding-top: var(--space-md);
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
  .owned-list-no-tokens {
    text-align: center;
    padding-top: var(--space-sm);
  }
  .list-component-wrapper {
    padding: var(--base-unit) 0;
    border-top: var(--border-light);
  }
  .thumbnail-manage-button {
    margin: 0 auto var(--space-sm)!important;
  }
`;
