
require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  solidity: "0.8.17",
  networks: {
    sepolia: {
      url: 'https://eth-sepolia.g.alchemy.com/v2/iS41JOH7X98Rbin9zAXH8BfK3l0Z-rMf',
      accounts: [
        'c5d3957f39530e1722e304a7527133ba133df5de69f6451ae8218996ef1d8246'
      ],
     }
  }
};