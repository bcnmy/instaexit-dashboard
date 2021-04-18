import React from "react";
import biconomyLogo from "../../assets/logoBiconomy.png";
import { Navbar, Nav } from "react-bootstrap-v5";
import { Link } from "react-router-dom";
import "./appbar.css";
const AppBar = () => {
  return (
    <Navbar className="appbar">
      <Navbar.Brand>
        <Link>
          <img src={biconomyLogo} height="50vh" alt="Biconomy Logo" />
        </Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Link to="/deposits/1" className="nav-link">
            Deposits
          </Link>
          <Link to="/asset-transfers" className="nav-link">
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
