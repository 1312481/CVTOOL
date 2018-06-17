import React, { Component } from "react";
import "../assets/styles/login.css";
import logo from "../assets/images/nashtech.jpg";
import FileReaderInput from "react-file-reader-input";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filename: ""
    };
  }

  handleChange = (e, results) => {
    results.forEach(result => {
      const [e, file] = result;
      console.log(e.target.result);
      this.setState({ filename: file.name });
    });
  };

  render() {
    return (
      <div className="loginPage">
        <div className="row loginPage__container">
          <div className="col-4 shadow loginPage__container__content">
            <div className="container  loginPage__container__maincontent ">
              <div className="loginPage__container__title">Login</div>
              <img className="loginPage__container__logo" src={logo} />
              <div className="loginPage__container__username">
                <div className="wrap-input100 validate-input">
                  <input
                    className="input100"
                    type="text"
                    name="NashTechID"
                    placeholder="NashTechID"
                  />
                  <span className="focus-input100" />
                </div>
              </div>
              <div className="loginPage__container__importJSON">
                <label
                  className="loginPage__container__filetitle"
                  htmlFor="file"
                >
                  <div>File: {this.state.filename}</div>
                </label>

                <div className="loginPage__container__input">
                  <FileReaderInput
                    as="binary"
                    id="my-file-input"
                    onChange={this.handleChange}
                  >
                    <button className="loginPage__container__buttonJSON">
                      Browse
                    </button>
                  </FileReaderInput>
                </div>
              </div>

              <div className="loginPage__container_containersubmit">
                <div className="col-6 loginPage__container_submit">
                  <button className="loginPage__container__buttonsubmit">
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
