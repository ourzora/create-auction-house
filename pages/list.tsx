import {
  AuctionManager,
  useManageAuction,
} from "@zoralabs/manage-auction-hooks";
import {
  NFTDataContext,
  PreviewComponents
} from "@zoralabs/nft-components";
import {
  useWalletButton,
  useWeb3Wallet,
} from "@zoralabs/simple-wallet-provider";
import { Fragment, useContext } from "react";
import useSWR from "swr";
import { DataProvider } from "../data/DataProvider";
import { fetcher } from "../data/fetcher";

import Head from '../components/head'
import { PageWrapper } from '../styles/components'

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
      <button className="manage-button" onClick={() => {
        const reserveId = data.pricing.reserve?.id
        if (reserveId) {
          openManageAuction(parseInt(reserveId, 10));
        }
      }}>
        Manage
      </button>
    );
  }

  return (
    <button
      onClick={() => {
        console.log(data.nft.contract.address, data.nft.tokenId);
        openListAuction(data.nft.contract.address, data.nft.tokenId);
      }}
      className="medium-button"
    >
      List
    </button>
  );
};

const ConnectWallet = () => {
  const { buttonAction, actionText, connectedInfo } = useWalletButton();

  return (
    <div className="button">
      <h4>{`${connectedInfo === undefined ? 'To List your Token Connect your wallet!' : connectedInfo}`}</h4>
      <button onClick={() => buttonAction()}>
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

  if (data.tokens.length === 0) {
    return (
      <Fragment>
        <h2>We couldn’t find any tokens you own :(.</h2>
        <p>Make sure you’ve connected the correct wallet</p>
      </Fragment>
    );
  }

  return data.tokens.map((token: any) => (
    <DataProvider
      key={token.tokenId}
      tokenId={token.tokenId}
      initialData={token}
    >
      <div className='owned-list'>
        <div className='owned-list-item'>
          <PreviewComponents.MediaThumbnail />
          <div className="list-component-wrapper">
            <ListItemComponent />
          </div>
        </div>
      </div>
    </DataProvider>
  ));
};

export default function List() {
  const { account } = useWeb3Wallet();
  return (
    <>
      <Head title="List"/>
      <AuctionManager
        renderMedia={PreviewComponents.MediaThumbnail}
        strings={{
          LIST_MEDIA_HEADER: "List your NFT",
          LIST_MEDIA_DESCRIPTION: `Set the reserve price to list your NFT on ${process.env.NEXT_PUBLIC_APP_TITLE}`
        }}
      >
        <PageWrapper className="page-wrapper">
          <ConnectWallet />
          {account && <RenderOwnedList account={account} />}
        </PageWrapper>
      </AuctionManager>
    </>
  );
}
