import React, { Component, PropTypes } from 'react';
import '../assets/styles/generalInformation.css'
import profile from '../assets/images/sang.jpg'

import pencil from '../assets/images/pencil.svg'
import { connect } from 'react-redux'
import { profileFetchData } from '../actions/profile'
import { nameEditing } from '../reducers/profile';
import { profileUpdateData } from '../actions/profile'

// const API = 'https://api.myjson.com/bins/eoigu'


class GeneralInformation extends Component {
  constructor(props) {
    super(props);


    this.nameEditing = this.nameEditing.bind(this);
    this.handleKeyNamePress = this.handleKeyNamePress.bind(this);
    this.positionEditing = this.positionEditing.bind(this);
    this.handleKeyPositionPress = this.handleKeyPositionPress.bind(this);
    this.phoneEditing = this.phoneEditing.bind(this);
    this.handleKeyPhonePress = this.handleKeyPhonePress.bind(this);

    this.addressEditing = this.addressEditing.bind(this);
    this.handleKeyAddressPress = this.handleKeyAddressPress.bind(this);

    this.emailEditing = this.emailEditing.bind(this);
    this.handleKeyEmailPress = this.handleKeyEmailPress.bind(this);
    this.facebookEditing = this.facebookEditing.bind(this);
    this.handleKeyFacebookPress = this.handleKeyFacebookPress.bind(this);
    this.linkedinEditing = this.linkedinEditing.bind(this);
    this.handleKeyLinkedinPress = this.handleKeyLinkedinPress.bind(this);
    this.githubEditing = this.githubEditing.bind(this);
    this.handleKeyGithubPress = this.handleKeyGithubPress.bind(this);
    this.portfolioEditing = this.portfolioEditing.bind(this);
    this.handleKeyPortfolioPress = this.handleKeyPortfolioPress.bind(this);

    this.personalStatementEditing = this.personalStatementEditing.bind(this);
    this.handleKeyPersonalStatementPress = this.handleKeyPersonalStatementPress.bind(this);

    this.englishLevelEditing = this.englishLevelEditing.bind(this);
    this.handleKeyEnglishLevelPress = this.handleKeyEnglishLevelPress.bind(this);

    this.skillEditing = this.skillEditing.bind(this);
    this.handleKeySkillPress = this.handleKeySkillPress.bind(this);

    this.state = {
      nameEdited: false,
      positionEdited: false,
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
  nameEditing() {

    this.setState({ nameEdited: !this.state.nameEdited });

  }
  handleKeyNamePress(e) {

    if (e.key === 'Enter') {

      let temp = { ...this.props.profile };
      temp.personalInfo.name = e.target.value;

      this.setState({ nameEdited: !this.state.nameEdited });
      this.props.profileUpdate(temp);
    }
  }
  positionEditing() {
    this.setState({ positionEdited: !this.state.positionEdited });
  }
  handleKeyPositionPress(e) {

    if (e.key === 'Enter') {
      let temp = { ...this.props.profile };
      temp.personalInfo.currentPosition = e.target.value;

      this.setState({ positionEdited: !this.state.positionEdited });
      this.props.profileUpdate(temp);
    }
  }


  phoneEditing() {
    this.setState({ phoneEdited: !this.state.phoneEdited });
  }
  handleKeyPhonePress(e) {

    if (e.key === 'Enter') {
      let temp = { ...this.props.profile };
      temp.personalInfo.phoneNumber = e.target.value;
      this.setState({ phoneEdited: !this.state.phoneEdited });
      this.props.profileUpdate(temp);
    }
  }

  addressEditing() {
    this.setState({ addressEdited: !this.state.addressEdited });
  }
  handleKeyAddressPress(e) {

    if (e.key === 'Enter') {
      let temp = { ...this.props.profile };
      temp.personalInfo.address = e.target.value;
      this.setState({ addressEdited: !this.state.addressEdited });
      this.props.profileUpdate(temp);
    }
  }

  emailEditing() {
    this.setState({ emailEdited: !this.state.emailEdited });
  }
  handleKeyEmailPress(e) {

    if (e.key === 'Enter') {
      let temp = { ...this.props.profile };
      temp.personalInfo.email = e.target.value;
      this.setState({ emailEdited: !this.state.emailEdited });
      this.props.profileUpdate(temp);
    }
  }

  facebookEditing() {
    this.setState({ facebookEdited: !this.state.facebookEdited });
  }
  handleKeyFacebookPress(e) {

    if (e.key === 'Enter') {
      let temp = { ...this.props.profile };
      temp.personalInfo.facebook = e.target.value;
      this.setState({ facebookEdited: !this.state.facebookEdited });
      this.props.profileUpdate(temp);
    }
  }

  linkedinEditing() {
    this.setState({ linkedinEdited: !this.state.linkedinEdited });
  }
  handleKeyLinkedinPress(e) {

    if (e.key === 'Enter') {
      let temp = { ...this.props.profile };
      temp.personalInfo.linkedin = e.target.value;
      this.setState({ linkedinEdited: !this.state.linkedinEdited });
      this.props.profileUpdate(temp);
    }
  }


  githubEditing() {
    this.setState({ githubEdited: !this.state.githubEdited });
  }
  handleKeyGithubPress(e) {

    if (e.key === 'Enter') {
      let temp = { ...this.props.profile };
      temp.personalInfo.github = e.target.value;
      this.setState({ githubEdited: !this.state.githubEdited });
      this.props.profileUpdate(temp);
    }
  }


  portfolioEditing() {
    this.setState({ portfolioEdited: !this.state.portfolioEdited });
  }
  handleKeyPortfolioPress(e) {

    if (e.key === 'Enter') {
      let temp = { ...this.props.profile };
      temp.personalInfo.portfolio = e.target.value;
      this.setState({ portfolioEdited: !this.state.portfolioEdited });
      this.props.profileUpdate(temp);
    }
  }

  personalStatementEditing() {
    this.setState({ personalStatementEdited: !this.state.personalStatementEdited });
  }
  handleKeyPersonalStatementPress(e) {

    if (e.key === 'Enter') {
      let temp = { ...this.props.profile };
      temp.personalInfo.personalStatement = e.target.value;
      this.setState({ personalStatementEdited: !this.state.personalStatementEdited });
      this.props.profileUpdate(temp);
    }
  }

  englishLevelEditing() {
    this.setState({ englishLevelEdited: !this.state.englishLevelEdited });
  }
  handleKeyEnglishLevelPress(e) {

    if (e.key === 'Enter') {
      let info = { ...this.props.profile };
      info.skillSummary.englishLevel = e.target.value;
      this.setState({ englishLevelEdited: !this.state.englishLevelEdited });
      this.props.profileUpdate(info);
    }
  }

  skillEditing() {
    this.setState({ skillEdited: !this.state.skillEdited });
  }
  handleKeySkillPress(e) {

    if (e.key === 'Enter') {
      let info = { ...this.props.profile };
      info.skillSummary.skill = e.target.value;
      this.setState({ skillEdited: !this.state.skillEdited });
      this.props.profileUpdate(info);
    }
  }




  componentDidMount() {
    this.props.fetchData('https://api.myjson.com/bins/bp2hm');

  }

  render() {

    if (this.props.hasErrored) {

      return <div>Sorry! There was an error</div>;
    }
    else if (!this.props.isLoaded) {

      return <div>Loading...</div>;
    }

    else {
      console.log("reloading");
      return (

        <div >
          <div className="maincontent">
            <div className="maincontent__header">CURRICULUM VITAE</div>
          </div>
          <div className="row content">
            <div className="card cardcustom col-4">
              <div className="card-body card-body-custom">



                {this.state.nameEdited ?
                  (<input type="text" onKeyDown={this.handleKeyNamePress} placeholder="Moi ban nhap ten" />) :


                  (<div className="card-title card-title-custom">

                    {this.props.profile.personalInfo.name}

                    <img onClick={this.nameEditing} className="iconEdit" src={pencil} />
                  </div>)
                }
                {this.state.positionEdited ?
                  (<input type="text" onKeyDown={this.handleKeyPositionPress} placeholder="Moi ban nhap vi tri" />) :


                  (<div className="card-title card-title-custom">
                    {this.props.profile.personalInfo.currentPosition}


                    <img onClick={this.positionEditing} className="iconEdit" src={pencil} />
                  </div>)
                }


              </div>
              <img className="card-img-top" src={profile} />
            </div>

            <div className="col-7 offset-1">
              <div className="row">
                <div className="card col-6 ">
                  <h4 className="card-title information__header">Personal Information</h4>
                  <div className="card-text">
                    {this.state.phoneEdited ?
                      (<input type="text" onKeyDown={this.handleKeyPhonePress} placeholder="Moi ban nhap so dien thoai" />) :


                      (<div >

                        Phone: {this.props.profile.personalInfo.phoneNumber}

                        <img onClick={this.phoneEditing} className="iconEdit" src={pencil} />
                      </div>)
                    }
                    {this.state.addressEdited ?
                      (<input type="text" onKeyDown={this.handleKeyAddressPress} placeholder="Moi ban nhap dia chi" />) :


                      (<div >

                        Address: {this.props.profile.personalInfo.address}

                        <img onClick={this.addressEditing} className="iconEdit" src={pencil} />
                      </div>)
                    }

                    {this.state.emailEdited ?
                      (<input type="text" onKeyDown={this.handleKeyEmailPress} placeholder="Moi ban nhap email" />) :


                      (<div >

                        Email: {this.props.profile.personalInfo.email}

                        <img onClick={this.emailEditing} className="iconEdit" src={pencil} />
                      </div>)
                    }

                    {this.state.facebookEdited ?
                      (<input type="text" onKeyDown={this.handleKeyFacebookPress} placeholder="Moi ban nhap facebook" />) :


                      (<div >

                        Facebook: {this.props.profile.personalInfo.facebook}

                        <img onClick={this.facebookEditing} className="iconEdit" src={pencil} />
                      </div>)
                    }


                    {this.state.linkedinEdited ?
                      (<input type="text" onKeyDown={this.handleKeyLinkedinPress} placeholder="Moi ban nhap linkedin" />) :


                      (<div >

                        Linkedin: {this.props.profile.personalInfo.linkedin}

                        <img onClick={this.linkedinEditing} className="iconEdit" src={pencil} />
                      </div>)
                    }


                    {this.state.githubEdited ?
                      (<input type="text" onKeyDown={this.handleKeyGithubPress} placeholder="Moi ban nhap Github" />) :


                      (<div >

                        Github: {this.props.profile.personalInfo.github}

                        <img onClick={this.githubEditing} className="iconEdit" src={pencil} />
                      </div>)
                    }


                    {this.state.portfolioEdited ?
                      (<input type="text" onKeyDown={this.handleKeyPortfolioPress} placeholder="Moi ban nhap Portfolio" />) :


                      (<div >

                        Portfolio: {this.props.profile.personalInfo.portfolio}

                        <img onClick={this.portfolioEditing} className="iconEdit" src={pencil} />
                      </div>)
                    }
                  </div>
                </div>

                <div className="card col-6">
                  <h4 className="card-title information__header">Personal Statement</h4>
                  <div className="card-text">

                    {this.state.personalStatementEdited ?
                      (<textarea type="text" className="textAreaCustom" onKeyDown={this.handleKeyPersonalStatementPress} placeholder="Moi ban nhap Personal Statement" />) :


                      (<div >

                        {this.props.profile.personalInfo.personalStatement}

                        <img onClick={this.personalStatementEditing} className="iconEdit" src={pencil} />
                      </div>)
                    }

                  </div>
                </div>


              </div>
              <div className="row skill">
                <div className="card col-12">
                  <h4 className="card-title information__header">Skill Summary</h4>
                  <div>
                    {this.state.englishLevelEdited ?
                      (<input type="text" onKeyDown={this.handleKeyEnglishLevelPress} placeholder="Moi ban nhap English Level" />) :


                      (<div >

                        English level: {this.props.profile.skillSummary.englishLevel}

                        <img onClick={this.englishLevelEditing} className="iconEdit" src={pencil} />
                      </div>)
                    }



                  </div>
                  <div>{this.state.skillEdited ?
                    (<textarea className="textAreaCustom" type="text" onKeyDown={this.handleKeySkillPress} placeholder="Moi ban nhap Skill" />) :


                    (<div >

                      {this.props.profile.skillSummary.skill}

                      <img onClick={this.skillEditing} className="iconEdit" src={pencil} />
                    </div>)
                  }</div>
                </div>
              </div>
            </div>
          </div >
        </div>



      );
    }
  }
}



const mapStateToProps = (state) => {
  return {
    profile: state.profile,
    hasErrored: state.profileHasErrored,
    isLoaded: state.profileIsLoaded,


  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: (url) => dispatch(profileFetchData(url)),
    profileUpdate: (profile) => dispatch(profileUpdateData(profile))
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(GeneralInformation);
