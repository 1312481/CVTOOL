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
import POSTAPI from './postAPI'




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

    componentWillMount() {
        let projectResTemp = [];
        let projectTemp = [];
        for (let i = 0; i < this.props.profile.experience.length; i++) {
            let tempRes = [];

            for (let j = 0; j < this.props.profile.experience[i].responsibility.length; j++) {

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
    experienceEditing(index, field, resIndex) {
        if (typeof (resIndex) === 'number') {
            let temp = { ...this.state.projectResEdited };
            temp[index][resIndex] = !temp[index][resIndex];
            this.setState({ projectResEdited: temp });
        }
        else {
            let temp = [...this.state[field]];
            temp[index] = !temp[index];
            let newstate = {};
            newstate[field] = temp;
            this.setState(newstate);
        }

    }


    updateFieldData(e, field, fieldName, index, resIndex) {
        let value = { ...this.props.profile };
        let key = this.props.profile._id;
        if (e.key === 'Enter') {
            if (typeof (resIndex) === 'number') {
                value.experience[index].responsibility[resIndex] = e.target.value;
                let temp = { ...this.state.projectResEdited };
                temp[index][resIndex] = !temp[index][resIndex];
                this.setState({ projectResEdited: temp });
            }
            else {
                value.experience[index][fieldName] = e.target.value;
                let temp = { ...this.state[field] };
                temp[index] = !temp[index];
                this.setState({ field: temp });

            }
            POSTAPI('http://localhost:3001/api/updateexperience', value.experience, key);
            this.props.profileUpdate(value);

        }
    }


    experienceDeleting(index, resIndex) {
        let value = { ...this.props.profile };
        let key = this.props.profile._id;
        if (typeof (resIndex) === 'number') {
            if (window.confirm("Do you really want to delete this ?!?!")) {
                value.experience[index].responsibility.splice(resIndex, 1);
            }
        }
        else {
            if (window.confirm("Do you really want to delete this ?!?!")) {
                value.experience.splice(index, 1);
            }
        }
        POSTAPI('http://localhost:3001/api/updateexperience', value.experience, key);
        this.props.profileUpdate(value);
    }

    experienceAdding(resIndex) {
        let defaultName = 'Default';
        if (typeof (resIndex) === 'number') {

            let value = { ...this.props.profile };
            let key = this.props.profile._id;
            value.experience[resIndex].responsibility.push(defaultName);
            POSTAPI('http://localhost:3001/api/updateexperience', value.experience, key);
            this.props.profileUpdate(value);
            toast.success('Adding Responsibility Success!!!!', {
                autoClose: 2000
            });
        }
        else {
            let tempExp = {};
            let tempExpRes = [];
            tempExp.position = defaultName;
            tempExp.companyName = defaultName;
            tempExp.projectName = defaultName;
            tempExp.projectDescription = defaultName;
            tempExp.technicalSkills = defaultName;
            tempExp.time = defaultName;
            tempExp.responsibility = [defaultName, defaultName];
            let value = { ...this.props.profile };
            let key = this.props.profile._id;
            value.experience.push(tempExp);
            POSTAPI('http://localhost:3001/api/updateexperience', value.experience, key);
            this.props.profileUpdate(value);

            toast.success('Adding Experience Success!!!!', {
                autoClose: 2000
            });
        }

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
                                        <img onClick={() => this.experienceAdding(index)} className="iconEdit" src={plus} />
                                        </td>
                                        <td scope="col">
                                            <ul>
                                                {this.props.profile.experience[index].responsibility.map((res, resIndex) => {

                                                    return (

                                                        <li key={exp.toString() + index.toString() + resIndex.toString()}>

                                                            {
                                                                this.state.projectResEdited[index][resIndex] ?
                                                                    (<input className="inputChange form-control" type="text" onKeyDown={(e) => this.updateFieldData(e, 'projectResEdited', 'responsibility', index, resIndex)} placeholder="Moi ban nhap ten" />) :

                                                                    (<div scope="col">{exp.responsibility[resIndex]}
                                                                        <img onClick={() => this.experienceEditing(index, 'res', resIndex)} className="iconEdit" src={pencil} />
                                                                        <img onClick={() => this.experienceDeleting(index, resIndex)} className="iconEdit" src={deleteImage} />
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
        // if (this.props.isProfileError) {
        //     return <Error />
        // }
        // else if (!this.props.isProfileLoaded) {
        //     return <Loading />
        // }

        return this.renderExperienceContainer();


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
