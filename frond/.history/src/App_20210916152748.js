import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';

import ProductComponent from "./components/ProductComponent";
class App extends Component {
  render() {
    return (
      <div class="container">
          <nav class="navbar navbar-expand-lg navbar-light bg-light">
              <Link to={"/orders"} className="navbar-brand">
                Blaze
              </Link>
              <div className="navbar-nav mr-auto">
                  <li className="nav-item">
                      <Link to={"/orders"} className="nav-link">
                          Ordenes
                      </Link>
                  </li>
                  <li className="nav-item">
                      <Link to={"/products"} className="nav-link">
                        Productos
                      </Link>
                  </li>
              </div>
          </nav>

          <div className="container mt-3">
              <Switch>
                  <Route exact path="/products" component={ProductComponent} />
                  <Route exact path="/orders" component={ProductComponent} />
              </Switch>
          </div>
      </div>
    );
  }
}

export default App;
