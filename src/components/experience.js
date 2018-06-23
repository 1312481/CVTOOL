import React, { Component, PropTypes } from "react";

import pencil from "../assets/images/pencil.svg";
import deleteImage from "../assets/images/delete.svg";
import plus from "../assets/images/plus.svg";
import { connect } from "react-redux";
import * as actions from "../actions/profile";
import "../assets/styles/education.css";
import configureStore from "../store/configureStore";
import Error from "./error";
import Loading from "./loading";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Slide, Zoom, Flip, Bounce } from "react-toastify";
import POSTAPI from "./postAPI";

class Experience extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projectNameEdited: [],
      projectDurationEdited: [],
      projectPositionEdited: [],
      projectDescriptionEdited: [],
      projectTechnologyEdited: [],
      projectResEdited: [],
      experience: []
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.profile !== this.props.profile) {
      let projectResTemp = [];
      let projectTemp = [];
      for (
        let i = 0;
        i <
        nextProps.profile[this.props.version.currentVersions].experience.length;
        i++
      ) {
        let tempRes = [];

        for (
          let j = 0;
          j <
          nextProps.profile[this.props.version.currentVersions].experience[i]
            .responsibility.length;
          j++
        ) {
          tempRes.push(false);
        }
        projectTemp.push(false);
        projectResTemp.push(tempRes);
      }
      this.setState({
        projectResEdited: projectResTemp,
        projectNameEdited: projectTemp,
        projectDurationEdited: projectTemp,
        projectPositionEdited: projectTemp,
        projectDescriptionEdited: projectTemp,
        projectTechnologyEdited: projectTemp,
        experience:
          nextProps.profile[this.props.version.currentVersions].experience
      });
    }
  }
  experienceEditing(index, field, resIndex) {
    if (typeof resIndex === "number") {
      let temp = { ...this.state.projectResEdited };
      temp[index][resIndex] = !temp[index][resIndex];
      this.setState({ projectResEdited: temp });
    } else {
      console.log(field);
      let temp = [...this.state[field]];
      temp[index] = !temp[index];
      let newstate = {};
      newstate[field] = temp;
      this.setState(newstate);
    }
  }

  updateFieldData(e, field, fieldName, index, resIndex) {
    let value = { ...this.props.profile };
    let key = this.props.profile._id;
    if (e.key === "Enter") {
      if (typeof resIndex === "number") {
        value[this.props.version.currentVersions].experience[
          index
        ].responsibility[resIndex] =
          e.target.value;
        let temp = { ...this.state.projectResEdited };
        temp[index][resIndex] = !temp[index][resIndex];
        this.setState({ projectResEdited: temp });
      } else {
        value[this.props.version.currentVersions].experience[index][fieldName] =
          e.target.value;
        let temp = { ...this.state[field] };
        temp[index] = !temp[index];
        this.setState({ field: temp });
      }
      POSTAPI(
        "http://localhost:3001/api/updateexperience",
        value.experience,
        key
      );
      this.props.profileUpdate(value);
    }
  }

  experienceDeleting(index, resIndex) {
    let value = { ...this.props.profile };
    let key = this.props.profile._id;
    if (typeof resIndex === "number") {
      if (window.confirm("Do you really want to delete this ?!?!")) {
        value[this.props.version.currentVersions].experience[
          index
        ].responsibility.splice(resIndex, 1);
      }
    } else {
      if (window.confirm("Do you really want to delete this ?!?!")) {
        value[this.props.version.currentVersions].experience.splice(index, 1);
      }
    }
    POSTAPI(
      "http://localhost:3001/api/updateexperience",
      value.experience,
      key
    );
    this.props.profileUpdate(value);
  }

  experienceAdding(resIndex) {
    let defaultName = "";
    if (typeof resIndex === "number") {
      let value = { ...this.props.profile };
      let key = this.props.profile._id;
      value[this.props.version.currentVersions].experience[
        resIndex
      ].responsibility.push(defaultName);
      POSTAPI(
        "http://localhost:3001/api/updateexperience",
        value.experience,
        key
      );
      this.props.profileUpdate(value);
      toast.success("Adding Responsibility Success!!!!", {
        autoClose: 2000
      });
    } else {
      let tempExp = {};
      let tempExpRes = [];
      tempExp.position = defaultName;
      tempExp.companyName = defaultName;
      tempExp.projectName = defaultName;
      tempExp.projectDescription = defaultName;
      tempExp.technicalSkills = defaultName;
      tempExp.time = defaultName;
      tempExp.responsibility = [defaultName, defaultName];
      let value = { ...this.props.profile };
      let key = this.props.profile._id;
      value[this.props.version.currentVersions].experience.push(tempExp);
      POSTAPI(
        "http://localhost:3001/api/updateexperience",
        value.experience,
        key
      );
      this.props.profileUpdate(value);

      toast.success("Adding Experience Success!!!!", {
        autoClose: 2000
      });
    }
  }
  handleChange(e, exp, field, fieldName, index, resIndex) {
    if (fieldName === "responsibility") {
      let temp = [...this.state.experience[index][fieldName]];
      temp[resIndex] = e.target.value;
      let expTemp = [...this.state.experience];
      expTemp[index][resIndex] = temp[resIndex];
      console.log(expTemp);
      this.setState({
        experience: expTemp
      });
    } else {
      let temp = [...this.state.experience];
      temp[index][fieldName] = e.target.value;
      this.setState({
        experience: temp
      });
    }
  }

  renderProperExperienceInput(exp, field, fieldName, index) {
    return this.state[field][index] ? (
      <td>
        <input
          className="inputChange form-control"
          type="text"
          onKeyDown={e => this.updateFieldData(e, field, fieldName, index)}
          value={this.state.experience[index][fieldName]}
          onChange={e => this.handleChange(e, exp, field, fieldName, index)}
        />
      </td>
    ) : (
      <td scope="col">
        {exp[fieldName]}
        <img
          onClick={() => this.experienceEditing(index, field)}
          className="iconEdit"
          src={pencil}
        />
      </td>
    );
  }

  renderExperienceContainer() {
    return (
      <div>
        <ToastContainer transition={Slide} newestOnTop />
        <div className=" maincontent">
          <div className="maincontent__header">
            Experience
            <img
              onClick={() => this.experienceAdding()}
              className="iconEdit"
              src={plus}
            />
          </div>
        </div>

        {this.props.profile[this.props.version.currentVersions].experience.map(
          (exp, index) => {
            return (
              <div className="maintable" key={"experience" + index}>
                <table>
                  <thead>
                    <tr className="table-custom">
                      <th scope="col">Project</th>
                      {this.renderProperExperienceInput(
                        exp,
                        "projectNameEdited",
                        "projectName",
                        index
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td scope="col">Time</td>
                      {this.renderProperExperienceInput(
                        exp,
                        "projectDurationEdited",
                        "time",
                        index
                      )}
                    </tr>
                    <tr>
                      <td scope="col">Position</td>
                      {this.renderProperExperienceInput(
                        exp,
                        "projectPositionEdited",
                        "position",
                        index
                      )}
                    </tr>
                    <tr>
                      <td scope="col">Description</td>

                      {this.renderProperExperienceInput(
                        exp,
                        "projectDescriptionEdited",
                        "projectDescription",
                        index
                      )}
                    </tr>

                    <tr>
                      <td scope="col">
                        My Responsibility
                        <img
                          onClick={() => this.experienceAdding(index)}
                          className="iconEdit"
                          src={plus}
                        />
                      </td>
                      <td scope="col">
                        <ul>
                          {this.props.profile[
                            this.props.version.currentVersions
                          ].experience[index].responsibility.map(
                            (res, resIndex) => {
                              return (
                                <li
                                  key={
                                    exp.toString() +
                                    index.toString() +
                                    resIndex.toString()
                                  }
                                >
                                  {this.state.projectResEdited[index][
                                    resIndex
                                  ] ? (
                                    <input
                                      className="inputChange form-control"
                                      type="text"
                                      onKeyDown={e =>
                                        this.updateFieldData(
                                          e,
                                          "projectResEdited",
                                          "responsibility",
                                          index,
                                          resIndex
                                        )
                                      }
                                      value={
                                        this.state.experience[index][
                                          "responsibility"
                                        ]
                                      }
                                      onChange={e => {
                                        this.handleChange(
                                          e,
                                          exp,
                                          "projectResEdited",
                                          "responsibility",
                                          index,
                                          resIndex
                                        );
                                      }}
                                    />
                                  ) : (
                                    <div scope="col">
                                      {exp.responsibility[resIndex]}
                                      <img
                                        onClick={() =>
                                          this.experienceEditing(
                                            index,
                                            "res",
                                            resIndex
                                          )
                                        }
                                        className="iconEdit"
                                        src={pencil}
                                      />
                                      <img
                                        onClick={() =>
                                          this.experienceDeleting(
                                            index,
                                            resIndex
                                          )
                                        }
                                        className="iconEdit"
                                        src={deleteImage}
                                      />
                                    </div>
                                  )}
                                </li>
                              );
                            }
                          )}
                        </ul>
                      </td>
                    </tr>
                    <tr>
                      <td scope="col">Technology</td>
                      {this.renderProperExperienceInput(
                        exp,
                        "projectTechnologyEdited",
                        "technicalSkills",
                        index
                      )}
                    </tr>
                  </tbody>
                </table>
              </div>
            );
          }
        )}
      </div>
    );
  }

  render() {
    if (this.props.isProfileError) {
      return <Error />;
    } else if (!this.props.isProfileLoaded) {
      return <Loading />;
    } else {
      return this.renderExperienceContainer();
    }
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
)(Experience);
