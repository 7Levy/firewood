require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-truffle5");
require("@nomiclabs/hardhat-web3");
require("@nomiclabs/hardhat-ethers");
// require('hardhat-deploy');
require('solidity-coverage'); //yarn hardhat coverage
require('hardhat-abi-exporter');
require('@primitivefi/hardhat-dodoc');
require("@nomiclabs/hardhat-etherscan");
// require("hardhat-gas-reporter");
/**
 * @type import('hardhat/config').HardhatUserConfig
 */

const { rpcs, accountsKeys, etherscanKeys } = require("./env.config.js");
module.exports = {
  // network
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 31337
    },
    rinkeby: {
      chainId: 4,
      url: rpcs.rinkeby,
      accounts: accountsKeys,
    },
    bsctest: {
      chainId: 97,
      url: rpcs.bsctest,
      accounts: accountsKeys,
    },
    goerli:{
      chainId:5,
      url:rpcs.goerli,
      accountsKeys:accountsKeys
    }
  },
  // etherscan
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    apiKey: etherscanKeys
  },
  // compile
  solidity: {
    compilers: [
      {
        version: "0.6.9",
        settings: {
          optimizer: {
            enabled: true,
            runs: 9999
          }
        },
      },
      {
        version: "0.8.12",
        settings: {
          optimizer: {
            enabled: true,
            runs: 9999
          }
        },
      },
    ],
  },
  // paths
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },
  // abi
  abiExporter: {
    path: './data/abi',
    runOnCompile: true,
    clear: true,
    // flat: true,
    // only: [':ERC20$'],
    spacing: 2,
    pretty: true,
  },
  // docs
  dodoc: {
    runOnCompile: false,
    debugMode: false,
    outputDir: "./data/docs",
    freshOutput: true
  },
  // gasReporter: {
  //   currency: 'USD',
  //   enabled: true
  // }
};

