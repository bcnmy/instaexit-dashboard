import React, { useContext, useEffect } from "react";
import biconomyLogo from "../../assets/logoBiconomy.png";
import { Navbar, Nav, Dropdown } from "react-bootstrap-v5";
import { Link } from "react-router-dom";
import "./appbar.css";
import { NetworkContext } from "../../context/network_context";
const AppBar = () => {
  const { selectedNetwork, networkDetails, changeNetwork } = useContext(
    NetworkContext
  );

  return (
    <Navbar className="appbar">
      <Navbar.Brand>
        <img src={biconomyLogo} height="50vh" alt="Biconomy Logo" />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Dropdown>
            <Dropdown.Toggle variant="secondary" id="dropdown-basic">
              {networkDetails[selectedNetwork]["networkName"]}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item
                onClick={() => {
                  changeNetwork(80001);
                }}>
                Mumbai
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => {
                  changeNetwork(5);
                }}>
                Goerli
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Nav>

        <Nav className="ml-auto">
          <Link to="/deposits/1" className="nav-link">
            Deposits
          </Link>
          <Link to="/asset-transfers/1" className="nav-link">
            Asset Transfers
          </Link>
          <Link to="/liquidity" className="nav-link">
            Liquidity Txs
          </Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default AppBar;
