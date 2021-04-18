import React from "react";
import { Card, Row, Col } from "react-bootstrap-v5";
import chainDetails from "../chainDetails";
import tokenDetails from "../tokenDetails";
const DepositTxCard = (props) => {
  return (
    <Card className="deposit-tx-card">
      <Row>
        <Col xs={3}>
          <a
            className="tx-details"
            href={`https://explorer-mumbai.maticvigil.com/tx/${props.tx.id}`}>
            {props.tx.id.substring(0, parseInt(props.tx.id.length) / 2) + "..."}
          </a>
        </Col>
        <Col xs={3}>
          <a
            className="tx-details"
            href={`https://explorer-mumbai.maticvigil.com/address/${props.tx.from}`}>
            {props.tx.from.substring(0, parseInt(props.tx.from.length) / 2) +
              "..."}
          </a>
        </Col>
        <Col xs={3}>
          <a
            className="tx-details"
            href={`https://explorer-mumbai.maticvigil.com/address/${props.tx.receiver}`}>
            {props.tx.receiver.substring(
              0,
              parseInt(props.tx.receiver.length) / 2
            ) + "..."}
          </a>
        </Col>
        <Col xs={1}>
          <a
            className="tx-details"
            href={`https://explorer-mumbai.maticvigil.com/address/${props.tx.tokenAddress}`}>
            {tokenDetails[props.tx.tokenAddress]["tokenName"]}
          </a>
        </Col>
        <Col xs={1}>
          {parseInt(props.tx.amount) /
            parseInt(10 ** tokenDetails[props.tx.tokenAddress]["decimal"])}
        </Col>
        <Col xs={1}>{chainDetails[props.tx.toChainId]["networkName"]}</Col>
      </Row>
    </Card>
  );
};

export default DepositTxCard;
