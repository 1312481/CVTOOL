import React, { Component, PropTypes } from 'react';



import pencil from '../assets/images/pencil.svg'
import deleteImage from '../assets/images/delete.svg'
import { connect } from 'react-redux'
import { profileFetchData } from '../actions/profile'
import { profileUpdateData } from '../actions/profile'
import '../assets/styles/education.css'
import configureStore from '../store/configureStore';




class Skill extends Component {
    constructor(props) {
        super(props);
        this.state = {
            skillNameEdited: [],
            skillDetailEdited: []



        }




    }
    skillEditing (index, name){
        if (name == 'name') {
            let temp = { ...this.state.skillNameEdited };
            temp[index] = !temp[index];
            this.setState({ skillNameEdited: temp });
        }
        else if (name == 'detail') {
            let temp = { ...this.state.skillDetailEdited };
            temp[index] = !temp[index];
            this.setState({ skillDetailEdited: temp });

        }
    }
    skillDeleting(index){
        if (window.confirm("Do you really want to delete this ?!?!")) {
            let value = { ...this.props.profile };
            value.technicalSkill.splice(index, 1);
            this.props.profileUpdate(value);
            this.forceUpdate();
        }
    }
    handleKeyNameSkillPress(e, index) {
        if (e.key === 'Enter') {
            let value = { ...this.props.profile };
            value.technicalSkill[index].name = e.target.value;
            let temp = { ...this.state.skillNameEdited };
            temp[index] = !temp[index];
            this.setState({ skillNameEdited: temp });
            this.props.profileUpdate(value);
        }
    }
    handleKeyDetailSkillPress(e, index) {
        if (e.key === 'Enter') {
            let value = { ...this.props.profile };
            value.technicalSkill[index].detail = e.target.value;
            let temp = { ...this.state.skillDetailEdited };
            temp[index] = !temp[index];
            this.setState({ skillDetailEdited: temp });
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
                <div>
                    <div className=" maincontent">
                        <div className="maincontent__header">Technical Skill</div>





                    </div>
                    <div className="maintable">
                        <table>
                            <thead>
                                <tr className="table-custom">
                                    <th scope="col">Skill</th>
                                    <th scope="col">Detail</th>
                                </tr>
                            </thead>
                            <tbody>


                                {this.props.profile.technicalSkill.map((tech, index) => {
                                    return (
                                        <tr key={tech.name.toString()+ index.toString()}>

                                            {this.state.skillNameEdited[index] ?
                                                (<input class="inputChange form-control" type="text" onKeyDown={(e) => this.handleKeyNameSkillPress(e, index)} placeholder="Moi ban nhap ten" />) :


                                                (<td className="">

                                                    {tech.name}

                                                    <img onClick={() => this.skillEditing(index, 'name')} className="iconEdit" src={pencil} />
                                                    <img onClick={() => this.skillDeleting(index)} className="iconEdit" src={deleteImage} />
                                                </td>)
                                            }
                                            {this.state.skillDetailEdited[index] ?
                                                (<input class="inputChange form-control" type="text" onKeyDown={(e) => this.handleKeyDetailSkillPress(e, index)} placeholder="Moi ban nhap ten" />) :


                                                (<td className="">

                                                    {tech.detail}

                                                    <img onClick={() => this.skillEditing(index, 'detail')} className="iconEdit" src={pencil} />
                                                    
                                                </td>)
                                            }





                                        </tr>
                                    )
                                })}



                            </tbody>



                        </table>
                    </div>
                </div>

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


export default connect(mapStateToProps, mapDispatchToProps)(Skill);
