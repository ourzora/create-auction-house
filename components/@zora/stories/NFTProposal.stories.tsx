import { Story, Meta } from "@storybook/react";
import { NFTFullPage } from "../nft-full/NFTFullPage";
import { MediaConfiguration } from "../context/MediaConfiguration";
import { Networks } from "@zoralabs/nft-hooks";
import { NFTProposal } from "../nft-proposal/NFTProposal";

export default {
  title: "Renderer/NFTProposal",
  component: NFTFullPage,
} as Meta;

const Template: Story<typeof NFTFullPage> = (args) => (
  <MediaConfiguration
    networkId={(args as any).testnet ? Networks.RINKEBY : Networks.MAINNET}
  >
    <NFTProposal id="3366" />
  </MediaConfiguration>
);

export const Image = Template.bind({});
Image.args = {
  id: "3366",
};

export const TestImage = Template.bind({});
TestImage.args = {
  id: "2793",
  testnet: true,
};
