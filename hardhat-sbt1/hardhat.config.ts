import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
require ('dotenv').config();


const pKey = process.env.PKEY;
const pKey1 = process.env.PKEY_SKALE;

const config: HardhatUserConfig = {
  // defaultNetwork: "hardhat",
  // networks: {
  //   localhost: {
  //     url: "http://127.0.0.1:8545",
  //     chainId: 31337
  //   }
  // },

   networks: {

    localhost: {
          url: "http://127.0.0.1:8545",
          chainId: 31337
         },

    goerli: {
      url: "https://goerli.infura.io/v3/262187caeacd4fe8ad8e761bfb3665e2",
      accounts: [pKey],
    },

    titan: {
      url: "https://staging-v3.skalenodes.com/v1/staging-aware-chief-gianfar",
      accounts: [pKey1],
    }
  },

  // etherscan: {
  //   apiKey: "GVMRE3AYI2HPPRFHNVQYV55AR2Y1VZ7C5T",
  // },

  solidity: {
    compilers: [
      {
        version: "0.8.20"
      }
    ]
  }
};

export default config;
