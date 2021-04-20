import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AssetTransferContext } from "../../../context/asset_transfer_context";
import AssetTxCard from "../assetTxCard";
const AssetTransferAddressFilteredPage = () => {
  const [txs, setTxs] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const { address } = useParams();
  const { getAddressFilteredTx } = useContext(AssetTransferContext);

  useEffect(() => {
    const getTx = async () => {
      setLoading(true);
      const _txs = await getAddressFilteredTx(address);
      setTxs(_txs);
      setLoading(false);
    };
    getTx();
  }, []);

  // getTxHashFilteredTx;

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
          <h5>{"Address: " + address}</h5>
        </h3>

        <div className="filtered-tx-list">{assetTransferTxsList}</div>
      </div>
    );
  }
};

export default AssetTransferAddressFilteredPage;
