import React, { Component, PropTypes } from 'react';



import pencil from '../assets/images/pencil.svg'
import { connect } from 'react-redux'
import { profileFetchData } from '../actions/profile'
import { profileUpdateData } from '../actions/profile'
import '../assets/styles/education.css'

// const API = 'https://api.myjson.com/bins/eoigu'


class Education extends Component {
    constructor(props) {
        super(props);



    }




    //   componentDidMount() {
    //     console.log('did mount is called');
    //     this.props.fetchData('https://api.myjson.com/bins/eoigu');

    //   }

    render() {
        if (this.props.hasErrored) {

            return <div>Sorry! There was an error</div>;
        }
        else if (!this.props.isLoaded) {

            return <div>Loading...</div>;
        }
        else {


            console.log(this.props.profile);
            return (

                <div >
                    <div className=" maincontent">
                        <div className="maincontent__header">Education</div>
                    </div>
                    <div className="maintable">
                        <table>
                            <thead>
                                <tr className="table-custom">
                                    <th scope="col">Major</th>
                                    <th scope="col">University</th>
                                    <th scope="col">Graduated Year</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{this.props.profile.education[0].name}</td>
                                    <td>{this.props.profile.education[0].major}</td>
                                    <td>{this.props.profile.education[0].gradutedTime}</td>
                                </tr>
                                <tr>
                                    <td>{this.props.profile.education[1].name}</td>
                                    <td>{this.props.profile.education[1].major}</td>
                                    <td>{this.props.profile.education[1].gradutedTime}</td>
                                </tr>
                           
                            </tbody>

                        </table>
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
        isLoaded: state.profileIsLoaded

    };
};

const mapDispatchToProps = (dispatch) => {
    return {

    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Education);
