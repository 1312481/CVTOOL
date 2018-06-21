import React, { Component, PropTypes } from "react";
import { withRouter } from 'react-router-dom'
import "../assets/styles/login.css";
import { Redirect } from 'react-router';
import logo from "../assets/images/nashtech.jpg";
import FileReaderInput from "react-file-reader-input";
import { connect } from 'react-redux';
import * as actions from '../actions/profile';
import POSTAPI from './postAPI';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Slide, Zoom, Flip, Bounce } from 'react-toastify';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filename: "",
      user: "",
      profile:{}
    };
  }

  handleChange = (e, results) => {
    results.forEach(result => {
      const [e, file] = result;
      this.setState({ filename: file.name });
      let profile = JSON.parse(e.target.result);
      // console.log(e.target.result);
      this.setState({profile : profile});

    });
  };
  handleUserChange = (e) => {
    this.setState({ user: e.target.value });
  }
  submit = () => {
    if (this.state.user === "" || this.state.filename === "") {
      toast.error('Ban phai nhap ten dang nhap va import file JSON  ', {
        autoClose: 2000
      });
    }
    else {
      console.log('data la: ', this.state.profile);
      sessionStorage.setItem('user',this.state.user);
      this.props.userLoading();
      POSTAPI('http://localhost:3001/api/register', this.state.profile, this.state.user);
      this.props.history.push('/dashboard')
    }

  }

  render() {
    return (
      <div className="loginPage">
        <ToastContainer
          transition={Slide}
          newestOnTop
        />
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
                    value={this.state.user}
                    onChange={(e) => this.handleUserChange(e)}
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
                    as="text"
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
                  <button onClick={() => this.submit()} className="loginPage__container__buttonsubmit">
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div >
    );
  }
}
const mapStateToProps = (state) => {
  return {
    profile: state.profile
  };
};
const mapDispatchToProps = (dispatch) => {
  return {

    profileUpdate: (profile) => dispatch(actions.updateProfileData(profile)),
    userLoading: (user) => dispatch(actions.isProfileLoaded(false))
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(Login);
