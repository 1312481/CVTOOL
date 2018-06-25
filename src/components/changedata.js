import React, { Component, PropTypes } from 'react';
import '../assets/styles/changedata.css'
import { connect } from 'react-redux'
import * as actions from '../actions/profile'
import Error from './error';
import Loading from './loading';


class ChangeData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showMenu: false
        }
    }

    increment() {
        this.props.versionIncrement();
    }
    decrement() {
        this.props.versionDecrement();
    }
    showMenu() {
        this.setState({ showMenu: !this.state.showMenu });
    }
    changeProfile(index){
        this.props.changeVersion(index);
        this.setState({ showMenu: !this.state.showMenu });
    }
    render() {

        if (this.props.isProfileError) {

            return <Error />
        }
        else if (!this.props.isProfileLoaded) {

            return <Loading />
        }
        else return (

            <div className = "changeData">


                <div>
                    <button className="btn btn-primary dropdown-toggle" onClick={() => this.showMenu()}>
                        {this.props.profile[this.props.version.currentVersions].tagName}
                    </button>
                    <div className="menu">
                        {
                            this.state.showMenu ?

                                (
                                    this.props.profile.map((pro, index) => {
                                        return (
                                            <a className="dropdown-item" key={"pro" + index} 
                                            onClick={()=> this.changeProfile(index)}>
                                                {pro.tagName}
                                            </a>
                                        )
                                    })
                                ) :
                                (
                                    null
                                )
                        }

                    </div>

                </div>

            </div>


        );
    }

}

const mapStateToProps = (state) => {
    return {
        profile: state.profile,
        version: state.version,
        isProfileError: state.isProfileError,
        isProfileLoaded: state.isProfileLoaded
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        versionIncrement: (profile) => dispatch(actions.incrementData()),
        versionDecrement: (profile) => dispatch(actions.decrementData()),
        changeVersion: (version) => dispatch(actions.changeVersion(version))
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(ChangeData);