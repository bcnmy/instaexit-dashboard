import React, { useContext, useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { AssetTransferContext } from "../../context/asset_transfer_context";
import AssetTxCard from "./assetTxCard";
import "./assetTransfer.css";
import { Button, Card, Col, Pagination, Row } from "react-bootstrap-v5";
import FilterTx from "../filterTx";

const AssetTransfers = () => {
  const { getAssetTransferTransactions, assetTransferTxs } = useContext(
    AssetTransferContext
  );
  const [isLoading, setLoading] = useState(true);
  const { pageId } = useParams();
  const history = useHistory();

  const addressLength = 42;
  const txHashLength = 66;

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      await getAssetTransferTransactions(pageId);
      setLoading(false);
    };
    getData();
  }, [pageId]);

  const assetTransferTxsList = assetTransferTxs.map(
    (assetTransferTx, index) => {
      return <AssetTxCard tx={assetTransferTx} key={index} />;
    }
  );

  const filterData = async (txOrAddress) => {
    if (txOrAddress.length === addressLength) {
      history.push(`/asset-transfers/address/${txOrAddress}`);
    } else if (txOrAddress.length === txHashLength) {
      history.push(`/asset-transfers/tx/${txOrAddress}`);
    } else {
      console.log("Entered text isn't a address or tx.");
    }
  };
  if (isLoading) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className="asset-transfer-tx-wrapper">
        <div className="asset-transfer-tx-heading">Asset Transfers</div>
        <FilterTx txCount={assetTransferTxsList.length} filterTx={filterData} />

        <Card className="tx-heading-card">
          <Row>
            <Col xs={6} className="tx-details-heading">
              Transaction Hash
            </Col>
            <Col xs={4} className="tx-details-heading">
              From
            </Col>
            <Col xs={1} className="tx-details-heading">
              Reciever
            </Col>
            <Col xs={1} className="tx-details-heading">
              Token
            </Col>
          </Row>
        </Card>
        {assetTransferTxsList.length > 0
          ? assetTransferTxsList
          : "No txs Found"}
        <br />
        <PaginationBar
          pageId={parseInt(pageId)}
          assetTransferTxs={assetTransferTxs}
        />
      </div>
    );
  }
};

const PaginationBar = (props) => {
  const pageID = parseInt(props.pageId);
  const [items, setItems] = useState([]);

  useEffect(() => {
    let _items = [];
    if (pageID !== 1) {
      _items.push(
        <Link to={`/asset-transfers/${pageID - 1}`} key={pageID - 1}>
          <Button variant="light"> {(pageID - 1).toString()}</Button>
        </Link>
      );
      setItems(_items);
    }
    _items.push(
      <Pagination.Item key={pageID} active>
        {pageID}
      </Pagination.Item>
    );
    if (props.assetTransferTxs.length === 25) {
      _items.push(
        <Link
          to={`/asset-transfers/${(pageID + 1).toString()}`}
          key={pageID + 1}>
          <Button variant="light">{pageID + 1}</Button>
        </Link>
      );
      setItems(_items);
    }
  }, []);
  return (
    <Pagination className="pagination-bar" size="md">
      {items}
    </Pagination>
  );
};

export default AssetTransfers;
