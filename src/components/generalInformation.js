import React, { Component } from 'react';
import '../assets/styles/generalInformation.css'
import profile from '../assets/images/sang.jpg'

import pencil from '../assets/images/pencil.svg'


const API = 'https://api.myjson.com/bins/eoigu'


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
      error: null,
      isLoaded: false,
      info: {

      },
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
    };
  }
  nameEditing() {
    this.setState({ nameEdited: !this.state.nameEdited });
  }
  handleKeyNamePress(e) {

    if (e.key === 'Enter') {
      let temp = { ...this.state.info };
      temp.personalInfo.name = e.target.value;
      this.setState({ temp });
      this.setState({ nameEdited: !this.state.nameEdited });
    }
  }
  positionEditing() {
    this.setState({ positionEdited: !this.state.positionEdited });
  }
  handleKeyPositionPress(e) {

    if (e.key === 'Enter') {
      let temp = { ...this.state.info };
      temp.personalInfo.currentPosition = e.target.value;
      this.setState({ temp });
      this.setState({ positionEdited: !this.state.positionEdited });
    }
  }
  phoneEditing() {
    this.setState({ phoneEdited: !this.state.phoneEdited });
  }
  handleKeyPhonePress(e) {

    if (e.key === 'Enter') {
      let temp = { ...this.state.info };
      temp.personalInfo.phoneNumber = e.target.value;
      this.setState({ temp });
      this.setState({ phoneEdited: !this.state.phoneEdited });
    }
  }

  addressEditing() {
    this.setState({ addressEdited: !this.state.addressEdited });
  }
  handleKeyAddressPress(e) {

    if (e.key === 'Enter') {
      let temp = { ...this.state.info };
      temp.personalInfo.address = e.target.value;
      this.setState({ temp });
      this.setState({ addressEdited: !this.state.addressEdited });
    }
  }

  emailEditing() {
    this.setState({ emailEdited: !this.state.emailEdited });
  }
  handleKeyEmailPress(e) {

    if (e.key === 'Enter') {
      let temp = { ...this.state.info };
      temp.personalInfo.email = e.target.value;
      this.setState({ temp });
      this.setState({ emailEdited: !this.state.emailEdited });
    }
  }

  facebookEditing() {
    this.setState({ facebookEdited: !this.state.facebookEdited });
  }
  handleKeyFacebookPress(e) {

    if (e.key === 'Enter') {
      let temp = { ...this.state.info };
      temp.personalInfo.facebook = e.target.value;
      this.setState({ temp });
      this.setState({ facebookEdited: !this.state.facebookEdited });
    }
  }

  linkedinEditing() {
    this.setState({ linkedinEdited: !this.state.linkedinEdited });
  }
  handleKeyLinkedinPress(e) {

    if (e.key === 'Enter') {
      let temp = { ...this.state.info };
      temp.personalInfo.linkedin = e.target.value;
      this.setState({ temp });
      this.setState({ linkedinEdited: !this.state.linkedinEdited });
    }
  }


  githubEditing() {
    this.setState({ githubEdited: !this.state.githubEdited });
  }
  handleKeyGithubPress(e) {

    if (e.key === 'Enter') {
      let temp = { ...this.state.info };
      temp.personalInfo.github = e.target.value;
      this.setState({ temp });
      this.setState({ githubEdited: !this.state.githubEdited });
    }
  }


  portfolioEditing() {
    this.setState({ portfolioEdited: !this.state.portfolioEdited });
  }
  handleKeyPortfolioPress(e) {

    if (e.key === 'Enter') {
      let temp = { ...this.state.info };
      temp.personalInfo.portfolio = e.target.value;
      console.log(temp);
      this.setState({ temp });
      this.setState({ portfolioEdited: !this.state.portfolioEdited });
    }
  }

  personalStatementEditing() {
    this.setState({ personalStatementEdited: !this.state.personalStatementEdited });
  }
  handleKeyPersonalStatementPress(e) {

    if (e.key === 'Enter') {
      let info = { ...this.state.info };
      info.personalStatement = e.target.value;
      this.setState({ info });
      this.setState({ personalStatementEdited: !this.state.personalStatementEdited });
    }
  }

  englishLevelEditing() {
    this.setState({ englishLevelEdited: !this.state.englishLevelEdited });
  }
  handleKeyEnglishLevelPress(e) {

    if (e.key === 'Enter') {
      let info = { ...this.state.info };
      info.skillSummary.englishLevel = e.target.value;
      this.setState({ info });
      this.setState({ englishLevelEdited: !this.state.englishLevelEdited });
    }
  }

  skillEditing() {
    this.setState({ skillEdited: !this.state.skillEdited });
  }
  handleKeySkillPress(e) {

    if (e.key === 'Enter') {
      let info = { ...this.state.info };
      info.skillSummary.skill = e.target.value;
      this.setState({ info });
      this.setState({ skillEdited: !this.state.skillEdited });
    }
  }



  componentWillMount() {
    fetch(API)
      .then(response => response.json())
      .then((data) => {
        this.setState({
          isLoaded: true,
          info: data
        });

      },
      (error) => {
        this.setState({
          isLoaded: true,
          error
        });
      }
      )
  }

  render() {
    const { error, isLoaded, info } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    }
    else if (!isLoaded) {
      return <div>Loading...</div>;
    }

    else {
      console.log(this.state);

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

                    {this.state.info.personalInfo.name}

                    <img onClick={this.nameEditing} className="iconEdit" src={pencil} />
                  </div>)
                }





                {this.state.positionEdited ?
                  (<input type="text" onKeyDown={this.handleKeyPositionPress} placeholder="Moi ban nhap vi tri" />) :


                  (<div className="card-title card-title-custom">

                    {this.state.info.personalInfo.currentPosition}

                    <img onClick={this.positionEditing} className="iconEdit" src={pencil} />
                  </div>)
                }

              </div >


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

                        Phone: {this.state.info.personalInfo.phoneNumber}

                        <img onClick={this.phoneEditing} className="iconEdit" src={pencil} />
                      </div>)
                    }
                    {this.state.addressEdited ?
                      (<input type="text" onKeyDown={this.handleKeyAddressPress} placeholder="Moi ban nhap dia chi" />) :


                      (<div >

                        Address: {this.state.info.personalInfo.address}

                        <img onClick={this.addressEditing} className="iconEdit" src={pencil} />
                      </div>)
                    }

                    {this.state.emailEdited ?
                      (<input type="text" onKeyDown={this.handleKeyEmailPress} placeholder="Moi ban nhap email" />) :


                      (<div >

                        Email: {this.state.info.personalInfo.email}

                        <img onClick={this.emailEditing} className="iconEdit" src={pencil} />
                      </div>)
                    }

                    {this.state.facebookEdited ?
                      (<input type="text" onKeyDown={this.handleKeyFacebookPress} placeholder="Moi ban nhap facebook" />) :


                      (<div >

                        Facebook: {this.state.info.personalInfo.facebook}

                        <img onClick={this.facebookEditing} className="iconEdit" src={pencil} />
                      </div>)
                    }


                    {this.state.linkedinEdited ?
                      (<input type="text" onKeyDown={this.handleKeyLinkedinPress} placeholder="Moi ban nhap linkedin" />) :


                      (<div >

                        Linkedin: {this.state.info.personalInfo.linkedin}

                        <img onClick={this.linkedinEditing} className="iconEdit" src={pencil} />
                      </div>)
                    }


                    {this.state.githubEdited ?
                      (<input type="text" onKeyDown={this.handleKeyGithubPress} placeholder="Moi ban nhap Github" />) :


                      (<div >

                        Github: {this.state.info.personalInfo.github}

                        <img onClick={this.githubEditing} className="iconEdit" src={pencil} />
                      </div>)
                    }


                    {this.state.portfolioEdited ?
                      (<input type="text" onKeyDown={this.handleKeyPortfolioPress} placeholder="Moi ban nhap Portfolio" />) :


                      (<div >

                        Portfolio: {this.state.info.personalInfo.portfolio}

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

                        {this.state.info.personalStatement}

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

                        English level: {this.state.info.skillSummary.englishLevel}

                        <img onClick={this.englishLevelEditing} className="iconEdit" src={pencil} />
                      </div>)
                    }



                  </div>
                  <div>{this.state.skillEdited ?
                    (<textarea className="textAreaCustom" type="text" onKeyDown={this.handleKeySkillPress} placeholder="Moi ban nhap Skill" />)  :


                    (<div >

                      {this.state.info.skillSummary.skill}

                      <img onClick={this.skillEditing} className="iconEdit" src={pencil} />
                    </div>)
                  }</div>
                </div>
              </div>
            </div>
          </div >

        </div >
      );
    }
  }
}

export default GeneralInformation;
