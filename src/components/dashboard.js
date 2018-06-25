import React, { Component, PropTypes } from "react";
import Header from "./header";
import GeneralInformation from "./generalInformation";
import Education from "./education"
import Experience from "./experience";
import Skill from "./skill";
import Login from "./login";
import ChangeData from "./changedata"
class Dashboard extends Component {
  render() {
    return (
      <div className="App">
        <ChangeData />
        <Header />
        <GeneralInformation />
        <Skill />
        <Education />
        <Experience />
      </div>
    );
  }
}

export default Dashboard;
