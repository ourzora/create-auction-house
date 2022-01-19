import { css } from '@emotion/react'
import { NavLink } from './NavLink'
import {
  useWalletButton,
  useWeb3Wallet,
} from "@zoralabs/simple-wallet-provider";

export const Header = () => {
  
  const { buttonAction, actionText, connectedInfo } = useWalletButton();

  return (
    <>
      <header css={css`
        height: var(--header-height);
        top: 0;
        z-index: var(--header-z);
        background-color: #feefd5;
        display: flex;
        flexDirection: row;
        width: 100vw;
        align-items: center;
        justify-content: space-between;
      `}>
        <NavLink passHref href="/list">
          <h2>List</h2>
        </NavLink>
        <div>
          <button 
            css={css`
              border: none;
              cursor: pointer;
            `}
            onClick={() => buttonAction()}>
            <h2>Connect Wallet</h2>
          </button>
        </div>
      </header>
    </>
  )
}
