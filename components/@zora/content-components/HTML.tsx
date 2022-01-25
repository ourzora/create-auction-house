import { useEffect, useState } from "react";
import { MediaLoader, useMediaObjectProps } from "./MediaLoader";
import {
  RenderComponentType,
  RendererConfig,
  RenderingPreference,
  RenderRequest,
} from "./RendererConfig";

const HTMLRenderer = (requestProps: RenderComponentType) => {
  const { getStyles, request, theme } = requestProps;
  const { props, loading, error } = useMediaObjectProps({
    uri: request.media.content?.uri || request.media.animation?.uri,
    preferredIPFSGateway: theme.preferredIPFSGateway,
    ...requestProps,
  });
  const [windowHeight, setWindowHeight] = useState<number>(
    () => window.innerHeight
  );
  useEffect(() => {
    const resizeHandler = () => {
      setWindowHeight(window.innerHeight);
    };
    document.addEventListener("resize", resizeHandler);
    return () => {
      document.removeEventListener("resize", resizeHandler);
    };
  });

  return (
    <MediaLoader getStyles={getStyles} loading={loading} error={error}>
      <iframe
        sandbox="allow-scripts"
        height={Math.floor(windowHeight * 0.6)}
        width="100%"
        style={{ border: 0 }}
        {...props}
      />
    </MediaLoader>
  );
};

export const HTML: RendererConfig = {
  getRenderingPreference(request: RenderRequest) {
    if (
      request.media.content?.type?.startsWith("text/html") ||
      request.media.content?.type?.startsWith("application/pdf") ||
      request.media.animation?.type?.startsWith("text/html")
    ) {
      return request.renderingContext === "FULL"
        ? RenderingPreference.PRIORITY
        : RenderingPreference.INVALID;
    }
    return RenderingPreference.INVALID;
  },
  render: HTMLRenderer,
};
