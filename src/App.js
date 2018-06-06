import React, { Component } from 'react';


import Header from './components/header'
import GeneralInformation from './components/generalInformation'
import Education from './components/education'



class App extends Component {
  
  
  render() {
    return (
      <div className="App">
        <Header />

        <GeneralInformation />
        <Education />


      </div>
    );
  }
}

export default App;
