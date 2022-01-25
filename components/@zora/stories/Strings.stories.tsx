import { merge } from "merge-anything";
import { Story, Meta } from "@storybook/react";

import { NFTPreview } from "../nft-preview/NFTPreview";
import { Style } from "../constants/style";
import { MediaConfiguration } from "../context/MediaConfiguration";
import { Strings } from "../constants/strings";
import { NFTFullPage } from "../nft-full/NFTFullPage";
import { ThemePresetNames } from "../constants/style-presets";

type ThemeProps = {
  style: Partial<typeof Style>;
  showFull: boolean;
  themePreset?: ThemePresetNames;
  id: string;
  strings: Partial<typeof Strings>;
};

const DemoComponent = ({ id, style, showFull, strings }: ThemeProps) => (
  <MediaConfiguration style={style} strings={strings}>
    {showFull ? <NFTFullPage id={id} /> : <NFTPreview id={id} />}
  </MediaConfiguration>
);

export default {
  title: "Theming/Strings",
  component: DemoComponent,
} as Meta;

const Template: Story<ThemeProps> = DemoComponent;

export const Gallery = Template.bind({});
Gallery.args = {
  id: "3109",
  strings: {
    RESERVE_PRICE: "price needed",
    CARD_CREATED_BY: "creator~~ ",
  },
};

export const FullPage = Template.bind({});
FullPage.args = {
  id: "3112",
  showFull: true,
  strings: {
    PLACE_OFFER: "send your eth",
  },
};
