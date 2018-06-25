import React, { Component, PropTypes } from "react";
import Header from "./header";
import GeneralInformation from "./generalInformation";
import Education from "./education"
import Experience from "./experience";
import Loading from './loading'
import Skill from "./skill";
import Login from "./login";
import ChangeData from "./changedata"
import { connect } from 'react-redux'
import * as actions from '../actions/profile'
import Error from "./error";
import Spinner from "react-spinkit"
import '../assets/styles/dashboard.css'

class Dashboard extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {

    let link = 'http://localhost:3001/api/';
    var user = sessionStorage.getItem("user");
    let url = link + `${user}`;
    console.log(this.props);
    this.props.fetchData(url);

  }
  render() {
    if (this.props.isProfileError) {
      return <Error />;
    } else if (!this.props.isProfileLoaded) {
      return <Loading />

    }
    else return (

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
const mapStateToProps = (state) => {
  return {
    profile: state.profile,
    version: state.version,
    isProfileError: state.isProfileError,
    isProfileLoaded: state.isProfileLoaded
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: (url) => dispatch(actions.fetchProfileData(url)),
    profileUpdate: (profile, version) => dispatch(actions.updateProfileData(profile, version))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
