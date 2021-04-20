import React, { useState } from "react";
import {
  Card,
  Col,
  FormControl,
  InputGroup,
  Row,
  Button,
} from "react-bootstrap-v5";
import "./deposits/deposit.css";
import { useHistory } from "react-router-dom";

const FilterTx = (props) => {
  //
  const history = useHistory();

  const [txOrAddress, setTxOrAddress] = useState("");
  const addressLength = 42;
  const txHashLength = 66;
  const heading = () => {
    if (props.txCount === 25) {
      return `This page contains ${props.txCount} transactions. View further pages for more transactions.`;
    } else {
      return `This page contains ${props.txCount} transactions. This is the end of list.`;
    }
  };

  //
  const setText = async (event) => {
    setTxOrAddress(event.target.value);
  };

  return (
    <Card className="filter-tx-card">
      <Row>
        <Col className="tx-count-text">{heading()}</Col>
        <Col>
          <InputGroup className="sm-3">
            <FormControl
              placeholder="Search using Tx Hash or Address"
              aria-label="Search using Tx Hash or Address"
              aria-describedby="basic-addon2"
              onChange={setText}
            />
            <Button
              variant="dark"
              onClick={() => {
                props.filterTx(txOrAddress);
              }}>
              Search
            </Button>
          </InputGroup>
        </Col>
      </Row>
    </Card>
  );
};

export default FilterTx;
