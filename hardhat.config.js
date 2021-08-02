/**
 * @type import('hardhat/config').HardhatUserConfig
 */
require("@nomiclabs/hardhat-truffle5");
require("@nomiclabs/hardhat-etherscan");
require('dotenv').config();

module.exports = {
  defaultNetwork: "rinkeby",
  networks: {
    hardhat: {
      forking: {
        url: "https://mainnet.infura.io/v3/f599c7aa0a0340eda3c8a96938c37434"
      }
    },
    rinkeby: {
      url: "https://rinkeby.infura.io/v3/f599c7aa0a0340eda3c8a96938c37434",
      accounts: ["35bd7b604364295b2c4c81d40a2c1b6fc80cc04e96abd2e3cec874b831314f3e"]
    }
  },
  solidity: {
    version: "0.8.0",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  mocha: {
    timeout: 999999
  },
  etherscan: {
    apiKey: "5NGWZZ8J2HPYNYPE7PXR7UBX2P1AUYY1PC"
  }
};
