import { createContext } from "react";
import { NetworkIDs, Networks } from "@zoralabs/nft-hooks";

import { Strings } from "../constants/strings";
import { Style } from "../constants/style";
import { MediaRendererDefaults } from "../content-components";
import type { RendererConfig } from "../content-components/RendererConfig";

export type ThemeType = typeof Style;

export type MediaContextType = {
  style: ThemeType;
  networkId: NetworkIDs;
  strings: typeof Strings;
  renderers: RendererConfig[];
};

export const MediaContext = createContext<MediaContextType>({
  networkId: Networks.MAINNET,
  style: Style,
  strings: Strings,
  renderers: MediaRendererDefaults,
});
