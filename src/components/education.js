import React, { Component, PropTypes } from 'react';



import pencil from '../assets/images/pencil.svg'
import deleteImage from '../assets/images/delete.svg'
import { connect } from 'react-redux'
import { profileFetchData } from '../actions/profile'
import { profileUpdateData } from '../actions/profile'
import plus from '../assets/images/plus.svg'
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
            let temp = [...this.state.nameEducationEdited];
            temp[index] = !temp[index];
            console.log(temp);
            this.setState({ nameEducationEdited: temp });
        }
        else if (name == 'major') {
            let temp = [...this.state.majorEducationEdited];
            temp[index] = !temp[index];
            this.setState({ majorEducationEdited: temp });

        }
        else if (name == 'graduated') {
            let temp = [...this.state.graduatedEducationEdited];
            temp[index] = !temp[index];
            this.setState({ graduatedEducationEdited: temp });
        }

    }
    handleKeyNameEducationPress(e, index) {
        if (e.key === 'Enter') {
            let value = { ...this.props.profile };
            value.education[index].name = e.target.value;
            let temp = [...this.state.nameEducationEdited];
            temp[index] = !temp[index];
            this.setState({ nameEducationEdited: temp });
            this.props.profileUpdate(value);
        }
    }
    handleKeyMajorEducationPress(e, index) {
        if (e.key === 'Enter') {
            let value = { ...this.props.profile };
            value.education[index].major = e.target.value;
            let temp = [...this.state.majorEducationEdited];
            temp[index] = !temp[index];
            this.setState({ majorEducationEdited: temp });
            this.props.profileUpdate(value);
        }
    }
    handleKeyGraduatedEducationPress(e, index) {
        if (e.key === 'Enter') {
            let value = { ...this.props.profile };
            value.education[index].gradutedTime = e.target.value;
            let temp = [...this.state.graduatedEducationEdited];
            temp[index] = !temp[index];
            this.setState({ graduatedEducationEdited: temp });
            this.props.profileUpdate(value);
        }
    }
    educationDeleting(index) {
        if (window.confirm("Do you really want to delete this ?!?!")) {
            let value = { ...this.props.profile };
            value.education.splice(index, 1);

            this.props.profileUpdate(value);
            // this.forceUpdate();
        }



    }
    educationAdding() {
        console.log(this.props.profile.education);
        console.log(this.state.nameEducationEdited)
    }
    componentWillReceiveProps(nextProps) {

        if (nextProps.profile !== this.props.profile) {

            const length = nextProps.profile.education.length;
            let projectResTemp = [];
            for (let i = 0; i < length; i++) {
                let temp = false;



                projectResTemp.push(temp);
            }
            this.setState({ nameEducationEdited: projectResTemp })

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
                                    <th scope="col">Name
                                    <img onClick={() => this.educationAdding()} className="iconEdit" src={plus} />
                                    </th>

                                    <th scope="col">Major</th>
                                    <th scope="col">Graduated Year</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.props.profile.education.map((education, index) => {
                                    return (
                                        <tr key={education.name.toString()}>

                                            {this.state.nameEducationEdited[index] ?
                                                (<input className="inputChange form-control" type="text" onKeyDown={(e) => this.handleKeyNameEducationPress(e, index)} placeholder="Moi ban nhap ten" />) :


                                                (<td className="">

                                                    {this.props.profile.education[index].name}

                                                    <img onClick={() => this.nameEducationEditing(index, 'name')} className="iconEdit" src={pencil} />
                                                    <img onClick={() => this.educationDeleting(index)} className="iconEdit" src={deleteImage} />

                                                </td>)
                                            }
                                            {this.state.majorEducationEdited[index] ?
                                                (<input className="inputChange form-control" type="text" onKeyDown={(e) => this.handleKeyMajorEducationPress(e, index)} placeholder="Moi ban nhap ten" />) :


                                                (<td className="">

                                                    {this.props.profile.education[index].major}

                                                    <img onClick={() => this.nameEducationEditing(index, 'major')} className="iconEdit" src={pencil} />
                                                </td>)
                                            }
                                            {this.state.graduatedEducationEdited[index] ?
                                                (<input className="inputChange form-control" type="text" onKeyDown={(e) => this.handleKeyGraduatedEducationPress(e, index)} placeholder="Moi ban nhap ten" />) :


                                                (<td className="">

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
