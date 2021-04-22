import React, { createContext, useState } from "react";
import makeRequest from "../helper/subgraphQuery";
export const AssetTransferContext = createContext();

const AssetTransferContextProvider = (props) => {
  const [assetTransferTxs, setAssetTransferTxs] = useState([]);
  const { makeMumbaiRequest, makeGoerliRequest } = makeRequest;

  const getAssetTransferTransactions = async (page, networkId) => {
    const txToBeSkipped = (parseInt(page) - 1) * 25;

    let _txs;
    if (networkId === 80001) {
      _txs = await makeMumbaiRequest(
        `assetSentEvents(skip:${txToBeSkipped} first: 25) { id asset amount target  } `
      );
    } else {
      _txs = await makeGoerliRequest(
        `assetSentEvents(skip:${txToBeSkipped} first: 25) { id asset amount target  } `
      );
    }
    setAssetTransferTxs(_txs.assetSentEvents);
  };

  const getAddressFilteredTx = async (address, networkId) => {
    let _txs;
    if (networkId === 80001) {
      _txs = await makeMumbaiRequest(
        `assetSentEvents(where:{ target: "${address}",
                  }) { id asset amount target }`
      );
    } else {
      _txs = await makeGoerliRequest(
        `assetSentEvents(where:{ target: "${address}",
                  }) { id asset amount target }`
      );
    }

    return _txs.assetSentEvents;
  };

  const getTxHashFilteredTx = async (txHash, networkId) => {
    let _txs;
    if (networkId === 80001) {
      _txs = await makeMumbaiRequest(
        `assetSentEvents(where:{ id: "${txHash}",
                  }) { id asset amount target  }`
      );
    } else {
      _txs = await makeGoerliRequest(
        `assetSentEvents(where:{ id: "${txHash}",
                  }) { id asset amount target  }`
      );
    }
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
