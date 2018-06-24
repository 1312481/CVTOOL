import React, { Component, PropTypes } from 'react';
import '../assets/styles/changedata.css'
import { connect } from 'react-redux'
import * as actions from '../actions/profile'
import Error from './error';
import Loading from './loading';


class ChangeData extends Component {
    constructor(props){
        super(props);
    }
    increment() {
        this.props.versionIncrement();
    }
    decrement() {
        this.props.versionDecrement();
    }
    render() {

        if (this.props.isProfileError) {

            return <Error />
        }
        else if (!this.props.isProfileLoaded) {

            return <Loading />
        }
        else return (

            <div>
                
                <a onClick={() => this.decrement()} className="previous round">&#8249;</a>
                <div>
                Name tag for versions: 
                {this.props.profile[this.props.version.currentVersions].tagName}
                </div>
                <a onClick={() => this.increment()} className="next round">&#8250;</a>
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
        versionDecrement: (profile) => dispatch(actions.decrementData())
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(ChangeData);