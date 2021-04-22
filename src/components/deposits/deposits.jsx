import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Pagination,
  Row,
  Spinner,
} from "react-bootstrap-v5";
import { useHistory, useParams } from "react-router-dom";
import { DepositContext } from "../../context/deposit_context";
import { Link } from "react-router-dom";
import DepositTxCard from "./depositTxCard";
import "./deposit.css";
import FilterTx from "./../filterTx";
import { NetworkContext } from "../../context/network_context";

const Deposits = () => {
  const { getDepositTransactions, depositTxs } = useContext(DepositContext);
  const { selectedNetwork } = useContext(NetworkContext);

  const [isLoading, setLoading] = useState(true);
  const { pageId } = useParams();
  const history = useHistory();

  const addressLength = 42;
  const txHashLength = 66;
  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      await getDepositTransactions(pageId, selectedNetwork);
      setLoading(false);
    };
    getData();
  }, [pageId]);

  const depositTxsList = depositTxs.map((depositTx, index) => {
    return <DepositTxCard tx={depositTx} key={index} />;
  });

  const filterData = async (txOrAddress) => {
    if (txOrAddress.length === addressLength) {
      history.push(`/deposits/address/${txOrAddress}`);
    } else if (txOrAddress.length === txHashLength) {
      history.push(`/deposits/tx/${txOrAddress}`);
    } else {
      console.log("Entered text isn't a address or tx.");
    }
  };

  if (isLoading) {
    return <Spinner animation="border" />;
  } else {
    return (
      <div className="deposit-tx-wrapper">
        <h2 className="deposit-heading">Deposits</h2>
        <FilterTx txCount={depositTxsList.length} filterTx={filterData} />
        <Card className="tx-heading-card">
          <Row>
            <Col xs={3} className="tx-details-heading">
              Transaction Hash
            </Col>
            <Col xs={3} className="tx-details-heading">
              From
            </Col>
            <Col xs={3} className="tx-details-heading">
              Reciever
            </Col>
            <Col xs={1} className="tx-details-heading">
              Token
            </Col>
            <Col xs={1} className="tx-details-heading">
              Amount
            </Col>
            <Col xs={1} className="tx-details-heading">
              To Chain
            </Col>
          </Row>
        </Card>
        <div className="deposit-tx-list"> {depositTxsList}</div>
        <br />
        <PaginationBar pageId={parseInt(pageId)} depositTxs={depositTxs} />
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
        <Link to={`/deposits/${pageID - 1}`} key={pageID - 1}>
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
    if (props.depositTxs.length === 25) {
      _items.push(
        <Link to={`/deposits/${(pageID + 1).toString()}`} key={pageID + 1}>
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

export default Deposits;
