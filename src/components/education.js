import React, { Component, PropTypes } from "react";

import pencil from "../assets/images/pencil.svg";
import deleteImage from "../assets/images/delete.svg";
import { connect } from "react-redux";
import * as actions from "../actions/profile";
import plus from "../assets/images/plus.svg";
import "../assets/styles/education.css";

// const API = 'https://api.myjson.com/bins/eoigu'

class Education extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nameEducationEdited: [],
      majorEducationEdited: [],
      graduatedEducationEdited: []
    };

    this.renderProperInput = this.renderProperInput.bind(this)
    this.updateFieldData = this.updateFieldData.bind(this)
  }

  nameEducationEditing(index, field) {
      let temp = [...this.state.nameEducationEdited];
      temp[index] = !temp[index];
      let newstate = {};
      newstate[field] = temp;
      this.setState(newstate);
  }

  updateFieldData(e, field, fieldName, index) {
    if (e.key === "Enter") {
      let value = { ...this.props.profile };
      value.education[index][fieldName] = e.target.value;
      let temp = [...this.state[field]];
      temp[index] = !temp[index];
      let newstate = {};
      newstate[field] = temp;
      this.setState(newstate);
      this.props.profileUpdate(value);
    }
  }

  educationDeleting(index) {
    if (window.confirm("Do you really want to delete this ?!?!")) {
      let value = { ...this.props.profile };
      value.education.splice(index, 1);

      this.props.profileUpdate(value);
      // this.forceUpdate();
    }
  }

  educationAdding() {
    console.log(this.props.profile.education);
    console.log(this.state.nameEducationEdited);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.profile !== this.props.profile) {
      const length = nextProps.profile.education.length;
      let projectResTemp = [];
      for (let i = 0; i < length; i++) {
        let temp = false;

        projectResTemp.push(temp);
      }
      this.setState({ nameEducationEdited: projectResTemp });
    }
  }

  renderError() {
    return <div>Sorry! There was an error</div>;
  }

  renderLoading() {
    return <div>Loading...</div>;
  }

  renderProperInput(field, fieldName, index) {
    return (
      <td>
      {this.state[field][index] ?
        <input
          className="inputChange form-control"
          type="text"
          onKeyDown={e =>
            this.updateFieldData(e, field, fieldName, index)
          }
          placeholder="Moi ban nhap ten"
        /> :
        <span className="">
          {this.props.profile.education[index][fieldName]}

          <img
            onClick={() =>
              this.nameEducationEditing(index, field)
            }
            className="iconEdit"
            src={pencil}
          />

          <img
            onClick={() => this.educationDeleting(index)}
            className="iconEdit"
            src={deleteImage}
          />
        </span>
      }
      </td>)
  }

  renderEducationContainer() {
    return <div>
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
          {this.props.profile.education.map((education, index) =>
              <tr key={education.name.toString()}>
                {this.renderProperInput('nameEducationEdited', 'name', index)}
                {this.renderProperInput('majorEducationEdited', 'major', index)}
                {this.renderProperInput('graduatedEducationEdited', 'gradutedTime', index)}
              </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
  }

  render() {
    if (this.props.isProfileError) {
      return this.renderError()
    } else if (!this.props.isProfileLoaded) {
      return this.renderLoading()
    } else {
      return this.renderEducationContainer()
    }
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
