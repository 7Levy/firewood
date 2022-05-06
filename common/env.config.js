// envs/.env.${NODE_ENV}
// node your_script.js --node-env=test
// BASH：export NODE_ENV=${env_name}
require('dotenv-flow').config({ path: 'envs/', default_node_env: 'dev', silent: true });


const rpcs = {
    rinkeby: `https://rinkeby.infura.io/v3/${process.env.RINKEBY_KEY}`,
    bsctest:"https://data-seed-prebsc-1-s1.binance.org:8545",
    ipfs_infura:""
}

const accounts = process.env.ACCOUNTS ? process.env.ACCOUNTS.split(",") : []
const accountsKeys = process.env.PRIVATE_KEYS ? process.env.PRIVATE_KEYS.split(",") : []

module.exports = { rpcs, accounts, accountsKeys }


