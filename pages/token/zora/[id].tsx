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
import { APP_TITLE } from "../../../utils/env-vars";

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
        networkId={process.env.NEXT_PUBLIC_NETWORK_ID as NetworkIDs}
        style={styles}
      >
        <PageWrapper>
          <NFTFullPage
            useBetaIndexer={false}
            contract={query.contract as string}
            id={query.id as string}
            initialData={initialData}
          />
        </PageWrapper>
      </MediaConfiguration>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  if (!params?.id || Array.isArray(params.id)) {
    return { notFound: true };
  }

  const id = params.id as string;

  const fetchAgent = new MediaFetchAgent(
    process.env.NEXT_PUBLIC_NETWORK_ID as NetworkIDs
  );
  const data = await FetchStaticData.fetchZNFTGroupData({
    fetchAgent,
    ids: [id],
    type: "id",
  });

  const nft = data[0];

  const metadata = await fetchAgent.fetchIPFSMetadata(nft.zoraNFT.metadataURI);

  return {
    props: {
      id,
      name: metadata.name || null,
      description: metadata.description || null,
      image: null,
      initialData: { nft, metadata },
    },
  };
};
