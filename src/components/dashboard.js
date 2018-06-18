import React, { Component, PropTypes } from "react";
import Header from "./header";
import GeneralInformation from "./generalInformation";
import Education from "./education"
import Experience from "./experience";
import Skill from "./skill";
import Login from "./login";

class Dashboard extends Component {
  render() {
    return (
      <div className="App">
        <Header />

        <GeneralInformation />
        <Education />


        <Skill />
        <Experience />
      </div>
    );
  }
}

export default Dashboard;
