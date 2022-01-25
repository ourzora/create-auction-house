import React, { useContext } from "react";
import {
  NetworkIDs,
  NFTFetchConfiguration,
} from "@zoralabs/nft-hooks";
import { merge } from "merge-anything";

import type { Strings } from "../constants/strings";
import type { RecursivePartial } from "../utils/RecursivePartial";
import type { RendererConfig } from "../content-components/RendererConfig";
import { MediaRendererDefaults } from "../content-components";
import { MediaContext, ThemeType } from "./MediaContext";

type MediaContextConfigurationProps = {
  /**
   * NetworkID to set. Use Networks export to set constant. Default is mainnet.
   */
  networkId?: NetworkIDs;
  children: React.ReactNode;
  /**
   * Style configuration object. Contains both a theme and styles. Theme are generic settings for rendering styles.Style configuration object. Contains both a theme and styles.
   * Theme are generic settings for rendering styles.
   * Styles are raw emotion css-in-js styles for more fine-grained display settings.
   */
  style?: RecursivePartial<ThemeType>;
  /**
   * List of content strings.
   */
  strings?: Partial<typeof Strings>;
  /**
   * List of renderers.
   */
  renderers?: RendererConfig[];
};

export const MediaConfiguration = ({
  networkId,
  style = {},
  children,
  strings = {},
  renderers,
}: MediaContextConfigurationProps) => {
  const superContext = useContext(MediaContext);

  const newNetworkId = networkId || superContext.networkId;

  if (!renderers) {
    renderers = MediaRendererDefaults;
  }

  let newContext = {
    // TODO(iain): Fix typing
    style: merge(superContext.style, style) as ThemeType,
    strings: merge(superContext.strings, strings),
    renderers,
    networkId: newNetworkId,
  };

  return (
    <MediaContext.Provider value={newContext}>
      <NFTFetchConfiguration networkId={newNetworkId}>
        {children}
      </NFTFetchConfiguration>
    </MediaContext.Provider>
  );
};
