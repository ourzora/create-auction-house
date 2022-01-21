import { css } from '@emotion/react'
import { NavLink } from './NavLink'
import {
  useWalletButton,
  useWeb3Wallet,
} from "@zoralabs/simple-wallet-provider";
import { useRouter } from 'next/router';

export const Header = () => {
  const { asPath, pathname } = useRouter();
  const { buttonAction, actionText, connectedInfo, active  } = useWalletButton();

  console.log(asPath);

  if(asPath === "/teken/"){
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
          <NavLink passHref href="/">
            <a>Home</a>
          </NavLink>
  
          {
            active ?
            <div>
            <button 
              css={css`
                border: none;
                cursor: pointer;
              `}
              onClick={() => buttonAction()}>
              <h2>Disconect Wallet</h2>
            </button>
          </div>
            :
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
          }
          
        </header>
      </>)
  }else{
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
            <a>List</a>
          </NavLink>
  
          {
            active ?
            <div>
            <button 
              css={css`
                border: none;
                cursor: pointer;
              `}
              onClick={() => buttonAction()}>
              <h2>Disconect Wallet</h2>
            </button>
          </div>
            :
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
          }
          
        </header>
      </>)
  }
}
