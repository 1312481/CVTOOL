import React, { Component } from 'react';


import Header from './components/header'
import GeneralInformation from './components/generalInformation'
import Education from './components/education'
import Experience from './components/experience'
import Skill from './components/skill'


class App extends Component {


  render() {
    return (
      <div className="App">

        <Education />
        <Experience />

        {/* <Header /> */}
        <GeneralInformation />







        <Skill />






      </div>
    );
  }
}

export default App;
