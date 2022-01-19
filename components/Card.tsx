import React from 'react';
import { FetchStaticData } from "@zoralabs/nft-hooks";
import { css } from '@emotion/react';

export const Card = (props:any) => {
  return (
      <div css={css`
        background: #ffffff;
        min-height: 350px;
        min-width: 300px;
        border: 1px solid white;
        margin-right: 20px;
        cursor: pointer;
        -webkit-perspective: 600px;
        -moz-perspective: 600px;
        -ms-perspective: 600px;
        perspective: 600px;
        border: 2px solid black;
        margin: 15px;
        box-shadow: 10px 10px;
        padding: 10px;
        font-weight: bold;
        box-shadow: 5px 5px rgb(0 0 0 / 50%);
        &:hover {
          box-shadow: 5px 5px pink;
          border: 2px solid pink;
          color: pink;
        }`}>
        <img src={props.image} height={'350px'} width='300px'/>
        <div css={{paddingLeft: '20px'}}>
          <h2>Noun {props.id}</h2>
        </div>
        <div css={{color: 'gray', display: 'flex', paddingLeft: '20px', paddingRight: '20px', justifyContent:'space-between'}}>
          <div>
            Reserve Price
          </div>
          <div>
            Heighest Bid
          </div>
        </div>
        <div css={{color: 'gray', paddingBottom: '20px', display: 'flex', paddingLeft: '20px', paddingRight: '20px', justifyContent:'space-between'}}>
          <div>
            --
          </div>
          <div>
            --
          </div>
        </div>
      </div>
  )
}