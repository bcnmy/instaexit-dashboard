import React, { createContext, useState } from "react";
import makeRequest from "../helper/subgraphQuery";
export const AssetTransferContext = createContext();

const AssetTransferContextProvider = (props) => {
  const [assetTransferTxs, setAssetTransferTxs] = useState([]);

  const getAssetTransferTransactions = async (page) => {
    const txToBeSkipped = (parseInt(page) - 1) * 25;
    const _txs = await makeRequest(
      `assetSentEvents(skip:${txToBeSkipped} first: 25) { id asset amount target  } `
    );
    setAssetTransferTxs(_txs.assetSentEvents);
  };

  const getAddressFilteredTx = async (address) => {
    const _txs = await makeRequest(
      `assetSentEvents(where:{ target: "${address}",
                }) { id asset amount target }`
    );
    return _txs.assetSentEvents;
  };

  const getTxHashFilteredTx = async (txHash) => {
    const _txs = await makeRequest(
      `assetSentEvents(where:{ id: "${txHash}",
                }) { id asset amount target  }`
    );
    return _txs.assetSentEvents;
  };

  return (
    <AssetTransferContext.Provider
      value={{
        assetTransferTxs,
        getAssetTransferTransactions,
        getAddressFilteredTx,
        getTxHashFilteredTx,
      }}>
      {props.children}
    </AssetTransferContext.Provider>
  );
};
export default AssetTransferContextProvider;
