/*
  See the NFT Components docs for more information on theming.
  https://ourzora.github.io/nft-components/?path=/story/renderer-mediaconfiguration--page
*/

import { css } from '@emotion/react'

export const mediaConfigurationStyles = {
  theme: {
    /*
      Theme object
    */
  },
  styles: {
    /*
    Styles Object:

    If you want to ovveride the styling on an nft-component use the below pattern to inject styling via emotion css.
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
