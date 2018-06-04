import React, { Component } from 'react';


import Header from './components/header'
import GeneralInformation from './components/generalInformation'



class App extends Component {
  
  
  render() {
    return (
      <div className="App">
        <Header />

        <GeneralInformation />


      </div>
    );
  }
}

export default App;
