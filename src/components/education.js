import React, { Component, PropTypes } from "react";
import Error from './error'
import Loading from './loading'
import pencil from "../assets/images/pencil.svg";
import deleteImage from "../assets/images/delete.svg";
import { connect } from "react-redux";
import * as actions from "../actions/profile";
import plus from "../assets/images/plus.svg";
import "../assets/styles/education.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Slide, Zoom, Flip, Bounce } from 'react-toastify';
import POSTAPI from './postAPI'

class Education extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nameEducationEdited: [],
      majorEducationEdited: [],
      graduatedEducationEdited: [],
      education: []
    };


  }

  nameEducationEditing(index, field) {
    let temp = [...this.state[field]];
    temp[index] = !temp[index];
    let newstate = {};
    newstate[field] = temp;
    this.setState(newstate);
  }


  updateFieldData(e, field, fieldName, index) {
    if (e.key === "Enter") {
      let value = { ...this.props.profile };
      let user = sessionStorage.getItem("user");
      value[this.props.version.currentVersions].education[index][fieldName] = e.target.value;
      let temp = [...this.state[field]];
      temp[index] = !temp[index];
      let newstate = {};
      newstate[field] = temp;
      this.setState(newstate);
      this.props.profileUpdate(value);
      POSTAPI('http://localhost:3001/api/updateeducation', value[this.props.version.currentVersions].education,user,this.props.version.currentVersions)
    

    }
  }

  educationDeleting(index) {
    if (window.confirm("Do you really want to delete this ?!?!")) {
      let value = { ...this.props.profile };
      let user = sessionStorage.getItem("user");
      value[this.props.version.currentVersions].education.splice(index, 1);
      this.props.profileUpdate(value);
      POSTAPI('http://localhost:3001/api/updateeducation', value[this.props.version.currentVersions].education,user,this.props.version.currentVersions)
      
    }
  }

  educationAdding() {
    let tempEducation = {};
    tempEducation.name = '';
    tempEducation.major = '';
    tempEducation.gradutedTime = '';
    let value = { ...this.props.profile };
    let user = sessionStorage.getItem("user");
    value[this.props.version.currentVersions].education.push(tempEducation);

    this.props.profileUpdate(value);
    POSTAPI('http://localhost:3001/api/updateeducation', value[this.props.version.currentVersions].education,user,this.props.version.currentVersions)    
    toast.success('Adding Education Success!!!!', {
      autoClose: 2000
    });

  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.profile !== this.props.profile) {
      const length = nextProps.profile[this.props.version.currentVersions].education.length;
      let projectResTemp = [];
      for (let i = 0; i <= length; i++) {
        let temp = false;

        projectResTemp.push(temp);
      }
      this.setState({ 
        nameEducationEdited: projectResTemp, 
        majorEducationEdited: projectResTemp,
        graduatedEducationEdited: projectResTemp,
        education: nextProps.profile[this.props.version.currentVersions].education
      });
    }

  }
  handleChange(e,field, fieldName, index){
    let temp = [...this.state.education];
    console.log(temp);
    temp[index][fieldName] = e.target.value;
    this.setState({
      education: temp
    })
  }


  renderProperInput(field, fieldName, index) {
    return (
      <td>
        {this.state[field][index] ? (
          <input
            className="inputChange form-control"
            type="text"
            value = {this.state.education[index][fieldName]}
            onKeyDown={e => this.updateFieldData(e, field, fieldName, index)}
            onChange = {e => this.handleChange(e,field, fieldName, index)}
          />
        ) : (
            <span className="">
              {this.props.profile[this.props.version.currentVersions].education[index][fieldName]}

              <img
                onClick={() => this.nameEducationEditing(index, field)}
                className="iconEdit"
                src={pencil}
              />

              <img
                onClick={() => this.educationDeleting(index)}
                className="iconEdit"
                src={deleteImage}
              />
            </span>
          )}
      </td>
    );
  }

  renderEducationContainer() {
    return (
      <div>
        <ToastContainer
          transition={Slide}
          newestOnTop
        />
        <div className=" maincontent">
          <div className="maincontent__header">Education</div>
        </div>
        <div className="maintable">
          <table>
            <thead>
              <tr className="table-custom">
                <th scope="col">
                  Name
                  <img
                    onClick={() => this.educationAdding()}
                    className="iconEdit"
                    src={plus}
                  />
                </th>

                <th scope="col">Major</th>
                <th scope="col">Graduated Year</th>
              </tr>
            </thead>
            <tbody>
              {this.props.profile[this.props.version.currentVersions].education.map((education, index) => (
                <tr key={"education" + index}>
                  {this.renderProperInput("nameEducationEdited", "name", index)}
                  {this.renderProperInput("majorEducationEdited", "major", index)}
                  {this.renderProperInput("graduatedEducationEdited", "gradutedTime", index)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  render() {
    if (this.props.isProfileError) {
      return <Error />
    } else if (!this.props.isProfileLoaded) {
      return <Loading />
    } 

    else return this.renderEducationContainer();

  }
}

const mapStateToProps = state => {
  return {
    profile: state.profile,
    version: state.version,
    isProfileError: state.isProfileError,
    isProfileLoaded: state.isProfileLoaded
  };
};

const mapDispatchToProps = dispatch => {
  return {
    profileUpdate: profile => dispatch(actions.updateProfileData(profile))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Education);
