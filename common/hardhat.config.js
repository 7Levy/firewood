require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-truffle5");
require("@nomiclabs/hardhat-web3");
require("@nomiclabs/hardhat-ethers");
require('solidity-coverage'); //yarn hardhat coverage
require('hardhat-abi-exporter');
require('@primitivefi/hardhat-dodoc');
/**
 * @type import('hardhat/config').HardhatUserConfig
 */

const { rpcs, accountsKeys } = require("./env.config.js");
module.exports = {
  // network
  defaultNetwork: "bsctest",
  networks: {
    dxt: {
      url: rpcs.dxt,
      accounts: accountsKeys,
    },
    rinkeby: {
      url: rpcs.rinkeby,
      accounts: accountsKeys,
    },
    bsctest: {
      chainId: 97,
      url: rpcs.bsctest,
      accounts: accountsKeys,
    },
  },
  // compile
  solidity: {
    compilers: [
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
  }
};

