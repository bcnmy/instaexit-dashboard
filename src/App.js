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
import AddressFilteredPage from "./components/deposits/filteredTxPages/addressFilteredPage";
import TxFilteredPage from "./components/deposits/filteredTxPages/txFilteredPage";

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
            <AddressFilteredPage />
          </Route>{" "}
          <Route exact path="/deposits/tx/:tx">
            <TxFilteredPage />
          </Route>
          <Route component={NotFound} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
