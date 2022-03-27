process.env.NETWORK_ID = process.env.NEXT_PUBLIC_NETWORK_ID;
if (!NETWORK_ID) {
  throw new Error("NetworkID is required.");
}

process.env.CURATOR_ID = process.env.NEXT_PUBLIC_CURATOR_ID;

process.env.CONTRACT_ADDRESSES =
  process.env.NEXT_PUBLIC_NETWORK_ID === '1'
    ? process.env.NEXT_PUBLIC_MAINNET_CONTRACTS
    : process.env.NEXT_PUBLIC_TESTNET_CONTRACTS;

if (!process.env.CURATOR_ID && !process.env.CONTRACT_ADDRESSES) {
  throw new Error(
    "At least one of curator id or contract address is required"
  );
}

process.env.APP_TITLE = process.env.NEXT_PUBLIC_APP_TITLE;
process.env.APP_DESCRIPTION = process.env.NEXT_PUBLIC_DEFAULT_DESCRIPTION || '';
process.env.BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || '';
process.env.DEFAULT_OG_CARD = `${BASE_URL}/fpo/social-card.jpg`;
process.env.FAVICON = `${BASE_URL}/fpo/favicon.png`;

process.env.RPC_URL = process.env.NEXT_PUBLIC_RPC_URL;

module.exports = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.md$/,
      use: 'raw-loader',
    });
    return config;
  },
  future: {
    webpack5: true,
  },
};
