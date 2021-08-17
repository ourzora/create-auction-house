import { css } from '@emotion/react'
import { returnBreakpoint } from './breakpoints'

export const media = {
  mobile: (...args: [TemplateStringsArray]) => css`
    @media (min-width: ${returnBreakpoint('mobile')}) {
      ${css(...args)}
    }
  `,
  tablet: (...args: [TemplateStringsArray]) => css`
    @media (min-width: ${returnBreakpoint('tablet')}) {
      ${css(...args)}
    }
  `,
  laptop: (...args: [TemplateStringsArray]) => css`
    @media (min-width: ${returnBreakpoint('laptop')}) {
      ${css(...args)}
    }
  `,
  desktop: (...args: [TemplateStringsArray]) => css`
    @media (min-width: ${returnBreakpoint('desktop')}) {
      ${css(...args)}
    }
  `,
  xl: (...args: [TemplateStringsArray]) => css`
    @media (min-width: ${returnBreakpoint('xl')}) {
      ${css(...args)}
    }
  `,
  hover: (...args: [TemplateStringsArray]) => css`
    @media (hover: hover) {
      &:hover {
        ${css(...args)}
      }
    }
  `,
  canHover: (...args: [TemplateStringsArray]) => css`
    @media (hover: hover) {
      ${css(...args)}
    }
  `,
  noHover: (...args: [TemplateStringsArray]) => css`
    @media (hover: none) {
      ${css(...args)}
    }
  `
}

export const absoluteFullCentered = css`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
`

export const buttonInit = css`
  -webkit-tap-highlight-color: rgba(255,255,255,0);
  -webkit-appearance: none;
  border: 0;
  background-color: rgba(255,255,255,0);
  text-decoration: none;
  cursor: pointer;
`

export const buttonStyle = css`
  ${buttonInit};
  border: var(--border-black);
  color: var(--black);
  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
  text-align: center;
  ${media.hover`
    background-color: var(--black);
    color: var(--white);
  `}
`
