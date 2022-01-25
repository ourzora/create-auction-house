import React, { useState } from "react";
import type { RenderRequest } from "./RendererConfig";

function getNormalizedURI(
  uri: string,
  { preferredIPFSGateway }: { preferredIPFSGateway?: string }
) {
  if (uri.startsWith("ipfs://")) {
    return uri.replace(
      "ipfs://",
      preferredIPFSGateway || "https://ipfs.io/ipfs/"
    );
  }
  if (uri.includes("/ipfs/") && preferredIPFSGateway) {
    return `${preferredIPFSGateway}${uri.replace(/^.+\/ipfs\//, "")}`;
  }
  if (uri.startsWith("ar://")) {
    return uri.replace("ar://", "https://arweave.net/");
  }

  return uri;
}

export function useMediaObjectProps({
  uri,
  request,
  a11yIdPrefix,
  getStyles,
  preferredIPFSGateway,
}: {
  uri: string | undefined;
  request: RenderRequest;
  a11yIdPrefix?: string;
  getStyles: any;
  preferredIPFSGateway?: string;
}) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>();

  return {
    loading,
    error,
    props: {
      "aria-describedby": `${a11yIdPrefix}description`,
      alt: request.metadata.name || request.metadata.description,
      onLoad: () => setLoading(false),
      // TODO(iain): Update Error
      onError: () => setError("Error loading"),
      src: uri ? getNormalizedURI(uri, { preferredIPFSGateway }) : uri,
      ...getStyles("mediaObject", undefined, {
        mediaLoaded: !loading,
        isFullPage: request.renderingContext === "FULL",
      }),
    },
  };
}

export const MediaLoader = ({
  getStyles,
  children,
  loading,
  error,
}: {
  getStyles: any;
  children: React.ReactNode;
  loading: boolean;
  error: string | undefined;
}) => {
  if (!loading && !error) {
    return <React.Fragment>{children}</React.Fragment>;
  }
  if (error) {
    return (
      <React.Fragment>
        <span {...getStyles("mediaObjectMessage")}>Error loading content</span>
        {children}
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      <span {...getStyles("mediaLoader")}>Loading...</span>
      {children}
    </React.Fragment>
  );
};
