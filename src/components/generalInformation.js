import React, { Component, PropTypes } from 'react';
import '../assets/styles/generalInformation.css'
import profile from '../assets/images/sang.jpg'
import Error from './error'
import Loading from './loading'
import pencil from '../assets/images/pencil.svg'
import { connect } from 'react-redux'
import * as actions from '../actions/profile'
import { nameEditing } from '../reducers/profile';



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
      let key = this.props.profile._id;
      tempProfile.personalInfo[fieldName] = e.target.value;
      let tempState = { ...this.state };
      tempState[field] = !tempState[field];
      this.setState(tempState);
      this.props.profileUpdate(tempProfile);

      fetch('http://localhost:3001/api/updategeneralinfomation', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          profile: tempProfile.personalInfo,
          key: key
        })
      })
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

  renderProperInputHeader(field, fieldName){
    return(
      <div>
         {
          this.state[field] ?
            (
              (<input className="inputChange form-control" type="text" onKeyDown={(e) => this.handleKeyNamePress(e, field, fieldName)} placeholder={this.props.profile.personalInfo[fieldName]} />)
            )
            :
            (
              <div >
                {this.props.profile.personalInfo[fieldName]}
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
                placeholder={this.props.profile.personalInfo[fieldName] || this.props.profile.personalInfo[fieldName]} />)
                :
                (<input className="inputChange form-control" type="text" 
                onKeyDown={(e) => this.handleKeyNamePress(e, field, fieldName)} 
                placeholder={this.props.profile.personalInfo[fieldName] || this.props.profile.personalInfo[fieldName]} />)
            )
            :
            (
            this.checkSkillSummary(fieldName) ?
            (<div className="information__container__content">
                {this.props.profile.personalInfo[fieldName]}
                <img onClick={() => this.nameEditing(field)} className="iconEdit" src={pencil} />
            </div>) :
              (<div className="information__container__content" >
                {this.props.profile.personalInfo[fieldName]}
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
    this.props.fetchData('http://localhost:3001/api');

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
