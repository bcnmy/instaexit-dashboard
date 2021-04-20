import "./App.css";
import AppBar from "./components/appbar/appbar";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Deposits from "./components/deposits/deposits";
import NotFound from "./components/NotFound/not_found";
import AddressFilteredDepositPage from "./components/deposits/filteredTxPages/addressFilteredPage";
import TxFilteredDepositPage from "./components/deposits/filteredTxPages/txFilteredPage";
import AssetTransfers from "./components/assetTransfers/assetTransfers";
import AssetTransfersTxFilteredPage from "./components/assetTransfers/filteredTxPages/txFilteredPage";
import AssetTransfersAddressFilteredPage from "./components/assetTransfers/filteredTxPages/addressFilteredPage";

function App() {
  return (
    <div className="App">
      <Router>
        <AppBar />
        <Switch>
          <Route exact path="/">
            <Redirect
              to={{
                pathname: "/deposits/1",
              }}
            />
          </Route>
          <Route exact path="/deposits/:pageId">
            <Deposits />
          </Route>
          <Route exact path="/deposits/address/:address">
            <AddressFilteredDepositPage />
          </Route>
          <Route exact path="/deposits/tx/:tx">
            <TxFilteredDepositPage />
          </Route>
          <Route exact path="/asset-transfers/:pageId">
            <AssetTransfers />
          </Route>
          <Route exact path="/asset-transfers/address/:address">
            <AssetTransfersAddressFilteredPage />
          </Route>
          <Route exact path="/asset-transfers/tx/:tx">
            <AssetTransfersTxFilteredPage />
          </Route>
          <Route component={NotFound} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
