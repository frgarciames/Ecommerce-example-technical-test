import React, { Fragment, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import './styles/App.scss';
import { withNProgress } from './utils/withNProgress';
import Header from './components/header';
import { Loading } from './components/loader';
import AppProvider from './utils/Provider';

const Home = withNProgress(lazy(() => (
  import('./views/Home')
)))
const Settings = withNProgress(lazy(() => (
  import('./views/Settings')
)))
const Product = withNProgress(lazy(() => (
  import('./views/Product')
)))
const WishListsList = withNProgress(lazy(() => (
  import('./views/WishListsList')
)))
const SignIn = withNProgress(lazy(() => (
  import('./views/SignIn')
)))
const Cart = withNProgress(lazy(() => (
  import('./views/Cart')
)))
const EditProfile = withNProgress(lazy(() => (
  import('./views/Edit-Profile')
)))
const CreateWishList = withNProgress(lazy(() => (
  import('./views/Create-WishList')
)))
const WishList = withNProgress(lazy(() => (
  import('./views/WishList')
)))
const EditWishList = withNProgress(lazy(() => (
  import('./views/Edit-WishList')
)))


const App = () => (
  <AppProvider>
    <Router>
      <Fragment>
        <Header />
        <Suspense fallback={<Loading />} >
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/settings" component={Settings} />
            <Route path="/product/:id" component={Product} />
            <Route exact path="/cart" component={Cart} />
            <Route exact path="/signin" component={SignIn} />
            <Route exact path="/edit-profile" component={EditProfile} />
            <Route exact path="/wish-lists" component={WishListsList} />
            <Route exact path="/create-wishlist" component={CreateWishList} />
            <Route path="/wish-list/:id" component={WishList} />
            <Route path="/edit-wish-list/:id" component={EditWishList} />
          </Switch>
        </Suspense>
      </Fragment>
    </Router>
  </AppProvider>
);

export default App;
