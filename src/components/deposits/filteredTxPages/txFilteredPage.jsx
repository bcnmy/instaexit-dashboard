import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DepositContext } from "../../../context/deposit_context";
import DepositTxCard from "../depositTxCard";
import "./filteredTx.css";
const TxFilteredPage = () => {
  const [txs, setTxs] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const { tx } = useParams();
  const { getTxHashFilteredTx } = useContext(DepositContext);
  useEffect(() => {
    const getTx = async () => {
      setLoading(true);
      const _txs = await getTxHashFilteredTx(tx);
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

        <div className="filtered-tx-list">{depositTxsList}</div>
      </div>
    );
  }
};

export default TxFilteredPage;
