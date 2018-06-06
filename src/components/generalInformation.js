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
    this.state = {
      nameEdited: false
    }
  }
  nameEditing() {
    // this.props.nameEditing(true);
    this.setState({ nameEdited: !this.state.nameEdited });
    console.log(this.state.nameEdited);
  }
  handleKeyNamePress(e) {

    if (e.key === 'Enter') {

      let temp = { ...this.props.profile };
      temp.personalInfo.name = e.target.value;
      console.log(temp);
      this.setState({ nameEdited: !this.state.nameEdited });
      this.props.profileUpdate(temp);
    }
  }



  componentDidMount() {
    console.log('did mount is called');
    this.props.fetchData('https://api.myjson.com/bins/eoigu');

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


              </div>
            </div>
          </div>


        </div >
      );
    }
  }
}



const mapStateToProps = (state) => {
  return {
    profile: state.profile,
    hasErrored: state.profileHasErrored,
    isLoaded: state.profileIsLoaded,
    isBeingEdited: state.nameEditing

  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: (url) => dispatch(profileFetchData(url)),
    nameEditing: (editing) => dispatch(nameEditing(editing)),
    profileUpdate: (profile) => dispatch(profileUpdateData(profile))
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(GeneralInformation);
