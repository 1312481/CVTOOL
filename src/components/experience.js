import React, { Component, PropTypes } from 'react';



import pencil from '../assets/images/pencil.svg'
import deleteImage from '../assets/images/delete.svg'
import plus from '../assets/images/plus.svg'
import { connect } from 'react-redux'
import * as actions from '../actions/profile'
import '../assets/styles/education.css'
import configureStore from '../store/configureStore';
import Error from './error'
import Loading from './loading'




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
            let projectTemp = [];
            for (let i = 0; i < nextProps.profile.experience.length; i++) {
                let tempRes = [];
       
                for (let j = 0; j < nextProps.profile.experience[i].responsibility.length; j++) {

                    tempRes.push(false);
                }
                projectTemp.push(false);
                projectResTemp.push(tempRes);
                console.log(projectResTemp);
            }
            this.setState({ projectResEdited: projectResTemp })
            this.setState({ projectNameEdited: projectTemp })
            this.setState({ projectDurationEdited: projectTemp })
            this.setState({ projectPositionEdited: projectTemp })
            this.setState({ projectDescriptionEdited: projectTemp })
            this.setState({ projectTechnologyEdited: projectTemp })

        }
    }
    nameExperienceEditing(index, field) {
        let temp = [...this.state[field]];
        temp[index] = !temp[index];
        let newstate = {};
        newstate[field] = temp;
        this.setState(newstate);


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
            value.experience.splice(index, 1);
            this.props.profileUpdate(value);

        }

    }

    nameExperienceResDeleting(index, resIndex) {
        if (window.confirm("Do you really want to delete this ?!?!")) {
            let value = { ...this.props.profile };
            value.experience[index].responsibility.splice(resIndex, 1);
            this.props.profileUpdate(value);

        }

    }
    nameExperienceAdding(){
        let tempExp= {};
        let tempExpRes = [];
        tempExp.position = 'Default';
        tempExp.companyName = 'Default';
        tempExp.projectName = 'Default';
        tempExp.projectDescription = 'Default';
        tempExp.technicalSkills = 'Default';
        tempExp.time = 'Default';
        tempExp.responsibility = ['Default', 'Default'];
        let value = { ...this.props.profile };
        value.experience.push(tempExp);
        this.props.profileUpdate(value);
    }




    renderExperienceContainer() {
        return (
            <div >
                <div className=" maincontent">
                    <div className="maincontent__header">Experience
                    <img onClick={() => this.nameExperienceAdding()} className="iconEdit" src={plus} />
                    </div>
                    
                </div>
                {this.props.profile.experience.map((exp, index) => {
                    return (
                        <div className="maintable" key={exp.toString() + index.toString()}>
                            <table>
                                <thead>
                                    <tr className="table-custom">
                                        <th scope="col">Project</th>
                                        {this.state.projectNameEdited[index] ?
                                            (<input className="inputChange form-control" type="text" onKeyDown={(e) => this.handleKeyProjectNamePress(e, index)} placeholder="Moi ban nhap ten" />) :
                                            (<td scope="col">{exp.projectName}
                                                <img onClick={() => this.nameExperienceEditing(index, 'projectNameEdited')} className="iconEdit" src={pencil} />
                                                <img onClick={() => this.nameExperienceDeleting(index)} className="iconEdit" src={deleteImage} />
                                            </td>
                                            )
                                        }
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td scope="col">Duration</td>
                                        {this.state.projectDurationEdited[index] ?
                                            (<input className="inputChange form-control" type="text" onKeyDown={(e) => this.handleKeyProjectDurationPress(e, index)} placeholder="Moi ban nhap ten" />) :
                                            (<td scope="col">{exp.time}
                                                <img onClick={() => this.nameExperienceEditing(index, 'projectDurationEdited')} className="iconEdit" src={pencil} />
                                            </td>
                                            )
                                        }

                                    </tr>
                                    <tr>
                                        <td scope="col">Position</td>
                                        {this.state.projectPositionEdited[index] ?
                                            (<input className="inputChange form-control" type="text" onKeyDown={(e) => this.handleKeyProjectPositionPress(e, index)} placeholder="Moi ban nhap ten" />) :
                                            (<td scope="col">{exp.position}
                                                <img onClick={() => this.nameExperienceEditing(index, 'projectPositionEdited')} className="iconEdit" src={pencil} />
                                            </td>
                                            )
                                        }

                                    </tr>

                                    <tr>
                                        <td scope="col">ProjectDescription</td>
                                        {this.state.projectDescriptionEdited[index] ?
                                            (<input className="inputChange form-control" type="text" onKeyDown={(e) => this.handleKeyProjectDescriptionPress(e, index)} placeholder="Moi ban nhap ten" />) :
                                            (<td scope="col">{exp.projectDescription}
                                                <img onClick={() => this.nameExperienceEditing(index, 'projectDescriptionEdited')} className="iconEdit" src={pencil} />
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

                                                        <li key={exp.toString() + index.toString() + resIndex.toString()}>

                                                            {
                                                                this.state.projectResEdited[index][resIndex] ?
                                                                    (<input className="inputChange form-control" type="text" onKeyDown={(e) => this.handleKeyProjectResPress(e, index, resIndex)} placeholder="Moi ban nhap ten" />) :

                                                                    (<div scope="col">{exp.responsibility[resIndex]}
                                                                        <img onClick={() => this.resEditing(index, resIndex, 'res')} className="iconEdit" src={pencil} />
                                                                        <img onClick={() => this.nameExperienceResDeleting(index, resIndex)} className="iconEdit" src={deleteImage} />
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
                                            (<input className="inputChange form-control" type="text" onKeyDown={(e) => this.handleKeyProjectTechnologyPress(e, index)} placeholder="Moi ban nhap ten" />) :


                                            (<td scope="col">{exp.technicalSkills}
                                                <img onClick={() => this.nameExperienceEditing(index, 'projectTechnologyEdited')} className="iconEdit" src={pencil} />
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




    render() {
        if (this.props.isProfileError) {
            return <Error />
        }
        else if (!this.props.isProfileLoaded) {
            return <Loading />
        }
        else {
            return this.renderExperienceContainer();
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
        profileUpdate: (profile) => dispatch(actions.updateProfileData(profile))
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Experience);
