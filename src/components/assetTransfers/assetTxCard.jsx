import React from "react";
import { Card, Row, Col } from "react-bootstrap-v5";
import chainDetails from "../chainDetails";
import tokenDetails from "../tokenDetails";
import "./assetTransfer.css";

const AssetTxCard = (props) => {
  return (
    <Card className="asset-tx-card">
      {" "}
      <Row>
        <Col xs={6}>
          <a
            className="asset-tx-details"
            href={`https://explorer-mumbai.maticvigil.com/tx/${props.tx.id}`}>
            {props.tx.id}
          </a>
        </Col>
        <Col xs={4}>
          <a
            className="asset-tx-details"
            href={`https://explorer-mumbai.maticvigil.com/address/${props.tx.target}`}>
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
            href={`https://explorer-mumbai.maticvigil.com/address/${props.tx.asset}`}>
            {tokenDetails[props.tx.asset]["tokenName"]}
          </a>
        </Col>{" "}
      </Row>
    </Card>
  );
};

export default AssetTxCard;
