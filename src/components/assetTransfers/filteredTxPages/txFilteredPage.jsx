import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AssetTransferContext } from "../../../context/asset_transfer_context";
import { NetworkContext } from "../../../context/network_context";
import AssetTxCard from "../assetTxCard";

const AssetTransferTxFilteredPage = () => {
  const [txs, setTxs] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const { tx } = useParams();
  const { getTxHashFilteredTx } = useContext(AssetTransferContext);
  const { selectedNetwork } = useContext(NetworkContext);

  useEffect(() => {
    const getTx = async () => {
      setLoading(true);
      const _txs = await getTxHashFilteredTx(tx, selectedNetwork);
      setTxs(_txs);
      setLoading(false);
    };
    getTx();
  }, []);

  const assetTransferTxsList = txs.map((assetTransferTx, index) => {
    return <AssetTxCard tx={assetTransferTx} key={index} />;
  });
  if (isLoading) {
    return <div>Loading...</div>;
  } else {
    return (
      <div>
        <h3 className="tx-heading">
          Asset Transfers
          <h5>{"Transaction: " + tx}</h5>
        </h3>

        <div className="filtered-tx-list">
          {assetTransferTxsList.length > 0
            ? assetTransferTxsList
            : "No txs Found"}
        </div>
      </div>
    );
  }
};

export default AssetTransferTxFilteredPage;
