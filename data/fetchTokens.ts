import fetch from "cross-fetch";

async function fetchGraphQL(operationsDoc?: any, operationName?: any, variables?: any) {
  
  const result = await fetch(
    process.env.NEXT_PUBLIC_INDEXER_ENDPOINT as string,
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
        accept: "application/json",
        "x-hasura-role": "anonymous",
      },
      body: JSON.stringify({
        query: operationsDoc,
        variables: variables,
        operationName: operationName
      })
    }
  );

  return await result.json();
}

const query = `
  query TokenWithAuction($address: String) {
    Token(where: {address: {_eq: $address}}) {
      tokenId
      owner
      address
      tokenURI
      minter
      metadata {
        json
      }
    }
  }
`

function fetchTokenWithAuction() {
  return fetchGraphQL(
    query,
    "TokenWithAuction",
    {
      address: process.env.NEXT_PUBLIC_TARGET_CONTRACT_ADDRESS
    }
  );
}

export async function fetchTokens(id?: number, owner?: string) {
  const { errors, data } = await fetchTokenWithAuction();
  if (errors) {
    // handle those errors like a pro
    console.error(errors);
  }
  // do something great with this precious data
  // console.log(data);
  return data.Token
}

/*
async function fetchGraphQL(id?: number, owner?: string) {
  const query = `
    Token {
      tokenId
      owner
      address
      tokenURI
      minter
      metadata {
        json
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
    tokens: json.data
  };
}

export async function fetchTokens(id?: number, owner?: string) {
  const serverResponse = await fetchGraphQL(id, owner);
  if (serverResponse.status !== 200) {
    console.error(await serverResponse.text());
    throw new Error("server error");
  }
  const json = await serverResponse.json();
  console.log(json)
  return [];
}
*/