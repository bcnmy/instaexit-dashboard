import React, { useContext } from "react";
import { Card, Row, Col } from "react-bootstrap-v5";
import { NetworkContext } from "../../context/network_context";
import chainDetails from "../chainDetails";
import tokenDetails from "../tokenDetails";
import "./assetTransfer.css";

const AssetTxCard = (props) => {
  const { tokenDetails, selectedNetwork, getBaseExplorerURL } = useContext(
    NetworkContext
  );
  return (
    <Card className="asset-tx-card">
      {" "}
      <Row>
        <Col xs={6}>
          <a
            className="asset-tx-details"
            href={getBaseExplorerURL(selectedNetwork) + `/tx/${props.tx.id}`}>
            {props.tx.id}
          </a>
        </Col>
        <Col xs={4}>
          <a
            className="asset-tx-details"
            href={
              getBaseExplorerURL(selectedNetwork) +
              `/address/${props.tx.target}`
            }>
            {props.tx.target}
          </a>
        </Col>
        <Col xs={1}>
          {parseInt(props.tx.amount) /
            10 ** tokenDetails[props.tx.asset]["decimal"]}
        </Col>
        <Col xs={1}>
          <a
            className="asset-tx-details"
            href={
              getBaseExplorerURL(selectedNetwork) + `/address/${props.tx.asset}`
            }>
            {tokenDetails[props.tx.asset]["tokenName"]}
          </a>
        </Col>{" "}
      </Row>
    </Card>
  );
};

export default AssetTxCard;
