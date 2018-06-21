import React, { Component, PropTypes } from 'react';
import '../assets/styles/changedata.css'
import { connect } from 'react-redux'
import * as actions from '../actions/profile'

class ChangeData extends Component {
    increment() {
        this.props.versionIncrement();
    }
    decrement() {
        this.props.versionDecrement();
    }
    render() {
        return (
            
            <div>
                <a onClick= {() =>this.decrement()} className="previous round">&#8249;</a>
                <a onClick= {() =>this.increment()} className="next round">&#8250;</a>
            </div>


        );
    }

}

const mapStateToProps = (state) => {
    return {
        version: state.version
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        versionIncrement: (profile) => dispatch(actions.incrementData()),
        versionDecrement: (profile) => dispatch(actions.decrementData())
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(ChangeData);