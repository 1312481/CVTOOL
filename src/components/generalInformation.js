import React, { Component, PropTypes } from 'react';
import '../assets/styles/generalInformation.css'
import profile from '../assets/images/sang.jpg'
import Error from './error'
import Loading from './loading'
import pencil from '../assets/images/pencil.svg'
import { connect } from 'react-redux'
import * as actions from '../actions/profile'
import { nameEditing } from '../reducers/profile';

// const API = 'https://api.myjson.com/bins/eoigu'

class GeneralInformation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nameEdited: false,
      positionEdited: false,
      phoneEdited: false,
      addressEdited: false,
      emailEdited: false,
      facebookEdited: false,
      linkedinEdited: false,
      githubEdited: false,
      portfolioEdited: false,
      personalStatementEdited: false,
      englishLevelEdited: false,
      skillEdited: false
    }
  }
  nameEditing(field) {
    let temp = { ...this.state };
    temp[field] = !temp[field];
    this.setState(temp);
  }

  handleKeyNamePress(e, field, fieldName) {

    if (e.key === 'Enter') {
      let tempProfile = { ...this.props.profile };
      tempProfile.personalInfo[fieldName] = e.target.value;
      let tempState = { ...this.state };
      tempState[field] = !tempState[field];
      this.setState(tempState);
      this.props.profileUpdate(tempProfile);
    }
  }

  checkHeaderType(fieldName) {
    if (fieldName === 'name' || fieldName === 'currentPosition') {
      return true
    }
    else return false
  }
  checkTextarea(fieldName) {
    if (fieldName === 'personalStatement' || fieldName === 'skill') {
      return true
    }
    else return false;
  }
  checkSkillSummary(field, fieldName) {
    if (fieldName === 'englishLevel' || fieldName === 'skill') {
      return (
        <div>
          {this.props.profile.skillSummary[fieldName]}
          <img onClick={() => this.nameEditing(field)} className="iconEdit" src={pencil} />
        </div>
      )
    }

    else return (
      <div>
        {this.props.profile.personalInfo[fieldName]}
        <img onClick={() => this.nameEditing(field)} className="iconEdit" src={pencil} />
      </div>
    );
  }

  renderProperInput(field, fieldName) {
    return (
      <div >
        {
          this.state[field] ?
            (
              this.checkTextarea(fieldName) ?
                (<textarea className="inputChange form-control" type="text" onKeyDown={(e) => this.handleKeyNamePress(e, field, fieldName)} placeholder="Moi ban nhap ten" />)
                :
                (<input className="inputChange form-control" type="text" onKeyDown={(e) => this.handleKeyNamePress(e, field, fieldName)} placeholder="Moi ban nhap ten" />)
            )
            :
            (<div className={this.checkHeaderType(fieldName) ? ("card-title card-title-custom") : ("card-title")}>

              {this.checkSkillSummary(field, fieldName)}


            </div>)
        }
      </div>
    )
  }

  renderGeneralInformationContainer() {


    return (

      <div >
        <div className="maincontent">
          <div className="maincontent__header">CURRICULUM VITAE</div>
        </div>
        <div className="row content">
          <div className="card content__cardcustom col-4">
            <div className="card-body card-body-custom abc">
              <div className="content__cardContent">
                {this.renderProperInput('nameEdited', 'name')}
                {this.renderProperInput('positionEdited', 'currentPosition')}
              </div>
            </div>
            <img className="card-img-top" src={profile} />
          </div>

          <div className="col-7 offset-1">
            <div className="row">
              <div className="card col-6 card-custom" id="personalInfo">
                <h4 className="card-title information__header">Personal Information</h4>
                <div className="card-text">

                  <div class="personalInfo">Phone Number: </div>{this.renderProperInput('phoneEdited', 'phoneNumber')}
                  Address: {this.renderProperInput('addressEdited', 'address')}
                  Email: {this.renderProperInput('emailEdited', 'email')}
                  Facebook: {this.renderProperInput('facebookEdited', 'facebook')}
                  Linkedin: {this.renderProperInput('linkedinEdited', 'linkedin')}
                  Github: {this.renderProperInput('githubEdited', 'github')}
                  Portfolio: {this.renderProperInput('portfolioEdited', 'portfolio')}
                </div>
              </div>

              <div className="card col-6 card-custom">
                <h4 className="card-title information__header">Personal Statement</h4>
                <div className="card-text">
                  {this.renderProperInput('personalStatementEdited', 'personalStatement')}
                </div>
              </div>
            </div>
            <div className="row skill">
              <div className="card col-12 card-custom">
                <h4 className="card-title information__header">Skill Summary</h4>
                <div>
                  {this.renderProperInput('englishLevelEdited', 'englishLevel')}
                </div>
                <div>
                  {this.renderProperInput('skillEdited', 'skill')}
                </div>
              </div>
            </div>
          </div>
        </div >
      </div>
    );

  }
  componentDidMount() {
    this.props.fetchData('https://api.myjson.com/bins/on16i');

  }

  render() {

    if (this.props.isProfileError) {

      return <Error />
    }
    else if (!this.props.isProfileLoaded) {

      return <Loading />
    }

    else {
      return this.renderGeneralInformationContainer();
    }
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
    fetchData: (url) => dispatch(actions.fetchProfileData(url)),
    profileUpdate: (profile) => dispatch(actions.updateProfileData(profile))
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(GeneralInformation);
