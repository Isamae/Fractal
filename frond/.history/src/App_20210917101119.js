import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';

import ProductComponent from "./components/ProductComponent";
import OrderComponent from "./components/OrderComponent";
import AddProductComponent from "./components/AddProductComponent";
import EditProductComponent from "./components/EditProductComponent";
class App extends Component {
  render() {
    return (
      <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
              <Link to={"/orders"} className="navbar-brand">
                Blaze
              </Link>
              <div className="navbar-nav mr-auto">
                  <li className="nav-item">
                      <Link to={"/orders"} className="nav-link">
                          Orders
                      </Link>
                  </li>
                  <li className="nav-item">
                      <Link to={"/products"} className="nav-link">
                        Products
                      </Link>
                  </li>
              </div>
          </nav>

          <div className="container mt-3">
              <Switch>
                <Redirect from="/products/product/:id" to="/products" />
                  <Route exact path="/products" component={ProductComponent} />
                  <Route exact path={["/", "/orders"]} component={OrderComponent} />
                  <Route exact path="/products/product" component={AddProductComponent} />
                  <Route path="/products/product/:id" component={EditProductComponent} />
              </Switch>
          </div>
      </div>
    );
  }
}

export default App;
