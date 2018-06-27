import React, { Component } from "react";
import "../assets/styles/login.css";
import logo from "../assets/images/nashtech.jpg";
import FileReaderInput from "react-file-reader-input";
import { connect } from 'react-redux';
import * as actions from '../actions/profile';
import POSTAPI from './postAPI';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Slide } from 'react-toastify';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filename: "",
      tagname: "",
      user: "",
      profile: ""
    };
  }
  checkExtensionName(filename) {
    if (filename.split('.').pop() === "json") {
      return true;
    }
    else return false;
  }
  handleChange = (e, results) => {

    if (this.checkExtensionName(results[0][1].name)) {
      results.forEach(result => {
        const [e, file] = result;
        this.setState({ filename: file.name });
        let profile = JSON.parse(e.target.result);
        this.setState({ profile: profile });

      });
    }
    else {
      toast.error('Ban phai nhap import file JSON  ', {
        autoClose: 2000
      });
    }

  };
  handleUserChange = (e) => {
    this.setState({ user: e.target.value });
  }
  handleTagNameChange = (e) => {
    this.setState({ tagname: e.target.value });
  }
  submit = () => {
    if (this.state.user === "") {
      toast.error('Ban phai nhap ten dang nhap ', {
        autoClose: 2000
      });
    }
    else {
      sessionStorage.setItem('user', this.state.user);
      this.props.userLoading();
      POSTAPI('http://localhost:3001/api/checkUserExistence', this.state.profile, this.state.user)
        .then(data => {
          if (data === 'failed') {
            toast.error('User nay chua ton tai, ban phai nhap file JSON  ', {
              autoClose: 2000
            });
          }
          else if (data === 'success'){
            POSTAPI('http://localhost:3001/api/register', this.state.profile, this.state.user,this.state.tagname)
            this.props.history.push('/dashboard')
          }
        })
      
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
          <div className="col-sm-6 col-md-4 col-lg-4 shadow loginPage__container__content">
            <div className="container  loginPage__container__maincontent ">
              <div className="loginPage__container__title">CV Generator Tool</div>
              <img className="loginPage__container__logo" src={logo} alt="logo" />
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
              <div className="loginPage__container__username">
                <div className="wrap-input100 validate-input">
                  <input
                    className="input100"
                    type="text"
                    name="NashTechID"
                    placeholder="Name tag for version"
                    value={this.state.tagname}
                    onChange={(e) => this.handleTagNameChange(e)}
                  />
                  <span className="focus-input100" />
                </div>
              </div>
              <div className="loginPage__container__importJSON">
                <label
                  className="loginPage__container__filetitle"
                  htmlFor="file"
                >
                  <div className="loginPage__container__filename">File: {this.state.filename}</div>
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
                <div className="col-7 loginPage__container_submit">
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
