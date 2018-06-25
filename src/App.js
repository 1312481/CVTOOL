import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";

import Login from "./components/login";
import Dashboard from "./components/dashboard";

class App extends Component {


  render() {
    return (
      <Router>
        <div>
    
          <Route exact path="/" component={Login} />
          <Route path="/dashboard" component={Dashboard} />

        </div>
      </Router>
    );
  }
}

export default App;
