import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import DepositContextProvider from "./context/deposit_context";
import AssetTransferContextProvider from "./context/asset_transfer_context";

ReactDOM.render(
  <AssetTransferContextProvider>
    <DepositContextProvider>
      <App />
    </DepositContextProvider>
  </AssetTransferContextProvider>,
  document.getElementById("root")
);
