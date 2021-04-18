import React, { useContext, useEffect, useState } from "react";
import { Spinner } from "react-bootstrap-v5";
import { useParams } from "react-router-dom";
import { DepositContext } from "../../../context/deposit_context";
import DepositTxCard from "../depositTxCard";
import "./filteredTx.css";
const AddressFilteredPage = () => {
  const [txs, setTxs] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const { address } = useParams();
  const { getAddressFilteredTx } = useContext(DepositContext);
  useEffect(() => {
    const getTx = async () => {
      setLoading(true);
      const _txs = await getAddressFilteredTx(address);
      setTxs(_txs);
      setLoading(false);
    };
    getTx();
  }, []);

  const depositTxsList = txs.map((depositTx, index) => {
    return <DepositTxCard tx={depositTx} key={index} />;
  });

  if (isLoading) {
    return <Spinner animation="border" />;
  } else {
    return (
      <div>
        <h3 className="tx-heading">
          Deposits
          <h5>{"From: " + address}</h5>
        </h3>

        <div className="filtered-tx-list">{depositTxsList}</div>
      </div>
    );
  }
};

export default AddressFilteredPage;
