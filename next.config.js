if (!process.env.NEXT_PUBLIC_NETWORK_ID) {
  throw new Error("NetworkID is required.");
}

process.env.NEXT_PUBLIC_CONTRACT_ADDRESSES =
  process.env.NEXT_PUBLIC_NEXT_PUBLIC_NETWORK_ID === '1'
    ? process.env.NEXT_PUBLIC_NEXT_PUBLIC_MAINNET_CONTRACTS
    : process.env.NEXT_PUBLIC_NEXT_PUBLIC_TESTNET_CONTRACTS;

if (!process.env.NEXT_PUBLIC_CURATOR_ID && !process.env.NEXT_PUBLIC_CONTRACT_ADDRESSES) {
  throw new Error(
    "At least one of curator id or contract address is required"
  );
}

process.env.NEXT_PUBLIC_APP_DESCRIPTION = process.env.NEXT_PUBLIC_NEXT_PUBLIC_DEFAULT_DESCRIPTION || '';
process.env.NEXT_PUBLIC_BASE_URL = process.env.NEXT_PUBLIC_NEXT_PUBLIC_BASE_URL || '';
process.env.NEXT_PUBLIC_DEFAULT_OG_CARD = process.env.NEXT_PUBLIC_NEXT_PUBLIC_DEFAULT_OG_CARD || `${process.env.NEXT_PUBLIC_BASE_URL}/fpo/social-card.jpg`;
process.env.NEXT_PUBLIC_FAVICON = process.env.NEXT_PUBLIC_NEXT_PUBLIC_FAVICON || `${process.env.NEXT_PUBLIC_BASE_URL}/fpo/favicon.png`;

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
