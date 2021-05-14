/**
 * @type import('hardhat/config').HardhatUserConfig
 */
require("@nomiclabs/hardhat-truffle5");
require("@nomiclabs/hardhat-etherscan");

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
    version: "0.8.3",
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
    apiKey: "CDXGZVNEKNXYZMBBFE2RX5Z4S823ZCC7ZF"
  }
};
