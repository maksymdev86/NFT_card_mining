/**
 * @type import('hardhat/config').HardhatUserConfig
 */
require("@nomiclabs/hardhat-truffle5");
require("@nomiclabs/hardhat-etherscan");
require('dotenv').config();

module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      forking: {
        url: "https://mainnet.infura.io/v3/9a755ff3354b427aaab1837447d93a46"
      }
    },
    rinkeby: {
      url: "https://rinkeby.infura.io/v3/9a755ff3354b427aaab1837447d93a46",
      accounts: [process.env.RINKEBY_ACCOUNTS]
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
