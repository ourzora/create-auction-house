import { Fragment } from "react";
import { HTML } from "./HTML";
import {
  RenderComponentType,
  RendererConfig,
  RenderingPreference,
  RenderRequest,
} from "./RendererConfig";

interface ModelRenderer extends RendererConfig {
  renderingPage: string;
}

export const Model: ModelRenderer = {
  renderingPage:
    "https://gateway.pinata.cloud/ipfs/QmVc3UHHL6dhjWuY4cryY3yoEu1HoX8KcFafq3K4ELbZEJ/model-viewer.html",
  getRenderingPreference: (request: RenderRequest) => {
    if (request.media.content?.type?.startsWith("model/gltf")) {
      return request.renderingContext === "FULL"
        ? RenderingPreference.PRIORITY
        : RenderingPreference.NORMAL;
    }
    return RenderingPreference.INVALID;
  },
  render: (props: RenderComponentType) => {
    const mediaURI =
      props.request.media.content?.uri || props.request.media.animation?.uri;
    if (!mediaURI) {
      // todo: better error
      return <Fragment />;
    }
    const params = new URLSearchParams();
    params.append("src", mediaURI);
    if (props.request.media.image) {
      params.append("poster", props.request.media.image?.uri);
    }
    const newProps = { ...props };
    newProps.request.media.content = {
      uri: `${Model.renderingPage}#${params.toString()}`,
    };

    return <HTML.render {...newProps} />;
  },
};
