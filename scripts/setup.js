const fs = require('fs')
const fsPromises = require('fs/promises')
const { prompt } = require('prompts')

let interval
const questions = [
  {
    type: 'text',
    name: 'NEXT_PUBLIC_APP_TITLE',
    message: `What would you like to call your Auction House?`,
    initial: `Create Auction House ☼☽`,
    format: (v) => `${v}`,
  },
  {
    type: 'text',
    name: 'NEXT_PUBLIC_DEFAULT_DESCRIPTION',
    message: `How would you describe your auction house?`,
    initial: `A permissionless Auction House with the ZORA protocol!`,
    format: (v) => `${v}`,
  },
  {
    type: 'list',
    name: 'NEXT_PUBLIC_MAINNET_CONTRACTS',
    message: `Which Mainnet NFT Contract would you like to use, default is the ZORA contract address. For multiple contracts please seperate by comma.`,
    initial: `0xabEFBc9fD2F806065b4f3C237d4b59D9A97Bcac7`,
    separator: ',',
  },
  {
    type: 'list',
    name: 'NEXT_PUBLIC_TESTNET_CONTRACTS',
    message: `Which Testnet NFT Contract would you like to use, currently we support Rinkeby, default is the ZORA Rinkeby contract address. For multiple contracts please seperate by comma.`,
    initial: `0x7C2668BD0D3c050703CEcC956C11Bd520c26f7d4`,
    separator: ',',
  },
  {
    type: 'select',
    name: 'NEXT_PUBLIC_NETWORK_ID',
    message: `Which network would you like to use as your default for development and deployment, Please select one.`,
    choices: [
      { title: 'Testnet (Rinkeby)', description: 'Rinkeby Testnet', value: '4' },
      { title: 'Testnet (Ropsten)', description: 'Ropsten Testnet', value: '3' },
      { title: 'Mainnet', description: 'ETH Mainnet', value: '1' },
      { title: 'Testnet (Mumbai)', description: 'Mumbai Testnet', value: '80001' },
      { title: 'Mainnet (Polygon)', description: 'MATIC Mainnet', value: '137' },
    ],
    initial: 0,
  },
]

prompt(questions, {
  onCancel: cleanup,
  onSubmit: cleanup,
})
  .then((answers) =>
    Object.entries(answers).map(
      (entry) => `${entry[0]}=${entry[1]}`
    )
  )
  .then((result) => {
    const stream = fs.createWriteStream('.env', { flags: 'a' })
    result.forEach((VAR) => {
      stream.write(VAR + '\n')
    })
    stream.end()
  })
  .then(async () => {
    await fsPromises.writeFile('.env', '')
    console.log('💫 Your Env File has been created successfully!')
  })

function cleanup() {
  clearInterval(interval)
}
