import { NFTFullPage, MediaConfiguration } from "@zoralabs/nft-components";
import { useRouter } from "next/router";
import {
  MediaFetchAgent,
  NetworkIDs,
  FetchStaticData,
} from "@zoralabs/nft-hooks";
import { GetServerSideProps } from "next";

import { PageWrapper } from "../../../styles/components";
import Head from "../../../components/head";

const styles = {
  theme: {
    lineSpacing: 24,
    linkColor: "var(--black)",
  },
};

type PieceProps = {
  name: string;
  description: string;
  image: string;
  initialData: any;
};

const APP_TITLE = process.env.NEXT_PUBLIC_APP_TITLE;

export default function Piece({
  name,
  description,
  image,
  initialData,
}: PieceProps) {
  const { query } = useRouter();

  return (
    <>
      <Head
        title={`${name} | ${APP_TITLE}`}
        description={description}
        ogImage={image}
      />
      <MediaConfiguration
        networkId={process.env.NEXT_PUBLIC_NETWORK as NetworkIDs}
        style={styles}
      >
        <PageWrapper>
          <NFTFullPage
            id={query.id as string}
            initialData={initialData}
            useBetaIndexer={true}
          />
        </PageWrapper>
      </MediaConfiguration>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const fetcher = new MediaFetchAgent(
    process.env.NEXT_PUBLIC_NETWORK as NetworkIDs
  );

  if (!params?.id || Array.isArray(params.id)) {
    return { notFound: true };
  }
  if (!params?.contract || Array.isArray(params.contract)) {
    return { notFound: true };
  }

  const id = params.id as string;
  const contract = params.contract as string;

  if (contract !== process.env.NEXT_PUBLIC_TARGET_CONTRACT_ADDRESS) {
    return { notFound: true };
  }

  const data = await FetchStaticData.fetchZoraIndexerItem(fetcher, {
    tokenId: id,
    collectionAddress: contract,
  });

  const { name, description } = data.nft.tokenData.metadata?.json;

  return {
    props: {
      id,
      name: name || "",
      description: description || "",
      image:
        (data.nft.tokenData.media
          ? data.nft.tokenData.media.contentURI
          : data.nft.tokenData.metadata?.json?.image_uri) || null,
      initialData: data,
    },
  };
};
