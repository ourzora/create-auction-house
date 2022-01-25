import { merge } from "merge-anything";
import { Story, Meta } from "@storybook/react";

import { DarkTheme } from "./example-themes/dark";
import { GalleryTheme } from "./example-themes/gallery";
import { MediaConfiguration } from "../context/MediaConfiguration";
import { NFTFullPage } from "../nft-full/NFTFullPage";
import { NFTPreview } from "../nft-preview/NFTPreview";
import { Style } from "../constants/style";

type ThemeProps = {
  style: Partial<typeof Style>;
  showFull: boolean;
  id: string;
};

const DemoComponent = ({ id, style, showFull }: ThemeProps) => (
  <MediaConfiguration style={style}>
    {showFull ? <NFTFullPage id={id} /> : <NFTPreview id={id} />}
  </MediaConfiguration>
);

export default {
  title: "Theming/PreviewComponent",
  component: DemoComponent,
} as Meta;

const Template: Story<ThemeProps> = DemoComponent;

const { theme: themeDefault } = Style;

export const PreviewCard = Template.bind({});
PreviewCard.args = {
  id: "3102",
  style: {
    theme: merge(themeDefault, {
      bodyFont: {
        fontFamily: "courier new",
        fontWeight: 500,
      },
      titleFont: {
        fontFamily: "courier new",
        fontWeight: 500,
      },
    }),
  },
};

export const Dark = Template.bind({});
Dark.args = {
  id: "3109",
  style: DarkTheme,
};
Dark.parameters = {
  backgrounds: {
    default: "dark",
    values: [{ name: "dark", value: "#333" }],
  },
};

export const Gallery = Template.bind({});
Gallery.args = {
  id: "3109",
  style: GalleryTheme,
};
Gallery.parameters = {
  backgrounds: {
    default: "gray",
    values: [{ name: "gray", value: "#ddd" }],
  },
};

export const FullPage = Template.bind({});
FullPage.args = {
  id: "3112",
  showFull: true,
  style: {
    theme: merge(themeDefault, {
      bodyFont: {
        fontFamily: "courier new",
        fontWeight: 500,
      },
      titleFont: {
        fontFamily: "courier new",
        fontWeight: 500,
      },
    }),
  },
};
