import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand">
          <Link to={"/orders"} className="navbar-brand">
            Blaze
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/orders"} className="nav-link">
                
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/ordes"} className="nav-link">
                
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
         
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
