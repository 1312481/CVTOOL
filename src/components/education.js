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
      graduatedEducationEdited: []
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
      let key = this.props.profile._id;
      value.education[index][fieldName] = e.target.value;
      let temp = [...this.state[field]];
      temp[index] = !temp[index];
      let newstate = {};
      newstate[field] = temp;
      this.setState(newstate);
      this.props.profileUpdate(value);
      POSTAPI('http://localhost:3001/api/updateeducation', value.education, key);

    }
  }

  educationDeleting(index) {
    if (window.confirm("Do you really want to delete this ?!?!")) {
      let value = { ...this.props.profile };
      let key = this.props.profile._id;
      value.education.splice(index, 1);
      this.props.profileUpdate(value);
      POSTAPI('http://localhost:3001/api/updateeducation', value.education, key);
    }
  }

  educationAdding() {
    let tempEducation = {};
    tempEducation.name = 'Default';
    tempEducation.major = 'Default';
    tempEducation.gradutedTime = 'Default';
    let value = { ...this.props.profile };
    let key = this.props.profile._id;
    value.education.push(tempEducation);

    this.props.profileUpdate(value);
    POSTAPI('http://localhost:3001/api/updateeducation', value.education, key);
    toast.success('Adding Education Success!!!!', {
      autoClose: 2000
    });

  }

  componentWillMount() {

    const length = this.props.profile.education.length;
    let projectResTemp = [];
    for (let i = 0; i <= length; i++) {
      let temp = false;

      projectResTemp.push(temp);
    }
    this.setState({ nameEducationEdited: projectResTemp });
    this.setState({ majorEducationEdited: projectResTemp });
    this.setState({ graduatedEducationEdited: projectResTemp });

  }



  renderProperInput(field, fieldName, index) {
    return (
      <td>
        {this.state[field][index] ? (
          <input
            className="inputChange form-control"
            type="text"
            onKeyDown={e => this.updateFieldData(e, field, fieldName, index)}
            placeholder="Moi ban nhap ten"
          />
        ) : (
            <span className="">
              {this.props.profile.education[index][fieldName]}

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
              {this.props.profile.education.map((education, index) => (
                <tr key={education.name.toString() + index.toString()}>
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
    // if (this.props.isProfileError) {
    //   return <Error />
    // } else if (!this.props.isProfileLoaded) {
    //   return <Loading />
    // } 

    return this.renderEducationContainer();

  }
}

const mapStateToProps = state => {
  return {
    profile: state.profile,
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
