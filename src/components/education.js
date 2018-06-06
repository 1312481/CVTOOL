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
        this.state = {
            nameEducationEdited: [],
            majorEducationEdited: [],
            graduatedEducationEdited: []
        }




    }
    nameEducationEditing(index, name) {
        
        if (name == 'name') {
            let temp = { ...this.state.nameEducationEdited };
            temp[index] = !temp[index];
            this.setState({ nameEducationEdited: temp });
        }
        else if (name == 'major'){
            let temp = { ...this.state.majorEducationEdited };  
            temp[index] = !temp[index];
            this.setState({ majorEducationEdited: temp });
            
        }
        else if (name == 'graduated') {
            let temp = { ...this.state.graduatedEducationEdited };
            temp[index] = !temp[index];
            this.setState({ graduatedEducationEdited: temp });
        }

    }
    handleKeyNameEducationPress(e, index) {
        if (e.key === 'Enter') {
            let value = { ...this.props.profile };
            value.education[index].name = e.target.value;
            let temp = { ...this.state.nameEducationEdited };
            temp[index] = !temp[index];
            this.setState({ nameEducationEdited: temp });
            this.props.profileUpdate(value);
        }
    }
    handleKeyMajorEducationPress(e, index) {
        if (e.key === 'Enter') {
            let value = { ...this.props.profile };
            value.education[index].major = e.target.value;
            let temp = { ...this.state.majorEducationEdited };
            temp[index] = !temp[index];
            this.setState({ majorEducationEdited: temp });
            this.props.profileUpdate(value);
        }
    }
    handleKeyGraduatedEducationPress(e, index) {
        if (e.key === 'Enter') {
            let value = { ...this.props.profile };
            value.education[index].gradutedTime = e.target.value;
            let temp = { ...this.state.graduatedEducationEdited };
            temp[index] = !temp[index];
            this.setState({ graduatedEducationEdited: temp });
            this.props.profileUpdate(value);
        }
    }

    componentWillMount() {
        if (!this.props.hasErrored && this.props.isLoaded) {
            const a = this.props.profile.education.length;
            let tempArray = new Array();
            for (let i = 0; i < a; i++) {
                const temp1 = false;
                tempArray.push(temp1);
            }
            this.setState({
                nameEducationEdited: [...this.state.nameEducationEdited, tempArray]
            });
            this.setState({
                nameEducationEdited: [...this.state.majorEducationEdited, tempArray]
            });
            this.setState({
                nameEducationEdited: [...this.state.graduatedEducationEdited, tempArray]
            });
        }
    }




    render() {
        if (this.props.hasErrored) {

            return <div>Sorry! There was an error</div>;
        }
        else if (!this.props.isLoaded) {

            return <div>Loading...</div>;
        }

        else {


            return (

                <div >
                    <div className=" maincontent">
                        <div className="maincontent__header">Education</div>
                    </div>
                    <div className="maintable">
                        <table>
                            <thead>
                                <tr className="table-custom">
                                    <th scope="col">Name</th>
                                    <th scope="col">Major</th>
                                    <th scope="col">Graduated Year</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.props.profile.education.map((education, index) => {
                                    return (
                                        <tr key={education.name.toString()}>

                                            {this.state.nameEducationEdited[index] ?
                                                (<input type="text" onKeyDown={(e) => this.handleKeyNameEducationPress(e, index)} placeholder="Moi ban nhap ten" />) :


                                                (<td className="card-title card-title-custom">

                                                    {this.props.profile.education[index].name}

                                                    <img onClick={() => this.nameEducationEditing(index, 'name')} className="iconEdit" src={pencil} />
                                                </td>)
                                            }
                                            {this.state.majorEducationEdited[index] ?
                                                (<input type="text" onKeyDown={(e) => this.handleKeyMajorEducationPress(e, index)} placeholder="Moi ban nhap ten" />) :


                                                (<td className="card-title card-title-custom">

                                                    {this.props.profile.education[index].major}

                                                    <img onClick={() => this.nameEducationEditing(index, 'major')} className="iconEdit" src={pencil} />
                                                </td>)
                                            }
                                            {this.state.graduatedEducationEdited[index] ?
                                                (<input type="text" onKeyDown={(e) => this.handleKeyGraduatedEducationPress(e, index)} placeholder="Moi ban nhap ten" />) :


                                                (<td className="card-title card-title-custom">

                                                    {this.props.profile.education[index].gradutedTime}

                                                    <img onClick={() => this.nameEducationEditing(index, 'graduated')} className="iconEdit" src={pencil} />
                                                </td>)
                                            }


                                        </tr>
                                    )
                                })}
                               

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
        profileUpdate: (profile) => dispatch(profileUpdateData(profile))
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Education);
