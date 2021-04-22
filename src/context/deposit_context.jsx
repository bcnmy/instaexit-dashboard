import React, { createContext, useState } from "react";
import makeRequest from "../helper/subgraphQuery";
export const DepositContext = createContext();

const DepositContextProvider = (props) => {
  const [depositTxs, setDepositTxs] = useState([]);
  const { makeMumbaiRequest, makeGoerliRequest } = makeRequest;
  const getDepositTransactions = async (page, networkId) => {
    const txToBeSkipped = (parseInt(page) - 1) * 25;
    let _txs;
    if (networkId == 80001) {
      _txs = await makeMumbaiRequest(
        `depositEvents(skip:${txToBeSkipped} first: 25) { id  from tokenAddress receiver toChainId amount  } `
      );
    } else if (networkId == 5) {
      _txs = await makeGoerliRequest(
        `depositEvents(skip:${txToBeSkipped} first: 25) { id  from tokenAddress receiver toChainId amount  } `
      );
    }
    setDepositTxs(_txs.depositEvents);
  };

  const getAddressFilteredTx = async (address, networkId) => {
    let _txs;

    if (networkId == 80001) {
      _txs = await makeMumbaiRequest(
        `depositEvents(where:{ from: "${address}",
                }) { id  from tokenAddress receiver toChainId amount  } `
      );
    } else if (networkId == 5) {
      _txs = await makeGoerliRequest(
        `depositEvents(where:{ from: "${address}",
                }) { id  from tokenAddress receiver toChainId amount  } `
      );
    }

    return _txs.depositEvents;
  };
  const getTxHashFilteredTx = async (txHash, networkId) => {
    let _txs;

    if (networkId == 80001) {
      _txs = await makeMumbaiRequest(
        `depositEvents(where:{ id: "${txHash}",
                }) { id  from tokenAddress receiver toChainId amount  } `
      );
    } else if (networkId == 5) {
      _txs = await makeGoerliRequest(
        `depositEvents(where:{ id: "${txHash}",
                }) { id  from tokenAddress receiver toChainId amount  } `
      );
    }

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
