import React, { Suspense, Fragment, lazy } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import ReactDOM from "react-dom";
import App from './App';
import * as serviceWorker from './serviceWorker';
import { withNProgress } from "./utils/withNProgress";
import "nprogress/nprogress.css";
import './styles/index.scss';

const Home = withNProgress(lazy(() => (
  import('./views/Home')
)))
const Settings = withNProgress(lazy(() => (
  import('./views/Settings')
)))
const Product = withNProgress(lazy(() => (
  import('./views/Product')
)))

const Loading = () => <p>Loading ...</p>;

const AppRouter = () => (
  <Router>
    <div>
      <nav>
        <ul
          style={{
            listStyle: "none",
            display: "flex",
            justifyContent: "space-around"
          }}
        >
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/settings/">Settings</Link>
          </li>
          <li>
            <Link to="/product/">Product</Link>
          </li>
        </ul>
      </nav>
      <Suspense fallback={<Loading />} >
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/settings/">
            <Settings />
          </Route>
          <Route path="/product/">
            <Product />
          </Route>
        </Switch>
      </Suspense>
    </div>
  </Router>
);

ReactDOM.render(<AppRouter />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
