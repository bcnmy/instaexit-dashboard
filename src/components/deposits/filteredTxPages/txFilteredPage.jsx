import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DepositContext } from "../../../context/deposit_context";
import { NetworkContext } from "../../../context/network_context";
import DepositTxCard from "../depositTxCard";
import "./filteredTx.css";
const DepositTxFilteredPage = () => {
  const { selectedNetwork } = useContext(NetworkContext);

  const [txs, setTxs] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const { tx } = useParams();
  const { getTxHashFilteredTx } = useContext(DepositContext);
  useEffect(() => {
    const getTx = async () => {
      setLoading(true);
      const _txs = await getTxHashFilteredTx(tx, selectedNetwork);
      setTxs(_txs);
      setLoading(false);
    };
    getTx();
  }, []);

  const depositTxsList = txs.map((depositTx, index) => {
    return <DepositTxCard tx={depositTx} key={index} />;
  });

  if (isLoading) {
    return <div>Loading...</div>;
  } else {
    return (
      <div>
        <h3 className="tx-heading">
          Deposits
          <h5>{"Transaction: " + tx}</h5>
        </h3>
        {depositTxsList.length > 0 ? (
          <div className="filtered-tx-list">{depositTxsList}</div>
        ) : (
          <div>No Tx Found</div>
        )}{" "}
      </div>
    );
  }
};

export default DepositTxFilteredPage;
