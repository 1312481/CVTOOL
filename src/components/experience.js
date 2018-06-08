import React, { Component, PropTypes } from 'react';



import pencil from '../assets/images/pencil.svg'
import deleteImage from '../assets/images/delete.svg'
import plus from '../assets/images/plus.svg'
import { connect } from 'react-redux'
import { profileFetchData } from '../actions/profile'
import { profileUpdateData } from '../actions/profile'
import '../assets/styles/education.css'
import configureStore from '../store/configureStore';




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

            ]
        }




    }

    componentWillReceiveProps(nextProps) {

        if (nextProps.profile !== this.props.profile) {
     
            let projectResTemp = [];
            for (let i = 0; i < nextProps.profile.experience.length; i++) {
                let temp = [];
                for (let j = 0; j < nextProps.profile.experience[i].responsibility.length; j++) {

                    temp.push(false);
                }
                projectResTemp.push(temp);
            }
            this.setState({ projectResEdited: projectResTemp })
            
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
            temp[expIndex][resIndex] = !temp[expIndex][resIndex];
            this.setState({ projectResEdited: temp });
            this.props.profileUpdate(value);
        }
    }

    nameExperienceDeleting(index) {
        if (window.confirm("Do you really want to delete this ?!?!")) {
            let value = { ...this.props.profile };
            value.experience.splice(index,1);
            this.props.profileUpdate(value);
            this.forceUpdate();
        }
        
    }

    nameExperienceResDeleting(index, resIndex) {
        if (window.confirm("Do you really want to delete this ?!?!")) {
            let value = { ...this.props.profile };
            value.experience[index].responsibility.splice(resIndex,1);
            this.props.profileUpdate(value);
            this.forceUpdate();
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
                                                (<input class="inputChange form-control" type="text" onKeyDown={(e) => this.handleKeyProjectNamePress(e, index)} placeholder="Moi ban nhap ten" />) :


                                                (<td scope="col">{exp.projectName}
                                                    <img onClick={() => this.nameExperienceEditing(index, 'project')} className="iconEdit" src={pencil} />
                                                    <img onClick={() => this.nameExperienceDeleting(index)} className="iconEdit" src={deleteImage} />
                                                    <img onClick={() => this.nameExperienceAdding(index)} className="iconEdit" src={plus} />
                                                </td>
                                                )
                                            }

                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td scope="col">Duration</td>
                                            {this.state.projectDurationEdited[index] ?
                                                (<input class="inputChange form-control" type="text" onKeyDown={(e) => this.handleKeyProjectDurationPress(e, index)} placeholder="Moi ban nhap ten" />) :


                                                (<td scope="col">{exp.time}
                                                    <img onClick={() => this.nameExperienceEditing(index, 'duration')} className="iconEdit" src={pencil} />
                                                </td>
                                                )
                                            }

                                        </tr>
                                        <tr>
                                            <td scope="col">Position</td>
                                            {this.state.projectPositionEdited[index] ?
                                                (<input class="inputChange form-control" type="text" onKeyDown={(e) => this.handleKeyProjectPositionPress(e, index)} placeholder="Moi ban nhap ten" />) :


                                                (<td scope="col">{exp.position}
                                                    <img onClick={() => this.nameExperienceEditing(index, 'position')} className="iconEdit" src={pencil} />
                                                </td>
                                                )
                                            }

                                        </tr>

                                        <tr>
                                            <td scope="col">ProjectDescription</td>

                                            {this.state.projectDescriptionEdited[index] ?
                                                (<input class="inputChange form-control"  type="text" onKeyDown={(e) => this.handleKeyProjectDescriptionPress(e, index)} placeholder="Moi ban nhap ten" />) :


                                                (<td scope="col">{exp.projectDescription}
                                                    <img onClick={() => this.nameExperienceEditing(index, 'description')} className="iconEdit" src={pencil} />
                                                </td>
                                                )
                                            }

                                        </tr>
                                        <tr>
                                            <td scope="col">My Responsibility</td>
                                            <td scope="col">
                                                <ul>
                                                    {this.props.profile.experience[index].responsibility.map((res, resIndex) => {

                                                        return (

                                                            <li  key={exp.toString() + index.toString() + resIndex.toString()}>

                                                                {
                                                                    this.state.projectResEdited[index][resIndex] ?
                                                                        (<input class="inputChange form-control"  type="text" onKeyDown={(e) => this.handleKeyProjectResPress(e, index, resIndex)} placeholder="Moi ban nhap ten" />) :


                                                                        (<div scope="col">{exp.responsibility[resIndex]}
                                                                            <img onClick={() => this.resEditing(index, resIndex, 'res')} className="iconEdit" src={pencil} />
                                                                            <img onClick={() => this.nameExperienceResDeleting(index,resIndex)} className="iconEdit" src={deleteImage} />
                                                                        </div>
                                                                        )
                                                                }

                                                            </li>
                                                        )
                                                    })}

                                                </ul>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td scope="col">Technology</td>
                                            {this.state.projectTechnologyEdited[index] ?
                                                (<input class="inputChange form-control" type="text" onKeyDown={(e) => this.handleKeyProjectTechnologyPress(e, index)} placeholder="Moi ban nhap ten" />) :


                                                (<td scope="col">{exp.technicalSkills}
                                                    <img onClick={() => this.nameExperienceEditing(index, 'technology')} className="iconEdit" src={pencil} />
                                                </td>
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
        isLoaded: state.profileIsLoaded,


    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        profileUpdate: (profile) => dispatch(profileUpdateData(profile))
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Experience);
