# Create Auction House ☼☽

  ![Auction House Montage](https://zora.fleek.co/ipfs/bafybeif2khqr7vgziycirzgl6rd7sdb74pcp2nkhzcxwejh4iu2lky7rs4)

A repo to bootstrap your own permissionless auction house with the Zora protocol. This template will get you started with the display of any Erc721 token collection using Zora's rendering components and data hooks along with the inclusion of web3 components so users can connect their wallets and manage NFT's that they own within a specified collection.

[More about the Zora Auction House on Mirror](https://zora.mirror.xyz/UwQwplCMEe1T5eUkp0CpTDJjZXvAK3eeakskTaQe3pE)

## Features
1. uses [`@zoralabs/nft-components`](https://github.com/ourzora/nft-components) to render NFTs and auction info.
2. includes [`@zoralabs/nft-hooks`](https://github.com/ourzora/nft-hooks) for more custom applications.
3. uses [`@zoralabs/manage-auction-hooks`](https://github.com/ourzora/manage-auction-hooks) for auction interactions.
4. uses [`@zoralabs/simple-wallet-provider`](https://github.com/ourzora/simple-wallet-provider) for an easy wallet login flow.
5. uses `@emotion`: [emotion.sh](https://emotion.sh) for styling.
6. uses `typescript`
7. based on [next.js](https://nextjs.org/)

## Getting Started
Simply use this repo as a next.js template replacing [project-name] with the title of your auction house.

```bash
yarn create next-app [project-name] -e https://github.com/ourzora/create-auction-house
# or
npx create-next-app [project-name] -e https://github.com/ourzora/create-auction-house
```

The application accepts the below environment variables, you WILL need to specify the network ID along with either a Curator ID or a Contract Address:

We have included a script to help you with the initial configuration, simply run the below command:

```bash
yarn setup
```

### ENV VARS:

```bash

NEXT_PUBLIC_APP_TITLE=[default app title]
NEXT_PUBLIC_DEFAULT_DESCRIPTION=[default meta description]

# Erc721 Contracts you would like to work with, you may use multiple seperated by commas.
NEXT_PUBLIC_MAINNET_CONTRACTS=0xabEFBc9fD2F806065b4f3C237d4b59D9A97Bcac7
NEXT_PUBLIC_TESTNET_CONTRACTS=0x7C2668BD0D3c050703CEcC956C11Bd520c26f7d4

# NETWORK ID: 1 for Ethereum Mainnet / 4 for Rinkeby Testnet
NEXT_PUBLIC_NETWORK_ID=4

# OPTIONAL, use instead of NFT Contract to show NFTs associated with a user's address.
NEXT_PUBLIC_CURATORS_ID=[The address of a curator or creator]

# OPTIONAL - Best to set in deployment
NEXT_PUBLIC_BASE_URL=[production-url]

## configured RPC_URL (mainnet/rinkeby depending on NETWORK_ID) for walletconnect 
## ~ Keep this private in a .env.local file. And configure directly in vercel for production.
NEXT_PUBLIC_RPC_URL=[address to web3 rpc url provider]

```

If you include a rpcUrl on the manage auction hooks provider it enables walletconnect,
without that rpcUrl walletconnect will not work work. We have set included and .env variable for this: ```NEXT_PUBLIC_RPC_URL```. [Further reading on RPC providers](https://web3py.readthedocs.io/en/stable/providers.html) / [Alchemy Ethereum API Docs](https://docs.alchemy.com/alchemy/documentation/apis/ethereum).

## Develop

First, run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

Or click the button below:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https%3A%2F%2Fgithub.com%2Fourzora%2Fcreate-auction-house&env=NEXT_PUBLIC_APP_TITLE,NEXT_PUBLIC_BASE_URL,NEXT_PUBLIC_NETWORK,NEXT_PUBLIC_CURATORS_ID&envDescription=Curator%20ID%20%26%20Network&envLink=https%3A%2F%2Fgithub.com%2Fourzora%2Fauction-house%23curators&project-name=our-auction-house&repo-name=our-auction-house&redirect-url=https%3A%2F%2Fcreate-auction-house.vercel.app)

...Don't forget to add the necessary environment variables!

## Extras!
+ [Start of with some static designs using this .sketch design template](https://zora.fleek.co/ipfs/bafybeifqr3uoascyyrz3i7k2yjzzcdck4g54kvubqzlapchjvquwf5wlcu) - if you prefer Figma you can import the [sketch.app file](https://help.figma.com/hc/en-us/articles/360040514273-Import-files-from-Sketch).
+ Minimal styling has been added to the styles/GlobalStyles.tsx, we love [@emotion](https://emotion.sh/docs/introduction) as it integrates with @zoralabs/nft-components - go ahead and uncomment the styling in styles/theme.ts to see it in action.
+ A few additional styling patterns have been included: the usage of css variables, styling mixins & styled components. None of this is necessary - feel free to style as you wish!
+ An example page is included - ```custom-thumbnails.tsx``` - in this page we are adding some css classes to the nft thumbnails based on auction state.
+ We've included a markdown rendering component to allow for the easy addition of formatted copy. See it in action in the about page.

  ```bash
  import readMe from '../README.md'
  ...
  export default function About() {
    return (
      <>
        ...
          <Markdown markdown={readMe}/>
        ...
      </>
    )
  }
  ```
