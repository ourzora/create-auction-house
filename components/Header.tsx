import { css } from '@emotion/react'
import { NavLink } from './NavLink'

export default function Header() {
  return (
    <>
      <header css={Styles.header}>
        <NavLink passHref href="/">
          <a>Auctions</a>
        </NavLink>
        <NavLink passHref href="/about">
          <a>About</a>
        </NavLink>
      </header>
    </>
  )
}

const Styles = {
  header: css`
    display: flex;
    justify-content: center;
    background-color: var(--white);
    padding: var(--space-md);
    border-bottom: var(--border-black);
    position: sticky;
    top: 0;
    z-index: var(--header-z);
    a {
      color: var(--black);
      font-family: var(--font-b);
      margin-right: var(--space-md);
      text-decoration: none;
      &:last-child {
        margin-right: 0;
      }
      &.active {
        text-decoration: underline;
      }
    }
  `
};
