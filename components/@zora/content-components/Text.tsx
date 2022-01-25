import { useNFTContent } from "@zoralabs/nft-hooks";
import { MediaLoader } from "./MediaLoader";
import {
  RenderComponentType,
  RendererConfig,
  RenderingPreference,
  RenderRequest,
} from "./RendererConfig";

export const Text: RendererConfig = {
  getRenderingPreference: (request: RenderRequest) => {
    if (request.media.content?.type === 'text/html') {
      return RenderingPreference.INVALID;
    }
    if (request.media.content?.type?.startsWith("text/plain")) {
      return RenderingPreference.PRIORITY;
    }
    if (request.media.content?.type?.startsWith("text/")) {
      return RenderingPreference.LOW;
    }
    return RenderingPreference.INVALID;
  },
  render: ({ request, getStyles }: RenderComponentType) => {
    const media = useNFTContent(request.media.content?.uri);

    return (
      <MediaLoader
        getStyles={getStyles}
        loading={media.content ? false : true}
        error={media.error}
      >
        <div {...getStyles("mediaContentText")}>
          {media.content && "text" in media.content ? media.content.text : ""}
        </div>
      </MediaLoader>
    );
  },
};
