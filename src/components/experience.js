import React, { Component, PropTypes } from 'react';



import pencil from '../assets/images/pencil.svg'
import { connect } from 'react-redux'
import { profileFetchData } from '../actions/profile'
import { profileUpdateData } from '../actions/profile'
import '../assets/styles/education.css'

// const API = 'https://api.myjson.com/bins/eoigu'


class Experience extends Component {
    constructor(props) {
        super(props);
        this.state = {
            projectNameEdited: [],
            projectDurationEdited: [],
            projectPositionEdited: [],
            projectDescriptionEdited: [],
            projectTechnologyEdited: [],
            projectResEdited: [
                [false, false, false, false, false],
                [false, false, false, false, false]
            ]
        }




    }
    nameExperienceEditing(index, name) {

        if (name == 'project') {
            let temp = { ...this.state.projectNameEdited };
            temp[index] = !temp[index];
            this.setState({ projectNameEdited: temp });
        }
        else if (name == 'duration') {
            let temp = { ...this.state.projectDurationEdited };
            temp[index] = !temp[index];
            this.setState({ projectDurationEdited: temp });

        }
        else if (name == 'position') {
            let temp = { ...this.state.projectPositionEdited };
            temp[index] = !temp[index];
            this.setState({ projectPositionEdited: temp });
        }
        else if (name == 'description') {
            let temp = { ...this.state.projectDescriptionEdited };
            temp[index] = !temp[index];
            this.setState({ projectDescriptionEdited: temp });
        }
        else if (name == 'technology') {
            let temp = { ...this.state.projectTechnologyEdited };
            temp[index] = !temp[index];
            this.setState({ projectTechnologyEdited: temp });
        }
        else if (name == 'res') {
            let temp = { ...this.state.projectResEdited };
            temp[index] = !temp[index];
            this.setState({ projectResEdited: temp });
        }

    }
    resEditing(expIndex, resIndex, name) {
        let temp = { ...this.state.projectResEdited };
        temp[expIndex][resIndex] = !temp[expIndex][resIndex];
        this.setState({ projectResEdited: temp });
    }


    handleKeyProjectNamePress(e, index) {

        if (e.key === 'Enter') {
            let value = { ...this.props.profile };
            value.experience[index].projectName = e.target.value;
            let temp = { ...this.state.projectNameEdited };
            temp[index] = !temp[index];
            this.setState({ projectNameEdited: temp });
            this.props.profileUpdate(value);
        }
    }
    handleKeyProjectDurationPress(e, index) {
        if (e.key === 'Enter') {
            let value = { ...this.props.profile };
            value.experience[index].time = e.target.value;
            let temp = { ...this.state.projectDurationEdited };
            temp[index] = !temp[index];
            this.setState({ projectDurationEdited: temp });
            this.props.profileUpdate(value);
        }
    }
    handleKeyProjectPositionPress(e, index) {
        if (e.key === 'Enter') {
            let value = { ...this.props.profile };
            value.experience[index].position = e.target.value;
            let temp = { ...this.state.projectPositionEdited };
            temp[index] = !temp[index];
            this.setState({ projectPositionEdited: temp });
            this.props.profileUpdate(value);
        }
    }
    handleKeyProjectDescriptionPress(e, index) {
        if (e.key === 'Enter') {
            let value = { ...this.props.profile };
            value.experience[index].projectDescription = e.target.value;
            let temp = { ...this.state.projectDescriptionEdited };
            temp[index] = !temp[index];
            this.setState({ projectDescriptionEdited: temp });
            this.props.profileUpdate(value);
        }
    }
    handleKeyProjectTechnologyPress(e, index) {
        if (e.key === 'Enter') {
            let value = { ...this.props.profile };
            value.experience[index].technicalSkills = e.target.value;
            let temp = { ...this.state.projectTechnologyEdited };
            temp[index] = !temp[index];
            this.setState({ projectTechnologyEdited: temp });
            this.props.profileUpdate(value);
        }
    }
    handleKeyProjectResPress(e, expIndex, resIndex) {
        if (e.key === 'Enter') {
            let value = { ...this.props.profile };
            value.experience[expIndex].responsibility[resIndex] = e.target.value;
            let temp = { ...this.state.projectResEdited };
            temp[resIndex] = !temp[resIndex];
            this.setState({ projectResEdited: temp });
            this.props.profileUpdate(value);
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
                        <div className="maincontent__header">Experience</div>
                    </div>



                    {this.props.profile.experience.map((exp, index) => {
                        return (
                            <div className="maintable" key={exp.toString() + index.toString()}>
                                <table>
                                    <thead>
                                        <tr className="table-custom">
                                            <th scope="col">Project</th>
                                            {this.state.projectNameEdited[index] ?
                                                (<input type="text" onKeyDown={(e) => this.handleKeyProjectNamePress(e, index)} placeholder="Moi ban nhap ten" />) :


                                                (<th scope="col">{exp.projectName}
                                                    <img onClick={() => this.nameExperienceEditing(index, 'project')} className="iconEdit" src={pencil} />
                                                </th>
                                                )
                                            }

                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th scope="col">Duration</th>
                                            {this.state.projectDurationEdited[index] ?
                                                (<input type="text" onKeyDown={(e) => this.handleKeyProjectDurationPress(e, index)} placeholder="Moi ban nhap ten" />) :


                                                (<th scope="col">{exp.time}
                                                    <img onClick={() => this.nameExperienceEditing(index, 'duration')} className="iconEdit" src={pencil} />
                                                </th>
                                                )
                                            }

                                        </tr>
                                        <tr>
                                            <th scope="col">Position</th>
                                            {this.state.projectPositionEdited[index] ?
                                                (<input type="text" onKeyDown={(e) => this.handleKeyProjectPositionPress(e, index)} placeholder="Moi ban nhap ten" />) :


                                                (<th scope="col">{exp.position}
                                                    <img onClick={() => this.nameExperienceEditing(index, 'position')} className="iconEdit" src={pencil} />
                                                </th>
                                                )
                                            }

                                        </tr>

                                        <tr>
                                            <th scope="col">ProjectDescription</th>

                                            {this.state.projectDescriptionEdited[index] ?
                                                (<input type="text" onKeyDown={(e) => this.handleKeyProjectDescriptionPress(e, index)} placeholder="Moi ban nhap ten" />) :


                                                (<th scope="col">{exp.projectDescription}
                                                    <img onClick={() => this.nameExperienceEditing(index, 'description')} className="iconEdit" src={pencil} />
                                                </th>
                                                )
                                            }

                                        </tr>
                                        <tr>
                                            <th scope="col">My Responsibility</th>
                                            <th scope="col">
                                                <ul>
                                                    {/* {this.props.profile.experience[index].responsibility.map((res, resIndex) => {
                                                        return (
                                                            <li>
                                                          
                                                                {
                                                                    this.state.projectResEdited[index][resIndex] ?
                                                                        (<input type="text" onKeyDown={(e) => this.handleKeyProjectResPress(e, index, resIndex)} placeholder="Moi ban nhap ten" />) :


                                                                        (<div scope="col">{exp.responsibility[resIndex]}
                                                                            <img onClick={() => this.resEditing(index, resIndex, 'res')} className="iconEdit" src={pencil} />
                                                                        </div>
                                                                        )
                                                                }

                                                            </li>
                                                        )
                                                    })} */}

                                                </ul>
                                            </th>
                                        </tr>
                                        <tr>
                                            <th scope="col">Technology</th>
                                            {this.state.projectTechnologyEdited[index] ?
                                                (<input type="text" onKeyDown={(e) => this.handleKeyProjectTechnologyPress(e, index)} placeholder="Moi ban nhap ten" />) :


                                                (<th scope="col">{exp.technicalSkills}
                                                    <img onClick={() => this.nameExperienceEditing(index, 'technology')} className="iconEdit" src={pencil} />
                                                </th>
                                                )
                                            }

                                        </tr>

                                    </tbody>
                                </table>
                            </div>
                        )
                    })}







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


export default connect(mapStateToProps, mapDispatchToProps)(Experience);
