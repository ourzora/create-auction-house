import fetch from "cross-fetch";

async function fetchGraphQL(id?: number, owner?: string) {
  const query = `
    fragment TokenWithAuction on Token {
      tokenId
      owner
      address
      tokenURI
      minter
      metadata {
        json
      }
      auctions(where: {_and:[{_not:{canceledEvent:{}}}]}) {
            winner
            lastBidAmount
            duration
            tokenId
            auctionId
            tokenContract
            reservePrice
            firstBidTime
            expiresAt
            tokenOwner
            canceledEvent {
        id
            }
            endedEvent {
        id
            }
            bidEvents {
        id
        value
        sender
        transactionHash
            }
      }
          }
    
    query byId($address: String, $tokenId: Int) {
      Token(where: {address: { _eq: $address }, tokenId: { _eq: $tokenId }}) {
        ...TokenWithAuction
      }
    }
    
    query activeTokens($address: String) {
      Token(limit: 250, where: {address: {_eq: $address}, tokenURI:{_is_null:false}
      }, order_by: [{auctions_aggregate:{max:{lastBidAmount:asc_nulls_last}}}, {auctions_aggregate:{count:desc}}, {tokenId:asc}]) {
        ...TokenWithAuction
      }
    }
    
    query byOwner($address: String, $owner: String) {
      Token(where: {_and: [{address: {_eq: $address}}, {_or: [{owner: {_eq: $owner}}, {_and: [{auctions: {tokenOwner: {_eq: $owner}}}, {auctions: {_not: {canceledEvent: {}}}}]}]}]}) {
        ...TokenWithAuction
      }
    }
	`;
  
  const reqBody = JSON.stringify({
    query,
    variables: {
      address: process.env.NEXT_PUBLIC_TARGET_CONTRACT_ADDRESS,
      tokenId: id,
      owner: owner,
    },
    operationName: id ? "byId" : owner ? "byOwner" : "activeTokens",
  });
  
  const result = await fetch(
    process.env.NEXT_PUBLIC_INDEXER_ENDPOINT as string,
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
        accept: "application/json",
        "x-hasura-role": "anonymous",
      },
      body: reqBody,
    }
  );

  return result;
}

export function handleResponse(json: any) {
  if (json.error) {
    console.error(JSON.stringify(json.error, null, 2));
    throw new Error("error");
  }
  return {
    tokens: json.data.Token.map((token: any) => ({
      ...token
    })),
  };
}

export async function fetchItems(id?: number, owner?: string) {
  const serverResponse = await fetchGraphQL(id, owner);
  if (serverResponse.status !== 200) {
    console.error(await serverResponse.text());
    throw new Error("server error");
  }
  const json = await serverResponse.json();
  return handleResponse(json);
}
