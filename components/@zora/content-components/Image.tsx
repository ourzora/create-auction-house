import { forwardRef } from "react";
import { MediaLoader, useMediaObjectProps } from "./MediaLoader";
import {
  RenderComponentType,
  RendererConfig,
  RenderingPreference,
  RenderRequest,
} from "./RendererConfig";

export const ImageRenderer = forwardRef<HTMLImageElement, RenderComponentType>(
  (requestProps, ref) => {
    const { getStyles, theme, request } = requestProps;
    const { props, loading, error } = useMediaObjectProps({
      uri: request.media.content?.uri || request.media.image?.uri,
      preferredIPFSGateway: theme.preferredIPFSGateway,
      ...requestProps,
    });

    return (
      <MediaLoader getStyles={getStyles} loading={loading} error={error}>
        <img ref={ref} {...props} />
      </MediaLoader>
    );
  }
);
export const Image: RendererConfig = {
  getRenderingPreference: (request: RenderRequest) => {
    if (request.media.image) {
      // Make low priority only if full screen, move to normal priority if preview
      if (request.renderingContext === "FULL" && request.media.animation) {
        return RenderingPreference.LOW;
      }
      return RenderingPreference.NORMAL;
    }
    if (request.media.content?.type?.startsWith("image/")) {
      return RenderingPreference.NORMAL;
    }
    if (request.media.content?.type?.startsWith("application/svg+xml")) {
      return RenderingPreference.NORMAL;
    }
    return RenderingPreference.INVALID;
  },
  render: ImageRenderer,
};
