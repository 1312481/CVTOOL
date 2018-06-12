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
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Slide, Zoom, Flip, Bounce } from 'react-toastify';




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
            }
            this.setState({ projectResEdited: projectResTemp })
            this.setState({ projectNameEdited: projectTemp })
            this.setState({ projectDurationEdited: projectTemp })
            this.setState({ projectPositionEdited: projectTemp })
            this.setState({ projectDescriptionEdited: projectTemp })
            this.setState({ projectTechnologyEdited: projectTemp })

        }
    }
    experienceEditing(index, field) {
        let temp = [...this.state[field]];
        temp[index] = !temp[index];
        let newstate = {};
        newstate[field] = temp;
        this.setState(newstate);


    }


    updateFieldData(e, field, fieldName, index, resIndex) {

        if (e.key === 'Enter') {
            let value = { ...this.props.profile };
            if(resIndex){
                value.experience[index].responsibility[resIndex] = e.target.value;
                let temp = { ...this.state.projectResEdited };
                temp[index][resIndex] = !temp[index][resIndex];
                this.setState({ projectResEdited: temp });
            }
            else{
                value.experience[index][fieldName] = e.target.value;
                let temp = { ...this.state[field] };
                temp[index] = !temp[index];
                this.setState({ field: temp });
                
            }
            this.props.profileUpdate(value);
        }
    }

    resEditing(expIndex, resIndex, name) {
        let temp = { ...this.state.projectResEdited };
        temp[expIndex][resIndex] = !temp[expIndex][resIndex];
        this.setState({ projectResEdited: temp });
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

    experienceDeleting(index) {
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
    experienceAdding() {
        let tempExp = {};
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
        toast.success('Adding Experience Success!!!!', {
            autoClose: 2000
        });

    }
    resAdding(index) {
        let a = 'Default';
        let value = { ...this.props.profile };
        value.experience[index].responsibility.push(a);
        this.props.profileUpdate(value);
        toast.success('Adding Responsibility Success!!!!', {
            autoClose: 2000
        });
    }




    renderExperienceContainer() {
        return (
            <div >
                <ToastContainer
                    transition={Slide}
                    newestOnTop
                />
                <div className=" maincontent">
                    <div className="maincontent__header">Experience
                    <img onClick={() => this.experienceAdding()} className="iconEdit" src={plus} />
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
                                            (<input className="inputChange form-control" type="text" onKeyDown={(e) => this.updateFieldData(e, 'projectNameEdited', 'projectName', index)} placeholder="Moi ban nhap ten" />) :
                                            (<td scope="col">{exp.projectName}
                                                <img onClick={() => this.experienceEditing(index, 'projectNameEdited')} className="iconEdit" src={pencil} />
                                                <img onClick={() => this.experienceDeleting(index)} className="iconEdit" src={deleteImage} />
                                            </td>
                                            )
                                        }
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td scope="col">Duration</td>
                                        {this.state.projectDurationEdited[index] ?
                                            (<input className="inputChange form-control" type="text" onKeyDown={(e) => this.updateFieldData(e, 'projectDurationEdited', 'time', index)} placeholder="Moi ban nhap ten" />) :
                                            (<td scope="col">{exp.time}
                                                <img onClick={() => this.experienceEditing(index, 'projectDurationEdited')} className="iconEdit" src={pencil} />
                                            </td>
                                            )
                                        }

                                    </tr>
                                    <tr>
                                        <td scope="col">Position</td>
                                        {this.state.projectPositionEdited[index] ?
                                            (<input className="inputChange form-control" type="text" onKeyDown={(e) => this.updateFieldData(e, 'projectPositionEdited', 'position', index)} placeholder="Moi ban nhap ten" />) :
                                            (<td scope="col">{exp.position}
                                                <img onClick={() => this.experienceEditing(index, 'projectPositionEdited')} className="iconEdit" src={pencil} />
                                            </td>
                                            )
                                        }

                                    </tr>

                                    <tr>
                                        <td scope="col">ProjectDescription</td>
                                        {this.state.projectDescriptionEdited[index] ?
                                            (<input className="inputChange form-control" type="text" onKeyDown={(e) => this.updateFieldData(e, 'projectDescriptionEdited', 'projectDescription', index)} placeholder="Moi ban nhap ten" />) :
                                            (<td scope="col">{exp.projectDescription}
                                                <img onClick={() => this.experienceEditing(index, 'projectDescriptionEdited')} className="iconEdit" src={pencil} />
                                            </td>
                                            )
                                        }

                                    </tr>
                                    <tr>
                                        <td scope="col">My Responsibility
                                        <img onClick={() => this.resAdding(index)} className="iconEdit" src={plus} />
                                        </td>
                                        <td scope="col">
                                            <ul>
                                                {this.props.profile.experience[index].responsibility.map((res, resIndex) => {

                                                    return (

                                                        <li key={exp.toString() + index.toString() + resIndex.toString()}>

                                                            {
                                                                this.state.projectResEdited[index][resIndex] ?
                                                                    (<input className="inputChange form-control" type="text" onKeyDown={(e) => this.handleKeyProjectResPress(e,  index, resIndex)} placeholder="Moi ban nhap ten" />) :

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
                                            (<input className="inputChange form-control" type="text" onKeyDown={(e) => this.updateFieldData(e, 'projectTechnologyEdited', 'technicalSkills', index)} placeholder="Moi ban nhap ten" />) :


                                            (<td scope="col">{exp.technicalSkills}
                                                <img onClick={() => this.experienceEditing(index, 'projectTechnologyEdited')} className="iconEdit" src={pencil} />
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
