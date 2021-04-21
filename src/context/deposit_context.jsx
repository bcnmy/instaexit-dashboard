import React, { createContext, useState } from "react";
import makeRequest from "../helper/subgraphQuery";
export const DepositContext = createContext();

const DepositContextProvider = (props) => {
  const [depositTxs, setDepositTxs] = useState([]);

  const getDepositTransactions = async (page) => {
    const txToBeSkipped = (parseInt(page) - 1) * 25;
    const _txs = await makeRequest(
      `depositEvents(skip:${txToBeSkipped} first: 25) { id  from tokenAddress receiver toChainId amount  } `
    );
    setDepositTxs(_txs.depositEvents);
  };

  const getAddressFilteredTx = async (address) => {
    const _txs = await makeRequest(
      `depositEvents(where:{ from: "${address}",
                }) { id  from tokenAddress receiver toChainId amount  } `
    );
    return _txs.depositEvents;
  };
  const getTxHashFilteredTx = async (txHash, page) => {
    const _txs = await makeRequest(
      `depositEvents(where:{ id: "${txHash}",
                }) { id  from tokenAddress receiver toChainId amount  } `
    );
    return _txs.depositEvents;
  };

  return (
    <DepositContext.Provider
      value={{
        getDepositTransactions,
        depositTxs,
        getTxHashFilteredTx,
        getAddressFilteredTx,
      }}>
      {props.children}
    </DepositContext.Provider>
  );
};

export default DepositContextProvider;
