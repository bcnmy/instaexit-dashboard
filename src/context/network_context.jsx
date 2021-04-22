import React, { createContext, useState } from "react";
export const NetworkContext = createContext();

const NetworkContextProvider = (props) => {
  const networkDetails = {
    5: { networkName: "Goerli" },
    80001: { networkName: "Mumbai" },
  };

  const goerliTokenDetails = {
    "0xb5b640e6414b6def4fc9b3c1eef373925effeccf": {
      tokenName: "USDC",
      decimal: 6,
    },
    "0x2686eca13186766760a0347ee8eeb5a88710e11b": {
      tokenName: "DAI",
      decimal: 18,
    },
    "0x64ef393b6846114bad71e2cb2ccc3e10736b5716": {
      tokenName: "USDT",
      decimal: 18,
    },
  };
  const mumbaiTokenDetails = {
    "0xda5289fcaaf71d52a80a254da614a192b693e977": {
      tokenName: "USDC",
      decimal: 6,
    },
    "0x27a44456bedb94dbd59d0f0a14fe977c777fc5c3": {
      tokenName: "DAI",
      decimal: 18,
    },
    "0xeabc4b91d9375796aa4f69cc764a4ab509080a58": {
      tokenName: "USDT",
      decimal: 18,
    },
  };

  const tokenDetails = {};
  tokenDetails[5] = goerliTokenDetails;
  tokenDetails[80001] = mumbaiTokenDetails;
  const [selectedNetwork, setSelectedNetwork] = useState(80001);

  const changeNetwork = (networkID) => {
    setSelectedNetwork(networkID);
  };

  const getBaseExplorerURL = (networkID) => {};

  return (
    <NetworkContext.Provider
      value={{
        networkDetails,
        selectedNetwork,
        changeNetwork,
        tokenDetails,
      }}>
      {props.children}
    </NetworkContext.Provider>
  );
};

export default NetworkContextProvider;
