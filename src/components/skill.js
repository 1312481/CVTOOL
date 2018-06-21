import React, { Component, PropTypes } from 'react';
import pencil from '../assets/images/pencil.svg'
import deleteImage from '../assets/images/delete.svg'
import { connect } from 'react-redux'
import Error from './error'
import Loading from './loading'
import * as actions from '../actions/profile'
import '../assets/styles/education.css'
import configureStore from '../store/configureStore';
import plus from "../assets/images/plus.svg";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Slide, Zoom, Flip, Bounce } from 'react-toastify';

class Skill extends Component {
  constructor(props) {
    super(props);
    this.state = {
      skillNameEdited: [],
      skillDetailEdited: []
    }
  }
  nameSkillEditing(index, field) {
    let temp = [...this.state[field]];
    temp[index] = !temp[index];
    let newstate = {};
    newstate[field] = temp;
    this.setState(newstate);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.profile !== this.props.profile) {
      const length = nextProps.profile.technicalSkill.length;
      let projectResTemp = [];
      for (let i = 0; i <= length; i++) {
        let temp = false;
        projectResTemp.push(temp);
      }
      this.setState({ skillNameEdited: projectResTemp });
      this.setState({ skillDetailEdited: projectResTemp });
    }



  }
  updateFieldData(e, field, fieldName, index) {
    if (e.key === "Enter") {
      let value = { ...this.props.profile };
      let key = this.props.profile._id;
      value.technicalSkill[index][fieldName] = e.target.value;
      let temp = [...this.state[field]];
      temp[index] = !temp[index];
      let newstate = {};
      newstate[field] = temp;
      this.setState(newstate);
      this.props.profileUpdate(value);
      fetch('http://localhost:3001/api/updatetechnicalskill', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          profile: value.technicalSkill,
          key: key
        })
      })
    }


  }
  skillDeleting(index) {
    if (window.confirm("Do you really want to delete this ?!?!")) {
      let value = { ...this.props.profile };
      let key = this.props.profile._id;
      value.technicalSkill.splice(index, 1);
      this.props.profileUpdate(value);
      this.forceUpdate();
      fetch('http://localhost:3001/api/updatetechnicalskill', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          profile: value.technicalSkill,
          key: key
        })
      })
    }
  }
  skillAdding() {
    let tempSkill = {};
    tempSkill.name = 'Default';
    tempSkill.detail = 'Default';

    let value = { ...this.props.profile };
    let key = this.props.profile._id;
    value.technicalSkill.push(tempSkill);
    this.props.profileUpdate(value);
    toast.success('Adding Technical Skills Success!!!!', {
      autoClose: 2000
    });
    fetch('http://localhost:3001/api/updatetechnicalskill', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        profile: value.technicalSkill,
        key: key
      })
    })
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
              {this.props.profile.technicalSkill[index][fieldName]}

              <img
                onClick={() => this.nameSkillEditing(index, field)}
                className="iconEdit"
                src={pencil}
              />

              <img
                onClick={() => this.skillDeleting(index)}
                className="iconEdit"
                src={deleteImage}
              />
            </span>
          )}
      </td>
    )
  }

  renderSkillContainer() {
    return (
      <div>
        <ToastContainer
          transition={Slide}
          newestOnTop
        />
        <div className=" maincontent">
          <div className="maincontent__header">Technical Skill

          </div>
        </div>
        <div className="maintable">
          <table>
            <thead>
              <tr className="table-custom">
                <th scope="col">Skill
                <img
                    onClick={() => this.skillAdding()}
                    className="iconEdit"
                    src={plus}
                  />
                </th>
                <th scope="col">Detail</th>
              </tr>
            </thead>
            <tbody>
              {this.props.profile.technicalSkill.map((tech, index) => {
                return (

                  <tr key={tech.name.toString() + index.toString()}>
                    {this.renderProperInput("skillNameEdited", "name", index)}
                    {this.renderProperInput("skillDetailEdited", "detail", index)}

                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>)
  }



  render() {
    if (this.props.isProfileError) {

      return <Error />
    }
    else if (!this.props.isProfileLoaded) {

      return <Loading />
    }
    else return this.renderSkillContainer();









  }
}




const mapStateToProps = (state) => {
  return {
    profile: state.profile,
    isProfileError: state.isProfileError,
    isProfileLoaded: state.isProfileLoaded,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    profileUpdate: (profile) => dispatch(actions.updateProfileData(profile))
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(Skill);
