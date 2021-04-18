import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import DepositContextProvider from "./context/deposit_context";

ReactDOM.render(
  <DepositContextProvider>
    <App />
  </DepositContextProvider>,
  document.getElementById("root")
);
