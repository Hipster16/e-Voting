require("@nomicfoundation/hardhat-toolbox");
const dotenv = require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */

module.exports = {
  solidity: "0.8.24",
  networks: {
    amoy: {
      url: "https://polygon-amoy.blockpi.network/v1/rpc/public",
      accounts: [process.env.PRIVATE_KEY],
    },
  },
};