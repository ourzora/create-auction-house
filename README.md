# Create Auction House ☼☽

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https%3A%2F%2Fgithub.com%2Fourzora%2Fcreate-auction-house&env=NEXT_PUBLIC_APP_TITLE,NEXT_PUBLIC_BASE_URL,NEXT_PUBLIC_NETWORK,NEXT_PUBLIC_CURATORS_ID&envDescription=Curator%20ID%20%26%20Network&envLink=https%3A%2F%2Fgithub.com%2Fourzora%2Fauction-house%23curators&project-name=our-auction-house&repo-name=our-auction-house&redirect-url=https%3A%2F%2Fcreate-auction-house.vercel.app)

## Features
1. uses `@zoralabs/nft-components`
2. uses `@emotion`: emotion.sh/
3. uses `typescript`
4. based on next.js

## Environment Variables

You will need to add the below environment variables both locally and in your deployment settings. The below are public as they do not contain any secret information and therefore can be accessed anywhere in our code. - see .env.sample

[Next.js Evironment Variables](https://nextjs.org/docs/basic-features/environment-variables#exposing-environment-variables-to-the-browser)
      
      1. The name of your application used for the document title
      NEXT_PUBLIC_APP_TITLE=Application Title
      
      2. The url of your app
      NEXT_PUBLIC_BASE_URL=http://localhost:8080
      
      3. NetworkID to set. Use Networks export to set constant. Default is mainnet. undefined "1" or "2"
      NEXT_PUBLIC_NETWORK=2
      
      4. Curator ID to set for the NFT collection.
      NEXT_PUBLIC_CURATORS_ID=0x5ed25dcc8490809215cd0632492467bebc60b8d5 (Set the Curator ID )

[Adding environment variables to your Vercel build setup](https://vercel.com/docs/environment-variables)

## Develop

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
