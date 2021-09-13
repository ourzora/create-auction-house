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

/* Custom button styling mixin */
export const buttonStyle = css`
  border: var(--border-black);
  color: var(--white);
  background-color: var(--black);
  margin: 0 auto;
  position: relative;
  display: block;
  padding: var(--base-unit) var(--space-md);
  font-size: var(--text-01);
  border-radius: 50rem;
  text-align: center;
  ${media.hover`
    background-color: var(--black);
    color: var(--white);
  `}
`
