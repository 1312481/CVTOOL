import React, { Component, PropTypes } from 'react';
import '../assets/styles/generalInformation.css'
import profile from '../assets/images/sang.jpg'
import Error from './error'
import Loading from './loading'
import pencil from '../assets/images/pencil.svg'
import { connect } from 'react-redux'
import * as actions from '../actions/profile'
import { nameEditing } from '../reducers/profile';
import POSTAPI from './postAPI'


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
      skillEdited: false,
      name: "",
      currentPosition: "",
      phoneNumber: "",
      address: "",
      email: "",
      facebook: "",
      linkedin: "",
      github: "",
      portfolio: "",
      personalStatement: "",
      englishLevel: "",
      skill: ""
    }
  }
  nameEditing(field) {
    let temp = { ...this.state };
    temp[field] = !temp[field];
    this.setState({ field: this.props.profile[this.props.version.currentVersions].personalInfo[field] })
    this.setState(temp);
  }

  handleKeyNamePress(e, field, fieldName) {

    if (e.key === 'Enter') {
      let value = { ...this.props.profile[this.props.version.currentVersions] };
      var user = sessionStorage.getItem("user");
      value.personalInfo[fieldName] = e.target.value;
      let tempState = { ...this.state };
      tempState[field] = !tempState[field];
      this.setState(tempState);
      POSTAPI('http://localhost:3001/api/updategeneralinfomation', value.personalInfo, user, this.props.version.currentVersions);
      this.props.profileUpdate(value, this.props.version.currentVersions);
    }
  }

  checkTextarea(fieldName) {
    if (fieldName === 'personalStatement' || fieldName === 'skill') {
      return true
    }
    else return false;
  }
  checkSkillSummary(fieldName) {
    if (fieldName === 'englishLevel' || fieldName === 'skill') {
      return true;
    }

    else {
      return false
    };
  }
  handleChange(e, fieldName) {
    console.log(fieldName);
    this.setState({
      [fieldName]: e.target.value
    })
  }

  renderProperInputHeader(field, fieldName) {
    return (
      <div>
        {

          this.state[field] ?
            (

              (<input className="inputChange form-control" type="text"
                value={this.state[fieldName]}
                onChange={(e) => this.handleChange(e, fieldName)}
                onKeyDown={(e) => this.handleKeyNamePress(e, field, fieldName)}
              />)
            )
            :
            (
              <div >
                {this.props.profile[this.props.version.currentVersions].personalInfo[fieldName]}
                <img onClick={() => this.nameEditing(field)} className="iconEdit" src={pencil} />
              </div>
            )

        }
      </div>
    )
  }
  renderProperInputPersonalInformation(field, fieldName) {

    return (
      <div className="information__container__content">
        {
          this.state[field] ?
            (
              this.checkTextarea(fieldName) ?
                (<textarea className="inputChange form-control" type="text"
                  onKeyDown={(e) => this.handleKeyNamePress(e, field, fieldName)}
                  value={this.state[fieldName]}
                  onChange={(e) => this.handleChange(e, fieldName)}
                />)
                :
                (<input className="inputChange form-control" type="text"
                  onKeyDown={(e) => this.handleKeyNamePress(e, field, fieldName)}
                  value={this.state[fieldName]}
                  onChange={(e) => this.handleChange(e, fieldName)}
                />)
            )
            :
            (
              (<div className="information__container__content" >
                {this.props.profile[this.props.version.currentVersions].personalInfo[fieldName]}
                <img onClick={() => this.nameEditing(field)} className="iconEdit" src={pencil} />
              </div>)
            )

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
            <div className="card-body content__cardcustom__body">
              <div className="content__cardcustom__cardContent">
                {this.renderProperInputHeader('nameEdited', 'name')}
                {this.renderProperInputHeader('positionEdited', 'currentPosition')}
              </div>
            </div>
            <img className="card-img-top" src={profile} />
          </div>

          <div className="col-7 offset-1">
            <div className="row">
              <div className="card col-6 card-custom" id="personalInfo">
                <h4 className="card-title information__header">Personal Information</h4>
                <div className="card-text">

                  <div>Phone Number:  {this.renderProperInputPersonalInformation('phoneEdited', 'phoneNumber')}</div>
                  <div>Address:  {this.renderProperInputPersonalInformation('addressEdited', 'address')}</div>
                  <div>Email:  {this.renderProperInputPersonalInformation('emailEdited', 'email')}</div>
                  <div>Facebook:  {this.renderProperInputPersonalInformation('facebookEdited', 'facebook')}</div>
                  <div>Linkedin:  {this.renderProperInputPersonalInformation('linkedinEdited', 'linkedin')}</div>
                  <div>Github:  {this.renderProperInputPersonalInformation('githubEdited', 'github')}</div>
                  <div>Portfolio:  {this.renderProperInputPersonalInformation('portfolioEdited', 'portfolio')}</div>

                </div>
              </div>

              <div className="card col-6 card-custom">
                <h4 className="card-title information__header">Personal Statement</h4>
                <div className="card-text">
                  {this.renderProperInputPersonalInformation('personalStatementEdited', 'personalStatement')}
                </div>
              </div>
            </div>
            <div className="row skill">
              <div className="card col-12 card-custom">
                <h4 className="card-title information__header">Skill Summary</h4>
                <div>
                  English level: {this.renderProperInputPersonalInformation('englishLevelEdited', 'englishLevel')}
                </div>
                <div>
                  Summary: {this.renderProperInputPersonalInformation('skillEdited', 'skill')}
                </div>
              </div>
            </div>
          </div>
        </div >
      </div>
    );

  }
  componentDidMount() {

    let link = 'http://localhost:3001/api/';
    var user = sessionStorage.getItem("user");
    let url = link + `${user}`;
    this.props.fetchData(url);

  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.profile !== this.props.profile) {
      this.setState({ 
        name: nextProps.profile[this.props.version.currentVersions].personalInfo.name,
        currentPosition: nextProps.profile[this.props.version.currentVersions].personalInfo.currentPosition,
        phoneNumber: nextProps.profile[this.props.version.currentVersions].personalInfo.phoneNumber,
        address: nextProps.profile[this.props.version.currentVersions].personalInfo.address,
        email: nextProps.profile[this.props.version.currentVersions].personalInfo.email,
        facebook: nextProps.profile[this.props.version.currentVersions].personalInfo.facebook,
        linkedin: nextProps.profile[this.props.version.currentVersions].personalInfo.linkedin,
        github: nextProps.profile[this.props.version.currentVersions].personalInfo.github,
        portfolio: nextProps.profile[this.props.version.currentVersions].personalInfo.portfolio,
        personalStatement: nextProps.profile[this.props.version.currentVersions].personalInfo.personalStatement,
        englishLevel: nextProps.profile[this.props.version.currentVersions].personalInfo.englishLevel,
        skill: nextProps.profile[this.props.version.currentVersions].personalInfo.skill
       })
    }
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
    version: state.version,
    isProfileError: state.isProfileError,
    isProfileLoaded: state.isProfileLoaded,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: (url) => dispatch(actions.fetchProfileData(url)),
    profileUpdate: (profile, version) => dispatch(actions.updateProfileData(profile, version))
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(GeneralInformation);
