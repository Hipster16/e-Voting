import "@nomicfoundation/hardhat-toolbox";
const dotenv = require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
export const solidity = "0.8.24";
export const networks = {
  amoy: {
    url: "https://polygon-amoy.blockpi.network/v1/rpc/public",
    account: [process.env.PRIVATE_KEY]
  }
};
