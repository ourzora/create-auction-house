# Theming your Auction House 🎨

[See the NFT Components docs for more information on theming via JS](https://ourzora.github.io/nft-components/?path=/story/renderer-mediaconfiguration--page)

NFT Components leverages the [Emotion css in js library:](https://emotion.sh/docs/introduction)


  ```bash
  import { css } from '@emotion/react'
  
  export const mediaConfigurationStyles = {
    theme: {
      /*
        Theme object
      */
    },
    useDefaultStyles: true /* This flag is true by default - if you want to style included nft components from scratch set this to false to clear out all css in js styling */,
    styles: {
      /*
      Styles Object:

      If you want to ovveride the styling in a particular nft-component use the below pattern to inject styling via emotion css.
      Style object below:
      https://github.com/ourzora/nft-components/blob/main/src/constants/style.ts#L64-L492
      
      in the below example we are modifying the wrapper styling for the Media renderer in the NFTFullPage component.
      https://ourzora.github.io/nft-components/?path=/story/renderer-nftfull--image

      fullMediaWrapper: () => css``,
        width: 100%;
        height
        img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
      `
      */
    }
  }
  ```
