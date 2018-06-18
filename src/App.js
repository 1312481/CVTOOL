import React, { Component, PropTypes } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from "react-router-dom";

import Header from "./components/header";
import GeneralInformation from "./components/generalInformation";
import Education from "./components/education";
import Experience from "./components/experience";
import Skill from "./components/skill";
import Login from "./components/login";
import Dashboard from "./components/dashboard";

class App extends Component {
  constructor(props) {
    super(props);
  }

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
