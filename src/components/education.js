import React, { Component, PropTypes } from 'react';



import pencil from '../assets/images/pencil.svg'
import { connect } from 'react-redux'
import { profileFetchData } from '../actions/profile'
import { profileUpdateData } from '../actions/profile'

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


        console.log(this.props.profile);
        return (

            <div >
                <div className=" maincontent">
                    <div className="maincontent__header">Education</div>
                </div>
                <div className="maintable">
                    <table>
                        <tr className="table-custom">
                            <th scope="col">Major</th>
                            <th scope="col">University</th>
                            <th scope="col">Graduated Year</th>
                        </tr>

                        {/* <tr>
                            <td>{{ name }}</td>
                            <td>{{ major }}</td>
                            <td>{{ gradutedTime }}</td>
                        </tr>
                        <tr>
                            <td>{{ name }}</td>
                            <td>{{ major }}</td>
                            <td>{{ gradutedTime }}</td>
                        </tr>
                        <tr>
                            <td>{{ name }}</td>
                            <td>{{ major }}</td>
                            <td>{{ gradutedTime }}</td>
                        </tr> */}

                    </table>
                </div>


            </div >
        );
    }
}




const mapStateToProps = (state) => {
    return {
        profile: state.profile,


    };
};

const mapDispatchToProps = (dispatch) => {
    return {

    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Education);
